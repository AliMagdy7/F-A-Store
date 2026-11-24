const $=s=>document.querySelector(s),read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},save=(k,v)=>localStorage.setItem(k,JSON.stringify(v)),money=v=>new Intl.NumberFormat("ar-EG").format(v)+" ج.م",esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const defaults=[{id:1,name:"حقيبة يومية كلاسيك",desc:"تصميم عملي بخامة أنيقة",price:890,old:1050,stock:12,category:"bags",icon:"👜",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",badge:"الأكثر مبيعًا"},{id:2,name:"حقيبة ميني",desc:"حجم صغير لمشاويرك",price:620,stock:8,category:"bags",icon:"👝",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",badge:"جديد"},{id:3,name:"ساعة مينيمال",desc:"لمسة بسيطة لإطلالتك",price:1150,stock:6,category:"accessories",icon:"⌚",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"},{id:4,name:"نظارة شمس",desc:"ستايل عصري وخفيف",price:540,old:650,stock:15,category:"accessories",icon:"🕶️",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",badge:"عرض"},{id:5,name:"محفظة جلد",desc:"تفاصيل مرتبة ومساحة مناسبة",price:430,stock:10,category:"accessories",icon:"👛",image:"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=85"},{id:6,name:"كوب سيراميك",desc:"رفيق قهوتك المفضل",price:260,stock:20,category:"home",icon:"☕",image:"https://images.unsplash.com/photo-1514228742587-6b1558f3f93?auto=format&fit=crop&w=700&q=85"},{id:7,name:"فازة ديكور",desc:"تفصيلة هادئة لمنزلك",price:390,stock:7,category:"home",icon:"🏺",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85"},{id:8,name:"منظم مكتب",desc:"رتّب مساحتك بأناقة",price:310,stock:18,category:"home",icon:"✏️",image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=85"}];
let products=read("fa_store_products",defaults),orders=read("fa_store_orders",[]);if(!Array.isArray(products)||!products.length)products=defaults;let editing=false;
function notify(m){const t=$("#adminToast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}function refresh(){products=read("fa_store_products",defaults);orders=read("fa_store_orders",[]);$("#statProducts").textContent=products.length;$("#statOrders").textContent=orders.length;$("#statNew").textContent=orders.filter(o=>o.status==="جديد").length;$("#statRevenue").textContent=money(orders.reduce((s,o)=>s+Number(o.total||0),0));$("#productsTable").innerHTML=products.map(p=>`<tr><td>${esc(p.name)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td>${({bags:"شنط",accessories:"إكسسوارات",home:"للمنزل"})[p.category]||p.category}</td><td><button class="mini-btn" data-edit="${p.id}">تعديل</button> <button class="mini-btn danger" data-delete="${p.id}">حذف</button></td></tr>`).join("")||'<tr><td colspan="5">لا توجد منتجات.</td></tr>';
$("#ordersTable").innerHTML=orders.map(o=>`<tr><td>${esc(o.number)}</td><td>${esc(o.customer?.name)}</td><td>${new Date(o.date).toLocaleDateString("ar-EG")}</td><td>${money(o.total)}</td><td><select data-status="${esc(o.number)}" class="status-select"><option ${o.status==="جديد"?"selected":""}>جديد</option><option ${o.status==="قيد التجهيز"?"selected":""}>قيد التجهيز</option><option ${o.status==="تم الشحن"?"selected":""}>تم الشحن</option><option ${o.status==="مكتمل"?"selected":""}>مكتمل</option><option ${o.status==="ملغي"?"selected":""}>ملغي</option></select></td><td><button class="mini-btn" data-view="${esc(o.number)}">عرض</button></td></tr>`).join("")||'<tr><td colspan="6">لا توجد طلبات حتى الآن.</td></tr>';}
function openEditor(p){editing=!!p;const f=$("#productForm");f.reset();f.elements.id.value=p?.id||"";f.elements.name.value=p?.name||"";f.elements.desc.value=p?.desc||"";f.elements.price.value=p?.price||"";f.elements.old.value=p?.old||"";f.elements.stock.value=p?.stock??0;f.elements.category.value=p?.category||"bags";f.elements.image.value=p?.image||"";f.elements.icon.value=p?.icon||"✦";f.elements.badge.value=p?.badge||"";$("#editorTitle").textContent=p?"تعديل المنتج":"إضافة منتج";$("#productEditor").classList.add("open");}
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();if($("#adminPassword").value!=="FA2026"){notify("كلمة المرور غير صحيحة");return;}sessionStorage.setItem("fa_admin_demo","yes");$("#loginCard").hidden=true;$("#dashboard").hidden=false;refresh();});if(sessionStorage.getItem("fa_admin_demo")==="yes"){$("#loginCard").hidden=true;$("#dashboard").hidden=false;refresh();}
$("#logoutBtn").addEventListener("click",()=>{sessionStorage.removeItem("fa_admin_demo");location.reload();});$("#addProductBtn").addEventListener("click",()=>openEditor());$("#cancelEditor").addEventListener("click",()=>$("#productEditor").classList.remove("open"));
$("#productForm").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget,d=Object.fromEntries(new FormData(f));const p={id:d.id?Number(d.id):Date.now(),name:d.name.trim(),desc:d.desc.trim(),price:Number(d.price),old:d.old?Number(d.old):null,stock:Number(d.stock),category:d.category,image:d.image.trim(),icon:d.icon||"✦",badge:d.badge.trim()};if(!p.image)p.image="";if(editing)products=products.map(x=>x.id===p.id?p:x);else products.unshift(p);save("fa_store_products",products);$("#productEditor").classList.remove("open");refresh();notify("تم حفظ بيانات المنتج");});
$("#productsTable").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]"),del=e.target.closest("[data-delete]");if(edit)openEditor(products.find(p=>p.id===Number(edit.dataset.edit)));if(del){const p=products.find(x=>x.id===Number(del.dataset.delete));if(!confirm(`هل تريد حذف المنتج «${p.name}»؟`))return;products=products.filter(x=>x.id!==p.id);save("fa_store_products",products);refresh();notify("تم حذف المنتج");}});
$("#ordersTable").addEventListener("change",e=>{
  const select=e.target.closest("[data-status]");
  if(!select)return;
  const order=orders.find(o=>o.number===select.dataset.status);
  if(!order)return;
  const previous=order.status;
  const next=select.value;
  if(previous===next)return;

  // Inventory was deducted when the order was placed. Restore it exactly once
  // when cancelling, and deduct it again if a cancelled order is reactivated.
  if(previous!=="ملغي"&&next==="ملغي"){
    const quantities=new Map();
    (order.items||[]).forEach(item=>quantities.set(item.id,(quantities.get(item.id)||0)+Number(item.qty||0)));
    products=products.map(product=>quantities.has(product.id)?{...product,stock:Number(product.stock||0)+quantities.get(product.id)}:product);
    save("fa_store_products",products);
  }else if(previous==="ملغي"&&next!=="ملغي"){
    const quantities=new Map();
    (order.items||[]).forEach(item=>quantities.set(item.id,(quantities.get(item.id)||0)+Number(item.qty||0)));
    const unavailable=[...quantities.entries()].find(([id,qty])=>{
      const product=products.find(p=>p.id===id);
      return !product||Number(product.stock||0)<qty;
    });
    if(unavailable){
      notify("لا يمكن إعادة تفعيل الطلب: المخزون الحالي غير كافٍ");
      refresh();
      return;
    }
    products=products.map(product=>quantities.has(product.id)?{...product,stock:Number(product.stock||0)-quantities.get(product.id)}:product);
    save("fa_store_products",products);
  }
  orders=orders.map(o=>o.number===order.number?{...o,status:next}:o);
  save("fa_store_orders",orders);
  refresh();
  notify(next==="ملغي"?"تم إلغاء الطلب وإرجاع الكميات للمخزون":"تم تحديث حالة الطلب");
});
$("#ordersTable").addEventListener("click",e=>{const b=e.target.closest("[data-view]");if(!b)return;const o=orders.find(x=>x.number===b.dataset.view);$("#orderContent").innerHTML=`<h2>تفاصيل الطلب ${esc(o.number)}</h2><p><b>العميل:</b> ${esc(o.customer?.name)}</p><p><b>الهاتف:</b> ${esc(o.customer?.phone)}</p><p><b>العنوان:</b> ${esc(o.customer?.address)}</p><p><b>الدفع:</b> ${esc(o.customer?.payment)}</p><hr>${(o.items||[]).map(i=>`<p>${esc(i.name)} × ${i.qty} — ${money(i.price*i.qty)}</p>`).join("")}<h3>الإجمالي: ${money(o.total)}</h3>`;$("#orderViewer").classList.add("open");});$("#closeOrderViewer").addEventListener("click",()=>$("#orderViewer").classList.remove("open"));
$("#exportOrders").addEventListener("click",()=>{if(!orders.length){notify("لا توجد طلبات لتصديرها");return;}const rows=[["رقم الطلب","الاسم","الهاتف","العنوان","التاريخ","الإجمالي","الحالة"],...orders.map(o=>[o.number,o.customer?.name,o.customer?.phone,o.customer?.address,o.date,o.total,o.status])];const csv="\uFEFF"+rows.map(r=>r.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="fa-store-orders.csv";a.click();URL.revokeObjectURL(url);});
