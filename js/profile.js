document.addEventListener("DOMContentLoaded",()=>{
 let profile=JSON.parse(localStorage.getItem("veryaProfile")||'{"name":"Piyush","email":"traveller@verya.demo"}');
 const name=document.getElementById("profileName"),email=document.getElementById("profileEmail"),avatar=document.getElementById("avatar");
 function render(){name.textContent=profile.name;email.textContent=profile.email;avatar.textContent=profile.name.charAt(0).toUpperCase();document.getElementById("tripStat").textContent=JSON.parse(localStorage.getItem("veryaTrips")||"[]").length;document.getElementById("savedStat").textContent=JSON.parse(localStorage.getItem("veryaSaved")||"[]").length}
 document.getElementById("editProfile").onclick=()=>{const n=prompt("Your name",profile.name),e=prompt("Your email",profile.email);if(n){profile.name=n}if(e){profile.email=e}localStorage.setItem("veryaProfile",JSON.stringify(profile));render()};render();
});
