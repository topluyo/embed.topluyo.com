const serverId = new URLSearchParams(window.location.search).get('serverId');
const channelId = new URLSearchParams(window.location.search).get('channelId');
const root = document.getElementById('root');

console.log('URL Parametreleri - serverId:', serverId, 'channelId:', channelId);

if (!(serverId && channelId)) {
  root.innerHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-title">⚠️ Hata</div>
        </div>
      </div>
      <div class="chat-messages" style="justify-content: center; align-items: center;">
        <div class="error-message">
          <div style="font-size: 3em; margin-bottom: 0.3em;">😞</div>
          <div style="font-size: 1.2em; margin-bottom: 0.5em;">Gerekli parametreler eksik!</div>
          <div style="font-size: 0.9em; opacity: 0.9;">URL'de serverId ve channelId parametrelerini belirtmelisiniz.</div>
          <div style="margin-top: 1em; font-size: 0.85em; opacity: 0.8;">Örnek: ?serverId=3253&channelId=16250</div>
        </div>
      </div>
    </div>
  `;
  console.error('Missing serverId or channelId in URL parameters');
} else {
  console.log('Chat başlatılıyor...');
  initChat();
}

// Chat state
let messages = [];
let ws = null;
let isConnecting = false;
let lastMessageTimestamp = 0;
let reconnectAttempts = 0;
let maxReconnectAttempts = 10;
let reconnectDelay = 2000;

// Initialize chat
async function initChat() {
  root.innerHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-title">💬 Topluyo Chat</div>
          <div class="chat-header-subtitle">Server ${serverId} • Channel ${channelId}</div>
        </div>
        <div class="chat-status" id="status">
          <span class="status-dot" style="background: orange;"></span>
          <span>Bağlanıyor...</span>
        </div>
        <button id="reconnect-btn" class="reconnect-btn" style="display: none;">🔄 Yeniden Bağlan</button>
      </div>
      <div class="chat-messages" id="messages">
        <div class="loading-indicator">⏳ Mesajlar yükleniyor...</div>
      </div>
    </div>
  `;

  // Reconnect button handler
  const reconnectBtn = document.getElementById('reconnect-btn');
  reconnectBtn.addEventListener('click', () => {
    reconnectAttempts = 0;
    reconnectDelay = 2000;
    if (ws) {
      ws.close();
    }
    connectWebSocket();
  });

  // Fetch initial messages
  await fetchMessages();
  
  // Connect to WebSocket
  connectWebSocket();
}

