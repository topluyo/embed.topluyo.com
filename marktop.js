(function(){
  let style = document.createElement("style");
  style.innerHTML = `
  .marktop-flex-x{
    display:flex;
    flex-direction:row;
    gap:.5em;
  }
  .marktop-flex-y{
    display:flex;
    flex-direction:column;
    gap:.5em;
  }
  .marktop-flex-cx{
    display:flex;
    flex-direction:row;
    gap:.5em;
    align-items:center;
  }
  .marktop-flex-center{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap:.5em;
  }
  .marktop-space{
    flex:1;
  }
  .marktop-bumote{
    background:#8882;
    padding:.25em .5em;
    cursor:pointer;
    user-select:none;
    transition:all .2s;
    border-radius:.25em;
  }
  .marktop-bumote:hover{
    background:#8884;
  }
  .marktop-bumote:active{
    transform:scale(.9);
  }
  .marktop-input{
    outline: 1px solid #8884;
    padding: .25em .5em;
    outline-offset: -1px;
    border-radius: .25em;
  }
  .marktop-input[contenteditable]:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    opacity:.6;
  }
  .marktop-box{
    padding:.5em;
    border:1px solid #8882;
    border-radius:.25em;
  }

  .marktop-muted{
    opacity:.8;
    font-size:.8em;
  }
  .marktop-icon,.marktop-logo{
    width: 2em;
    height: 2em;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  
  
  .marktop-size-1{width: 1em;height: 1em;}
  .marktop-size-2{width: 2em;height: 2em;}
  .marktop-size-3{width: 3em;height: 3em;}
  .marktop-size-4{width: 4em;height: 4em;}
  .marktop-size-5{width: 5em;height: 5em;}
  .marktop-size-6{width: 6em;height: 6em;}
  .marktop-size-7{width: 7em;height: 7em;}
  .marktop-size-8{width: 8em;height: 8em;}
  
  
  .marktop-grid{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: .5em;
  }

  .marktop-progress{
    padding:.25em;
    position:relative;
    overflow:hidden;
  }

  .marktop-progress::before{
    content:"";
    position:absolute;
    z-index:0;
    left:0;
    top:0;
    height:100%;
    width:var(--progress-percent);
    background:var(--progress-background,var(--primary));
    border-radius:.5em;
  }
  .marktop-progress > * {
    position: relative;
  }


  .marktop-frame{
    border-radius:.5em;
  }

  
  
  .marktop-frame.marktop-size-1,.marktop-window.marktop-size-1{width: 100%;height: 2em;}
  .marktop-frame.marktop-size-2,.marktop-window.marktop-size-2{width: 100%;height: 4em;}
  .marktop-frame.marktop-size-3,.marktop-window.marktop-size-3{width: 100%;height: 6em;}
  .marktop-frame.marktop-size-4,.marktop-window.marktop-size-4{width: 100%;height: 8em;}
  .marktop-frame.marktop-size-5,.marktop-window.marktop-size-5{width: 100%;height: 10em;}
  .marktop-frame.marktop-size-6,.marktop-window.marktop-size-6{width: 100%;height: 12em;}
  .marktop-frame.marktop-size-7,.marktop-window.marktop-size-7{width: 100%;height: 14em;}
  .marktop-frame.marktop-size-8,.marktop-window.marktop-size-8{width: 100%;height: 16em;}
  

  .marktop-youtube,.marktop-kick,.marktop-image,.marktop-video{
    border: none;
    border-radius: .5em;
    height: 12em;
    width: 21em;
    max-width: 100%;
    object-fit:cover;
  }
  .marktop-video{
    object-fit:contain;
  }
  

  .marktop-window{
    display:flex;
    flex-direction:column;
    width:100%;
  }
  .marktop-window-bar{
    height:2em;
    background:#8882;
    border-radius: .5em .4em 0 0;
    display: flex;
    align-items: center;
    overflow:hidden;
  }
  .marktop-window-bar-title{
    padding:0 .5em;
    flex:1;
  }
  .marktop-window-bar-close,.marktop-window-bar-fullscreen{
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #8882;
    cursor: pointer;
    font-size:1.2em;
    transition:all .2s;
  }
  .marktop-window-bar-close:hover,.marktop-window-bar-fullscreen:hover{
    background:#8884;
  }
  .marktop-window-bar-close:active,.marktop-window-bar-fullscreen:active{
    transform:scale(.9);
  }
  .marktop-window-bar-close::after{
    content:"⏻";
  }
  .marktop-window-bar-fullscreen::after{
    content:"⛶";
  }
  .marktop-window-iframe {
    height: calc(100% - 2em);
    border-radius: 0 0 .5em .5em;
    width:100%;
  }

  .marktop-window.marktop-window-fullscreen{
    position: fixed;
    left: 0;
    top: 3em;
    z-index: 100080;
    background: #0D0;
    color: white;
    height: calc(100% - 6em);
  }



  li[marktop-list="-"], li[marktop-list="+"], li[marktop-list="*"]{
    list-style:none;
    position:relative;
  }

  li[marktop-list="-"]:before, li[marktop-list="+"]:before, li[marktop-list="*"]:before{
    content: "";
    font-size:1em;
    display: inline-block;
    width: 1em;
    height: 1em;
    border: .1em solid;
    line-height: 0;
    vertical-align: top;
    transform: translate(0, 0.25em);
    margin-right:0.5em;
    border-radius:.2em;
  }
  li[marktop-list="+"]:before{
    color: var(--primary);
    background: var(--primary);
  }
  li[marktop-list="+"]:after{
    content: "";
    color: var(--primary-text);
    border-right: .15em solid;
    border-bottom: .15em solid;
    display: inline-block;
    width: 0.3em;
    height: 0.8em;
    position: absolute;
    left: 0.38em;
    top: 0.3em;
    transform: rotate(45deg);
  }

  li[marktop-list="*"]:before{
    border-radius: 100%;
    padding: 0;
    width : 0.25em;
    height: 0.25em;
    margin: 0.38em;
    margin-right:0.86em;
    background: var(--front);
  }


  .marktop-link{
    text-decoration:underline;
  }





  .marktop-alert,
  .marktop-success,
  .marktop-info{
    font-family: monospace;
    border-radius: .25em;
    padding: .25em;
    border: 1px solid currentColor;
  }

  /* ALERT */
  .marktop-alert{
    color: #b00020;
    background: color-mix(in srgb, currentColor 15%, transparent);
  }

  /* SUCCESS */
  .marktop-success{
    color: #0a7a0a;
    background: color-mix(in srgb, currentColor 15%, transparent);
  }

  /* INFO */
  .marktop-info{
    color: #0056b3;
    background: color-mix(in srgb, currentColor 15%, transparent);
  }

  /* Dark mode düzeltmesi */
  @media (prefers-color-scheme: dark) {
    .marktop-alert{
      color: #ff6b6b;
    }
    .marktop-success{
      color: #4cd964;
    }
    .marktop-info{
      color: #4da3ff;
    }
  }





  .marktop-code-multiline{
    background: #8882;
    border-left: .4em solid var(--primary);
    padding: .5em;
    border-radius: .5em;
    font-size:.85em;
    user-select:text;
    cursor:text;
    overflow-x: scroll;
  }
  
  .marktop-code-singleline{
    background:#8882;
    padding: .15em .25em;
    border-radius: .5em;
  }

  .marktop-mention {
    text-decoration: underline;
    padding: .1em .25em;
    border-radius: .25em;
  }

  .marktop-mention:hover{
    background:#8881;
  }

  .marktop-button{
    background: #8882;
    padding: .25em .5em;
    cursor: pointer;
    user-select: none;
    transition: all .2s;
    border-radius: .25em;
  }

  .marktop-button:hover{
    background:#8884;
  }
  .marktop-button:active{
    background:#8886;
  }

  .markdown-strong{
    color:var(--primary);
  }

  /* BR OPTIMIZATION */
  h1+br,h2+br,h3+br,h4+br,h5+br,h6+br,pre+br,code+br,li+br{
    display:none;
  }

  ` 
  document.head.append(style)
})();

