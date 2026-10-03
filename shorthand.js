const search=document.getElementById('command-search');search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('.quick-topic').forEach(section=>{section.hidden=!section.textContent.toLowerCase().includes(q);if(!section.hidden)count++;});document.getElementById('no-results').hidden=count>0;});document.querySelectorAll('.copy-command').forEach(button=>button.addEventListener('click',async()=>{const text=button.parentElement.querySelector('code').textContent;try{await navigator.clipboard.writeText(text);document.getElementById('copy-status').textContent='Copied: '+text;}catch{document.getElementById('copy-status').textContent='Select and copy this command: '+text;}}));document.querySelectorAll('.topic-nav a').forEach(link=>link.addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'));}));
const adFields=['name','id','brief','price','style','hook','body','location','contact'];
const adForm=document.getElementById('ad-form');
const adStatus=document.getElementById('ad-status');
const oneLine=value=>value.replace(/[\r\n\t]+/g,' ').trim();
function wrapAdLine(text,width=62){const words=text.split(/\s+/);const lines=[];let line='';for(const word of words){if(line&&line.length+word.length+1>width){lines.push(line);line=word;}else{line+=(line?' ':'')+word;}}if(line)lines.push(line);return lines.join('\n');}
function makeAdDraft(data){
 const name=oneLine(data.name),brief=oneLine(data.brief),price=oneLine(data.price),id=/^\d+$/.test(data.id.trim())?data.id.trim():'<your ad number>';
 const content=[name,data.hook.trim(),data.body.trim(),data.location.trim()?'Find us: '+data.location.trim():'',data.contact.trim()].filter(Boolean).join('\n\n');
 let text=content.split('\n').map(line=>wrapAdLine(line)).join('\n');
 if(data.style==='banner')text='+'+'-'.repeat(64)+'+\n'+text+'\n+'+'-'.repeat(64)+'+';
 if(data.style==='stars')text='*  *  *  *  *  *  *  *  *  *  *  *\n\n'+text+'\n\n*  *  *  *  *  *  *  *  *  *  *  *';
 const commands=[];
 if(!/^\d+$/.test(data.id.trim()))commands.push('AD NEW '+(name||'<ad name>'));
 if(brief)commands.push('AD '+id+' BRIEF '+brief);
 if(price)commands.push('AD '+id+' PRICE '+price);
 commands.push('AD '+id+' DESCRIBE');
 return {text,commands:commands.join('\n'),brief:brief||'Your brief listing text',price:price?'Price: '+price:'Price wording not yet set'};
}
function readAd(){return Object.fromEntries(adFields.map(key=>[key,document.getElementById('ad-'+key).value]));}
function updateAd(){const draft=makeAdDraft(readAd());document.getElementById('ad-preview-brief').textContent=draft.brief;document.getElementById('ad-preview-price').textContent=draft.price;document.getElementById('ad-preview-text').textContent=draft.text||'Your description will appear here.';document.getElementById('ad-command-output').textContent=draft.commands;}
adForm.addEventListener('submit',event=>event.preventDefault());
adForm.addEventListener('input',updateAd);adForm.addEventListener('change',updateAd);
document.getElementById('use-hook').addEventListener('click',()=>{const selected=document.getElementById('ad-hook-choice').value;if(selected){document.getElementById('ad-hook').value=selected;updateAd();}});
document.getElementById('ad-save').addEventListener('click',()=>{try{localStorage.setItem('gmc-ad-draft-v1',JSON.stringify(readAd()));adStatus.textContent='Draft saved on this device.';}catch{adStatus.textContent='Saving is unavailable in this browser. Copy your draft to keep it.';}});
document.getElementById('ad-clear').addEventListener('click',()=>{adForm.reset();try{localStorage.removeItem('gmc-ad-draft-v1');}catch{}updateAd();adStatus.textContent='Fields cleared.';});
async function copyAd(kind){const draft=makeAdDraft(readAd());const text=kind==='text'?draft.text:draft.commands;if(!text){adStatus.textContent='Add some description text first.';return;}try{await navigator.clipboard.writeText(text);adStatus.textContent=kind==='text'?'Description copied. Paste it in the ad editor.':'Commands copied. Fill any placeholders before using them.';}catch{adStatus.textContent='Clipboard unavailable. Select and copy the preview or commands below.';}}
document.getElementById('ad-copy-text').addEventListener('click',()=>copyAd('text'));
document.getElementById('ad-copy-commands').addEventListener('click',()=>copyAd('commands'));
try{const saved=JSON.parse(localStorage.getItem('gmc-ad-draft-v1')||'null');if(saved){adFields.forEach(key=>{if(typeof saved[key]==='string')document.getElementById('ad-'+key).value=saved[key];});adStatus.textContent='Your saved draft has been restored.';}}catch{}
updateAd();
