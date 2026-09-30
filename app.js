const months=["Sarapin","Daedalan","Aeguary","Miraman","Scarlatan","Ero","Valnuary","Lupar","Phaestian","Chronos","Glacian","Mayan"];
let year=1015;

const festivalPeriods=[
 {start:[1018,"Scarlatan",8],end:[1018,"Ero",7],host:"Open Month"},
 {start:[1018,"Ero",7],end:[1018,"Valnuary",6],host:"Open Month"},
 {start:[1018,"Valnuary",6],end:[1018,"Lupar",5],host:"Open Month"},
 {start:[1018,"Lupar",5],end:[1018,"Phaestian",4],host:"Open Month"},
 {start:[1018,"Phaestian",4],end:[1018,"Chronos",3],host:"Cyrene"},
 {start:[1018,"Chronos",3],end:[1018,"Glacian",2],host:"Eleusis",items:["Opening Speech","Past: Stories around the Campfire","Present: Treasure Hunt","Future: Forestal Fortunes"]},
 {start:[1018,"Glacian",2],end:[1018,"Mayan",1],host:"Open Month"},
 {start:[1018,"Mayan",1],end:[1018,"Mayan",25],host:"Saravoia",items:["Opening Feast - Celebrating Prosperity","Artisan Exhibition - Celebrating Artistry and Culture","Vision of Founding - Celebrating Saravoia's Creation & Growth","A Debate or Salon - Celebrating Scholarship","Vision of Vikloket - Celebrating the Future","Ball of the Black Sun - Celebrating Saravoia"]},
 {start:[1018,"Mayan",25],end:[1019,"Sarapin",24],host:"Ashtan",items:["Opening Presentation","Oblivious Riddles","Orphan Hunt","Culinary Chaos","Total Destruction of Creation","Tag"]},
 {start:[1019,"Sarapin",24],end:[1019,"Daedalan",23],host:"Mhaldor",items:["The Iniquitous Gala","Event B","Event C","Closing Ceremony and Awards"]},
 {start:[1019,"Daedalan",23],end:[1019,"Aeguary",22],host:"Open Month"},
 {start:[1019,"Aeguary",22],end:[1019,"Miraman",21],host:"Targossas"},
 {start:[1019,"Miraman",21],end:[1019,"Scarlatan",20],host:"Hashan — Triadic Festival reimagining",items:["Opening Ceremony","Invocation of the Spirits","Post-Invocation","Lectures, exhibitions","Tasur'ke ball, outfit judging","Darkbrew drinking contest","Hashani scavenger hunt"]},
 {start:[1019,"Scarlatan",20],end:[1019,"Ero",19],host:"Open Month",items:["Asterian Restoration — Seleucarian/Knights ball (date TBD)","Asterian Restoration — Closing Ceremony (date TBD)"]}
];
const festivalEvents=[
 [1018,"Scarlatan",8,"Asterian Restoration","Opening Ceremony & Estate tour"],
 [1018,"Ero",5,"Lady Gaia's Order","Title TBD"],
 [1018,"Ero",7,"Lord Prospero's Order","The Festival of Investment: An impossible commission"],
 [1018,"Ero",10,"Devotees of the Fountain (clan)","Vigil for Lady Indrani"],
 [1018,"Valnuary",9,"L. Valnurana's Order","Festival of Masks"],
 [1018,"Lupar",4,"Lord Haskor's Order","A Feast Worthy of the Self-Made"],
 [1018,"Lupar",7,"Lord Vastar's Order","Stormcalling Ritual"],
 [1018,"Phaestian",3,"Lord Phaestus' Order","A Celebration of Crafting"],
 [1018,"Glacian",2,"Lady Aurora's Order","The Luminous Good"],
 [1018,"Glacian",20,"Knights Guild","Joust"],
 [1018,"Glacian",24,"Lord Neraeos' Order","Rite of Landfall"],
 [1019,"Daedalan",23,"Lord Sartan's Order","The Expectations of Malevolence"]
].map(([year,month,day,host,title])=>({year,month,day,host,title}));
function serial(y,m,d){return y*300+months.indexOf(m)*25+(d-1)}
function periodFor(y,m,d){const n=serial(y,m,d);return festivalPeriods.find(p=>n>=serial(...p.start)&&n<=serial(...p.end))}
function selectCalendarDay(y,m,d){if(year!==y){year=y;render()}requestAnimationFrame(()=>{const cell=document.querySelector(`.day[data-date="${y}-${m}-${d}"]`);if(cell){document.querySelectorAll(".day.selected-day").forEach(x=>x.classList.remove("selected-day"));cell.classList.add("selected-day");cell.scrollIntoView({behavior:"smooth",block:"center"})}detailsFor(y,m,d)})}
function detailsFor(y,m,d){
 const event=festivalEvents.find(e=>e.year===y&&e.month===m&&e.day===d),period=periodFor(y,m,d),box=document.getElementById("calendarDetails");
 let body='<span class="kicker">Asterian Festival</span><h3>'+m+' '+d+', '+y+' AF</h3>';
 if(event) body+='<p class="detail-date">'+event.host+'</p><p><strong>'+event.title+'</strong></p>';
 if(period){body+='<p>Festival period: <strong>'+period.host+'</strong></p>';if(period.items)body+='<ul>'+period.items.map(x=>'<li>'+x+'</li>').join('')+'</ul>'}
 box.innerHTML=body;
}