const MARKTOP = function(code){

  let parts = MARKTOP.PARSE(code)

  for(let i in parts){
    let part = parts[i]
    if (part.type == "JTML") {
      try {
        const parsed = JSON.parse("{" + part.text + "}");
        parts[i] = MARKTOP.JTML(parsed);
      } catch (err) {
        console.error("JTML Parse Error:", err);
        const errorBox = document.createElement("div");
        errorBox.className = "marktop-box";
        errorBox.style.background = "#ff000022";
        errorBox.style.border = "1px solid #ff000055";
        errorBox.style.color = "#900";
        errorBox.style.fontFamily = "monospace";
        errorBox.textContent = "JTML Parse Error: " + err.message;
        parts[i] = errorBox;
      }
    }
    if(part.type=="CODE"){
      parts[i] = MARKTOP.CODE( part.text )
    }
    if(part.type=="MARK"){
      parts[i] = MARKTOP.MARK( MARKTOP.escapeHtml(part.text) )
    }
  }

  
  let joined = parts.map(e=>{
    if(e instanceof Element){
      return e.outerHTML
    }else{
      return e
    }
  })
  return joined.join("")
}

MARKTOP.DEFAULT_IFRAME_SANDBOX = "allow-scripts allow-same-origin allow-presentation allow-popups";

