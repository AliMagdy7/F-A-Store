const DEFAULT_PRODUCTS = [
{id:1,name:"حقيبة يومية كلاسيك",desc:"تصميم عملي بخامة أنيقة",price:890,old:1050,stock:12,category:"bags",icon:"👜",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=90",badge:"الأكثر مبيعًا"},
{id:2,name:"حقيبة ميني",desc:"حجم صغير لمشاويرك",price:620,stock:8,category:"bags",icon:"👝",image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=90",badge:"جديد"},
{id:3,name:"ساعة مينيمال",desc:"لمسة بسيطة لإطلالتك",price:1150,stock:6,category:"accessories",icon:"⌚",image:"https://images.unsplash.com/photo-1758887952896-8491d393afe2?auto=format&fit=crop&w=900&q=90"},
{id:4,name:"نظارة شمس",desc:"ستايل عصري وخفيف",price:540,old:650,stock:15,category:"accessories",icon:"🕶️",image:"https://images.unsplash.com/photo-1587310311582-aa7610e90826?auto=format&fit=crop&w=900&q=90",badge:"عرض"},
{id:5,name:"محفظة جلد",desc:"تفاصيل مرتبة ومساحة مناسبة",price:430,stock:10,category:"accessories",icon:"👛",image:"https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=90"},
{id:6,name:"كوب سيراميك",desc:"رفيق قهوتك المفضل",price:260,stock:20,category:"home",icon:"☕",image:"https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=900&q=90"},
{id:7,name:"فازة ديكور",desc:"تفصيلة هادئة لمنزلك",price:390,stock:7,category:"home",icon:"🏺",image:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=90"},
{id:8,name:"منظم مكتب",desc:"رتّب مساحتك بأناقة",price:310,stock:18,category:"home",icon:"✏️",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=90"},
{id:9,name:"حقيبة كتف بيج",desc:"أناقة هادئة تناسب كل يوم",price:780,stock:10,category:"bags",icon:"👜",image:"https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=90",badge:"اختيارنا"},
{id:10,name:"حقيبة ظهر عملية",desc:"مساحة واسعة بتصميم عصري",price:950,stock:9,category:"bags",icon:"🎒",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=90"},
{id:11,name:"حلق ذهبي ناعم",desc:"تفصيلة رقيقة لإطلالة مميزة",price:320,stock:14,category:"accessories",icon:"✨",image:"https://images.unsplash.com/photo-1637632668522-ac901758a6bb?auto=format&fit=crop&w=900&q=90",badge:"جديد"},
{id:12,name:"سلسلة يومية",desc:"تصميم بسيط يليق بكل إطلالة",price:410,stock:11,category:"accessories",icon:"📿",image:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=90"},
{id:13,name:"حامل شموع أنيق",desc:"أجواء دافئة ولمسة راقية للبيت",price:280,stock:13,category:"home",icon:"🕯️",image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=90"},
{id:14,name:"صينية تقديم",desc:"تقديم أنيق لضيافتك اليومية",price:450,stock:8,category:"home",icon:"🍽️",image:"https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=90"},
{id:15,name:"حافظة بطاقات",desc:"حجم صغير وتنظيم عملي",price:290,stock:16,category:"accessories",icon:"💳",image:"https://images.unsplash.com/photo-1512412046876-f386342eddb3?auto=format&fit=crop&w=900&q=90"},
{id:16,name:"نظارة بإطار كلاسيك",desc:"إطار أنيق بلمسة عصرية",price:590,stock:7,category:"accessories",icon:"🕶️",image:"https://images.unsplash.com/photo-1674660990017-ee34b9138b98?auto=format&fit=crop&w=900&q=90",badge:"الأكثر طلبًا"}
];
const $ = s => document.querySelector(s);
const read=(key,fallback)=>{try{const value=JSON.parse(localStorage.getItem(key));return value??fallback}catch{return fallback}};
let products=read("fa_store_products",DEFAULT_PRODUCTS);
if(!Array.isArray(products)||!products.length){products=DEFAULT_PRODUCTS;localStorage.setItem("fa_store_products",JSON.stringify(products));}
// Upgrade existing demo catalogs once: refresh the original product photos and add the new items.
if(!localStorage.getItem("fa_store_catalog_v2")){
  const savedById=new Map(products.map(p=>[p.id,p]));
  products=DEFAULT_PRODUCTS.map(p=>savedById.has(p.id)?{...savedById.get(p.id),image:p.image}:p).concat(products.filter(p=>!DEFAULT_PRODUCTS.some(d=>d.id===p.id)));
  save("fa_store_products",products);localStorage.setItem("fa_store_catalog_v2","1");
}
// Refresh the watch photo for visitors who already received catalog v2.
if(!localStorage.getItem("fa_store_catalog_v3")){
  const watchImage=DEFAULT_PRODUCTS.find(p=>p.id===3).image;
  products=products.map(p=>p.id===3?{...p,image:watchImage}:p);
  save("fa_store_products",products);localStorage.setItem("fa_store_catalog_v3","1");
}
let cart=read("fa_store_cart",[]);if(!Array.isArray(cart))cart=[];
let activeCategory="all",searchTerm="",sortMode="featured";
const money=value=>new Intl.NumberFormat("ar-EG").format(value)+" ج.م";
const safe=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function save(key,value){localStorage.setItem(key,JSON.stringify(value));}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600);}
function renderProducts(){let list=products.filter(p=>p.active!==false&&(activeCategory==="all"||p.category===activeCategory)&&(`${p.name} ${p.desc}`).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));if(sortMode==="low")list.sort((a,b)=>a.price-b.price);if(sortMode==="high")list.sort((a,b)=>b.price-a.price);
$("#productGrid").innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image" style="background:${safe(p.bg||"#f2eee8")}"><img class="product-photo" src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy" onerror="this.remove()"><button class="quick-add" data-add="${p.id}" ${p.stock<=0?"disabled":""}>${p.stock<=0?"نفد المخزون":"+ أضف إلى السلة"}</button></div><div class="product-info"><button class="product-title" data-details="${p.id}">${safe(p.name)}</button><p>${safe(p.desc)}</p><span class="price">${money(p.price)}</span>${p.old?`<span class="old-price">${money(p.old)}</span>`:""}<small class="stock-note">${p.stock<=3&&p.stock>0?`متبقي ${p.stock} فقط`:""}</small></div></article>`).join(""):`<div class="empty-state">لا توجد منتجات مطابقة لبحثك.</div>`;}
function renderCart(){
  // Keep cart details synchronized with the latest product data edited in Admin.
  cart=cart.flatMap(item=>{
    const product=products.find(p=>p.id===item.id);
    if(!product||product.stock<=0)return [];
    return [{...item,name:product.name,price:product.price,icon:product.icon,image:product.image,qty:Math.min(item.qty,product.stock)}];
  });
  const count=cart.reduce((n,i)=>n+i.qty,0),total=cart.reduce((n,i)=>n+i.price*i.qty,0);$("#cartCount").textContent=count;$("#cartTotal").textContent=money(total);$("#checkoutTotal").textContent=money(total);$("#cartItems").innerHTML=cart.length?cart.map(i=>`<div class="cart-item"><div class="cart-thumb">${safe(i.icon||"✦")}</div><div><h4>${safe(i.name)}</h4><small>${money(i.price)}</small><div class="qty-controls"><button data-qty="${i.id}" data-change="-1">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-change="1">+</button></div></div><button class="remove-item" data-remove="${i.id}">حذف</button></div>`).join(""):`<div class="empty-state">السلة فارغة حاليًا.<br>ابدأ بإضافة منتجاتك المفضلة.</div>`;save("fa_store_cart",cart);}
function openCart(){$("#overlay").classList.add("active");$("#cartDrawer").classList.add("open");}
function closePanels(){$("#overlay").classList.remove("active");$("#cartDrawer").classList.remove("open");$("#checkoutModal").classList.remove("open");$("#productModal").classList.remove("open");}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p||p.stock<=0){toast("هذا المنتج غير متاح حاليًا");return;}const found=cart.find(x=>x.id===id);if(found&&found.qty>=p.stock){toast("الكمية المطلوبة غير متاحة بالمخزون");return;}if(found)found.qty++;else cart.push({...p,qty:1});renderCart();toast("تمت إضافة المنتج إلى السلة");}
function showProduct(id){const p=products.find(x=>x.id===id);if(!p)return;$("#productDetails").innerHTML=`<img class="detail-photo" src="${safe(p.image)}" alt="${safe(p.name)}" onerror="this.style.display='none'"><span class="eyebrow">تفاصيل المنتج</span><h2>${safe(p.name)}</h2><p>${safe(p.desc)}</p><strong class="price">${money(p.price)}</strong><p class="detail-stock">${p.stock>0?`متاح ${p.stock} قطعة`:"غير متوفر حاليًا"}</p><button class="primary-btn full-btn" data-detail-add="${p.id}" ${p.stock<=0?"disabled":""}>أضف إلى السلة</button>`;$("#overlay").classList.add("active");$("#productModal").classList.add("open");}
$("#productGrid").addEventListener("click",e=>{const add=e.target.closest("[data-add]"),detail=e.target.closest("[data-details]");if(add)addToCart(Number(add.dataset.add));if(detail)showProduct(Number(detail.dataset.details));});
$("#productDetails").addEventListener("click",e=>{const b=e.target.closest("[data-detail-add]");if(b){addToCart(Number(b.dataset.detailAdd));closePanels();}});
$("#cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty)),p=products.find(x=>x.id===Number(q.dataset.qty));if(!item)return;const next=item.qty+Number(q.dataset.change);if(next>p.stock){toast("الكمية المطلوبة تتجاوز المخزون");return;}if(next<=0)cart=cart.filter(x=>x.id!==item.id);else item.qty=next;renderCart();}if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));renderCart();}});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
$("#sortSelect").addEventListener("change",e=>{sortMode=e.target.value;renderProducts();});$("#searchToggle").addEventListener("click",()=>{$("#searchRow").classList.toggle("visible");$("#searchInput").focus();});$("#searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim();renderProducts();});$("#clearSearch").addEventListener("click",()=>{$("#searchInput").value="";searchTerm="";renderProducts();});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closePanels);$("#overlay").addEventListener("click",closePanels);$("#closeCheckout").addEventListener("click",closePanels);$("#closeProduct").addEventListener("click",closePanels);
$("#checkoutBtn").addEventListener("click",()=>{if(!cart.length){toast("أضف منتجًا واحدًا على الأقل");return;}$("#checkoutModal").classList.add("open");});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length)return;const phone=$("#phoneInput").value.replace(/[\s-]/g,"");if(!/^(\+?20|0)?1[0125][0-9]{8}$/.test(phone)){toast("من فضلك أدخل رقم هاتف مصري صحيح");$("#phoneInput").focus();return;}for(const item of cart){const p=products.find(x=>x.id===item.id);if(!p||p.stock<item.qty){toast(`الكمية غير متاحة للمنتج: ${item.name}`);return;}}
const data=Object.fromEntries(new FormData(e.target).entries()),orders=read("fa_store_orders",[]),total=cart.reduce((n,i)=>n+i.price*i.qty,0),number="FA-"+Date.now().toString().slice(-8);const order={number,date:new Date().toISOString(),customer:data,items:cart.map(i=>({...i})),total,status:"جديد"};orders.unshift(order);save("fa_store_orders",orders);products=products.map(p=>{const item=cart.find(i=>i.id===p.id);return item?{...p,stock:p.stock-item.qty}:p;});save("fa_store_products",products);cart=[];renderProducts();renderCart();e.target.reset();closePanels();toast(`تم تسجيل طلبك التجريبي رقم ${number}`);});
$("#menuToggle").addEventListener("click",()=>$(".main-nav").classList.toggle("show"));document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>$(".main-nav").classList.remove("show")));
renderProducts();renderCart();
