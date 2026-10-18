import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingBag, Menu as MenuIcon, X, Plus, Minus, ArrowUpRight, MapPin, Clock3, Instagram, MessageCircle, CakeSlice, ChevronDown, Heart } from 'lucide-react';
import './styles.css';

const categories = ['All treats', 'Cakes', 'Pastries', 'Breads', 'Sips'];
const products = [
  { id: 1, name: 'Chocolate Truffle', category: 'Cakes', price: 650, unit: 'per cake', image: 'photo-1578985545062-69928b1d9587', tag: 'Guest favourite', description: 'Rich chocolate layers with silky ganache.' },
  { id: 2, name: 'Strawberry Cloud', category: 'Cakes', price: 720, unit: 'per cake', image: 'photo-1464349095431-e9a21285b5f3', tag: 'Fresh pick', description: 'Soft sponge, cream and bright berries.' },
  { id: 3, name: 'Butter Croissant', category: 'Pastries', price: 110, unit: 'each', image: 'photo-1555507036-ab1f4038808a', tag: 'Baked daily', description: 'Golden, flaky layers with buttery warmth.' },
  { id: 4, name: 'Chocolate Éclair', category: 'Pastries', price: 140, unit: 'each', image: 'photo-1612203985729-70726954388c', tag: '', description: 'Light choux pastry with chocolate glaze.' },
  { id: 5, name: 'Country Loaf', category: 'Breads', price: 180, unit: 'each', image: 'photo-1585478259715-876acc5be8eb', tag: 'Oven fresh', description: 'A rustic loaf with a crisp, golden crust.' },
  { id: 6, name: 'Cinnamon Swirl', category: 'Breads', price: 130, unit: 'each', image: 'photo-1509365465985-25d11c17e812', tag: '', description: 'Soft, fragrant and finished with a sweet swirl.' },
  { id: 7, name: 'Velvet Cappuccino', category: 'Sips', price: 160, unit: 'cup', image: 'photo-1509042239860-f550ce710b93', tag: 'Coffee time', description: 'Espresso and steamed milk with a smooth finish.' },
  { id: 8, name: 'Iced Mocha', category: 'Sips', price: 190, unit: 'glass', image: 'photo-1461023058943-07fcbe16d735', tag: '', description: 'Chilled coffee with a gentle chocolate note.' }
];
const money = n => `₹${n.toLocaleString('en-IN')}`;
const photo = (id, width=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [category, setCategory] = useState('All treats');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cakeOpen, setCakeOpen] = useState(false);
  const [cakeForm, setCakeForm] = useState({ name: '', phone: '', date: '', size: '1 kg', flavour: '', notes: '' });
  const [notice, setNotice] = useState('');
  const [demoMode, setDemoMode] = useState(true);

  const filtered = useMemo(() => category === 'All treats' ? products : products.filter(p => p.category === category), [category]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

  const add = id => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = id => setCart(prev => {
    const next = { ...prev };
    if ((next[id] || 0) <= 1) delete next[id]; else next[id]--;
    return next;
  });

  function checkout() {
    const lines = products.filter(p => cart[p.id]).map(p => `${p.name} × ${cart[p.id]} — ${money(p.price * cart[p.id])}`);
    const message = `Hello Olivo Café! I'd like to enquire about this order:\n\n${lines.join('\n')}\n\nEstimated total: ${money(total)}\n\nPlease confirm availability and final price.`;
    // Replace this placeholder with the café's verified WhatsApp number before publishing.
    const whatsappNumber = 'REPLACE_WITH_CAFE_NUMBER';
    if (whatsappNumber === 'REPLACE_WITH_CAFE_NUMBER') {
      setNotice('Demo checkout: add the café’s verified WhatsApp number in src/main.jsx to activate WhatsApp ordering.');
      return;
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function submitCake(e) {
    e.preventDefault();
    const msg = `Hello Olivo Café! I'd like to enquire about a custom cake.\nName: ${cakeForm.name}\nPhone: ${cakeForm.phone}\nDate: ${cakeForm.date}\nSize: ${cakeForm.size}\nFlavour/design: ${cakeForm.flavour}\nNotes: ${cakeForm.notes}`;
    setCakeOpen(false);
    setNotice('Custom cake form demo submitted. Connect a verified WhatsApp number or form service before publishing.');
    // The form intentionally does not send personal information until the café approves a destination.
  }

  return <div className="site-shell">
    {demoMode && <div className="demo-banner"><span>CONCEPT WEBSITE</span> Unofficial demo for presentation · Menu and prices are illustrative <button onClick={() => setDemoMode(false)} aria-label="Dismiss demo notice"><X size={14}/></button></div>}
    <header className="header">
      <a className="brand" href="#home" aria-label="Olivo Café home"><img src="/olivo-logo.png" alt="Olivo Café logo"/><span className="brand-copy"><strong>OLIVO</strong><small>CAFÉ · BAKERY · BREADS</small></span></a>
      <nav className={mobileOpen ? 'nav nav-open' : 'nav'}>
        <a href="#menu" onClick={() => setMobileOpen(false)}>The menu</a>
        <a href="#story" onClick={() => setMobileOpen(false)}>Our story</a>
        <a href="#visit" onClick={() => setMobileOpen(false)}>Visit us</a>
        <button className="nav-order" onClick={() => { setCartOpen(true); setMobileOpen(false); }}>Your bag <ShoppingBag size={16}/><span>{count}</span></button>
      </nav>
      <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">{mobileOpen ? <X/> : <MenuIcon/>}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" role="img" aria-label="Freshly baked pastries and coffee"></div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <div className="eyebrow"><span></span> BAKED WITH HEART, SERVED WITH SOUL <span></span></div>
          <h1>A little <em>sweetness.</em><br/>A lot of love.</h1>
          <p>Thoughtfully baked treats, comforting breads and little moments worth slowing down for.</p>
          <div className="hero-actions"><a className="button button-gold" href="#menu">Explore the menu <ArrowUpRight size={17}/></a><button className="button button-ghost" onClick={() => setCakeOpen(true)}>Order a celebration cake</button></div>
          <div className="hero-note"><span className="note-line"></span><span>MADE FOR YOUR EVERYDAY MOMENTS</span></div>
        </div>
        <div className="hero-stamp"><span>FRESHLY</span><strong>BAKED</strong><span>WITH LOVE</span><Heart size={17}/></div>
        <a href="#menu" className="scroll-cue">SCROLL TO DISCOVER <ChevronDown size={15}/></a>
      </section>

      <section className="intro section-pad" id="story">
        <div className="section-kicker">THE OLIVO FEELING</div>
        <div className="intro-grid"><h2>Good things take<br/><em>a little time.</em></h2><div className="intro-copy"><p>From the first morning coffee to a cake made for your biggest little celebration, Olivo is all about making everyday moments feel special.</p><a href="#menu" className="text-link">Find your favourite <ArrowUpRight size={16}/></a></div></div>
        <div className="values"><div><span>01</span><strong>Freshly made</strong><small>Little batches, lovely flavours.</small></div><div><span>02</span><strong>Made to share</strong><small>Goodness tastes better together.</small></div><div><span>03</span><strong>Made for moments</strong><small>Everyday treats and big celebrations.</small></div></div>
      </section>

      <section className="menu-section section-pad" id="menu">
        <div className="menu-heading"><div><div className="section-kicker">FROM OUR COUNTER</div><h2>Something <em>lovely</em> for you.</h2></div><p>Find a new favourite or come back to an old one.</p></div>
        <div className="category-row" role="tablist" aria-label="Product categories">{categories.map(c => <button key={c} className={category === c ? 'category active' : 'category'} onClick={() => setCategory(c)} role="tab" aria-selected={category === c}>{c}</button>)}</div>
        <div className="product-grid">{filtered.map((p, i) => <article className="product-card" key={p.id}>
          <div className="product-photo"><img src={photo(p.image)} alt={p.name} loading="lazy"/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => { add(p.id); setNotice(`${p.name} added to your bag.`); }} aria-label={`Add ${p.name} to bag`}><Plus size={20}/></button></div>
          <div className="product-info"><div><span className="product-category">{p.category}</span><h3>{p.name}</h3><p>{p.description}</p></div><div className="product-price"><strong>{money(p.price)}</strong><small>{p.unit}</small></div></div>
        </article>)}</div>
        <p className="menu-disclaimer">Demo menu only. Product availability and prices must be confirmed by Olivo Café before launch.</p>
      </section>

      <section className="custom-banner">
        <div className="custom-photo"></div><div className="custom-content"><div className="section-kicker">A LITTLE SOMETHING SPECIAL</div><h2>Made for your<br/><em>big moments.</em></h2><p>Birthdays, little surprises and days worth celebrating. Tell us what you have in mind.</p><button className="button button-gold" onClick={() => setCakeOpen(true)}>Enquire about a cake <ArrowUpRight size={17}/></button></div>
      </section>

      <section className="visit-section section-pad" id="visit"><div className="visit-copy"><div className="section-kicker">COME ON IN</div><h2>Your next favourite<br/>moment is <em>waiting.</em></h2><p>We’d love to welcome you. Check back here for our confirmed location, opening hours and contact details.</p><div className="visit-details"><div><MapPin/><span><strong>Find Olivo</strong><small>Dehradun · Confirm exact address</small></span></div><div><Clock3/><span><strong>Opening hours</strong><small>To be confirmed by the café</small></span></div></div><a className="button button-ghost" href="#footer">Contact details <ArrowUpRight size={16}/></a></div><div className="visit-art"><div className="art-ring"><img src="/olivo-logo.png" alt="Olivo Café emblem"/></div><span className="art-caption">A WARM WELCOME, ALWAYS</span></div></section>

      <section className="newsletter"><span className="section-kicker">STAY FOR A LITTLE MORE</span><h2>Good things are <em>worth sharing.</em></h2><p>Follow along for fresh bakes, seasonal treats and café moments.</p><a href="#footer" className="text-link">Find our socials <ArrowUpRight size={16}/></a></section>
    </main>

    <footer className="footer" id="footer"><a className="footer-brand" href="#home"><img src="/olivo-logo.png" alt="Olivo Café logo"/><span><strong>OLIVO</strong><small>CAFÉ · BAKERY · BREADS</small></span></a><div className="footer-center"><span>FRESHLY BAKED. BEAUTIFULLY SHARED.</span><small>Concept website · Business details to be verified</small></div><div className="footer-social"><a href="#visit" aria-label="Instagram placeholder"><Instagram/></a><a href="#visit" aria-label="WhatsApp placeholder"><MessageCircle/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Olivo Café · Demo concept</span><a href="#home">Back to top ↑</a></div></footer>

    {cartOpen && <div className="overlay" onMouseDown={e => { if(e.target === e.currentTarget) setCartOpen(false); }}><aside className="cart-drawer"><div className="drawer-head"><div><span className="section-kicker">YOUR SELECTION</span><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X/></button></div>
      {count === 0 ? <div className="empty-cart"><ShoppingBag size={38}/><h3>A little something?</h3><p>Your bag is waiting for something lovely.</p><button className="button button-gold" onClick={() => { setCartOpen(false); document.getElementById('menu').scrollIntoView({behavior:'smooth'}); }}>Explore the menu</button></div> :
      <><div className="cart-items">{products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><img src={photo(p.image, 250)} alt=""/><div className="cart-item-info"><strong>{p.name}</strong><small>{money(p.price)} · {p.unit}</small><div className="qty"><button onClick={() => remove(p.id)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{cart[p.id]}</span><button onClick={() => add(p.id)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><b>{money(p.price * cart[p.id])}</b></div>)}</div><div className="cart-summary"><div><span>Estimated total</span><strong>{money(total)}</strong></div><small>Final price and availability are confirmed by the café.</small><button className="button button-gold checkout-button" onClick={checkout}>Continue on WhatsApp <ArrowUpRight size={17}/></button></div></>}
    </aside></div>}

    {cakeOpen && <div className="overlay modal-overlay" onMouseDown={e => { if(e.target === e.currentTarget) setCakeOpen(false); }}><div className="cake-modal"><div className="drawer-head"><div><span className="section-kicker">MADE FOR YOUR MOMENT</span><h2>Custom cake enquiry</h2></div><button className="icon-button" onClick={() => setCakeOpen(false)} aria-label="Close form"><X/></button></div><p className="form-intro">Share a few details and the café can follow up to confirm availability and pricing.</p><form onSubmit={submitCake}><label>Your name<input required value={cakeForm.name} onChange={e => setCakeForm({...cakeForm, name:e.target.value})} placeholder="Name"/></label><label>Phone number<input required type="tel" value={cakeForm.phone} onChange={e => setCakeForm({...cakeForm, phone:e.target.value})} placeholder="Your phone number"/></label><div className="form-row"><label>Needed for<input required type="date" value={cakeForm.date} onChange={e => setCakeForm({...cakeForm, date:e.target.value})}/></label><label>Approx. size<select value={cakeForm.size} onChange={e => setCakeForm({...cakeForm, size:e.target.value})}><option>500 g</option><option>1 kg</option><option>2 kg</option><option>3 kg+</option></select></label></div><label>Flavour or design<input value={cakeForm.flavour} onChange={e => setCakeForm({...cakeForm, flavour:e.target.value})} placeholder="Chocolate, floral, themed…"/></label><label>Anything else?<textarea rows="3" value={cakeForm.notes} onChange={e => setCakeForm({...cakeForm, notes:e.target.value})} placeholder="Colours, message on cake, budget…"/></label><button className="button button-gold form-submit" type="submit">Send enquiry <ArrowUpRight size={16}/></button><small className="privacy-note">Demo form: details are not sent or stored.</small></form></div></div>}

    {notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={16}/></button></div>}
    <a className="floating-whatsapp" href="#footer" aria-label="WhatsApp contact placeholder" onClick={e => { e.preventDefault(); setNotice('Add the café’s verified WhatsApp number before enabling this button.'); }}><MessageCircle size={20}/><span>Let’s talk</span></a>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