// Fetch messages from API
async function fetchMessages(after = 0, before = 999999999) {
  try {
    console.log(`Mesajlar çekiliyor... (after: ${after}, before: ${before})`);
    const response = await fetch('https://topluyo.com/!api/post/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        after: after,
        before: before,
        channel_id: parseInt(channelId)
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API yanıtı alındı:', data);
    
    const posts = data.data || data.posts || [];
    if (posts && posts.length > 0) {
      let newMessagesCount = 0;
      // Merge new messages with existing ones
      posts.forEach(post => {
        if (!messages.find(m => m.id === post.id)) {
          messages.push(post);
          newMessagesCount++;
          if (post.created_at > lastMessageTimestamp) {
            lastMessageTimestamp = post.created_at;
          }
        }
      });
      
      console.log(`${newMessagesCount} yeni mesaj eklendi`);
      
      // Sort messages: newest first
      messages.sort((a, b) => b.created_at - a.created_at);
      renderMessages();
    }
  } catch (error) {
    console.error('Mesaj çekme hatası:', error);
    updateStatus('API Hatası', 'red');
  }
}

// Connect to WebSocket
function connectWebSocket() {
  if (isConnecting || (ws && ws.readyState === WebSocket.OPEN)) {
    console.log('Zaten bağlı veya bağlanıyor');
    return;
  }

  if (reconnectAttempts >= maxReconnectAttempts) {
    updateStatus('Maksimum yeniden bağlanma denemesi aşıldı', 'red');
    console.error('Maksimum yeniden bağlanma denemesi aşıldı');
    return;
  }

  isConnecting = true;
  reconnectAttempts++;
  updateStatus(`Bağlanıyor... (Deneme ${reconnectAttempts})`, 'orange');
  console.log(`WebSocket bağlantısı kuruluyor... (Deneme ${reconnectAttempts})`);

  try {
    ws = new WebSocket('wss://topluyo.com/!direct');
  } catch (error) {
    console.error('WebSocket oluşturma hatası:', error);
    isConnecting = false;
    scheduleReconnect();
    return;
  }

  ws.onopen = () => {
    console.log('WebSocket bağlantısı açıldı');
    isConnecting = false;
    reconnectAttempts = 0; // Reset on successful connection
    reconnectDelay = 2000; // Reset delay
    updateStatus('Bağlı', 'green');
    
    console.log('WebSocket mesajları gönderiliyor...');
    console.log('serverId:', serverId, 'channelId:', channelId);
    
    // Send 2 messages only
    setTimeout(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        const msg1 = 'NONE';
        console.log('Gönderiliyor [1/2]:', msg1);
        ws.send(msg1);
        
        setTimeout(() => {
          if (ws && ws.readyState === WebSocket.OPEN) {
            const msg2 = `${serverId},${channelId}`;
            console.log('Gönderiliyor [2/2]:', msg2, '(Uzunluk:', msg2.length, ')');
            ws.send(msg2);
            console.log('Tüm başlangıç mesajları gönderildi');
          }
        }, 300);
      }
    }, 500);
  };

  ws.onmessage = (event) => {
    const message = event.data;
    console.log('WebSocket mesaj alındı:', message.substring(0, 150));
    
    // Filter messages starting with >$post.{channelId}
    const wsPrefix = `>$post.${channelId}.`;
    if (message.startsWith(wsPrefix)) {
      try {
        // Find where JSON starts (after post ID)
        const jsonStart = message.indexOf('{');
        if (jsonStart === -1) {
          console.error('JSON başlangıcı bulunamadı');
          return;
        }
        
        const jsonData = message.substring(jsonStart);
        const post = JSON.parse(jsonData);
        
        console.log('Parse edilen mesaj:', post);
        
        // Add new message if not exists
        if (!messages.find(m => m.id === post.id)) {
          messages.unshift(post); // Add to beginning (newest first)
          if (post.created_at > lastMessageTimestamp) {
            lastMessageTimestamp = post.created_at;
          }
          addNewMessage(post); // Add only the new message to DOM
          console.log('Yeni mesaj eklendi:', post.id);
        }
      } catch (error) {
        console.error('Mesaj parse hatası:', error, 'Mesaj:', message);
      }
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket hatası:', error);
    updateStatus('Bağlantı Hatası', 'red');
  };

  ws.onclose = (event) => {
    console.log('WebSocket bağlantısı kapandı. Code:', event.code, 'Reason:', event.reason);
    isConnecting = false;
    updateStatus('Bağlantı Kesildi', 'red');
    
    // Don't reconnect if closed normally (code 1000)
    if (event.code === 1000) {
      console.log('Normal kapanış, yeniden bağlanılmıyor');
      return;
    }
    
    // Auto reconnect with message check
    scheduleReconnect();
  };
}

// Schedule reconnection with exponential backoff
async function scheduleReconnect() {
  if (reconnectAttempts >= maxReconnectAttempts) {
    console.log('Maksimum deneme sayısına ulaşıldı');
    updateStatus('Maksimum bağlanma denemesi aşıldı', 'red');
    return;
  }
  
  console.log(`${reconnectDelay / 1000} saniye içinde yeniden bağlanılacak...`);
  
  setTimeout(async () => {
    try {
      // Check for new messages from API before reconnecting
      console.log('Yeniden bağlanmadan önce yeni mesajlar kontrol ediliyor...');
      
      const response = await fetch('https://topluyo.com/!api/post/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          after: 0,
          before: 999999999,
          channel_id: parseInt(channelId)
        })
      });

      if (response.ok) {
        const data = await response.json();
        const posts = data.data || data.posts || [];
        
        if (posts && posts.length > 0) {
          // Get the newest message from API
          const newestApiPost = posts.reduce((newest, post) => 
            post.created_at > newest.created_at ? post : newest
          , posts[0]);
          
          // Get the newest message from our local array
          const newestLocalPost = messages.length > 0 ? 
            messages.reduce((newest, post) => 
              post.created_at > newest.created_at ? post : newest
            , messages[0]) : null;
          
          console.log('API\'den en yeni mesaj ID:', newestApiPost.id, 'Local en yeni mesaj ID:', newestLocalPost?.id);
          
          // If the newest API message is different, add new messages
          if (!newestLocalPost || newestApiPost.id !== newestLocalPost.id) {
            console.log('Yeni mesajlar tespit edildi, listeye ekleniyor...');
            let addedCount = 0;
            
            posts.forEach(post => {
              if (!messages.find(m => m.id === post.id)) {
                messages.unshift(post);
                addedCount++;
                
                // Add to DOM with animation
                addNewMessage(post);
                
                if (post.created_at > lastMessageTimestamp) {
                  lastMessageTimestamp = post.created_at;
                }
              }
            });
            
            // Sort messages: newest first
            messages.sort((a, b) => b.created_at - a.created_at);
            console.log(`${addedCount} yeni mesaj eklendi`);
          } else {
            console.log('Yeni mesaj yok, direkt WebSocket\'e bağlanılıyor');
          }
        }
      }
    } catch (error) {
      console.error('Mesaj kontrolü hatası:', error);
    }
    
    // Reconnect to WebSocket
    connectWebSocket();
  }, reconnectDelay);
  
  // Exponential backoff: increase delay (max 30 seconds)
  reconnectDelay = Math.min(reconnectDelay * 1.5, 30000);
}