MARKTOP.escapeHtml = function(code) {
  return code
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#39;")
    //.split("`").join("&#96;");
}

MARKTOP.unescapeHtml = function(code) {
  if(!code) code = ""
  const map = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&#96;": "`"
  };
  return code.replace(/&(lt|gt|amp|quot|#39|#96);/g, m => map[m]);
}

MARKTOP.PARSE = function(input) {
  const result = [];
  let i = 0;
  const len = input.length;

  while (i < len) {

    // =========================
    // CUSTOM BLOCK (NESTED SAFE)
    // =========================
    if (input.startsWith("~{", i)) {
      i += 2;

      let braceCount = 1;
      let start = i;

      while (i < len && braceCount > 0) {
        if (input[i] === "{") braceCount++;
        else if (input[i] === "}") braceCount--;
        i++;
      }

      let content = input.slice(start, i - 1);
      result.push({ type: "JTML", text: content });
      continue;
    }

    // =========================
    // CODE BLOCK
    // =========================
    if (input.startsWith("```", i)) {
      i += 3;
      let end = input.indexOf("```", i);

      if (end === -1) {
        result.push({
          type: "MARK",
          text: input.slice(i - 3)
        });
        break;
      }
      
      let content = input.slice(i, end);
      result.push({ type: "CODE", text: content });
      i = end + 3;
      continue;
    }

    // =========================
    // TEXT (WHITESPACE PRESERVED)
    // =========================
    let nextSpecial = MARKTOP.findNextSpecial(input, i);

    // Güvenlik: özel blok yoksa sonuna kadar al
    if (nextSpecial === -1) nextSpecial = len;

    // Eğer özel blok burada başlıyorsa ilerle
    if (nextSpecial === i) {
      i++;
      continue;
    }

    let content = input.slice(i, nextSpecial);

    result.push({ type: "MARK", text: content });

    i = nextSpecial;
  }

  return result;
};


MARKTOP.findNextSpecial = function(str, start) {
  const customIndex = str.indexOf("~{", start);
  const codeIndex = str.indexOf("```", start);

  const indexes = [customIndex, codeIndex].filter(i => i !== -1);
  if (indexes.length === 0) return -1;

  return Math.min(...indexes);
};

MARKTOP.fixurl = function(input) {
  if (typeof input !== "string") return null;

  input = input.trim();

  // Control characters engelle (CRLF vs)
  if (/[\u0000-\u001F\u007F]/.test(input)) return null;

  try {
    const url = new URL(input, window.location.origin);

    // Sadece http / https
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    // Username / password yasak
    if (url.username || url.password) {
      return null;
    }

    // Host zorunlu
    if (!url.hostname) {
      return null;
    }

    // javascript: encoded bypass kontrolü
    const decoded = decodeURIComponent(input).toLowerCase();
    if (
      decoded.includes("javascript:") ||
      decoded.includes("data:") ||
      decoded.includes("vbscript:")
    ) {
      return null;
    }

    return url.href; // normalized & safe
  } catch {
    return null;
  }
}






MARKTOP.JTML = function (node) {

  
  if (!node || typeof node !== "object") return document.createTextNode("");


  let element = document.createElement("div");

  if(node.type=="frame"){
    element = document.createElement("iframe")  
    element.src = MARKTOP.fixurl(node.src)
    element.setAttribute("sandbox", MARKTOP.DEFAULT_IFRAME_SANDBOX)
    element.setAttribute("referrerpolicy","no-referrer")
    element.setAttribute("loading","lazy")
  }

  if(node.type=="window"){
    let bar     = document.createElement("div")
    bar.classList.add("marktop-window-bar")
    let title   = document.createElement("div")
    title.classList.add("marktop-window-bar-title")
    title.textContent = node.title || ""

    let close   = document.createElement("div")
    close.classList.add("marktop-window-bar-close")
    
    let fullscreen   = document.createElement("div")
    fullscreen.classList.add("marktop-window-bar-fullscreen")
    fullscreen.setAttribute("onclick","this.parentElement.parentElement.classList.toggle('marktop-window-fullscreen')")

    bar.append(title,close,fullscreen)
    element.appendChild(bar)

    let inframe = document.createElement("iframe")  
    inframe.classList.add("marktop-window-iframe")
    inframe.src = MARKTOP.fixurl(node.src.split("&amp;").join("&"))
    inframe.setAttribute("sandbox", MARKTOP.DEFAULT_IFRAME_SANDBOX)
    inframe.setAttribute("referrerpolicy","no-referrer")
    inframe.setAttribute("loading","lazy")
    element.appendChild(inframe)
  }


  if(node.type=="input"){
    element.setAttribute("contenteditable","true")
    element.setAttribute("spellcheck","false")
  }
  

  if(node.type=="icon" || node.type=="logo"){
    element = document.createElement("img")
    element.src = MARKTOP.fixurl(node.src)
  }

  element.className = "marktop-"+node.type;

  if(node.ui){
    node.ui.split(",").map(e=>element.classList.add("marktop-"+e))
  }

  if(node.text){
    element.textContent = node.text
  }

  if(node.color){
    element.style.color = node.color
  }

  if(node.background){
    element.style.background = node.background
  }

  if(node.gap){
    let gap = parseFloat(node.gap)
    gap = Math.max(gap,0)
    gap = Math.min(1,gap)
    element.style.gap = gap + "em"
  }

  if(node.size){
    let size = parseFloat(node.size)
    size = Math.max(size,.5)
    size = Math.min(2,size)
    element.style.fontSize = size + "em"
  }
  

  if(node.progress){
    element.classList.add("marktop-progress")
    let val = node.progress.split(";")
    let percent = val[0]
    let background   = val.length>1 ? val[1] : ""
    
    element.style.setProperty("--progress-percent",percent)
    if(background){
      element.style.setProperty("--progress-background",background)
    }
  }

  for( let type of ["name","value","placeholder"]){
    if(node[type]){
      element.setAttribute(type,node[type])
    }
  }

  (node.children || []).forEach((child) => {
    element.appendChild(MARKTOP.JTML(child));
  });

  return element
}


MARKTOP.CODE = function (text){
  let language = text.split("\n")[0].trim()
  if(language=="js") language="javascript";
  let className="language-"+language
  
  let code = text.split("\n").slice(1).join("\n")
  //code = code.split("<").join("&lt;").split(">").join("&gt;")
  
  let preElement = document.createElement("pre")
  preElement.classList.add("marktop-code-multiline")
  let codeElement = document.createElement("code")
  codeElement.classList.add(className)
  codeElement.textContent = code
  preElement.append(codeElement)
  return preElement
}



MARKTOP.RULES = {
  "butonify":{
    pattern: /\[([^\]]+)\]\(([^)]+)\)/g,
    replacement: function(matched, text, url) {
      let el = document.createElement("a")
      let fixedUrl = MARKTOP.fixurl(url)
      el.href = fixedUrl
      el.classList.add("marktop-button")
      el.textContent = text

      try {
        let linkHost = new URL(fixedUrl, location.origin).hostname
        if (linkHost !== location.hostname) {
          el.target = "_blank"
          el.rel = "noopener noreferrer"
        }
      } catch (e) {}

      return el.outerHTML
    }
  },
  // 2️⃣ Curly link {text}(url)
  "underline":{
    pattern: /\{([^\}]+)\}\(([^)]+)\)/g,
    replacement: function(matched, text, url) {
      let el = document.createElement("a")
      let fixedUrl = MARKTOP.fixurl(url)
      el.href = fixedUrl
      el.textContent = text
      el.classList.add("marktop-link")

      try {
        let linkHost = new URL(fixedUrl, location.origin).hostname
        if (linkHost !== location.hostname) {
          el.target = "_blank"
          el.rel = "noopener noreferrer"
        }
      } catch (e) {}

      return el.outerHTML
    }
  },
  // 3️⃣ Direkt URL (http / https)
  "urlify":{
    // Satır başı, boşluk veya metin içindeki URL’leri yakalar
    pattern: /(^|\s)(https?:\/\/[^\s]+)/gm,
    replacement: function(matched, before, url) {
      url = MARKTOP.fixurl(url)

      let type = null
      let element = "a"
      let attribute = "href"
      let match = null

      // YouTube (watch, shorts, youtu.be)
      if ((match = url.match(/https:\/\/(?:www\.youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/))) {
        type = "youtube"
        element = "iframe"
        attribute = "src"
        url = `https://www.youtube.com/embed/${match[1]}`
      } 

      if ((match = url.match(/https:\/\/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/))) {
        type = "youtube"
        element = "iframe"
        attribute = "src"
        url = `https://www.youtube.com/embed/${match[1]}`
      } 
      // Kick
      else if ((match = url.match(/https:\/\/player\.kick\.com\/([a-zA-Z0-9_-]+)/))) {
        type = "kick"
        element = "iframe"
        attribute = "src"
        url = `https://player.kick.com/${match[1]}`
      } 
      // Görseller
      else if (url.match(/\.(gif|jpg|jpeg|png|webp)$/i)) {
        type = "image"
        element = "img"
        attribute = "src"
      } 
      // Videolar
      else if (url.match(/\.(mp4|webm)$/i)) {
        type = "video"
        element = "video"
        attribute = "src"
      }

      let el = document.createElement(element)
      el[attribute] = url

      if(type) el.classList.add("marktop-" + type)
      if(attribute === "href"){
        el.classList.add("marktop-link")
        el.textContent = url  
        try {
          let linkHost = new URL(url, location.origin).hostname
          if (linkHost !== location.hostname) {
            el.target = "_blank"
            el.rel = "noopener noreferrer"
          }
        } catch (e) {}
      }
      if(type === "video") el.controls = true
      if(type=="youtube"){
        el.setAttribute("allow","autoplay; encrypted-media")
        el.setAttribute("allowfullscreen","allowfullscreen")
        el.src = el.src + "?enablejsapi=1"
      }

      return before + el.outerHTML
    }
  },
    // 1️⃣ Başlık # … → <h1>
  "h1":{
    pattern: /^# (.+)$/gm,
    replacement: (_, text) => `<h1>${text}</h1>`
  },
  // 2️⃣ Alt Başlık ## … → <h2>
  "h2":{
    pattern: /^## (.+)$/gm,
    replacement: (_, text) => `<h2>${text}</h2>`
  },
  // 3️⃣ Üçüncü Başlık ### … → <h3>
  "h3":{
    pattern: /^### (.+)$/gm,
    replacement: (_, text) => `<h3>${text}</h3>`
  },
  // 4️⃣ Dördüncü Başlık #### … → <h4>
  "h4":{
    pattern: /^#### (.+)$/gm,
    replacement: (_, text) => `<h4>${text}</h4>`
  },
  // 5️⃣ Beşinci Başlık ##### … → <h5>
  "h5":{
    pattern: /^##### (.+)$/gm,
    replacement: (_, text) => `<h5>${text}</h5>`
  },
  // 6️⃣ Altıncı Başlık ###### … → <h6>
  "h6":{
    pattern: /^###### (.+)$/gm,
    replacement: (_, text) => `<h6>${text}</h6>`
  },
  // 1️⃣ Kalın: **text** veya __text__
  "1)**": {
    pattern: /(^|\s)\*\*(.+?)\*\*(?=\s|$)/g,
    replacement: (_, prefix, text) => `${prefix}<strong class="markdown-strong">${text}</strong>`
  },
  "1)__": {
    pattern: /(^|\s)__(.+?)__(?=\s|$)/g,
    replacement: (_, prefix, text) => `${prefix}<strong>${text}</strong>`
  },

  // 2️⃣ İtalik: *text* veya _text_
  "2)*": {
    pattern: /(^|\s)\*(.+?)\*(?=\s|$)/g,
    replacement: (_, prefix, text) => `${prefix}<em>${text}</em>`
  },
  "2)_": {
    pattern: /(^|\s)_(.+?)_(?=\s|$)/g,
    replacement: (_, prefix, text) => `${prefix}<em>${text}</em>`
  },
  "---":{
    pattern: /^-{3,}$/gm,
    replacement: () => `<hr>`
  },
  "1_``":{
    pattern: /``([^`]+)``|`([^`]+)`/g,
    replacement: (_, doubleCode, singleCode) => {
      const code = doubleCode ?? singleCode; // çift yoksa tek
      return `<code class="marktop-code-singleline">${code}</code>`;
    }
  },
  "2_`":{
    pattern: /`([^`]+)`/g,
    replacement: (_, code) => `<code class="marktop-code-singleline">${code}</code>`
  },
  "list+":{
    pattern: /^\+ (.+)$/gm,
    replacement: (_, text) => `<li marktop-list="+">${text}</li>`
  },
  "list-":{
    pattern: /^- (.+)$/gm,
    replacement: (_, text) => `<li marktop-list="-">${text}</li>`
  },
  "list*":{
    pattern: /^\* (.+)$/gm,
    replacement: (_, text) => `<li marktop-list="*">${text}</li>`
  },

  // Satır başı veya boşluktan sonra @username yakalar
  "@":{
    pattern: /(^|\s)@([a-zA-Z0-9_\-]+)/gm,
    replacement: function(matched, before, username) {

      let element = "a"
      let attribute = "href"

      let url = `/@${username}`

      let el = document.createElement(element)
      el[attribute] = url
      el.textContent = "@" + username
      el.classList.add("marktop-mention")

      return before + el.outerHTML
    }
  },

  "~\n":{
    pattern: /\n/g,
    replacement:"<br>"
  }
}

MARKTOP.MARK = function(text) {
  for(let key of Object.keys(MARKTOP.RULES).sort()){
    let replace = MARKTOP.RULES[key]
    text = text.replace(replace.pattern, replace.replacement)
  }
  return text
}
