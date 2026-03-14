import React, { useEffect, useState } from 'react';
import { 
  Scale, 
  Cpu, 
  Briefcase, 
  ShieldCheck, 
  ChevronRight, 
  Database,
  Layers,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowUp,
  Sparkles,
  Loader2,
  FileText,
  AlertTriangle,
  User,
  Lock,
  LogOut,
  Bell,
  MessageSquare,
  CreditCard,
  Activity,
  CalendarCheck,
  Download,
  Quote,
  TrendingUp,
  Award,
  X,
  Phone,
  Menu,
  Users,
  Search,
  ArrowLeft,
  BarChart3,
  PieChart,
  UserPlus,
  FolderOpen,
  MapPin,
  Calendar,
  DollarSign,
  Paperclip,
  Plus,
  UploadCloud,
  Clock,
  UserCheck,
  Wallet,
  ExternalLink,
  Target,
  LayoutDashboard
} from 'lucide-react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';

// --- FIREBASE CONFIGURATION HELPERS ---
const getFirebaseKey = () => {
  try {
    if (typeof __firebase_config !== 'undefined') {
      const cfg = JSON.parse(__firebase_config);
      if (cfg && cfg.apiKey) return cfg.apiKey;
    }
  } catch (e) {}
  try {
    if (import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) return import.meta.env.VITE_FIREBASE_API_KEY;
  } catch (e) {}
  return ""; 
};

const myFirebaseConfig = {
  apiKey: getFirebaseKey(),
  authDomain: "lexnova-production.firebaseapp.com",
  projectId: "lexnova-production",
  storageBucket: "lexnova-production.firebasestorage.app",
  messagingSenderId: "75917035224",
  appId: "1:75917035224:web:cc9219b5896b4460f0f9ad"
};

// --- INITIALIZATION ---
let app, auth, db, secondaryApp, secondaryAuth;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'lexnova-production';