// Render messages
function renderMessages(autoScroll = false) {
  const messagesContainer = document.getElementById('messages');
  if (!messagesContainer) return;

  if (messages.length === 0) {
    messagesContainer.innerHTML = '<div class="no-messages">📭 Henüz mesaj yok</div>';
    return;
  }

  // Store scroll position to check if user is at top
  const isAtTop = messagesContainer.scrollTop === 0;

  messagesContainer.innerHTML = messages.map(post => createMessageHTML(post)).join('');

  // Auto scroll to top for new messages if user was already at top
  if (autoScroll && isAtTop) {
    messagesContainer.scrollTop = 0;
  }
}

// Add single new message without re-rendering all messages
function addNewMessage(post) {
  const messagesContainer = document.getElementById('messages');
  if (!messagesContainer) return;

  // Remove "no messages" placeholder if it exists
  const noMessages = messagesContainer.querySelector('.no-messages');
  if (noMessages) {
    noMessages.remove();
  }

  // Create new message element
  const messageEl = document.createElement('div');
  messageEl.innerHTML = createMessageHTML(post);
  
  // Insert at the beginning (newest first)
  messagesContainer.insertBefore(messageEl.firstElementChild, messagesContainer.firstChild);
  
  // Auto scroll to top to show new message
  messagesContainer.scrollTo({ top: 0, behavior: 'smooth' });
}

// Create HTML for a single message
function createMessageHTML(post) {
  const avatarUrl = post.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.nick || 'A')}&background=667eea&color=fff&bold=true`;
  
  return `
    <div class="message">
      <img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(post.nick || 'Anonim')}" class="message-avatar" 
           onerror="this.src='https://ui-avatars.com/api/?name=?&background=764ba2&color=fff'">
      <div class="message-content">
        <div class="message-header">
          <span class="message-author">${escapeHtml(post.nick || 'Anonim')}</span>
          <span class="message-time">${formatDate(post.created_at)}</span>
        </div>
        <div class="message-text">${parseMarkdown(post.text || '')}</div>
      </div>
    </div>
  `;
}

// Update connection status
function updateStatus(text, color) {
  const statusEl = document.getElementById('status');
  const reconnectBtn = document.getElementById('reconnect-btn');
  
  if (statusEl) {
    const statusColors = {
      green: '#4ade80',
      orange: '#fb923c', 
      red: '#f87171'
    };
    
    const dotColor = statusColors[color] || color;
    statusEl.innerHTML = `
      <span class="status-dot" style="background: ${dotColor};"></span>
      <span>${text.replace(/🟢|🟡|🔴|⚪/, '').trim()}</span>
    `;
  }
  
  // Show reconnect button on error or max retries
  if (reconnectBtn) {
    if (color === 'red' || reconnectAttempts >= maxReconnectAttempts) {
      reconnectBtn.style.display = 'block';
    } else if (color === 'green') {
      reconnectBtn.style.display = 'none';
    }
  }
}

// Format timestamp to readable date
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Az önce';
  }
  // Less than 1 hour
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000);
    return `${mins} dakika önce`;
  }
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} saat önce`;
  }
  // Show date
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Simple markdown parser for bold text
function parseMarkdown(text) {
  if (!text) return '';
  
  // Escape HTML first
  let escaped = escapeHtml(text);
  
  // Convert **text** to <strong>text</strong>
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert emojis to slightly larger size
  escaped = escaped.replace(/([\u{1F300}-\u{1F9FF}])/gu, '<span style="font-size: 1.2em;">$1</span>');
  
  return escaped;
}