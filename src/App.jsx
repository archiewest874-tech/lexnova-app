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
  Plus
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';

// --- FIREBASE SETUP ---
const myFirebaseConfig = {
  apiKey: "AIzaSyCUSLPFX9ER2M8wBO2LZ34pg6V7kSZGzJU",
  authDomain: "lexnova-production.firebaseapp.com",
  projectId: "lexnova-production",
  storageBucket: "lexnova-production.firebasestorage.app",
  messagingSenderId: "75917035224",
  appId: "1:75917035224:web:cc9219b5896b4460f0f9ad"
};

// --- AI SETUP ---
const myAiConfig = {
  geminiApiKey: "AIzaSyDl7t0OFQDVbIdRCuFUP4ssEVpl1EedSdI" 
};

const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const finalConfig = envConfig && Object.keys(envConfig).length > 0 ? envConfig : myFirebaseConfig;

const app = Object.keys(finalConfig).length > 0 ? initializeApp(finalConfig) : null;
const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'lexnova-production';

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

    container.scrollTo({
      top: scrollPos,
      behavior: "smooth"
    });
  }
};

// --- Components ---

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, targetId) => {
    setIsMobileMenuOpen(false); 
    scrollToSection(e, targetId);
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={(e) => handleNavClick(e, 'inicio')}
          title="Volver al inicio"
        >
          <Scale className="text-cyan-400 w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="text-white font-bold text-xl tracking-tight">Lex<span className="text-cyan-400">Nova</span></span>
        </div>
        
        {/* Menú Desktop */}
        <div className="hidden lg:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#ecosistema" onClick={(e) => handleNavClick(e, 'ecosistema')} className="hover:text-cyan-400 transition-colors cursor-pointer">Ecosistema</a>
          <a href="#soluciones" onClick={(e) => handleNavClick(e, 'soluciones')} className="hover:text-cyan-400 transition-colors cursor-pointer">Soluciones</a>
          <a href="#laboratorio-ia" onClick={(e) => handleNavClick(e, 'laboratorio-ia')} className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"><Sparkles className="w-3 h-3 text-cyan-400"/> IA Legal</a>
          <a href="#portal-cliente" onClick={(e) => handleNavClick(e, 'portal-cliente')} className="hover:text-cyan-400 transition-colors cursor-pointer">Portal Clientes</a>
          <a href="#casos-exito" onClick={(e) => handleNavClick(e, 'casos-exito')} className="hover:text-cyan-400 transition-colors cursor-pointer">Éxito</a>
        </div>
        
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={(e) => handleNavClick(e, 'portal-cliente')}
            className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors items-center gap-2 flex"
          >
            <User className="w-4 h-4" />
            Ingresar
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-white/10 flex items-center gap-2 group">
            Explorar Plataforma
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <button 
          className="lg:hidden text-slate-300 hover:text-white p-2 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Panel Desplegable Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-white/10 shadow-2xl animate-fade-in-down origin-top">
          <div className="flex flex-col px-6 py-6 gap-5">
            <a href="#ecosistema" onClick={(e) => handleNavClick(e, 'ecosistema')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Ecosistema</a>
            <a href="#soluciones" onClick={(e) => handleNavClick(e, 'soluciones')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Soluciones</a>
            <a href="#laboratorio-ia" onClick={(e) => handleNavClick(e, 'laboratorio-ia')} className="text-base font-medium text-slate-300 hover:text-cyan-400 flex items-center gap-2"><Sparkles className="w-4 h-4 text-cyan-400"/> IA Legal</a>
            <a href="#portal-cliente" onClick={(e) => handleNavClick(e, 'portal-cliente')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Portal Clientes</a>
            <a href="#casos-exito" onClick={(e) => handleNavClick(e, 'casos-exito')} className="text-base font-medium text-slate-300 hover:text-cyan-400">Casos de Éxito</a>
            
            <hr className="border-white/10 my-2" />
            
            <button 
              onClick={(e) => handleNavClick(e, 'portal-cliente')}
              className="flex items-center gap-3 text-base font-medium text-slate-300 hover:text-cyan-400"
            >
              <User className="w-5 h-5" />
              Ingresar al Portal
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-bold mt-2 flex justify-center items-center gap-2 transition-all">
              Explorar Plataforma
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onOpenModal }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-10 animate-fade-in-down">
          <Zap className="w-4 h-4" />
          <span>El futuro del litigio y la gestión legal</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight leading-tight mb-16 pb-4">
          Transformación Digital <br className="hidden md:block"/> para el Abogado Moderno.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 mt-4 leading-relaxed">
          Supera las barreras del Código General del Proceso. Centraliza expedientes, automatiza tiempos y potencia tu firma con Inteligencia Artificial y gestión CRM avanzada.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onOpenModal}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
          >
            Iniciar Evolución Digital
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'casos-exito')}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            Ver Casos de Éxito
          </button>
        </div>
      </div>
    </section>
  );
};

