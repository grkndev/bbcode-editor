export function parseBBCode(input: string): string {
    let s = input;
  
    // Temel formatlar
    s = s.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<b>$1</b>');
    s = s.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<i>$1</i>');
    s = s.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>');
    s = s.replace(/\[s\]([\s\S]*?)\[\/s\]/gi, '<s>$1</s>');
  
    // Renkler & boyut
    s = s.replace(/\[color=([^\]]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>');
    s = s.replace(/\[bgcolor=([^\]]+)\]([\s\S]*?)\[\/bgcolor\]/gi, '<span style="background:$1">$2</span>');
    s = s.replace(/\[size=(\d+)\]([\s\S]*?)\[\/size\]/gi, '<span style="font-size:$1px">$2</span>');
    s = s.replace(/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, '<span style="font-family:$1">$2</span>');
  
    // Linkler
    s = s.replace(/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noopener">$2</a>');
    s = s.replace(/\[url\]([\s\S]*?)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  
    // Resim
    s = s.replace(/\[img(?:=(\d+)(?:x(\d+))?)?\]([\s\S]*?)\[\/img\]/gi, (m, w, h, src) => {
      let style = '';
      if (w) style += `width:${w}px;`;
      if (h) style += `height:${h}px;`;
      return `<img src="${src.trim()}"${style ? ` style="${style}"` : ''}>`;
    });
  
    // YouTube
    s = s.replace(/\[youtube\]([\s\S]*?)\[\/youtube\]/gi, (m, id) => {
      const vid = id.trim().replace(/.*(?:v=|youtu\.be\/)/, '').split(/[&?]/)[0];
      return `<div class="yt-wrap"><iframe src="https://www.youtube.com/embed/${vid}" frameborder="0" allowfullscreen></iframe></div>`;
    });
  
    // Kod & alıntı
    s = s.replace(/\[code(?:=([^\]]+))?\]([\s\S]*?)\[\/code\]/gi, (m, lang, code) => {
      return `<pre>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
    });
    s = s.replace(/\[quote(?:=([^\]]+))?\]([\s\S]*?)\[\/quote\]/gi, (m, author, text) => {
      const attr = author ? `<span class="quote-author">${author} yazdı:</span>` : '';
      return `<blockquote>${attr}${text}</blockquote>`;
    });
  
    // Listeler
    s = s.replace(/\[list=1\]([\s\S]*?)\[\/list\]/gi, (m, items) => {
      const lis = items.replace(/\[\*\](.*?)(?=\[\*\]|\[\/list\]|$)/gis, '<li>$1</li>');
      return `<ol>${lis}</ol>`;
    });
    s = s.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (m, items) => {
      const lis = items.replace(/\[\*\](.*?)(?=\[\*\]|\[\/list\]|$)/gis, '<li>$1</li>');
      return `<ul>${lis}</ul>`;
    });
  
    // Tablo
    s = s.replace(/\[table\]([\s\S]*?)\[\/table\]/gi, (m, body) => `<table>${body}</table>`);
    s = s.replace(/\[tr\]([\s\S]*?)\[\/tr\]/gi, (m, body) => `<tr>${body}</tr>`);
    s = s.replace(/\[th\]([\s\S]*?)\[\/th\]/gi, (m, body) => `<th>${body}</th>`);
    s = s.replace(/\[td\]([\s\S]*?)\[\/td\]/gi, (m, body) => `<td>${body}</td>`);
  
    // Hizalama
    s = s.replace(/\[center\]([\s\S]*?)\[\/center\]/gi, '<div style="text-align:center">$1</div>');
    s = s.replace(/\[right\]([\s\S]*?)\[\/right\]/gi, '<div style="text-align:right">$1</div>');
    s = s.replace(/\[left\]([\s\S]*?)\[\/left\]/gi, '<div style="text-align:left">$1</div>');
    s = s.replace(/\[justify\]([\s\S]*?)\[\/justify\]/gi, '<div style="text-align:justify">$1</div>');
    // Newline → <br>
    s = s.replace(/\n/g, '<br>');
  
    return s;
  }