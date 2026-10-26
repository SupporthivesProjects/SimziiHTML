
(function () {
  'use strict';

  const C = window.SIMZII_CATALOGUE;
  if (!C) throw new Error('data/catalogue.js must load before js/store.js');

  const KEY = { cart: 'simzii.cart', session: 'simzii.session', currency: 'simzii.currency', order: 'simzii.lastOrder', code: 'simzii.discount', orders: 'simzii.orders' };

  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function write(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)); }
    catch (e) { /* storage unavailable */ }
    document.dispatchEvent(new CustomEvent('store:change', { detail: { key } }));
  }

  /* catalogue lookups */
  const byId = new Map(C.destinations.map(d => [d.id, d]));
  const destination = id => byId.get(id) || null;
  const plan = (destId, planId) => {
    const d = destination(destId);
    return d ? d.plans.find(p => p.id === planId) || null : null;
  };
  const cheapest = d => d.plans.length ? d.plans.reduce((a, b) => (b.price < a.price ? b : a)) : null;
  const fromPrice = destId => { const d = destination(destId); if (!d) return null; const p = cheapest(d); return p ? p.price : (d.cardFrom ?? null); };
  const planCount = d => (d.plans.length || d.cardPlanCount || 0);
  const isLive = d => d.status === 'live' && d.plans.length > 0;
  const defaultPlan = d => plan(d.id, d.defaultPlan) || d.plans[0] || null;
  const destinations = type => C.destinations.filter(d => !type || type === 'all' || d.type === type);
  const regionsCovering = countryId => C.destinations.filter(d => d.type !== 'country' && (d.covers || []).includes(countryId));
  function search(query) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return { matches: [], regions: [] };
    const matches = C.destinations.filter(d => d.name.toLowerCase().includes(q) || (d.aliases || []).some(a => a.toLowerCase().includes(q)));
    const countries = matches.filter(d => d.type === 'country');
    const regions = [];
    countries.forEach(c => regionsCovering(c.id).forEach(r => { if (!regions.includes(r) && !matches.includes(r)) regions.push(r); }));
    return { matches, regions, country: countries[0] || null };
  }
  /* figures quoted in copy ("124 countries", "Eleven plans", "500MB to 50GB") */
  const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen'];
  function fact(id, key) {
    if (id === 'all') {
      if (key === 'regionCount') return String(C.destinations.filter(x => x.type !== 'country').length);
      if (key === 'maxPlans') return String(Math.max(...C.destinations.map(planCount)));
      return '';
    }
    const d = id === 'country' ? C.destinations.find(x => x.type === 'country') : destination(id);
    if (!d) return '';
    const byMb = d.plans.slice().sort((a, b) => a.mb - b.mb), byDays = d.plans.slice().sort((a, b) => a.days - b.days);
    const n = planCount(d);
    switch (key) {
      case 'areaCount': return String((d.areas || []).length + (d.areasMinor || []).length);
      case 'areaLabel': return d.areaLabel || '';
      case 'planCount': return String(n);
      case 'planWord': return WORDS[n] || String(n);
      case 'dataRange': return byMb.length ? `${byMb[0].data} to ${byMb[byMb.length - 1].data}` : '';
      case 'daysRange': return byDays.length ? `${byDays[0].days} to ${byDays[byDays.length - 1].days} days` : '';
      default: return '';
    }
  }
  const planName = p => `${p.data}, ${p.days} ${p.days === 1 ? 'day' : 'days'}`;

  /* custom plan builder: rates from catalogue customPlan */
  function customPrice(gb, days) {
    const r = C.customPlan;
    if (!r) return null;
    return Math.round((gb * r.perGb + days * (r.perDay || 0)) * 100) / 100;
  }

  /* currency */
  const CURRENCIES = { USD: '$', EUR: '€', GBP: '£' };
  const rates = C.currency.rates;   // null until rates are supplied: prices stay in USD
  function currency() { const c = read(KEY.currency, C.currency.default); return rates && rates[c] ? c : 'USD'; }
  function setCurrency(code) {
    if (!rates || !rates[code]) return false;
    write(KEY.currency, code); return true;
  }
  function format(usd) {
    if (usd == null || isNaN(usd)) return '';
    const c = currency(), r = rates && rates[c] ? rates[c] : 1;
    return CURRENCIES[c] + (usd * r).toFixed(2);
  }

  /* cart */
  function cartLines() {
    return read(KEY.cart, []).map(line => {
      const d = destination(line.destination);
      if (!d) return null;
      if (line.custom) {
        const price = customPrice(line.custom.gb, line.custom.days);
        return { ...line, dest: d, plan: { id: 'custom', data: line.custom.gb + 'GB', days: line.custom.days, price, custom: true }, price };
      }
      const p = plan(d.id, line.plan);
      return p ? { ...line, dest: d, plan: p, price: p.price } : null;
    }).filter(Boolean);
  }
  function addToCart(destId, planId, custom) {
    const lines = read(KEY.cart, []);
    lines.push({ key: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), destination: destId, plan: custom ? 'custom' : planId, custom: custom || null });
    write(KEY.cart, lines);
  }
  function removeFromCart(key) { write(KEY.cart, read(KEY.cart, []).filter(l => l.key !== key)); }
  function clearCart() { write(KEY.cart, []); write(KEY.code, null); }

  function discount() {
    const code = read(KEY.code, null);
    return code && C.discount && code.toUpperCase() === C.discount.code.toUpperCase() ? C.discount : null;
  }
  function applyCode(code) {
    const ok = !!(C.discount && String(code).trim().toUpperCase() === C.discount.code.toUpperCase());
    if (ok) write(KEY.code, C.discount.code);
    return ok;
  }
  function totals(lines) {
    lines = lines || cartLines();
    const subtotal = round(lines.reduce((s, l) => s + (l.price || 0), 0));
    const d = discount();
    const off = d ? round(subtotal * d.percent / 100) : 0;
    return { subtotal, discount: off, code: d ? d.code : null, percent: d ? d.percent : 0, total: round(subtotal - off) };
  }
  const round = n => Math.round(n * 100) / 100;

  /* session: local only until the auth service is wired */
  const session = () => read(KEY.session, null);
  function signIn(email) { write(KEY.session, { ...C.account.user, email: email || C.account.user.email }); }
  function signOut() { write(KEY.session, null); }

  /* orders */
  function newReference() { return 'SZ-' + String(10000 + Math.floor(Math.random() * 90000)); }
  const lastOrder = () => read(KEY.order, null);
  function saveOrder(order) {
    write(KEY.order, order);
    write(KEY.orders, [order, ...read(KEY.orders, []).filter(o => o.reference !== order.reference)]);
  }
  /* order history: orders paid in this browser, then the fixture's */
  function orders() {
    const describe = o => o.kind === 'topup'
      ? o.lines.map(l => `${(destination(o.esim) || {}).name || ''} top up ${l.plan.data}`).join(' + ')
      : o.lines.map(l => `${(destination(l.destination) || {}).name || l.destination} ${l.plan.data}, ${l.plan.days} days${l.plan.custom ? ', custom' : ''}`).join(' + ');
    const mine = read(KEY.orders, []).filter(o => o.reference).map(o => ({
      reference: o.reference, date: (o.paidAt || '').slice(0, 10), description: describe(o),
      amount: o.total, status: 'Paid', kind: o.kind, esim: o.esim || null, lines: o.lines
    }));
    return [...mine, ...C.account.orders];
  }

  window.Store = {
    catalogue: C,
    destination, destinations, plan, defaultPlan, fromPrice, cheapest, planCount, isLive, regionsCovering, search, planName, fact,
    topUps: () => (C.topUps ? C.topUps.options : []),
    topUp: id => (C.topUps ? C.topUps.options.find(t => t.id === id) : null),
    defaultTopUp: () => (C.topUps ? C.topUps.default : null),
    customPlan: () => C.customPlan || null, customPrice,
    currency, setCurrency, format, currencies: CURRENCIES, hasRates: !!rates,
    cart: { lines: cartLines, add: addToCart, remove: removeFromCart, clear: clearCart, count: () => cartLines().length, totals, applyCode, discount },
    session, signIn, signOut,
    account: () => C.account,
    newReference, lastOrder, saveOrder, orders
  };
})();