const ExplainerCards = () => {
  useScrollReveal();
  
  const cards = [
    {
      icon: <Database className="w-8 h-8 text-blue-400" />,
      title: "Vigilancia Judicial Automatizada",
      desc: "Conexión directa con la Rama Judicial. Monitoreo 24/7 de estados, autos y providencias sin revisión manual."
    },
    {
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      title: "Inteligencia Artificial Legal",
      desc: "Redacción de documentos, resumen de jurisprudencia y análisis de riesgos legales impulsados por IA."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
      title: "Gestión de Expedientes",
      desc: "Control absoluto de plazos, audiencias y documentos centralizados en un entorno seguro en la nube."
    }
  ];

  return (
    <section id="ecosistema" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">El Fin del Papel y la Incertidumbre</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Un ecosistema diseñado para mitigar riesgos procesales, evitar el vencimiento de términos y maximizar la rentabilidad de cada asunto legal.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 group reveal-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
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

  const loadExample = () => {
    setInputText(`Hechos: El día 15 de marzo de 2025, el trabajador Juan Pérez fue despedido de la empresa Industrias XYZ bajo la causal de "bajo rendimiento". Sin embargo, no se llevó a cabo ningún proceso disciplinario previo, ni se le otorgaron memorandos o descargos. El trabajador tenía fuero sindical vigente hasta diciembre de 2025. El empleado busca demandar por despido injustificado y violación al debido proceso laboral.`);
  };

  const fetchWithRetry = async (url, options, retries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 400 && errorText.includes("API key not valid")) {
             throw new Error("API_KEY_INVALID");
          }
          if (response.status === 401 || response.status === 403) throw new Error(`Error de autenticación: ${response.status}`);
          if (response.status >= 400 && response.status < 500 && response.status !== 429) throw new Error(`Error de cliente: ${response.status}`);
          throw new Error(`Error de red o servidor: ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        if (i === retries - 1 || err.message === "API_KEY_INVALID" || err.message.includes("Error de autenticación") || err.message.includes("Error de cliente")) throw err;
        await new Promise(resolve => setTimeout(resolve, delays[i]));
      }
    }
  };

  const analyzeCase = async () => {
    if (!inputText.trim()) {
      setError("Por favor, ingresa los hechos del caso procesal.");
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);

    const activeApiKey = myAiConfig.geminiApiKey; 
    
    if (!activeApiKey) {
        setError("La API Key de Gemini no está configurada. Por favor, añádela en la constante myAiConfig al inicio del archivo.");
        setLoading(false);
        return;
    }

    const model = "gemini-2.5-flash-preview-09-2025"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeApiKey}`;

    const systemPrompt = `Actúa como un abogado experto y analista legal de una firma top. Analiza los hechos o el caso legal proporcionado. 
    Debes devolver un JSON estrictamente estructurado que resuma el caso, extraiga los puntos clave procesales o materiales, y asigne un nivel de riesgo (Bajo, Medio, Alto) con una breve recomendación.`;

    const payload = {
      contents: [{ parts: [{ text: `${systemPrompt}\n\nTexto a analizar:\n${inputText}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            resumen_ejecutivo: { type: "STRING" },
            puntos_clave: { type: "ARRAY", items: { type: "STRING" } },
            nivel_riesgo: { type: "STRING" },
            recomendacion: { type: "STRING" }
          },
          required: ["resumen_ejecutivo", "puntos_clave", "nivel_riesgo", "recomendacion"]
        }
      }
    };

    try {
      const data = await fetchWithRetry(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (responseText) {
        const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        setResult(JSON.parse(cleanText));
      } else {
        throw new Error("Respuesta inválida de la IA.");
      }
    } catch (err) {
      if (err.message === "API_KEY_INVALID" || err.message.includes("Error de autenticación")) {
        setError("La API Key configurada es inválida o no tiene permisos.");
      } else if (err.message.includes("Error de cliente: 404")) {
         setError(`Error 404: El modelo ${model} no está disponible con esta configuración de API Key.`);
      } else {
        setError("No se pudo conectar con la Inteligencia Artificial. Revisa la consola para más detalles.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="laboratorio-ia" className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 reveal-on-scroll opacity-0 translate-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Desarrollado con Gemini API</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Laboratorio de IA Legal</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Prueba cómo nuestra Inteligencia Artificial extrae, analiza y evalúa expedientes legales en segundos. Pega el contexto de un caso real y observa la magia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 reveal-on-scroll opacity-0 translate-y-10">
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" />
                Hechos del Expediente
              </h3>
              <button 
                onClick={loadExample}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/30 underline-offset-4"
              >
                Cargar caso de ejemplo
              </button>
            </div>

            <textarea
              className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none h-48 mb-6 transition-all"
              placeholder="Describe los hechos jurídicos, el contexto del litigio o pega el resumen de la demanda aquí..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={analyzeCase}
              disabled={loading}
              className="mt-auto w-full py-4 bg-white hover:bg-slate-200 text-slate-950 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analizando jurisprudencia...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:text-cyan-600 transition-colors" />
                  ✨ Analizar con IA
                </>
              )}
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col min-h-[400px]">
            {!result && !error && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Cpu className="w-16 h-16 mb-4 text-slate-600" />
                <p>El análisis estructurado aparecerá aquí.</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {result && !loading && (
              <div className="animate-fade-in-up space-y-6 h-full flex flex-col">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Resumen Ejecutivo</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{result.resumen_ejecutivo}</p>
                </div>
                
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Puntos Clave Identificados</h4>
                  <ul className="space-y-2">
                    {result.puntos_clave.map((punto, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      <ShieldCheck className={`w-6 h-6 ${
                        result.nivel_riesgo.toLowerCase().includes('alto') ? 'text-red-400' : 
                        result.nivel_riesgo.toLowerCase().includes('medio') ? 'text-yellow-400' : 'text-emerald-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Nivel de Riesgo</p>
                      <p className="text-white font-bold">{result.nivel_riesgo}</p>
                    </div>
                  </div>
                  <div className="flex-1 ml-6 pl-6 border-l border-white/5">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Siguiente Paso Sugerido</p>
                    <p className="text-sm text-slate-300 line-clamp-2">{result.recomendacion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientPortalModule = () => {
  useScrollReveal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [email, setEmail] = useState('cliente@ejemplo.com');
  const [password, setPassword] = useState('123456');
  const [clientData, setClientData] = useState(null);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!db) {
      setLoginError("Base de datos no conectada.");
      return;
    }
    
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const clientsRef = collection(db, 'artifacts', appId, 'public', 'data', 'clients');
      const snapshot = await getDocs(clientsRef);
      let foundUser = null;

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.email === email && data.password === password) {
          foundUser = { id: doc.id, ...data };
        }
      });

      if (foundUser) {
        setClientData(foundUser);
        setIsLoggedIn(true);
      } else {
        setLoginError('Credenciales incorrectas o usuario no encontrado.');
      }
    } catch (err) {
      console.error("Error consultando Firebase:", err);
      setLoginError('Error de conexión con la base de datos.');
    } finally {
      setLoginLoading(false);
    }
  };

  const generateDemoUser = async () => {
    if (!db) return;
    setLoginLoading(true);
    setLoginError('');
    try {
      const clientsRef = collection(db, 'artifacts', appId, 'public', 'data', 'clients');
      const demoData = {
        email: 'cliente@ejemplo.com',
        password: '123456',
        nombre: 'Juan Pérez (Firebase Demo)',
        expediente: '#4892-LAB',
        estadoActual: 'Etapa Probatoria',
        proximaAudiencia: '15 Oct, 2026',
        juzgado: '4° Laboral del Circuito',
        timeline: [
          { title: 'Admisión de Demanda', date: '01 Sep, 2026', desc: 'Notificación personal realizada.', done: true },
          { title: 'Contestación de Demanda', date: '15 Sep, 2026', desc: 'La contraparte allegó respuesta y excepciones.', done: true },
          { title: 'Fijación de Audiencia Inicial', date: 'Pendiente', desc: 'A la espera de auto admisorio para fijar fecha.', done: false }
        ],
        documentos: [
          { name: 'Poder Firmado.pdf', date: '10 Ago, 2026' },
          { name: 'Demanda Laboral Radicada.pdf', date: '01 Sep, 2026' },
          { name: 'Auto Admisorio Juzgado 4.pdf', date: '05 Sep, 2026' }
        ]
      };
      await addDoc(clientsRef, demoData);
      setLoginError('¡Usuario Demo creado en Firebase! Ahora haz clic en Ingresar.');
    } catch (err) {
      setLoginError('Error creando el demo: ' + err.message);
    }
    setLoginLoading(false);
  };

  return (
    <section id="portal-cliente" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-sm font-bold mb-6">
            <Lock className="w-4 h-4" />
            <span>Transparencia y Seguridad (Ley 527/99)</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Portal de Acceso a Clientes</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Descubre cómo tus clientes interactuarán con su información. Otorga acceso 24/7 a expedientes, notificaciones procesales y estado de facturación.
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl reveal-on-scroll opacity-0 translate-y-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Acceso Seguro</h3>
              <p className="text-sm text-slate-400 mt-2">Ingresa tus credenciales para ver tu expediente</p>
            </div>

            {loginError && (
              <div className={`mb-4 p-3 rounded-xl text-sm ${loginError.includes('creado') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Correo Electrónico</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loginLoading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-xl transition-all mt-4 flex justify-center items-center gap-2"
              >
                {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ingresar al Portal'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-slate-500 mb-3">¿No tienes usuarios de prueba en Firebase?</p>
              <button 
                onClick={generateDemoUser}
                disabled={loginLoading}
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <Database className="w-3 h-3" /> Generar Usuario Demo en BD
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row">
            
            <div className="w-full md:w-64 bg-slate-950/50 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/50">
                  <User className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{clientData?.nombre || 'Cliente'}</p>
                  <p className="text-xs text-slate-500">Expediente {clientData?.expediente}</p>
                </div>
              </div>

              <nav className="space-y-2 flex-1">
                {[
                  { id: 'resumen', icon: <Activity className="w-4 h-4" />, label: 'Resumen del Caso' },
                  { id: 'documentos', icon: <FileText className="w-4 h-4" />, label: 'Documentos' },
                  { id: 'facturacion', icon: <CreditCard className="w-4 h-4" />, label: 'Facturación' },
                  { id: 'mensajes', icon: <MessageSquare className="w-4 h-4" />, label: 'Mensajes' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <button 
                onClick={() => { setIsLoggedIn(false); setClientData(null); }}
                className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>

            <div className="flex-1 p-6 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h3>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full border border-slate-900"></span>
                  </button>
                </div>
              </div>

              {activeTab === 'resumen' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Estado Actual</p>
                      <p className="text-lg font-bold text-emerald-400">{clientData?.estadoActual}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Próxima Audiencia</p>
                      <p className="text-lg font-bold text-white flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-cyan-400"/> {clientData?.proximaAudiencia}</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Juzgado Asignado</p>
                      <p className="text-lg font-bold text-white">{clientData?.juzgado}</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6">
                    <h4 className="text-white font-semibold mb-6">Línea de Tiempo del Proceso</h4>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-transparent">
                      {clientData?.timeline?.map((step, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-slate-900 ${step.done ? 'bg-cyan-400' : 'bg-slate-700'} text-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow`} />
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                            <div className="flex justify-between items-center mb-1">
                              <h5 className={`font-bold text-sm ${step.done ? 'text-white' : 'text-slate-500'}`}>{step.title}</h5>
                              <span className="text-xs text-slate-500">{step.date}</span>
                            </div>
                            <p className="text-xs text-slate-400">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documentos' && (
                <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden animate-fade-in">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/50 border-b border-white/5 text-slate-400">
                      <tr>
                        <th className="p-4 font-medium">Nombre del Documento</th>
                        <th className="p-4 font-medium hidden sm:table-cell">Fecha</th>
                        <th className="p-4 font-medium text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {clientData?.documentos?.map((doc, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <FileText className="w-4 h-4 text-cyan-400" />
                            {doc.name}
                          </td>
                          <td className="p-4 hidden sm:table-cell">{doc.date}</td>
                          <td className="p-4 text-right">
                            <button className="text-cyan-400 hover:text-white transition-colors p-2 bg-cyan-400/10 rounded-lg">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'facturacion' && (
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in text-center">
                  <CreditCard className="w-16 h-16 text-slate-700 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Al Día</h4>
                  <p className="text-slate-400">No tienes facturas pendientes de pago.</p>
                </div>
              )}

              {activeTab === 'mensajes' && (
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in text-center">
                  <MessageSquare className="w-16 h-16 text-slate-700 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Bandeja de Mensajes Segura</h4>
                  <p className="text-slate-400 max-w-sm">Este canal cumple con las políticas de privacidad y confidencialidad abogado-cliente.</p>
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
    crm: {
      title: "CRM Legal",
      subtitle: "Relación y Captación de Clientes",
      points: ["Gestión de Leads y embudos de conversión.", "Automatización de emails y seguimientos.", "Control de agenda y citas iniciales."],
      color: "from-blue-500 to-indigo-600"
    },
    erp: {
      title: "ERP Jurídico",
      subtitle: "Gestión Financiera y Administrativa",
      points: ["Facturación electrónica y control de caja.", "Registro de horas facturables (Time Tracking).", "Rentabilidad por cliente y socio."],
      color: "from-emerald-400 to-teal-600"
    },
    case: {
      title: "Case Management",
      subtitle: "Control Procesal y Operativo",
      points: ["Integración con plataformas del Estado.", "Notificaciones de vencimiento de términos.", "Repositorio seguro de documentos y pruebas."],
      color: "from-purple-500 to-pink-600"
    }
  };

  return (
    <section id="soluciones" className="py-24 bg-slate-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Herramientas Especializadas para cada Área.</h2>
            <p className="text-slate-400 text-lg mb-8">
              Conoce la diferencia entre las platforms tecnológicas y elige la estructura perfecta para escalar tu firma legal en 2026.
            </p>
            
            <div className="flex flex-col gap-4">
              {Object.keys(content).map((key) => (
                <button 
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                    activeTab === key 
                    ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-1 ${activeTab === key ? 'text-white' : 'text-slate-400'}`}>
                    {content[key].title}
                  </h3>
                  <p className={activeTab === key ? 'text-slate-300' : 'text-slate-500'}>
                    {content[key].subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative h-[400px] reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${content[activeTab].color} opacity-20 blur-3xl transition-colors duration-500`} />
            <div className="absolute inset-0 rounded-3xl bg-slate-950 border border-white/10 p-10 flex flex-col justify-center overflow-hidden">
              <div className="relative z-10">
                <Layers className={`w-12 h-12 mb-6 text-white`} />
                <h3 className="text-3xl font-bold text-white mb-8">{content[activeTab].title}</h3>
                <ul className="space-y-4">
                  {content[activeTab].points.map((point, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-300 text-lg">
                      <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KeyInsights = () => {
  useScrollReveal();
  
  const stats = [
    { value: "85%", label: "Reducción en tiempo de revisión manual de procesos." },
    { value: "0", label: "Vencimientos de términos reportados por usuarios." },
    { value: "3x", label: "Aumento en la rentabilidad por abogado facturable." }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 reveal-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                {stat.value}
              </div>
              <div className="text-slate-300 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessStories = () => {
  useScrollReveal();

  const stories = [
    {
      id: 1,
      client: "Navarro & Asociados",
      type: "Firma Corporativa (B2B)",
      metric: "90%",
      metricLabel: "Ahorro de horas semanales",
      description: "Al implementar el sistema de Vigilancia Judicial Automatizada, el equipo de paralegales dejó de revisar manualmente las páginas de la rama judicial, evitando por completo el vencimiento de términos.",
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />
    },
    {
      id: 2,
      client: "LexCorp Litigio Penal",
      type: "Boutique Especializada",
      metric: "10x",
      metricLabel: "Velocidad en análisis",
      description: "El Laboratorio de IA Legal nos permite extraer los puntos clave y el nivel de riesgo de sentencias extensas en segundos, dándonos una ventaja competitiva al estructurar nuestra teoría del caso.",
      icon: <Sparkles className="w-6 h-6 text-blue-400" />
    },
    {
      id: 3,
      client: "García Abogados",
      type: "Práctica Independiente",
      metric: "+40%",
      metricLabel: "Retención de clientes",
      description: "La integración del Portal de Clientes generó una transparencia absoluta. Nuestros clientes ya no nos llaman ansiosos por saber cómo va su proceso; simplemente inician sesión y lo ven en tiempo real.",
      icon: <Award className="w-6 h-6 text-indigo-400" />
    }
  ];

  return (
    <section id="casos-exito" className="py-24 bg-slate-900 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-sm font-bold mb-6">
            <Quote className="w-4 h-4" />
            <span>Historias de Impacto Real</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Resultados que transforman Firmas.</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Descubre cómo firmas jurídicas de distintos tamaños han revolucionado su operación diaria y su rentabilidad utilizando nuestra plataforma tecnológica.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div 
              key={story.id} 
              className="group relative bg-slate-950 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-500 reveal-on-scroll opacity-0 translate-y-10 flex flex-col h-full"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 group-hover:to-cyan-500/10 rounded-3xl transition-colors duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">{story.client}</h3>
                    <p className="text-sm text-slate-500 mt-1">{story.type}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {story.icon}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {story.metric}
                  </div>
                  <div className="text-sm font-medium text-slate-300 uppercase tracking-wide mt-2">
                    {story.metricLabel}
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed flex-1">
                  "{story.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollStory = () => {
  useScrollReveal();

  return (
    <section id="tendencias" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">El Paradigma de 2026</h2>
          <p className="text-xl text-slate-400">La tecnología ya no es opcional, es el estándar de oro para garantizar la estabilidad de la cosa juzgada y el derecho de postulación.</p>
        </div>

        <div className="space-y-12">
          <div className="flex gap-6 reveal-on-scroll opacity-0 translate-y-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold z-10">1</div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <div className="pb-12">
              <h3 className="text-2xl font-bold text-white mb-3">Audiencias y Notificaciones Electrónicas</h3>
              <p className="text-slate-400 leading-relaxed">Conforme a las actualizaciones de la Ley 2452 y el CGP, la presencialidad es la excepción. Los despachos requieren infraestructura digital segura (Ley 527/99) para trazabilidad de mensajes de datos e historial procesal inalterable.</p>
            </div>
          </div>

          <div className="flex gap-6 reveal-on-scroll opacity-0 translate-y-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold z-10">2</div>
              <div className="w-px h-full bg-white/10 mt-4"></div>
            </div>
            <div className="pb-12">
              <h3 className="text-2xl font-bold text-white mb-3">Ciberseguridad como Deber Fiduciario</h3>
              <p className="text-slate-400 leading-relaxed">El secreto profesional migra a la nube. En 2026, los servidores locales son un riesgo. La encriptación militar, control de accesos 2FA y copias de seguridad continuas son obligatorias para cualquier firma top.</p>
            </div>
          </div>

          <div className="flex gap-6 reveal-on-scroll opacity-0 translate-y-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold z-10">3</div>
            </div>
            <div className="pb-4">
              <h3 className="text-2xl font-bold text-white mb-3">La Toma de Decisiones Basada en Datos (Analytics)</h3>
              <p className="text-slate-400 leading-relaxed">Las firmas exitosas operan como empresas tecnológicas. Analizan la carga laboral, la rentabilidad por expediente y el porcentaje de éxito en litigios mediante dashboards avanzados en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ onOpenModal }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/30 to-cyan-400/30 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ShieldCheck className="w-16 h-16 text-cyan-400 mx-auto mb-8" />
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Lidera la Práctica Jurídica.
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Únete a la nueva era del Derecho. Centraliza tu despacho, asegura tu información y eleva el nivel de tu servicio a estándares internacionales.
        </p>
        <button 
          onClick={onOpenModal}
          className="px-10 py-5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-lg transition-all flex items-center gap-3 mx-auto group shadow-[0_0_40px_rgba(255,255,255,0.2)]"
        >
          Solicitar Demostración Gratuita
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const Footer = ({ onOpenLegal, onOpenAdmin }) => (
  <footer className="bg-slate-950 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <Scale className="text-slate-500 w-6 h-6" />
        <span className="text-slate-400 font-semibold text-lg">LexNova</span>
      </div>
      <p className="text-slate-600 text-sm text-center md:text-left flex-1 md:ml-8">
        © 2026 LexNova Digital Experiences. Todos los derechos reservados.
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
        <button onClick={() => onOpenLegal('privacidad')} className="hover:text-cyan-400 transition-colors">Privacidad</button>
        <button onClick={() => onOpenLegal('terminos')} className="hover:text-cyan-400 transition-colors">Términos</button>
        <button onClick={() => onOpenLegal('contacto')} className="hover:text-cyan-400 transition-colors">Contacto</button>
        <span className="text-white/20">|</span>
        <button onClick={onOpenAdmin} className="hover:text-cyan-400 transition-colors flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Portal Admin
        </button>
      </div>
    </div>
  </footer>
);

const LegalModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    privacidad: {
      title: "Política de Privacidad",
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      body: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p><strong>1. Tratamiento de Datos Personales</strong><br/>De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, LexNova garantiza la protección, confidencialidad y seguridad de los datos personales de nuestros usuarios y los de sus clientes.</p>
          <p><strong>2. Finalidad de la Información</strong><br/>La información recopilada se utilizará exclusively para el acceso a la plataforma, notificaciones procesales automatizadas, y gestión de facturación, manteniendo el estricto secreto profesional abogado-cliente.</p>
          <p><strong>3. Seguridad y Mensajes de Datos</strong><br/>Implementamos encriptación de nivel militar y protocolos de seguridad bajo los estándares de la Ley 527 de 1999, garantizando la inalterabilidad y validez probatoria de la información alojada.</p>
          <p><strong>4. Derechos del Titular</strong><br/>Usted tiene derecho a conocer, actualizar, rectificar y solicitar la eliminación de sus datos en cualquier momento escribiendo a nuestro oficial de privacidad en <span className="text-cyan-400">privacidad@lexnova.com</span>.</p>
        </div>
      )
    },
    terminos: {
      title: "Términos y Condiciones",
      icon: <FileText className="w-6 h-6 text-cyan-400" />,
      body: (
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p><strong>1. Aceptación del Acuerdo</strong><br/>Al acceder, navegar y utilizar la plataforma LexNova, usted acepta estar legalmente sujeto a estos Términos y Condiciones de uso (SaaS Legal).</p>
          <p><strong>2. Uso Permitido de la Plataforma</strong><br/>LexNova está diseñada exclusivamente para la gestión de procesos legales, control de expedientes y administración de firmas jurídicas. Queda estrictamente prohibido su uso para fines ilícitos o de ingeniería inversa.</p>
          <p><strong>3. Acuerdos de Nivel de Servicio (SLA)</strong><br/>LexNova se esfuerza por mantener una disponibilidad del 99.9%. Sin embargo, no nos hacemos responsables por la indisponibilidad derivada de fallas en los sistemas propios de la Rama Judicial u otras entidades gubernamentales conectadas.</p>
          <p><strong>4. Propiedad Intelectual</strong><br/>El código fuente, los algoritmos de Inteligencia Artificial, el diseño de la interfaz y la marca registrada son propiedad exclusiva de LexNova Digital Experiences.</p>
        </div>
      )
    },
    contacto: {
      title: "Contacto y Soporte",
      icon: <MessageSquare className="w-6 h-6 text-cyan-400" />,
      body: (
        <div className="space-y-6 text-slate-300 text-sm">
          <p>¿Tienes dudas técnicas, necesitas soporte con la integración de tu firma o deseas reportar un incidente? Nuestro equipo de ingenieros y especialistas legales está listo para ayudarte.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
                <Phone className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Línea de Atención Nacional</p>
                <p className="text-slate-400">+57 300 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                <MessageSquare className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Soporte Técnico y Ayuda</p>
                <p className="text-slate-400">soporte@lexnova.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                <Briefcase className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Oficinas Corporativas</p>
                <p className="text-slate-400">Edificio Business Center, Piso 12, Bogotá, Colombia.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const currentContent = content[type] || content['privacidad'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
              {currentContent.icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{currentContent.title}</h3>
          </div>
          
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            {currentContent.body}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button 
              onClick={onClose} 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegistrationModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (db && user) {
        const leadsRef = collection(db, 'artifacts', appId, 'public', 'data', 'leads');
        await addDoc(leadsRef, {
          ...formData,
          fechaRegistro: new Date().toISOString(),
          userId: user.uid,
          estado: 'nuevo_prospecto'
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.warn("Lead simulado. Configura Firebase en myFirebaseConfig para guardarlo realmente:", formData);
      }
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', interest: '' });
        onClose();
      }, 3000); 
    } catch (error) {
      console.error("Error al guardar el registro:", error);
      setErrorMsg("Error de conexión. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative z-10">
          {!isSuccess ? (
            <>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Da el siguiente paso</h3>
                <p className="text-slate-400">Completa tus datos y un experto legaltech te contactará para una demostración personalizada.</p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" 
                      placeholder="Dr. Carlos Mendoza" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Correo Corporativo</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" 
                        placeholder="contacto@firma.com" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Teléfono</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" 
                        placeholder="+57 300 000 0000" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Área de Interés Principal</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                    <select 
                      required
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-white appearance-none focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-900">Selecciona una solución...</option>
                      <option value="case-management" className="bg-slate-900">Gestión de Expedientes y Litigios (CRM/ERP)</option>
                      <option value="vigilancia" className="bg-slate-900">Vigilancia Judicial Automatizada</option>
                      <option value="ia-legal" className="bg-slate-900">Laboratorio de Inteligencia Artificial Legal</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronRight className="w-5 h-5 text-slate-500 rotate-90" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Agendar Presentación Gratuita
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-4">
                  Al enviar, aceptas nuestra política de tratamiento de datos según la Ley de Protección de Datos Personales (Ley 1581).
                </p>
              </form>
            </>
          ) : (
            <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">¡Solicitud Recibida!</h3>
              <p className="text-slate-400 max-w-xs mx-auto">
                Hemos registrado tus datos de forma exitosa. Nuestro equipo se pondrá en contacto contigo muy pronto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MÓDULO DASHBOARD ADMIN MEJORADO CON CLIENTES ---
const AdminDashboard = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // Data States
  const [viewMode, setViewMode] = useState('leads'); // 'leads' o 'clients'
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // KPI States
  const [leadsStats, setLeadsStats] = useState({ total: 0, thisWeek: 0, topInterest: '-' });
  const [clientsStats, setClientsStats] = useState({ total: 0, activeCases: 0, nextHearings: 0 });

  // Estados para el Modal de Conversión (Ficha de Ingreso)
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState(null);
  const [conversionData, setConversionData] = useState({
    nombres: '',
    cedula: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoCaso: '',
    fechaInicio: new Date().toISOString().split('T')[0] // Fecha actual por defecto YYYY-MM-DD
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'lexnova2026') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setErrorMsg('Contraseña incorrecta.');
      setPasscode('');
    }
  };

  const calculateLeadsStats = (data) => {
    const total = data.length;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = data.filter(lead => new Date(lead.fechaRegistro) > oneWeekAgo).length;

    const interestCounts = data.reduce((acc, lead) => {
      acc[lead.interest] = (acc[lead.interest] || 0) + 1;
      return acc;
    }, {});
    
    let topInterest = 'N/A';
    let maxCount = 0;
    for (const [key, value] of Object.entries(interestCounts)) {
      if (value > maxCount) {
        maxCount = value;
        topInterest = key === 'ia-legal' ? 'IA Legal' : key === 'vigilancia' ? 'Vigilancia' : 'Case Mgmt';
      }
    }
    setLeadsStats({ total, thisWeek, topInterest });
  };

  const calculateClientsStats = (data) => {
    const total = data.length;
    const activeCases = data.filter(c => c.estadoActual && !c.estadoActual.toLowerCase().includes('cerrado')).length;
    const nextHearings = data.filter(c => c.proximaAudiencia && !c.proximaAudiencia.toLowerCase().includes('pendiente')).length;
    setClientsStats({ total, activeCases, nextHearings });
  };

  const fetchData = async () => {
    if (!db) return;
    setLoading(true);
    try {
      // 1. Obtener Leads
      const leadsRef = collection(db, 'artifacts', appId, 'public', 'data', 'leads');
      const leadsSnap = await getDocs(leadsRef);
      const leadsData = [];
      leadsSnap.forEach(doc => leadsData.push({ id: doc.id, ...doc.data() }));
      leadsData.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
      setLeads(leadsData);
      calculateLeadsStats(leadsData);

      // 2. Obtener Clientes
      const clientsRef = collection(db, 'artifacts', appId, 'public', 'data', 'clients');
      const clientsSnap = await getDocs(clientsRef);
      const clientsData = [];
      clientsSnap.forEach(doc => clientsData.push({ id: doc.id, ...doc.data() }));
      setClients(clientsData);
      calculateClientsStats(clientsData);

    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  // Abrir la ficha de ingreso al hacer clic en convertir
  const openConversionModal = (lead) => {
    setLeadToConvert(lead);
    // Pre-llenar los datos que ya tenemos del Lead
    setConversionData({
      nombres: lead.name || '',
      cedula: '',
      email: lead.email || '',
      telefono: lead.phone || '',
      direccion: '',
      tipoCaso: lead.interest === 'ia-legal' ? 'Asesoría IA Legal' : (lead.interest === 'vigilancia' ? 'Vigilancia Judicial' : 'Representación Litigiosa'),
      fechaInicio: new Date().toISOString().split('T')[0]
    });
    setIsConversionModalOpen(true);
  };

  // Procesar la creación real del cliente desde el formulario
  const submitConversion = async (e) => {
    e.preventDefault();
    if (!db || !leadToConvert) return;
    setLoading(true);
    setErrorMsg('');
    
    try {
      // 1. Crear un nuevo Cliente en Firebase con los datos ampliados
      const clientsRef = collection(db, 'artifacts', appId, 'public', 'data', 'clients');
      const newExpediente = `#${Math.floor(Math.random() * 9000) + 1000}-${conversionData.tipoCaso.substring(0,3).toUpperCase()}`;
      
      await addDoc(clientsRef, {
        email: conversionData.email,
        password: 'lexnova' + Math.floor(Math.random() * 1000), // Contraseña auto-generada
        nombre: conversionData.nombres,
        cedula: conversionData.cedula,
        telefono: conversionData.telefono,
        direccion: conversionData.direccion,
        tipoCaso: conversionData.tipoCaso,
        fechaInicioContrato: conversionData.fechaInicio, // Dato clave para métricas futuras
        expediente: newExpediente,
        estadoActual: 'Estudio Inicial',
        proximaAudiencia: 'Pendiente de fijación',
        juzgado: 'Por Asignar',
        timeline: [
          { title: 'Firma de Contrato', date: conversionData.fechaInicio, desc: 'Inicio formal de la relación comercial e ingreso al sistema.', done: true },
          { title: 'Recepción de Documentos', date: 'Pendiente', desc: 'A la espera de anexos y poderes para iniciar gestión.', done: false }
        ],
        documentos: []
      });

      // 2. Marcar el Lead original como convertido
      const leadDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'leads', leadToConvert.id);
      await updateDoc(leadDocRef, { estado: 'convertido' });

      setSuccessMsg(`¡Ficha creada! ${conversionData.nombres} es ahora un cliente activo.`);
      setIsConversionModalOpen(false);
      setLeadToConvert(null);
      setTimeout(() => setSuccessMsg(''), 4000);
      
      await fetchData(); // Refrescar las tablas
    } catch (error) {
      console.error("Error en conversión:", error);
      setErrorMsg("Ocurrió un error al guardar la ficha del cliente.");
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVOS ESTADOS Y FUNCIONES PARA GESTIÓN DE CLIENTE ---
  const [editingClient, setEditingClient] = useState(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newTimelineTitle, setNewTimelineTitle] = useState('');

  const openClientDetail = (client) => {
    // Clonamos el cliente y aseguramos que honorarios exista
    setEditingClient({ ...client, honorarios: client.honorarios || '' });
    setIsClientModalOpen(true);
  };

  const handleAddDocument = () => {
    if (!newDocName.trim()) return;
    setEditingClient(prev => ({
      ...prev,
      documentos: [
        ...(prev.documentos || []), 
        { name: newDocName + '.pdf', date: new Date().toLocaleDateString() }
      ]
    }));
    setNewDocName('');
  };

  const handleAddTimeline = () => {
    if (!newTimelineTitle.trim()) return;
    setEditingClient(prev => ({
      ...prev,
      timeline: [
        ...(prev.timeline || []),
        { title: newTimelineTitle, date: new Date().toLocaleDateString(), desc: 'Actualización manual administrativa.', done: true }
      ]
    }));
    setNewTimelineTitle('');
  };

  const saveClientDetails = async (e) => {
    e.preventDefault();
    if (!db || !editingClient) return;
    setLoading(true);
    try {
      const clientDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'clients', editingClient.id);
      const { id, ...dataToSave } = editingClient; // Removemos el id interno antes de guardar
      await updateDoc(clientDocRef, dataToSave);
      
      setSuccessMsg(`¡Expediente de ${editingClient.nombre} actualizado!`);
      setIsClientModalOpen(false);
      setEditingClient(null);
      setTimeout(() => setSuccessMsg(''), 4000);
      
      await fetchData(); // Refresca los datos en la tabla principal
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      setErrorMsg("Ocurrió un error al actualizar la ficha del cliente.");
    } finally {
      setLoading(false);
    }
  };
  // -----------------------------------------------------------

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up z-10">
          <button onClick={onExit} className="absolute top-4 left-4 text-slate-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center mb-8 mt-4">
            <div className="w-16 h-16 bg-slate-950 border border-white/10 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Acceso Restringido</h2>
            <p className="text-sm text-slate-400 mt-2">Área de administración LexNova</p>
          </div>
          
          {errorMsg && <p className="text-red-400 text-sm text-center mb-4 bg-red-400/10 py-2 rounded-lg">{errorMsg}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Contraseña maestra"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Desbloquear Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 animate-fade-in relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Database className="w-8 h-8 text-cyan-400" />
              Intelligence Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Métricas y gestión de ciclo de vida del cliente.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
              <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualizar
            </button>
            <button onClick={onExit} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-colors flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Salir
            </button>
          </div>
        </div>

        {/* Notificación de Éxito al Convertir */}
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-center gap-3 animate-fade-in-down">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-medium">{successMsg}</p>
          </div>
        )}

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl mb-8 w-fit border border-white/10 shadow-lg">
          <button
            onClick={() => setViewMode('leads')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'leads' ? 'bg-white/10 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Users className="w-4 h-4" />
            Prospectos ({leads.filter(l => l.estado !== 'convertido').length})
          </button>
          <button
            onClick={() => setViewMode('clients')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'clients' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FolderOpen className="w-4 h-4" />
            Clientes Activos ({clients.length})
          </button>
        </div>

        {/* --- TARJETAS DE ESTADÍSTICAS (Dependen del ViewMode) --- */}
        {viewMode === 'leads' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Histórico</p>
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-4xl font-bold text-white">{leadsStats.total}</p>
              <p className="text-xs text-slate-500 mt-2">Leads capturados global</p>
            </div>
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Nuevos (7 Días)</p>
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-4xl font-bold text-white">{leadsStats.thisWeek}</p>
              <p className="text-xs text-emerald-400/80 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Tendencia actual</p>
            </div>
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Servicio Top</p>
                <PieChart className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white mt-2">{leadsStats.topInterest}</p>
              <p className="text-xs text-slate-500 mt-2">Mayor intención de compra</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Cartera de Clientes</p>
                <Briefcase className="w-5 h-5 text-indigo-400" />
              </div>
              <p className="text-4xl font-bold text-white">{clientsStats.total}</p>
              <p className="text-xs text-slate-500 mt-2">Fichas creadas en portal</p>
            </div>
            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Casos Activos</p>
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-4xl font-bold text-white">{clientsStats.activeCases}</p>
              <p className="text-xs text-slate-500 mt-2">Expedientes en curso</p>
            </div>
            <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Audiencias Fijadas</p>
                <CalendarCheck className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-4xl font-bold text-white">{clientsStats.nextHearings}</p>
              <p className="text-xs text-slate-500 mt-2">Requieren atención próxima</p>
            </div>
          </div>
        )}

        {/* --- TABLAS (Dependen del ViewMode) --- */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-slate-950/50">
            <h2 className="text-lg font-semibold text-white">
              {viewMode === 'leads' ? 'Bandeja de Entrada Web' : 'Directorio de Expedientes'}
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Buscar..." className="w-full md:w-64 bg-slate-900 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {viewMode === 'leads' ? (
              <table className="w-full text-left text-sm whitespace-nowrap animate-fade-in">
                <thead className="bg-slate-950/80 border-b border-white/5 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Nombre Completo</th>
                    <th className="p-4 font-medium">Contacto</th>
                    <th className="p-4 font-medium">Área de Interés</th>
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && leads.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Cargando prospectos...</td></tr>
                  ) : leads.filter(l => l.estado !== 'convertido').length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">No hay prospectos pendientes. ¡Buen trabajo!</td></tr>
                  ) : (
                    leads.filter(l => l.estado !== 'convertido').map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{lead.name}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300">{lead.email}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{lead.phone}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs">
                            {lead.interest === 'ia-legal' ? 'IA Legal' : lead.interest === 'vigilancia' ? 'Vigilancia Judicial' : 'Case Management'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">
                          {new Date(lead.fechaRegistro).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => openConversionModal(lead)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            Convertir a Cliente
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap animate-fade-in">
                <thead className="bg-slate-950/80 border-b border-white/5 text-slate-400">
                  <tr>
                    <th className="p-4 font-medium">Cliente / Titular</th>
                    <th className="p-4 font-medium">No. Expediente</th>
                    <th className="p-4 font-medium">Estado Procesal</th>
                    <th className="p-4 font-medium">Despacho</th>
                    <th className="p-4 font-medium text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && clients.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Cargando cartera de clientes...</td></tr>
                  ) : clients.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-slate-500">Aún no hay clientes creados. Convierte un prospecto para empezar.</td></tr>
                  ) : (
                    clients.map((client) => (
                      <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-white">{client.nombre}</div>
                          <div className="text-slate-500 text-xs mt-0.5 flex gap-2">
                             <span>CC: {client.cedula || 'N/A'}</span> • <span>{client.telefono || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-xs text-indigo-300 bg-indigo-500/5 border border-indigo-500/20 rounded px-2 py-1 inline-block">
                            {client.expediente}
                          </span>
                          <div className="text-xs text-slate-500 mt-1">Inicio: {client.fechaInicioContrato}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-slate-300 rounded-full text-xs">
                            {client.estadoActual}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">
                          {client.juzgado}
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => openClientDetail(client)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                          >
                            <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
                            Gestionar Ficha
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL FICHA DE INGRESO --- */}
      {isConversionModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsConversionModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-white/10 bg-slate-950/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-400" />
                  Ficha de Ingreso: Nuevo Cliente
                </h3>
                <p className="text-xs text-slate-400 mt-1">Completa los datos administrativos para habilitar su expediente.</p>
              </div>
              <button onClick={() => setIsConversionModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={submitConversion} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombres */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Nombres y Apellidos</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={conversionData.nombres} onChange={(e) => setConversionData({...conversionData, nombres: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>
                
                {/* Cédula */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Cédula de Ciudadanía / NIT</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" placeholder="Ej: 1020304050" value={conversionData.cedula} onChange={(e) => setConversionData({...conversionData, cedula: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Correo Electrónico</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="email" value={conversionData.email} onChange={(e) => setConversionData({...conversionData, email: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Teléfono Celular</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="tel" value={conversionData.telefono} onChange={(e) => setConversionData({...conversionData, telefono: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>

                {/* Dirección */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Dirección de Notificación / Residencia</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" placeholder="Ej: Cra 12 # 34 - 56, Bogotá" value={conversionData.direccion} onChange={(e) => setConversionData({...conversionData, direccion: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>

                {/* Tipo de Caso */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Naturaleza del Caso</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="text" value={conversionData.tipoCaso} onChange={(e) => setConversionData({...conversionData, tipoCaso: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none" />
                  </div>
                </div>

                {/* Fecha Inicio Contrato */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Fecha Inicio de Contrato</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input required type="date" value={conversionData.fechaInicio} onChange={(e) => setConversionData({...conversionData, fechaInicio: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-9 pr-3 text-sm text-white focus:border-indigo-400 focus:outline-none [color-scheme:dark]" />
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-2 border-t border-white/10 flex justify-end gap-3">
                <button type="button" onClick={() => setIsConversionModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Formalizar Ingreso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL GESTIÓN DE CLIENTE EXISTENTE --- */}
      {isClientModalOpen && editingClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsClientModalOpen(false)} />
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
            
            <div className="p-6 border-b border-white/10 bg-slate-950/50 flex justify-between items-center shrink-0">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-cyan-400" />
                  Expediente: {editingClient.nombre}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{editingClient.expediente}</span>
                  <span className="text-xs text-slate-400">Cliente desde: {editingClient.fechaInicioContrato}</span>
                </div>
              </div>
              <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* COLUMNA IZQUIERDA: Datos y Administrativo */}
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" /> Administrativo y Honorarios
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Valor Fijado de Honorarios (COP)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input 
                            type="text" 
                            placeholder="Ej: $ 5.000.000" 
                            value={editingClient.honorarios} 
                            onChange={(e) => setEditingClient({...editingClient, honorarios: e.target.value})} 
                            className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-cyan-400 focus:outline-none" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Contraseña del Portal</label>
                          <input type="text" value={editingClient.password} onChange={(e) => setEditingClient({...editingClient, password: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-slate-300 focus:border-cyan-400 focus:outline-none font-mono" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tipo de Caso</label>
                          <input type="text" value={editingClient.tipoCaso} onChange={(e) => setEditingClient({...editingClient, tipoCaso: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" /> Estado Procesal
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Estado Actual</label>
                        <input type="text" value={editingClient.estadoActual} onChange={(e) => setEditingClient({...editingClient, estadoActual: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Juzgado Asignado</label>
                        <input type="text" value={editingClient.juzgado} onChange={(e) => setEditingClient({...editingClient, juzgado: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Próxima Audiencia</label>
                        <input type="text" value={editingClient.proximaAudiencia} onChange={(e) => setEditingClient({...editingClient, proximaAudiencia: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* COLUMNA DERECHA: Documentos y Línea de Tiempo */}
                <div className="space-y-6">
                  {/* Documentos */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-cyan-400" /> Documentos Adjuntos
                    </h4>
                    
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        placeholder="Nombre del nuevo documento..." 
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                        className="flex-1 bg-slate-950 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none" 
                      />
                      <button onClick={handleAddDocument} type="button" className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Adjuntar
                      </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {(!editingClient.documentos || editingClient.documentos.length === 0) && (
                        <p className="text-xs text-slate-500 italic">No hay documentos adjuntos aún.</p>
                      )}
                      {editingClient.documentos?.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-white/5">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="text-sm text-slate-300 truncate">{doc.name}</span>
                          </div>
                          <span className="text-xs text-slate-500 shrink-0 ml-2">{doc.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Línea de Tiempo */}
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                    <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 text-indigo-400" /> Actuaciones Procesales
                    </h4>
                    
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        placeholder="Nueva actuación procesal..." 
                        value={newTimelineTitle}
                        onChange={(e) => setNewTimelineTitle(e.target.value)}
                        className="flex-1 bg-slate-950 border border-white/10 rounded-lg py-1.5 px-3 text-sm text-white focus:border-indigo-400 focus:outline-none" 
                      />
                      <button onClick={handleAddTimeline} type="button" className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg text-sm font-bold transition-colors flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Añadir
                      </button>
                    </div>

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                       {(!editingClient.timeline || editingClient.timeline.length === 0) && (
                        <p className="text-xs text-slate-500 italic">No hay actuaciones registradas.</p>
                      )}
                      {editingClient.timeline?.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-white leading-tight">{step.title}</p>
                            <p className="text-xs text-slate-500">{step.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-950/50 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsClientModalOpen(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors">
                Cerrar sin guardar
              </button>
              <button onClick={saveClientDetails} disabled={loading} className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Guardar Expediente
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); 
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [legalModalConfig, setLegalModalConfig] = useState({ isOpen: false, type: 'privacidad' });
  const [user, setUser] = useState(null);

  // Inicializar Autenticación
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleScrollVisibility = (e) => {
    if (e.currentTarget.scrollTop > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollTop = () => {
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentView === 'admin') {
    return <AdminDashboard onExit={() => setCurrentView('landing')} />;
  }

  return (
    <div 
      id="main-scroll-container"
      onScroll={handleScrollVisibility}
      className="h-screen overflow-y-auto overflow-x-hidden bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30 relative scroll-smooth"
    >
      <NavBar />
      <Hero onOpenModal={() => setIsRegistrationOpen(true)} />
      <ExplainerCards />
      <AILabModule />
      <ClientPortalModule />
      <ComparisonModule />
      <KeyInsights />
      <SuccessStories />
      <ScrollStory />
      <CTASection onOpenModal={() => setIsRegistrationOpen(true)} />
      
      <Footer 
        onOpenLegal={(type) => setLegalModalConfig({ isOpen: true, type })} 
        onOpenAdmin={() => setCurrentView('admin')}
      />
      
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} user={user} />
      <LegalModal 
        isOpen={legalModalConfig.isOpen} 
        type={legalModalConfig.type} 
        onClose={() => setLegalModalConfig({ ...legalModalConfig, isOpen: false })} 
      />

      <button
        onClick={scrollTop}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-500 z-50 group ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
        }`}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
}