const grid=document.getElementById("calendarGrid"),label=document.getElementById("yearLabel"),today=document.getElementById("todayYear");
function render(){label.textContent=year+" AF";today.textContent=year;grid.innerHTML="";months.forEach(name=>{const m=document.createElement("article");m.className="month";const h=document.createElement("h3");h.textContent=name;m.appendChild(h);const d=document.createElement("div");d.className="days";for(let i=1;i<=25;i++){const cell=document.createElement("span");cell.className="day";cell.textContent=i;cell.title=name+" "+i+", "+year+" AF";cell.dataset.date=year+"-"+name+"-"+i;const ev=festivalEvents.find(e=>e.year===year&&e.month===name&&e.day===i),period=periodFor(year,name,i);if(period)cell.classList.add("host-day");if(ev){cell.classList.add("event-day");cell.title=ev.host+": "+ev.title;cell.tabIndex=0;cell.onclick=()=>selectCalendarDay(year,name,i);cell.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectCalendarDay(year,name,i)}}}d.appendChild(cell)}m.appendChild(d);grid.appendChild(m)})}
function renderEventIndex(){const el=document.getElementById("eventIndex");if(!el)return;el.innerHTML=festivalEvents.slice().sort((a,b)=>serial(a.year,a.month,a.day)-serial(b.year,b.month,b.day)).map(e=>'<button type="button" data-y="'+e.year+'" data-m="'+e.month+'" data-d="'+e.day+'"><strong>'+e.title+'</strong><small>'+e.host+' · '+e.month+' '+e.day+', '+e.year+' AF</small></button>').join("");el.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>selectCalendarDay(Number(b.dataset.y),b.dataset.m,Number(b.dataset.d))))}
renderEventIndex();
document.getElementById("prevYear").onclick=()=>{year--;render()};document.getElementById("nextYear").onclick=()=>{year++;render()};today.onclick=()=>{year=1015;render()};render();

const zoneSelect=document.getElementById("timezoneSelect");
const gmtClock=document.getElementById("gmtClock");
const localClock=document.getElementById("localClock");
const localZoneLabel=document.getElementById("localZoneLabel");
function clockIn(zone){
  return new Intl.DateTimeFormat("en-US",{timeZone:zone,hour:"numeric",minute:"2-digit",second:"2-digit",hour12:true,timeZoneName:"short"}).format(new Date());
}
function updateClocks(){
  gmtClock.textContent=clockIn("UTC");
  localClock.textContent=clockIn(zoneSelect.value);
  localZoneLabel.textContent=zoneSelect.options[zoneSelect.selectedIndex].text;
}
zoneSelect.addEventListener("change",updateClocks);
updateClocks();
setInterval(updateClocks,1000);
