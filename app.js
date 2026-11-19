const products=[
  {id:"vivien",name:"Vivien cardigan",category:"women",supplier:"Classic Alpaca",source:"https://classicalpaca.com/vivien-alpaca-cardigan/dp/8960/",image:"assets/women-vivien-open-cardigan.webp",number:"01",featured:true},
  {id:"tessa",name:"Tessa cardigan",category:"women",supplier:"Classic Alpaca",source:"https://classicalpaca.com/tessa-alpaca-cardigan/dp/12372/",image:"assets/women-tessa-cable-cardigan.webp",number:"02",featured:true},
  {id:"brushed-v",name:"Brushed V-neck sweater",category:"women",supplier:"Classic Alpaca",source:"https://classicalpaca.com/v-neck-brushed-alpaca-sweater/dp/10827/",image:"assets/women-brushed-v-neck.webp",number:"03"},
  {id:"ivane",name:"Ivane sweater",category:"women",supplier:"Classic Alpaca",source:"https://classicalpaca.com/ivane-alpaca-sweater/dp/6093/",image:"assets/women-ivane-crewneck.webp",number:"04"},
  {id:"plaid-scarf",name:"Plaid alpaca scarf",category:"accessories",supplier:"Winterborn Alpaca",source:"https://winterbornalpaca.com/products/alpaca-scarves-plaids",image:"assets/accessory-plaid-scarf.webp",number:"05",featured:true},
  {id:"hiker-socks",name:"Outdoor Hiker socks",category:"accessories",supplier:"Classic Alpaca",source:"https://classicalpaca.com/alpaca-outdoor-hiker-unisex-socks/dp/7544/",image:"assets/accessory-hiker-socks.webp",number:"06"},
  {id:"patagonia-zip",name:"Patagonia zip sweater",category:"men",supplier:"Classic Alpaca",source:"https://classicalpaca.com/mens-patagonia-alpaca-zip-sweater/dp/13944/",image:"assets/men-patagonia-patterned-zip.webp",number:"07",featured:true},
  {id:"baby-half-zip",name:"Baby Alpaca Half Zip — Charcoal",category:"men",supplier:"Qinti",source:"https://www.qintiperu.com/products/100-baby-alpaca-half-zip-sweater-charcoal",image:"assets/men-baby-half-zip.webp",number:"08"}
];
const productCard=p=>`<article class="product-card">
  <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name} — visual preview" loading="lazy"><span class="product-number">${p.number}</span>${p.featured?'<span class="product-badge">First edit</span>':''}<button class="quick-add" data-add="${p.id}" type="button">Add to bag</button></div>
  <div class="product-info"><div><h3>${p.name}</h3><p>${p.supplier} · Preview</p></div><span class="product-price">Coming soon</span></div>
</article>`;
document.querySelectorAll("[data-collection]").forEach(grid=>{
 const key=grid.dataset.collection;
 const list=key==="featured"?products.filter(p=>p.featured):products.filter(p=>p.category===key);
 grid.innerHTML=list.map(productCard).join("");
});
let bag=JSON.parse(localStorage.getItem("drahma-bag")||"[]");
const drawer=document.querySelector(".cart-drawer"),overlay=document.querySelector(".cart-overlay"),policy=document.querySelector(".policy-modal");
function openBag(){drawer.classList.add("open");overlay.classList.add("open");drawer.setAttribute("aria-hidden","false");overlay.setAttribute("aria-hidden","false");document.body.classList.add("locked")}
function closeBag(){drawer.classList.remove("open");overlay.classList.remove("open");drawer.setAttribute("aria-hidden","true");overlay.setAttribute("aria-hidden","true");document.body.classList.remove("locked")}
function renderBag(){
 const count=bag.reduce((sum,item)=>sum+item.qty,0);
 document.querySelectorAll(".cart-count").forEach(el=>el.textContent=count);
 document.querySelector(".drawer-count").textContent="("+count+")";
 document.querySelector(".cart-items").innerHTML=bag.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${p.supplier} · Preview</p><p>Qty ${item.qty}</p></div><button class="remove-item" data-remove="${p.id}">Remove</button></div>`}).join("");
 document.querySelector(".cart-empty").style.display=count?"none":"block";
 document.querySelector(".cart-footer").style.display=count?"block":"none";
 localStorage.setItem("drahma-bag",JSON.stringify(bag));
}
document.addEventListener("click",event=>{
 const add=event.target.closest("[data-add]");
 if(add){const found=bag.find(item=>item.id===add.dataset.add);found?found.qty++:bag.push({id:add.dataset.add,qty:1});renderBag();openBag()}
 const remove=event.target.closest("[data-remove]");
 if(remove){bag=bag.filter(item=>item.id!==remove.dataset.remove);renderBag()}
});
document.querySelector(".cart-trigger").addEventListener("click",openBag);
document.querySelector(".drawer-close").addEventListener("click",closeBag);
document.querySelector(".continue-shopping").addEventListener("click",closeBag);
overlay.addEventListener("click",closeBag);
document.querySelectorAll(".policy-open").forEach(link=>link.addEventListener("click",event=>{event.preventDefault();policy.classList.add("open");policy.setAttribute("aria-hidden","false");document.body.classList.add("locked")}));
document.querySelector(".policy-close").addEventListener("click",()=>{policy.classList.remove("open");policy.setAttribute("aria-hidden","true");document.body.classList.remove("locked")});
policy.addEventListener("click",e=>{if(e.target===policy){policy.classList.remove("open");policy.setAttribute("aria-hidden","true");document.body.classList.remove("locked")}});
document.querySelector(".menu-toggle").addEventListener("click",e=>{const nav=document.querySelector(".main-nav"),open=!nav.classList.contains("open");nav.classList.toggle("open",open);e.currentTarget.setAttribute("aria-expanded",open);e.currentTarget.setAttribute("aria-label",open?"Close menu":"Open menu")});
document.querySelectorAll(".main-nav a").forEach(link=>link.addEventListener("click",()=>{document.querySelector(".main-nav").classList.remove("open");document.querySelector(".menu-toggle").setAttribute("aria-expanded","false")}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeBag();policy.classList.remove("open");policy.setAttribute("aria-hidden","true");document.body.classList.remove("locked")}});
renderBag();
