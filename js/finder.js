document.addEventListener("DOMContentLoaded",()=>{
 const state={budget:10000,duration:3,travellers:"Friends",mood:"Adventure",preferences:[]};
 function choices(id,key){document.querySelectorAll(`#${id} .choice`).forEach(b=>b.onclick=()=>{document.querySelectorAll(`#${id} .choice`).forEach(x=>x.classList.remove("active"));b.classList.add("active");state[key]=b.dataset.value})}
 choices("durationChoices","duration");choices("travellerChoices","travellers");
 document.querySelectorAll(".mood-choice").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mood-choice").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.mood=b.dataset.value});
 document.querySelectorAll(".tag").forEach(b=>b.onclick=()=>{b.classList.toggle("selected");state.preferences=[...document.querySelectorAll(".tag.selected")].map(x=>x.dataset.value)});
 document.getElementById("budget").oninput=e=>state.budget=+e.target.value;
 document.getElementById("findTrips").onclick=()=>{localStorage.setItem("veryaFinder",JSON.stringify(state));location.href="results.html"};
});
