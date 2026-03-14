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
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signInAnonymously, 
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

// --- FIREBASE SETUP ---
const myFirebaseConfig = {
  apiKey: "", // Se proveerá en ejecución
  authDomain: "lexnova-production.firebaseapp.com",
  projectId: "lexnova-production",
  storageBucket: "lexnova-production.firebasestorage.app",
  messagingSenderId: "75917035224",
  appId: "1:75917035224:web:cc9219b5896b4460f0f9ad"
};

const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const finalConfig = envConfig && Object.keys(envConfig).length > 0 ? envConfig : myFirebaseConfig;

const app = initializeApp(finalConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'lexnova-production';

// Instancia secundaria para poder crear clientes sin desloguear al Administrador
const secondaryApp = initializeApp(finalConfig, "SecondaryAuth");
const secondaryAuth = getAuth(secondaryApp);

// --- Funciones Globales de Formato ---
const formatCOP = (val) => {
  if (!val) return '';
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

// --- Components ---

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

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl animate-fade-in-down origin-top">
          <div className="flex flex-col px-6 py-6 gap-5">
            <a href="#ecosistema" onClick={(e) => handleNavClick(e, 'ecosistema')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Ecosistema</a>
            <a href="#soluciones" onClick={(e) => handleNavClick(e, 'soluciones')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Soluciones</a>
            <a href="#laboratorio-ia" onClick={(e) => handleNavClick(e, 'laboratorio-ia')} className="text-base font-medium text-slate-300 hover:text-cyan-400 flex items-center gap-2"><Sparkles className="w-4 h-4 text-cyan-400"/> IA Legal</a>
            <a href="#portal-cliente" onClick={(e) => handleNavClick(e, 'portal-cliente')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Portal Clientes</a>
            <hr className="border-white/10 my-2" />
            <button onClick={(e) => handleNavClick(e, 'portal-cliente')} className="flex items-center gap-3 text-base font-medium text-slate-300 hover:text-cyan-400">
              <User className="w-5 h-5" /> Ingresar al Portal
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }} className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-bold mt-2 flex justify-center items-center gap-2 transition-all">
              Solicitar Atención <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
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
        <button onClick={onOpenModal} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] transform hover:-translate-y-1">
          Iniciar Evolución Digital
        </button>
        <button onClick={(e) => scrollToSection(e, 'casos-exito')} className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
          Ver Casos de Éxito
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
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">El Fin del Papel y la Incertidumbre</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un ecosistema diseñado para mitigar riesgos procesales y maximizar la rentabilidad.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
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
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 reveal-on-scroll opacity-0 translate-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" /> <span>IA Legal Lab</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Laboratorio de IA Legal</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 reveal-on-scroll opacity-0 translate-y-10">
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 flex flex-col">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-slate-400" /> Hechos del Expediente</h3>
            <textarea className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-slate-300 h-48 mb-6 outline-none focus:ring-2 focus:ring-cyan-500/50" placeholder="Describe los hechos jurídicos..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <button onClick={analyzeCase} disabled={loading} className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />} Analizar con IA
            </button>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-6 flex flex-col min-h-[400px]">
            {!result && !error && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Cpu className="w-16 h-16 mb-4" /> <p>El análisis aparecerá aquí.</p>
              </div>
            )}
            {result && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h4 className="text-xs uppercase text-slate-500 font-bold mb-2">Resumen Ejecutivo</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.resumen_ejecutivo}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-slate-500 font-bold mb-2">Puntos Clave</h4>
                  <ul className="space-y-1">
                    {result.puntos_clave?.map((p, i) => <li key={i} className="text-sm text-slate-400 flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-cyan-400"/> {p}</li>)}
                  </ul>
                </div>
              </div>
            )}
            {error && <p className="text-red-400 text-sm bg-red-400/10 p-4 rounded-xl">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientPortalModule = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('cliente@lexnova.com');
  const [password, setPassword] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
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
        } else { setError("Perfil de cliente no encontrado."); await signOut(auth); }
      } else { setError("Portal exclusivo para clientes."); await signOut(auth); }
    } catch (err) { setError("Credenciales inválidas."); } finally { setLoading(false); }
  };

  return (
    <section id="portal-cliente" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-sm font-bold mb-6">
            <Lock className="w-4 h-4" /> <span>Portal Transparente</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Portal de Acceso a Clientes</h2>
        </div>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
             <form onSubmit={handleLogin} className="space-y-4">
              {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-cyan-400 outline-none" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold rounded-xl transition-all">
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Ingresar al Portal'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
             <div className="w-full md:w-64 bg-slate-950/50 p-6 border-r border-white/5 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/50">
                    <User className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-sm font-bold text-white truncate">{clientData?.nombres}</p>
                </div>
                <nav className="space-y-2 flex-1">
                  {['resumen', 'documentos', 'facturacion'].map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === t ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </nav>
                <button onClick={() => { setIsLoggedIn(false); signOut(auth); }} className="mt-8 text-red-400 hover:bg-red-400/10 p-3 rounded-xl text-sm flex items-center gap-2"><LogOut className="w-4 h-4"/> Salir</button>
             </div>
             <div className="flex-1 p-10">
               <h3 className="text-2xl font-bold text-white mb-8 capitalize">{activeTab}</h3>
               {activeTab === 'resumen' && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <p className="text-xs text-slate-500 uppercase mb-1">Nombre</p>
                      <p className="text-lg font-bold text-white">{clientData?.nombres}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <p className="text-xs text-slate-500 uppercase mb-1">Cédula / NIT</p>
                      <p className="text-lg font-bold text-white">{clientData?.cedula_nit}</p>
                    </div>
                 </div>
               )}
             </div>
          </div>
        )}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Herramientas Especializadas.</h2>
            <div className="flex flex-col gap-4">
              {Object.keys(content).map((key) => (
                <button key={key} onClick={() => setActiveTab(key)} className={`text-left p-6 rounded-xl border transition-all ${activeTab === key ? 'bg-white/10 border-white/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                  <h3 className={`text-xl font-bold ${activeTab === key ? 'text-white' : 'text-slate-400'}`}>{content[key].title}</h3>
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] reveal-on-scroll opacity-0 translate-y-10 delay-200">
            <div className={`absolute inset-0 rounded-3xl bg-slate-950 border border-white/10 p-10 flex flex-col justify-center`}>
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
  <section id="casos-exito" className="py-24 bg-slate-900 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">Resultados Reales.</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-slate-950 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/50 transition-all">
            <Quote className="text-cyan-400 mb-4" />
            <p className="text-slate-400">"LexNova transformó nuestra firma. Ahora todo es digital y automático."</p>
            <p className="text-white font-bold mt-6">Firma Jurídica {i}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ScrollStory = () => (
  <section className="py-24 max-w-4xl mx-auto px-6">
    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">El Paradigma de 2026</h2>
    <div className="space-y-12">
      <div className="flex gap-6"><div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold shrink-0">1</div><div><h3 className="text-2xl font-bold text-white mb-2">Notificaciones Electrónicas</h3><p className="text-slate-400">Trazabilidad absoluta bajo Ley 527/99.</p></div></div>
      <div className="flex gap-6"><div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">2</div><div><h3 className="text-2xl font-bold text-white mb-2">Ciberseguridad</h3><p className="text-slate-400">Encriptación militar para el secreto profesional.</p></div></div>
    </div>
  </section>
);

const CTASection = ({ onOpenModal }) => (
  <section className="py-24 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-blue-600/5" />
    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Lidera la Práctica Jurídica.</h2>
    <button onClick={onOpenModal} className="px-10 py-5 bg-white text-slate-950 rounded-full font-bold shadow-lg flex items-center gap-3 mx-auto group">
      Solicitar Demo <ArrowRight className="group-hover:translate-x-1 transition-transform" />
    </button>
  </section>
);

const Footer = ({ onOpenLegal, onOpenAdmin }) => (
  <footer className="bg-slate-950 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 font-bold text-lg text-slate-400 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>LexNova</div>
      <p className="text-slate-600 text-sm">© 2026 LexNova Digital Experiences.</p>
      <div className="flex gap-6 text-sm text-slate-500">
        <button onClick={() => onOpenLegal('privacidad')}>Privacidad</button>
        <button onClick={() => onOpenLegal('terminos')}>Términos</button>
        <button onClick={onOpenAdmin} className="text-cyan-400 flex items-center gap-1"><ShieldCheck size={14}/> Admin</button>
      </div>
    </div>
  </footer>
);

const LegalModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <h3 className="text-2xl font-bold text-white mb-4 capitalize">{type}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">Contenido legal detallado según Ley 1581 de 2012 y CGP...</p>
        <button onClick={onClose} className="mt-8 px-6 py-2 bg-white/10 text-white rounded-lg">Cerrar</button>
      </div>
    </div>
  );
};

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'leads'), {
        ...formData, estado: 'nuevo', fechaRegistro: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => { onClose(); setSuccess(false); setFormData({name:'', email:'', phone:'', interest:''}); }, 2000);
    } catch (err) { alert("Error al registrar."); } finally { setLoading(false); }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">Solicitar Atención</h3>
            <input required placeholder="Nombre" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required placeholder="Teléfono" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <select required className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
              <option value="">Interés...</option>
              <option value="ia-legal">IA Legal</option>
              <option value="vigilancia">Vigilancia</option>
            </select>
            <button type="submit" disabled={loading} className="w-full py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl">{loading ? 'Enviando...' : 'Enviar'}</button>
          </form>
        ) : <div className="text-center py-10 text-emerald-400 font-bold">¡Solicitud Enviada!</div>}
      </div>
    </div>
  );
};

const AdminDashboard = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().rol === 'admin') { setIsAuthenticated(true); fetchLeads(); }
      else { setError("No tienes permisos de administrador."); await signOut(auth); }
    } catch (err) { setError("Credenciales incorrectas."); } finally { setLoading(false); }
  };

  const fetchLeads = async () => {
    const leadsSnap = await getDocs(collection(db, 'artifacts', appId, 'public', 'data', 'leads'));
    setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const convertToClient = async (lead) => {
    setLoading(true);
    try {
      const tempPass = "Lex" + Math.floor(1000 + Math.random() * 9000);
      const userCred = await createUserWithEmailAndPassword(secondaryAuth, lead.email, tempPass);
      const newUid = userCred.user.uid;
      await signOut(secondaryAuth);

      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', newUid), { uid: newUid, email: lead.email, rol: 'cliente' });
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'clientes', newUid), { idCliente: newUid, nombres: lead.name, email: lead.email, telefono: lead.phone, fechaRegistro: new Date().toISOString() });
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'leads', lead.id), { estado: 'convertido' });
      
      alert(`Cliente creado. Contraseña: ${tempPass}`);
      fetchLeads();
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-slate-900 border border-white/10 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h2>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={email} onChange={e=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full bg-slate-950 border border-white/10 p-3 rounded-xl text-white" value={password} onChange={e=>setPassword(e.target.value)} required />
            <button type="submit" disabled={loading} className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl">{loading ? 'Entrando...' : 'Entrar'}</button>
          </form>
          <button onClick={onExit} className="mt-4 w-full text-slate-500 text-sm">Regresar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-6xl mx-auto flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={()=>{setIsAuthenticated(false); signOut(auth);}} className="text-red-400 flex items-center gap-2"><LogOut size={18}/> Salir</button>
      </div>
      <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400"><tr><th className="p-4">Nombre</th><th className="p-4">Email</th><th className="p-4 text-right">Acción</th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {leads.map(l => (
              <tr key={l.id} className="hover:bg-white/5">
                <td className="p-4">{l.name}</td><td className="p-4">{l.email}</td>
                <td className="p-4 text-right">{l.estado !== 'convertido' && <button onClick={()=>convertToClient(l)} className="bg-indigo-600 px-3 py-1 rounded-lg text-xs">Convertir</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacidad' });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
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
      <ScrollStory />
      <CTASection onOpenModal={() => setIsRegistrationOpen(true)} />
      
      <Footer onOpenLegal={(type) => setLegalModal({ isOpen: true, type })} onOpenAdmin={() => setCurrentView('admin')} />
      
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />
      <LegalModal isOpen={legalModal.isOpen} type={legalModal.type} onClose={() => setLegalModal({ ...legalModal, isOpen: false })} />
      
      <button onClick={() => document.getElementById('main-scroll-container').scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-8 right-8 p-4 bg-cyan-500 text-slate-950 rounded-full shadow-lg z-50">
        <ArrowUp />
      </button>
    </div>
  );
}