/* Farm Neighbors — customer orders and delivery board (Stage 5)
   Uses the same local farm inventory as farm-expansion.js. No server secrets. */
(() => {
  'use strict';
  if (window.__fnOrders) return;
  window.__fnOrders = true;
  const FARM_KEY = 'fn-farm-v1';
  const ORDER_KEY = 'fn-orders-v1';
  const TEXT = {
    en: { button:'📦 Orders', title:'Village Market', sub:'Customers are waiting for fresh produce.', coins:'Coins', stock:'In storage', accept:'Accept order', deliver:'Deliver order', accepted:'Order accepted', delivered:'Delivery complete', missing:'Not enough produce', refresh:'New orders arrive tomorrow', empty:'No active orders', wheat:'Wheat', carrot:'Carrot', strawberry:'Strawberry', corn:'Corn', reward:'Reward', customer:'Customer', due:'Requested goods', close:'Close', xp:'XP earned', bonus:'Perfect delivery bonus' },
    ar: { button:'📦 الطلبات', title:'سوق القرية', sub:'الزبائن ينتظرون منتجات مزرعتك الطازجة.', coins:'العملات', stock:'في المخزون', accept:'قبول الطلب', deliver:'تسليم الطلب', accepted:'تم قبول الطلب', delivered:'تم التسليم بنجاح', missing:'المحصول غير كافٍ', refresh:'تصل طلبات جديدة غداً', empty:'لا توجد طلبات نشطة', wheat:'قمح', carrot:'جزر', strawberry:'فراولة', corn:'ذرة', reward:'المكافأة', customer:'الزبون', due:'المنتجات المطلوبة', close:'إغلاق', xp:'خبرة مكتسبة', bonus:'مكافأة التسليم المثالي' },
    id: { button:'📦 Pesanan', title:'Pasar Desa', sub:'Pelanggan menunggu hasil kebun segar.', coins:'Koin', stock:'Di gudang', accept:'Terima pesanan', deliver:'Kirim pesanan', accepted:'Pesanan diterima', delivered:'Pesanan berhasil dikirim', missing:'Hasil panen tidak cukup', refresh:'Pesanan baru datang besok', empty:'Tidak ada pesanan aktif', wheat:'Gandum', carrot:'Wortel', strawberry:'Stroberi', corn:'Jagung', reward:'Hadiah', customer:'Pelanggan', due:'Produk diminta', close:'Tutup', xp:'XP diperoleh', bonus:'Bonus pengiriman sempurna' }
  };
  const lang = () => {
    const saved = localStorage.getItem('farm-neighbors-language');
    if (saved && TEXT[saved]) return saved;
    const n = (navigator.language || 'en').toLowerCase();
    return n.startsWith('ar') ? 'ar' : n.startsWith('id') ? 'id' : 'en';
  };
  const t = k => (TEXT[lang()] || TEXT.en)[k] || TEXT.en[k] || k;
  const catalog = {
    wheat:{emoji:'🌾', price:18}, carrot:{emoji:'🥕', price:32},
    strawberry:{emoji:'🍓', price:65}, corn:{emoji:'🌽', price:95}
  };
  const customers = ['Maya','Omar','Lina','Rafi','Noor','Budi'];
  const templates = [
    { goods:{wheat:4,carrot:2}, reward:150, xp:24 },
    { goods:{carrot:3,strawberry:2}, reward:230, xp:32 },
    { goods:{wheat:6,corn:2}, reward:260, xp:36 },
    { goods:{strawberry:3,corn:2}, reward:390, xp:48 },
    { goods:{wheat:5,carrot:4,corn:1}, reward:340, xp:44 }
  ];
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } };
  let farm = read(FARM_KEY, {coins:500, level:1, xp:0, stock:{wheat:0,carrot:0,strawberry:0,corn:0}});
  let state = read(ORDER_KEY, {day:'', orders:[]});
  const today = () => new Date().toLocaleDateString('en-CA');
  const saveFarm = () => { localStorage.setItem(FARM_KEY, JSON.stringify(farm)); window.dispatchEvent(new CustomEvent('fn-farm-updated',{detail:{coins:farm.coins}})); };
  const saveOrders = () => localStorage.setItem(ORDER_KEY, JSON.stringify(state));
  const ensureOrders = () => {
    if (!farm.stock) farm.stock = {wheat:0,carrot:0,strawberry:0,corn:0};
    if (state.day === today() && state.orders.length) return;
    state.day = today();
    state.orders = templates.slice(0,3).map((tpl,i) => ({
      id: state.day+'-'+i, customer: customers[(new Date().getDate()+i*2)%customers.length],
      goods: {...tpl.goods}, reward:tpl.reward, xp:tpl.xp, status:'available'
    }));
    saveOrders();
  };
  const root = document.createElement('div');
  root.id = 'fn-orders-root';
  const css = document.createElement('style');
  css.textContent = `
    #fn-orders-launch{position:fixed;z-index:9997;bottom:76px;right:18px;border:0;border-radius:14px;padding:12px 15px;background:#e9b84d;color:#2e2512;font:800 13px system-ui;box-shadow:0 8px 22px #0005;cursor:pointer}
    #fn-orders-root{display:none;position:fixed;inset:0;z-index:10000;background:#06140edb;backdrop-filter:blur(6px);padding:12px;align-items:center;justify-content:center;font-family:system-ui;color:#f5fff4}
    #fn-orders-root.open{display:flex}#fn-orders-panel{width:min(620px,100%);max-height:92dvh;overflow:auto;background:linear-gradient(145deg,#183b29,#0b1912);border:1px solid #ffffff24;border-radius:20px;padding:16px;box-shadow:0 20px 70px #0009}
    #fn-orders-head{display:flex;align-items:center;justify-content:space-between;gap:10px}#fn-orders-head h2{margin:0;font-size:21px}#fn-orders-head p{margin:5px 0 14px;color:#b9d6bd;font-size:12px}
    #fn-orders-close{border:0;border-radius:10px;padding:9px 12px;background:#ffffff20;color:white}
    .fn-order-card{background:#ffffff0c;border:1px solid #ffffff1c;border-radius:14px;padding:12px;margin:9px 0}
    .fn-order-top{display:flex;justify-content:space-between;gap:8px;align-items:center}.fn-order-goods{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}
    .fn-order-chip{background:#ffffff14;border-radius:9px;padding:7px 9px;font-size:12px}.fn-order-meta{font-size:11px;color:#b9d6bd}
    .fn-order-action{width:100%;border:0;border-radius:10px;background:#d8aa45;color:#2b2516;padding:10px;font-weight:800;margin-top:9px;cursor:pointer}.fn-order-action:disabled{opacity:.4}
    #fn-orders-toast{text-align:center;color:#e8d18b;font-size:12px;min-height:20px;margin-top:8px}
    @media(max-width:480px){#fn-orders-launch{bottom:132px;right:12px}#fn-orders-panel{padding:12px}}
  `;
  document.head.appendChild(css);
  root.innerHTML = '<section id="fn-orders-panel"><header id="fn-orders-head"><div><h2>🏪</h2><p></p></div><button id="fn-orders-close">✕</button></header><div id="fn-orders-list"></div><div id="fn-orders-toast" aria-live="polite"></div></section>';
  document.body.appendChild(root);
  const launch = document.createElement('button');
  launch.id='fn-orders-launch';
  document.body.appendChild(launch);
  const toast = m => { document.getElementById('fn-orders-toast').textContent=m; };
  const available = goods => Object.entries(goods).every(([id,n]) => Number(farm.stock[id]||0)>=n);
  const goodsText = goods => Object.entries(goods).map(([id,n]) => '<span class="fn-order-chip">'+catalog[id].emoji+' '+t(id)+' × '+n+'</span>').join('');
  function render() {
    ensureOrders();
    farm=read(FARM_KEY,farm);
    launch.textContent=t('button');
    const title=document.querySelector('#fn-orders-head h2'); title.textContent='🏪 '+t('title');
    document.querySelector('#fn-orders-head p').textContent=t('sub');
    document.querySelector('#fn-orders-close').textContent='✕ '+t('close');
    const list=document.getElementById('fn-orders-list');
    list.innerHTML=state.orders.map(o=>{
      const done=o.status==='delivered', accepted=o.status==='accepted';
      const enough=available(o.goods);
      const action=done?'✓ '+t('delivered'):accepted?t('deliver'):t('accept');
      return '<article class="fn-order-card"><div class="fn-order-top"><b>👩‍🌾 '+t('customer')+': '+o.customer+'</b><b>🪙 '+t('reward')+': '+o.reward+'</b></div><div class="fn-order-meta">'+t('due')+'</div><div class="fn-order-goods">'+goodsText(o.goods)+'</div><div class="fn-order-meta">✨ '+o.xp+' '+t('xp')+'</div><button class="fn-order-action" data-order="'+o.id+'" '+(done|| (accepted&&!enough)?'disabled':'')+'>'+action+'</button></article>';
    }).join('') || '<p>'+t('empty')+'</p>';
  }
  function act(id) {
    const o=state.orders.find(x=>x.id===id); if(!o||o.status==='delivered')return;
    farm=read(FARM_KEY,farm);
    if(o.status==='available'){o.status='accepted';saveOrders();render();toast(t('accepted'));return;}
    if(!available(o.goods)){toast(t('missing'));return;}
    Object.entries(o.goods).forEach(([crop,n])=>{farm.stock[crop]=Math.max(0,Number(farm.stock[crop]||0)-n);});
    farm.coins=Number(farm.coins||0)+o.reward;
    farm.xp=Number(farm.xp||0)+o.xp;
    while(farm.xp>=Number(farm.level||1)*100){farm.xp-=Number(farm.level||1)*100;farm.level=Number(farm.level||1)+1;}
    o.status='delivered';saveFarm();saveOrders();render();toast(t('delivered')+' · +'+o.reward+' 🪙');
  }
  launch.addEventListener('click',()=>{root.classList.add('open');render();});
  document.getElementById('fn-orders-close').addEventListener('click',()=>root.classList.remove('open'));
  root.addEventListener('click',e=>{if(e.target===root)root.classList.remove('open');const b=e.target.closest('[data-order]');if(b)act(b.dataset.order);});
  window.addEventListener('storage',e=>{if(e.key===FARM_KEY||e.key==='farm-neighbors-language'){farm=read(FARM_KEY,farm);if(root.classList.contains('open'))render();}});
  window.addEventListener('fn-farm-updated',()=>{farm=read(FARM_KEY,farm);if(root.classList.contains('open'))render();});
  ensureOrders();
})();
