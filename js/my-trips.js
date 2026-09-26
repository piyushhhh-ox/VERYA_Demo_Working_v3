document.addEventListener("DOMContentLoaded",()=>{
 const grid=document.getElementById("tripsGrid");
 function read(){return JSON.parse(localStorage.getItem("veryaTrips")||"[]")}
 function progress(id){
   const s=JSON.parse(localStorage.getItem(`veryaPlan_${id}`)||'{"checked":[],"notes":"","visited":[]}');
   const visited=new Set(s.visited||[]); let p=20;
   if(visited.has("itinerary"))p+=25;if(visited.has("budget"))p+=10;p+=Math.round(((s.checked||[]).length/8)*25);if((s.notes||"").trim())p+=20;return Math.min(100,p)
 }
 function render(){
   const trips=read();
   grid.innerHTML=trips.length?trips.map(t=>{const p=progress(t.id);const days=t.tripDuration||parseInt(t.duration)||3;return `<article class="trip-card"><img src="${t.image}" alt="${t.name}"><div class="trip-card-body"><small class="mini-label">PLANNING</small><h2>${t.name} Escape</h2><p>${days} Days · ${t.travellers||"Friends"} · ₹${Number(t.budget||t.cost).toLocaleString("en-IN")} budget</p><div class="trip-progress"><span style="width:${p}%"></span></div><div class="trip-actions"><small>Planning ${p}% complete</small><a href="plan.html?id=${t.id}">Continue →</a></div><button class="remove-trip" data-id="${t.id}" title="Remove this trip">Remove trip</button></div></article>`}).join("")+`<article class="new-trip-card"><div><small class="mini-label">START AGAIN</small><h2>Plan another escape.</h2><p>Choose a new destination or let VERYА match one to your budget.</p><a class="button primary" href="finder.html">Find My Trip →</a></div></article>`:`<div class="planner-card empty-trips" style="grid-column:1/-1;text-align:center"><h2>Your next escape is waiting.</h2><p>Let VERYА find a destination that fits your budget and preferences.</p><a class="button primary" href="finder.html">Find My Trip →</a></div>`;
   grid.querySelectorAll(".remove-trip").forEach(b=>b.onclick=()=>{localStorage.removeItem(`veryaPlan_${b.dataset.id}`);const trips=read().filter(t=>t.id!==b.dataset.id);localStorage.setItem("veryaTrips",JSON.stringify(trips));if(JSON.parse(localStorage.getItem("veryaActiveTrip")||"null")?.id===b.dataset.id)localStorage.removeItem("veryaActiveTrip");render()});
 }
 render();
});
