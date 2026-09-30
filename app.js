const months=["Sarapin","Daedalan","Aeguary","Miraman","Scarlatan","Ero","Valnuary","Lupar","Phaestian","Chronos","Glacian","Mayan"];
let year=1015;
const grid=document.getElementById("calendarGrid"),label=document.getElementById("yearLabel"),today=document.getElementById("todayYear");
function render(){label.textContent=year+" AF";today.textContent=year;grid.innerHTML="";months.forEach(name=>{const m=document.createElement("article");m.className="month";const h=document.createElement("h3");h.textContent=name;m.appendChild(h);const d=document.createElement("div");d.className="days";for(let i=1;i<=25;i++){const cell=document.createElement("span");cell.className="day";cell.textContent=i;cell.title=name+" "+i+", "+year+" AF";d.appendChild(cell)}m.appendChild(d);grid.appendChild(m)})}
document.getElementById("prevYear").onclick=()=>{year--;render()};document.getElementById("nextYear").onclick=()=>{year++;render()};today.onclick=()=>{year=1015;render()};render();
