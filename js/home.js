document.addEventListener("DOMContentLoaded",()=>{
 const grid=document.getElementById("destinationGrid");
 destinations.slice(0,4).forEach((d,i)=>grid.insertAdjacentHTML("beforeend",card(d,i===0)));
 document.querySelectorAll(".mood-card").forEach(card=>card.addEventListener("click",()=>{
   document.querySelectorAll(".mood-card").forEach(x=>x.classList.remove("active"));card.classList.add("active");
 }));
 function card(d,featured=false){return `<article class="destination-card ${featured?"featured":""}"><img src="${d.image}" alt="${d.name}"><button class="save-btn" data-id="${d.id}">${isSaved(d.id)?"♥":"♡"}</button><a href="destination.html?id=${d.id}" class="destination-card-content"><small>${d.location}</small><h3>${d.name}</h3><p>From ₹${d.cost.toLocaleString("en-IN")} · ${d.duration}</p></a></article>`}
 grid.addEventListener("click",e=>{const b=e.target.closest(".save-btn");if(!b)return;e.preventDefault();b.textContent=saveDestination(b.dataset.id)?"♥":"♡"});
});
