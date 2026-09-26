document.addEventListener("DOMContentLoaded",()=>{
 const params=new URLSearchParams(location.search);
 const id=params.get("id")||JSON.parse(localStorage.getItem("veryaActiveTrip")||"null")?.id||"lonavala";
 const d=destinations.find(x=>x.id===id)||destinations[0];
 const content=document.getElementById("plannerContent");
 const intro=document.getElementById("planDestination");
 const tabs=[...document.querySelectorAll("#plannerTabs button")];
 const key=`veryaPlan_${d.id}`;
 let state=JSON.parse(localStorage.getItem(key)||'{"checked":[],"notes":"","visited":[]}');
 state.checked=Array.isArray(state.checked)?state.checked:[];
 state.visited=Array.isArray(state.visited)?state.visited:[];
 const money=n=>`₹${Math.round(n).toLocaleString("en-IN")}`;
 const finder=JSON.parse(localStorage.getItem("veryaFinder")||"null");
 const tripDuration=finder?.duration||parseInt(d.duration)||3;
 const travellers=finder?.travellers||"Friends";
 const budget=finder?.budget||d.cost;
 document.title=`Plan ${d.name} — VERYА`;
 intro.textContent=`${d.location} · ${tripDuration} days · ${travellers} · budget ${money(budget)}`;

 function getTrips(){return JSON.parse(localStorage.getItem("veryaTrips")||"[]")}
 function saveTrips(trips){localStorage.setItem("veryaTrips",JSON.stringify(trips))}
 function ensureTrip(){
   let trips=getTrips();
   let trip=trips.find(x=>x.id===d.id);
   if(!trip){trip={id:d.id,name:d.name,image:d.image,cost:d.cost,duration:d.duration,budget,tripDuration,travellers,mood:finder?.mood||"Explore",createdAt:Date.now()};trips.unshift(trip)}
   else {trip.budget=trip.budget||budget;trip.tripDuration=trip.tripDuration||tripDuration;trip.travellers=trip.travellers||travellers;trip.mood=trip.mood||finder?.mood||"Explore";trip.image=d.image;trip.name=d.name}
   saveTrips(trips);localStorage.setItem("veryaActiveTrip",JSON.stringify(trip));
 }
 ensureTrip();
 function progress(){
   const visited=new Set(state.visited);
   let value=20;
   if(visited.has("itinerary")) value+=25;
   if(visited.has("budget")) value+=10;
   if(state.checked.length>=8) value+=25; else value+=Math.round(state.checked.length/8*25);
   if(state.notes.trim()) value+=20;
   return Math.min(100,value);
 }
 function persist(){localStorage.setItem(key,JSON.stringify(state));}
 function markVisited(tab){if(!state.visited.includes(tab)){state.visited.push(tab);persist()}}
 function ring(){return `<div class="progress-ring"><strong>${progress()}%</strong></div>`}
 function render(tab="overview"){
   markVisited(tab);
   tabs.forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
   if(tab==="overview") content.innerHTML=`<div class="planner-overview planner-overview-enhanced">
     <div class="planner-card hero-planner-card"><div class="planner-destination-image"><img src="${d.image}" alt="${d.name}"></div><div class="planner-card-inner"><small>DESTINATION</small><h2>${d.name} escape</h2><p>${d.description}</p><div class="planner-stat-row"><span><b>${tripDuration} Days</b>Duration</span><span><b>${money(budget)}</b>Your budget</span><span><b>${money(d.cost)}</b>Est. trip cost</span><span><b>${travellers}</b>Travellers</span></div><div class="planner-actions"><button class="button primary" data-tab-jump="itinerary">Build itinerary →</button><button class="outline-button" data-tab-jump="budget">View budget</button></div></div></div>
     <div class="planner-card"><small>TRIP PROGRESS</small>${ring()}<p>${progress()>=100?"Your trip is fully planned. You're ready to go.":"Keep adding details to turn this destination into your trip."}</p><div class="progress-bar"><span style="width:${progress()}%"></span></div><div class="progress-caption"><span>Planning progress</span><strong>${progress()}%</strong></div></div>
     <div class="planner-card planner-why"><small>WHY ${d.name.toUpperCase()}?</small><h3>A trip that fits your plan.</h3><p>${d.description}</p><div class="reason-pills">${d.preferences.slice(0,4).map(x=>`<span>${x}</span>`).join("")}</div></div>
     <div class="planner-card"><small>QUICK START</small><div class="quick-links"><button data-tab-jump="itinerary">🗺️ Build itinerary</button><button data-tab-jump="budget">💰 Check budget</button><button data-tab-jump="packing">🎒 Check packing</button><button data-tab-jump="notes">✎ Add trip notes</button></div></div>
   </div>`;
   if(tab==="itinerary"){
     const days=Math.min(Math.max(2,tripDuration),d.things.length);
     content.innerHTML=`<section class="planner-section"><div class="section-heading"><div><p class="eyebrow">YOUR DAYS</p><h2>${d.name.toUpperCase()} <em>ITINERARY.</em></h2></div><p>A starting plan based on your ${tripDuration}-day trip.</p></div><div class="itinerary-grid">${Array.from({length:days},(_,i)=>`<article class="day-card"><span>DAY ${i+1}</span><h3>${d.things[i]}</h3><p>${i===0?`Arrive, settle in and explore ${d.name}'s local atmosphere.`:i===days-1?`Keep your final day relaxed, revisit a favourite spot and prepare for the journey home.`:`Spend the day around ${d.things[i]} with time for food, photos and nearby experiences.`}</p><div class="day-time">Morning · Afternoon · Evening</div></article>`).join("")}</div><div class="planner-note"><strong>Demo mode:</strong> VERYА is using its local destination data here. A future AI/backend version can personalize this around live prices, transport and interests.</div></section>`;
   }
   if(tab==="budget"){
     const scale=budget/d.cost;
     const within=budget>=d.cost;
     content.innerHTML=`<section class="planner-section"><div class="section-heading"><div><p class="eyebrow">ESTIMATED COST</p><h2>KNOW YOUR <em>BUDGET.</em></h2></div><p>Your selected budget compared with VERYА's destination estimate.</p></div><div class="budget-layout"><div class="planner-card"><div class="budget-big">${money(d.cost)}<small>VERYА estimated trip cost</small></div><div class="budget-breakdown"><p>Your budget <span>${money(budget)}</span></p><p>Transport <span>${money(d.transport)}</span></p><p>Stay <span>${money(d.stay)}</span></p><p>Food <span>${money(d.food)}</span></p><p>Activities <span>${money(d.activities)}</span></p><hr><strong>${within?"Estimated room left":"Estimated amount over budget"}<span>${money(Math.abs(budget-d.cost))}</span></strong></div></div><div class="planner-card"><small>BUDGET SNAPSHOT</small><div class="budget-status ${within?"ok":"warn"}">${within?"✓ This destination fits your demo budget.":"⚠ This destination is above your demo budget."}</div><div class="budget-bars">${[["Transport",d.transport],["Stay",d.stay],["Food",d.food],["Activities",d.activities]].map(x=>`<div><label><span>${x[0]}</span><b>${money(x[1])}</b></label><i><span style="width:${Math.min(100,Math.round(x[1]/d.cost*100))}%"></span></i></div>`).join("")}</div></div></div></section>`;
   }
   if(tab==="packing"){
     const items=["Comfortable clothes","Walking shoes","Water bottle","Sunscreen","Power bank","Travel documents","Toiletries","Small day bag"];
     content.innerHTML=`<section class="planner-section"><div class="section-heading"><div><p class="eyebrow">GET READY</p><h2>PACK FOR <em>${d.name.toUpperCase()}.</em></h2></div><p>Tick items off as you prepare.</p></div><div class="packing-grid">${items.map((x,i)=>`<label class="packing-item"><input type="checkbox" data-pack="${i}" ${state.checked.includes(i)?"checked":""}><span class="pack-box"></span><span>${x}</span></label>`).join("")}</div><div class="planner-card packing-progress"><strong>${state.checked.length} / ${items.length}</strong><span>items packed</span><div class="progress-bar"><span style="width:${state.checked.length/items.length*100}%"></span></div></div></section>`;
     content.querySelectorAll("input[data-pack]").forEach(c=>c.onchange=()=>{const i=+c.dataset.pack;if(c.checked&&!state.checked.includes(i))state.checked.push(i);if(!c.checked)state.checked=state.checked.filter(x=>x!==i);persist();render("packing")});
   }
   if(tab==="notes") content.innerHTML=`<section class="planner-section"><div class="section-heading"><div><p class="eyebrow">YOUR SPACE</p><h2>TRIP <em>NOTES.</em></h2></div><p>Keep anything useful for the journey here.</p></div><div class="planner-card notes-card"><textarea id="tripNotes" placeholder="Add places, reminders, food spots, things to book...">${state.notes||""}</textarea><div class="notes-actions"><button class="button primary" id="saveNotes">Save notes →</button><span id="noteStatus">${state.notes?"Saved locally":"Not saved yet"}</span></div></div></section>`;
   const save=document.getElementById("saveNotes"); if(save)save.onclick=()=>{state.notes=document.getElementById("tripNotes").value;persist();document.getElementById("noteStatus").textContent="Saved locally ✓"};
   content.querySelectorAll("[data-tab-jump]").forEach(b=>b.onclick=()=>render(b.dataset.tabJump));
 }
 tabs.forEach(b=>b.onclick=()=>render(b.dataset.tab));
 render();
});
