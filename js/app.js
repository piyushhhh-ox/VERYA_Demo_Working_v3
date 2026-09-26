document.addEventListener("DOMContentLoaded",()=>{
 const nav=document.getElementById("navbar");
 const menu=document.getElementById("mobileMenu"), toggle=document.getElementById("menuToggle");
 if(toggle&&menu) toggle.addEventListener("click",()=>{menu.classList.toggle("open");document.body.classList.toggle("menu-open")});
 const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));
 const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
 if(dot&&ring&&matchMedia("(pointer:fine)").matches){
   let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
   addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
   function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+"px";ring.style.top=ry+"px";requestAnimationFrame(loop)}loop();
   document.querySelectorAll("a,button,.magnetic,input,select").forEach(el=>{el.addEventListener("mouseenter",()=>ring.classList.add("hover"));el.addEventListener("mouseleave",()=>ring.classList.remove("hover"))});
 }
 document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("mousemove",e=>{if(matchMedia("(pointer:fine)").matches){const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.06}px,${(e.clientY-r.top-r.height/2)*.06}px)`}}));
 document.querySelectorAll(".magnetic").forEach(el=>el.addEventListener("mouseleave",()=>el.style.transform=""));
 if(nav) addEventListener("scroll",()=>{if(scrollY>30)nav.classList.add("scrolled");else nav.classList.remove("scrolled")});
 window.saveDestination=(id)=>{
   let saved=JSON.parse(localStorage.getItem("veryaSaved")||"[]");
   saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
   localStorage.setItem("veryaSaved",JSON.stringify(saved)); return saved.includes(id);
 };
 window.isSaved=id=>JSON.parse(localStorage.getItem("veryaSaved")||"[]").includes(id);
});
