const $ = (s) => document.querySelector(s);
const fmt = (n) => `${n.toLocaleString("ar-EG")} ${CURRENCY}`;

const state = { cat: "all", q: "", cart: loadCart(), current: null, qty: 1 };

function loadCart() {
  try { return JSON.parse(localStorage.getItem("bunember_cart")) || {}; } catch { return {}; }
}
function saveCart() {
  try { localStorage.setItem("bunember_cart", JSON.stringify(state.cart)); } catch {}
}

/* ---------- categories & grid ---------- */
function renderCats() {
  $("#cats").innerHTML = CATEGORIES.map(c =>
    `<button class="cat ${c.id === state.cat ? "on" : ""}" data-cat="${c.id}" role="tab">${c.icon} ${c.name}</button>`
  ).join("");
}

function renderGrid() {
  const q = state.q.trim().toLowerCase();
  const list = PRODUCTS.filter(p =>
    (state.cat === "all" || p.cat === state.cat) &&
    (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );
  $("#empty").hidden = list.length > 0;
  $("#grid").innerHTML = list.map((p, i) => `
    <article class="card" style="animation-delay:${i * 40}ms" data-id="${p.id}">
      <div class="img" style="background:${p.color}"><span>${p.icon}</span>${p.tag ? `<em>${p.tag}</em>` : ""}</div>
      <div class="info">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <div class="row">
          <b>${fmt(p.price)}</b>
          <button class="add" data-add="${p.id}" aria-label="أضف ${p.name}">+</button>
        </div>
      </div>
    </article>`).join("");
}

/* ---------- product modal ---------- */
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  state.current = p; state.qty = 1;
  $("#mImg").style.background = p.color;
  $("#mImg").innerHTML = `<span>${p.icon}</span>`;
  $("#mCat").textContent = CATEGORIES.find(c => c.id === p.cat).name;
  $("#mName").textContent = p.name;
  $("#mDesc").textContent = p.desc;
  updateModal();
  $("#modal").hidden = false;
}
function updateModal() {
  $("#mQty").textContent = state.qty;
  $("#mTotal").textContent = fmt(state.current.price * state.qty);
}
function closeModal() { $("#modal").hidden = true; }

/* ---------- cart ---------- */
function addToCart(id, qty = 1) {
  state.cart[id] = (state.cart[id] || 0) + qty;
  saveCart(); renderCart();
  const p = PRODUCTS.find(x => x.id === id);
  toast(`اتضاف ${p.name} للسلة`);
  const btn = $("#openCart"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
}
function setQty(id, qty) {
  if (qty <= 0) delete state.cart[id]; else state.cart[id] = qty;
  saveCart(); renderCart();
}
function cartLines() {
  return Object.entries(state.cart).map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === +id), qty })).filter(l => l.p);
}
function renderCart() {
  const lines = cartLines();
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.p.price, 0);
  $("#cartCount").textContent = count;
  $("#total").textContent = fmt(total);
  $("#sendWa").disabled = !lines.length;
  $("#items").innerHTML = lines.length ? lines.map(({ p, qty }) => `
    <div class="line">
      <div class="l-img" style="background:${p.color}">${p.icon}</div>
      <div class="l-info"><b>${p.name}</b><span>${fmt(p.price)}</span></div>
      <div class="qty small">
        <button data-dec="${p.id}">−</button><span>${qty}</span><button data-inc="${p.id}">+</button>
      </div>
      <button class="rm" data-rm="${p.id}" aria-label="حذف">🗑</button>
    </div>`).join("") : `<p class="nothing">السلة فاضية 🍽️<br>ضيف حاجة من المنيو.</p>`;
}
function openCart() { $("#drawer").classList.add("open"); $("#shade").classList.add("on"); $("#drawer").setAttribute("aria-hidden", "false"); }
function closeCart() { $("#drawer").classList.remove("open"); $("#shade").classList.remove("on"); $("#drawer").setAttribute("aria-hidden", "true"); }

function sendWhatsApp() {
  const lines = cartLines();
  if (!lines.length) return;
  const total = lines.reduce((a, l) => a + l.qty * l.p.price, 0);
  let msg = "طلب جديد من Bun & Ember 🍔\n\n";
  lines.forEach(({ p, qty }) => { msg += `• ${p.name} × ${qty} = ${qty * p.price} ${CURRENCY}\n`; });
  msg += `\nالإجمالي: ${total} ${CURRENCY}`;
  const note = $("#note").value.trim();
  if (note) msg += `\nملاحظات: ${note}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

let tId;
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(tId); tId = setTimeout(() => el.classList.remove("on"), 1800); }

/* ---------- events ---------- */
$("#cats").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (!b) return; state.cat = b.dataset.cat; renderCats(); renderGrid(); });
$("#search").addEventListener("input", e => { state.q = e.target.value; renderGrid(); });
$("#grid").addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(+add.dataset.add); return; }
  const card = e.target.closest(".card"); if (card) openModal(+card.dataset.id);
});
$("#mMinus").onclick = () => { if (state.qty > 1) { state.qty--; updateModal(); } };
$("#mPlus").onclick = () => { state.qty++; updateModal(); };
$("#mAdd").onclick = () => { addToCart(state.current.id, state.qty); closeModal(); };
$("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest("[data-close]")) closeModal(); });
$("#openCart").onclick = openCart;
$("#shade").onclick = closeCart;
document.querySelector("[data-close-cart]").onclick = closeCart;
$("#items").addEventListener("click", e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.dataset.inc) setQty(+t.dataset.inc, (state.cart[t.dataset.inc] || 0) + 1);
  if (t.dataset.dec) setQty(+t.dataset.dec, (state.cart[t.dataset.dec] || 0) - 1);
  if (t.dataset.rm) setQty(+t.dataset.rm, 0);
});
$("#clearCart").onclick = () => { state.cart = {}; saveCart(); renderCart(); };
$("#sendWa").onclick = sendWhatsApp;
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeCart(); } });

const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) x.target.classList.add("show"); }), { threshold: .2 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

renderCats(); renderGrid(); renderCart();
