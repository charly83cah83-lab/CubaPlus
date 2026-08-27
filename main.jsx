import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const plans=[
 {name:"Básico",price:3,features:["Herramientas básicas","Contenido exclusivo","Soporte por email","Recursos descargables"]},
 {name:"Estándar",price:5,tag:"MÁS POPULAR",features:["Todo el plan Básico","Herramientas avanzadas","Descuentos exclusivos","Soporte prioritario","Nuevos beneficios cada mes"]},
 {name:"Premium",price:10,features:["Todo el plan Estándar","Contenido premium","Asesoría personalizada","Beneficios VIP","Actualizaciones anticipadas"]}
];

function App(){
 const [view,setView]=useState("home");
 const [plan,setPlan]=useState(null);
 const [email,setEmail]=useState("");
 const subscribe=(p)=>{setPlan(p);setView("checkout")};
 return <div className="app">
  <header><div className="brand">♛ <span>CubaPlus</span></div><nav>
   {["Inicio","Beneficios","Precios","Preguntas","Contacto"].map(x=><button onClick={()=>setView(x==="Inicio"?"home":x.toLowerCase())}>{x}</button>)}
  </nav><button className="login" onClick={()=>setView("login")}>Iniciar sesión</button><button className="primary" onClick={()=>subscribe(plans[1])}>Suscribirme</button></header>

  {view==="home" && <><section className="hero"><div className="heroText"><span className="pill">♛ Membresía exclusiva</span><h1>MÁS HERRAMIENTAS.<br/>MÁS BENEFICIOS.<br/><em>MÁS PARA TI.</em></h1>
  <p>Únete a CubaPlus y accede a herramientas digitales, contenido exclusivo, descuentos y recursos útiles desde cualquier dispositivo.</p>
  <div className="trust"><span>✓ Pago seguro con CubaPay</span><span>↻ Cancela cuando quieras</span><span>◷ Acceso 24/7</span></div>
  <button className="primary big" onClick={()=>document.getElementById("plans").scrollIntoView()}>VER PLANES →</button></div>
  <div className="phone"><div className="phoneTop">CubaPlus</div><h3>¡Hola, Bienvenido!</h3><div className="status">● Membresía Activa <small>Vence próximamente</small></div><div className="mini">⚡ Herramientas Pro</div><div className="mini">▣ Contenido Exclusivo</div><div className="mini">％ Descuentos</div></div></section>
  <section id="plans" className="section"><div className="eyebrow">ELIGE TU PLAN</div><h2>¿Qué plan se adapta a ti?</h2><div className="plans">{plans.map(p=><div className={"card "+(p.tag?"featured":"")}>{p.tag&&<div className="tag">{p.tag}</div>}<h3>{p.name}</h3><div className="price">${p.price}<small>/mes</small></div>{p.features.map(f=><div className="feature">✓ {f}</div>)}<button className={p.tag?"primary":"outline"} onClick={()=>subscribe(p)}>SUSCRIBIRME</button></div>)}</div></section>
  <section className="section benefits"><h2>¿Qué obtienes con tu membresía?</h2><div className="benefitGrid">{["🛠️ Herramientas Digitales","📖 Contenido Exclusivo","％ Descuentos Especiales","☁️ Recursos Premium","◷ Acceso 24/7"].map(x=><div className="benefit"><b>{x}</b><p>Acceso a recursos y ventajas pensadas para ayudarte a ahorrar tiempo y aprovechar mejor tus herramientas digitales.</p></div>)}</div></section></>}

  {view==="checkout" && <section className="checkout section"><div className="checkoutCard"><span className="pill">Suscripción seleccionada</span><h2>CubaPlus {plan?.name}</h2><div className="price">${plan?.price}<small>/mes</small></div><input placeholder="Nombre completo"/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Correo electrónico"/><input placeholder="Teléfono"/><button className="primary big" onClick={()=>alert("Demo: aquí se solicita al backend crear el link de suscripción de CuboPay.")}>CONTINUAR AL PAGO</button><p className="muted">Demo preparada para conectar con CuboPay. La API Key nunca debe colocarse en el navegador.</p></div></section>}

  {view==="login" && <section className="checkout section"><div className="checkoutCard"><h2>Iniciar sesión</h2><input placeholder="Correo electrónico"/><input type="password" placeholder="Contraseña"/><button className="primary big">ENTRAR</button><p className="muted">La autenticación real se conectará al backend.</p></div></section>}

  {["beneficios","precios","preguntas","contacto"].includes(view) && <section className="section"><div className="contentCard"><h2>{view[0].toUpperCase()+view.slice(1)}</h2><p>Esta sección forma parte de la estructura profesional de CubaPlus y queda lista para completar con contenido real antes del lanzamiento.</p><button className="primary" onClick={()=>setView("home")}>Volver al inicio</button></div></section>}

  <footer><div className="brand">♛ CubaPlus</div><span>© 2026 CubaPlus · Términos · Privacidad · Contacto</span><span>Powered by CubaPay · Pago seguro</span></footer>
 </div>
}
createRoot(document.getElementById("root")).render(<App/>);