if (myFirebaseConfig.apiKey) {
  app = getApps().length > 0 ? getApp() : initializeApp(myFirebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  secondaryApp = getApps().find(a => a.name === "Secondary") || initializeApp(myFirebaseConfig, "Secondary");
  secondaryAuth = getAuth(secondaryApp);
}

// --- Funciones Globales de Formato ---
const formatCOP = (val) => {
  if (!val) return '$ 0';
  const num = Number(val.toString().replace(/[^0-9]/g, ''));
  if (isNaN(num) || num === 0) return '$ 0';
  return '$ ' + num.toLocaleString('es-CO');
};

const parseCOP = (val) => {
  if (!val) return 0;
  return Number(val.toString().replace(/[^0-9]/g, ''));
};

// --- Custom Hooks for Animations ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

const scrollToSection = (e, targetId) => {
  e.preventDefault();
  const container = document.getElementById('main-scroll-container');
  const element = document.getElementById(targetId);
  if (container && element) {
    const navHeight = 80; 
    const containerTop = container.getBoundingClientRect().top;
    const elementTop = element.getBoundingClientRect().top;
    const scrollPos = elementTop - containerTop + container.scrollTop - navHeight;
    container.scrollTo({ top: scrollPos, behavior: "smooth" });
  }
};

// --- UI COMPONENTS (LANDING) ---

const NavBar = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleNavClick = (e, targetId) => {
    setIsMobileMenuOpen(false); 
    scrollToSection(e, targetId);
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={(e) => handleNavClick(e, 'inicio')}>
          <Scale className="text-cyan-400 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-white font-bold text-xl tracking-tight">Lex<span className="text-cyan-400">Nova</span></span>
        </div>
        <div className="hidden lg:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#ecosistema" onClick={(e) => handleNavClick(e, 'ecosistema')} className="hover:text-cyan-400 transition-colors cursor-pointer">Ecosistema</a>
          <a href="#soluciones" onClick={(e) => handleNavClick(e, 'soluciones')} className="hover:text-cyan-400 transition-colors cursor-pointer">Soluciones</a>
          <a href="#laboratorio-ia" onClick={(e) => handleNavClick(e, 'laboratorio-ia')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"><Sparkles className="w-3 h-3 text-cyan-400"/> IA Legal</a>
          <a href="#portal-cliente" onClick={(e) => handleNavClick(e, 'portal-cliente')} className="hover:text-cyan-400 transition-colors cursor-pointer">Portal Clientes</a>
          <a href="#casos-exito" onClick={(e) => handleNavClick(e, 'casos-exito')} className="hover:text-cyan-400 transition-colors cursor-pointer">Éxito</a>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={(e) => handleNavClick(e, 'portal-cliente')} className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors items-center gap-2 flex">
            <User className="w-4 h-4" /> Ingresar
          </button>
          <button onClick={onOpenModal} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/10 flex items-center gap-2 group">
            Solicitar Atención
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <button className="lg:hidden text-slate-300 hover:text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenModal }) => (
  <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
    <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-10 animate-fade-in-down">
        <Zap className="w-4 h-4" /> <span>El futuro del litigio y la gestión legal</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight leading-tight mb-16 pb-4">
        Transformación Digital <br className="hidden md:block"/> para el Abogado Moderno.
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 mt-4 leading-relaxed">
        Supera las barreras del Código General del Proceso. Centraliza expedientes, automatiza tiempos y potencia tu firma con Inteligencia Artificial.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button onClick={onOpenModal} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          Iniciar Evolución Digital
        </button>
      </div>
    </div>
  </section>
);

const ExplainerCards = () => {
  useScrollReveal();
  const cards = [
    { icon: <Database className="w-8 h-8 text-blue-400" />, title: "Vigilancia Judicial Automatizada", desc: "Conexión directa con la Rama Judicial. Monitoreo 24/7 de estados sin revisión manual." },
    { icon: <Cpu className="w-8 h-8 text-cyan-400" />, title: "Inteligencia Artificial Legal", desc: "Redacción de documentos y análisis de riesgos legales impulsados por IA." },
    { icon: <Briefcase className="w-8 h-8 text-indigo-400" />, title: "Gestión de Expedientes", desc: "Control absoluto de plazos, audiencias y documentos centralizados en la nube." }
  ];
  return (
    <section id="ecosistema" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AILabModule = () => {
  useScrollReveal();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const analyzeCase = async () => {
    if (!inputText.trim()) { setError("Por favor, ingresa los hechos del caso."); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText })
      });
      if (!response.ok) throw new Error("Error en el análisis de IA.");
      const data = await response.json();
      setResult(data);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <section id="laboratorio-ia" className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Laboratorio de IA Legal</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 flex flex-col">
            <textarea className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-slate-300 h-48 mb-6 outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Hechos jurídicos..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={analyzeCase} disabled={loading} className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />} Analizar con IA</button>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex flex-col min-h-[400px]">
             {result ? <div className="text-left"><p className="text-cyan-400 font-bold mb-2">Resultado:</p><p className="text-slate-300">{result.resumen_ejecutivo}</p></div> : <div className="m-auto text-slate-500">El análisis aparecerá aquí.</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonModule = () => {
  useScrollReveal();
  const [activeTab, setActiveTab] = useState('crm');
  const content = {
    crm: { title: "CRM Legal", subtitle: "Relación y Captación", points: ["Gestión de Leads.", "Automatización de emails.", "Control de agenda."], color: "from-blue-500 to-indigo-600" },
    erp: { title: "ERP Jurídico", subtitle: "Gestión Financiera", points: ["Facturación electrónica.", "Time Tracking.", "Rentabilidad por socio."], color: "from-emerald-400 to-teal-600" },
    case: { title: "Case Management", subtitle: "Control Procesal", points: ["Integración Rama Judicial.", "Notificaciones de términos.", "Repositorio seguro."], color: "from-purple-500 to-pink-600" }
  };
  return (
    <section id="soluciones" className="py-24 bg-slate-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll opacity-0 translate-y-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Soluciones Integrales</h2>
            <div className="flex flex-col gap-4">
              {Object.keys(content).map((key) => (
                <button key={key} onClick={() => setActiveTab(key)} className={`text-left p-6 rounded-xl border transition-all ${activeTab === key ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                  <h3 className={`text-xl font-bold ${activeTab === key ? 'text-white' : 'text-slate-400'}`}>{content[key].title}</h3>
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[400px]">
            <div className={`absolute inset-0 rounded-3xl bg-slate-950 border border-white/10 p-10 flex flex-col justify-center animate-fade-in`}>
              <h3 className="text-3xl font-bold text-white mb-8">{content[activeTab].title}</h3>
              <ul className="space-y-4">
                {content[activeTab].points.map((point, i) => <li key={i} className="flex items-center gap-4 text-slate-300 text-lg"><CheckCircle2 className="w-6 h-6 text-cyan-400"/> {point}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KeyInsights = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      {[{ v: "85%", l: "Ahorro de tiempo." }, { v: "0", l: "Vencimientos de términos." }, { v: "3x", l: "Más rentabilidad." }].map((s, i) => (
        <div key={i} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">{s.v}</div>
          <div className="text-slate-300 font-medium text-lg">{s.l}</div>
        </div>
      ))}
    </div>
  </section>
);

const SuccessStories = () => (
  <section id="casos-exito" className="py-24 bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-16 italic">Resultados que avalan nuestra tecnología.</h2>
    </div>
  </section>
);

const ClientPortalModule = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true); setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().rol === 'cliente') {
        const clientRef = doc(db, 'artifacts', appId, 'public', 'data', 'clientes', user.uid);
        const clientSnap = await getDoc(clientRef);
        if (clientSnap.exists()) {
          setClientData({ id: clientSnap.id, ...clientSnap.data() });
          setIsLoggedIn(true);
        } else { setError("Perfil no encontrado."); await signOut(auth); }
      } else { setError("Portal exclusivo para clientes."); await signOut(auth); }
    } catch (err) { setError("Error en credenciales."); } finally { setLoading(false); }
  };

  return (
    <section id="portal-cliente" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-white mb-12">Portal Clientes</h2>
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-slate-900 p-8 rounded-3xl border border-white/10">
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 p-3 rounded-xl border border-white/10" placeholder="Email" required />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 p-3 rounded-xl border border-white/10" placeholder="Contraseña" required />
              <button className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl">{loading ? '...' : 'Entrar'}</button>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl p-10 border border-white/10">
            <p className="text-white font-bold text-xl">Bienvenido, {clientData?.nombre}</p>
          </div>
        )}
      </div>
    </section>
  );
};

// --- MÓDULO DASHBOARD ADMIN INTEGRAL (RESTAURADO) ---
const AdminDashboard = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [viewMode, setViewMode] = useState('leads'); 
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showOverviewModal, setShowOverviewModal] = useState(false); 
  
  const [leadsStats, setLeadsStats] = useState({ total: 0, topInterest: '-' });
  const [clientsStats, setClientsStats] = useState({ total: 0, totalHonorarios: 0, totalRecaudo: 0 });

  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [conversionData, setConversionData] = useState({ nombres: '', email: '', telefono: '' });

  const [editingClient, setEditingClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientModalTab, setClientModalTab] = useState('general');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true); setErrorMsg('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, adminEmail, passcode);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', user.uid));
      if (userDoc.exists() && userDoc.data().rol === 'admin') {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setErrorMsg('Denegado.');
        await signOut(auth);
      }
    } catch (err) { setErrorMsg('Inválido.'); } finally { setLoading(false); }
  };

  const fetchData = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const leadsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'leads'));
      const lData = leadsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setLeads(lData);
      
      const clientsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'clientes'));
      const cData = clientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setClients(cData);

      const activeLeads = lData.filter(l => l.estado !== 'convertido');
      setLeadsStats({ total: activeLeads.length, topInterest: 'IA Legal' });
      
      const totalHon = cData.reduce((s, c) => s + parseCOP(c.honorarios), 0);
      const totalRec = cData.reduce((s, c) => s + (c.pagos?.reduce((ps, p) => ps + parseCOP(p.monto), 0) || 0), 0);
      setClientsStats({ total: cData.length, totalHonorarios: totalHon, totalRecaudo: totalRec });
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const convertLead = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tempPass = "Lex" + Math.floor(1000 + Math.random() * 9000);
      const userCred = await createUserWithEmailAndPassword(secondaryAuth, conversionData.email, tempPass);
      const newUid = userCred.user.uid;
      await signOut(secondaryAuth);

      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', newUid), { uid: newUid, email: conversionData.email, rol: 'cliente' });
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'clientes', newUid), { 
        idCliente: newUid, nombre: conversionData.nombres, email: conversionData.email, telefono: conversionData.telefono,
        expediente: "#"+Math.floor(1000+Math.random()*9000), estadoActual: "Nuevo Cliente"
      });
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'leads', leadToConvert.id), { estado: 'convertido' });

      setSuccessMsg(`Cliente creado: ${tempPass}`);
      setIsConversionModalOpen(false);
      fetchData();
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-slate-900 border border-white/10 p-8 rounded-3xl">
           <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
           <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none" placeholder="Email" required />
              <input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none" placeholder="Passcode" required />
              <button type="submit" className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl">Entrar</button>
           </form>
           <button onClick={onExit} className="mt-4 w-full text-slate-500 text-sm">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
          <div><h1 className="text-3xl font-bold flex items-center gap-3"><Database className="text-cyan-400" /> Admin LexNova</h1></div>
          <div className="flex gap-4">
            <button onClick={() => setShowOverviewModal(true)} className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-sm font-bold flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Resumen Ejecutivo</button>
            <button onClick={() => { setIsAuthenticated(false); signOut(auth); }} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm">Salir</button>
          </div>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl mb-8 w-fit border border-white/10">
          <button onClick={() => setViewMode('leads')} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'leads' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}><Users className="w-4 h-4" /> Prospectos ({leads.filter(l => l.estado !== 'convertido').length})</button>
          <button onClick={() => setViewMode('clients')} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'clients' ? 'bg-indigo-500/20 text-indigo-300 shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}><FolderOpen className="w-4 h-4" /> Clientes ({clients.length})</button>
        </div>

        {/* TABLAS */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 border-b border-white/5 text-slate-400">
               <tr><th className="p-4">Titular</th><th className="p-4">Contacto</th><th className="p-4 text-right">Acción</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {viewMode === 'leads' ? (
                leads.filter(l => l.estado !== 'convertido').map(l => (
                  <tr key={l.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold">{l.name}</td>
                    <td className="p-4">{l.email}</td>
                    <td className="p-4 text-right"><button onClick={() => { setLeadToConvert(l); setConversionData({ nombres: l.name, email: l.email, telefono: l.phone }); setIsConversionModalOpen(true); }} className="bg-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold">Convertir</button></td>
                  </tr>
                ))
              ) : (
                clients.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-bold">{c.nombre}</td>
                    <td className="p-4">{c.expediente}</td>
                    <td className="p-4 text-right"><button onClick={() => { setEditingClient(c); setIsClientModalOpen(true); }} className="bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold">Gestionar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CONVERSIÓN */}
      {isConversionModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-bold text-white mb-6 italic">Formalización de Cliente</h3>
            <form onSubmit={convertLead} className="space-y-4">
              <input value={conversionData.nombres} onChange={e => setConversionData({...conversionData, nombres: e.target.value})} className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none" placeholder="Nombre" required />
              <input type="email" value={conversionData.email} onChange={e => setConversionData({...conversionData, email: e.target.value})} className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white outline-none" placeholder="Email" required />
              <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">{loading ? 'Procesando...' : 'Crear Cuenta'}</button>
              <button type="button" onClick={() => setIsConversionModalOpen(false)} className="w-full text-slate-500 text-sm">Cerrar</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESUMEN EJECUTIVO (RESTAURADO) */}
      {showOverviewModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 bg-slate-950 flex justify-between items-center">
              <div className="flex items-center gap-4"><Target className="text-cyan-400" /><h3 className="text-2xl font-bold text-white italic">Executive Analytics</h3></div>
              <button onClick={() => setShowOverviewModal(false)} className="text-slate-400 hover:text-white"><X /></button>
            </div>
            <div className="p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl">
                   <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Salud de Cartera</p>
                   <p className="text-3xl font-extrabold text-emerald-400">{formatCOP(clientsStats.totalRecaudo)}</p>
                </div>
                <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl">
                   <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Demandas en IA</p>
                   <p className="text-3xl font-extrabold">{leadsStats.total}</p>
                </div>
                <div className="bg-slate-950 border border-white/5 p-6 rounded-2xl">
                   <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Casos Activos</p>
                   <p className="text-3xl font-extrabold">{clientsStats.total}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-white/5 p-12 rounded-2xl border border-white/5 text-center text-slate-500 italic">Métrica de Distribución Visual</div>
                 <div className="bg-white/5 p-12 rounded-2xl border border-white/5 text-center text-slate-500 italic">Métrica de Crecimiento Mensual</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = ({ onOpenAdmin }) => (
  <footer className="bg-slate-950 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <p className="text-slate-600 text-sm">© 2026 LexNova Digital Experiences.</p>
      <button onClick={onOpenAdmin} className="text-cyan-400 flex items-center gap-1 font-bold text-xs"><ShieldCheck size={14}/> Acceso Admin</button>
    </div>
  </footer>
);

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'leads'), {
        ...formData, estado: 'nuevo', fechaRegistro: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => { onClose(); setSuccess(false); setFormData({name:'', email:'', phone:'', interest:''}); }, 2000);
    } catch (err) { alert("Error."); } finally { setLoading(false); }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-lg">
        {success ? <div className="text-emerald-400 text-center font-bold">¡Enviado!</div> : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 italic">Solicitud de Servicio</h3>
            <input required placeholder="Nombre" className="w-full bg-slate-950 p-3 rounded-xl border border-white/10" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full bg-slate-950 p-3 rounded-xl border border-white/10" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <button className="w-full py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl">Enviar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    }
  }, []);

  if (currentView === 'admin') return <AdminDashboard onExit={() => setCurrentView('landing')} />;

  return (
    <div id="main-scroll-container" className="h-screen overflow-y-auto bg-slate-950 text-slate-50 relative scroll-smooth">
      <NavBar onOpenModal={() => setIsRegistrationOpen(true)} />
      <Hero onOpenModal={() => setIsRegistrationOpen(true)} />
      <ExplainerCards />
      <AILabModule />
      <ClientPortalModule />
      <ComparisonModule />
      <KeyInsights />
      <SuccessStories />
      <Footer onOpenAdmin={() => setCurrentView('admin')} />
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <button onClick={() => document.getElementById('main-scroll-container').scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-8 right-8 p-4 bg-cyan-500 text-slate-950 rounded-full shadow-lg z-50"><ArrowUp /></button>
    </div>
  );
}