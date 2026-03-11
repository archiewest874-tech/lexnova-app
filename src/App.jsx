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
  Menu
} from 'lucide-react';

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

// --- Helper for smooth scrolling across components ---
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
    setIsMobileMenuOpen(false); // Cierra el menú al hacer clic en móvil
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
          aria-label="Alternar menú"
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 animate-fade-in-down">
          <Zap className="w-4 h-4" />
          <span>El futuro del litigio y la gestión legal</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tight leading-tight mb-8">
          Transformación Digital <br className="hidden md:block"/> para el Abogado Moderno.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
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
  const [userApiKey, setUserApiKey] = useState(''); 
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
          console.error(`Error de API (Código ${response.status}):`, errorText);
          
          if (response.status === 401 || response.status === 403) {
            throw new Error(`Error de autenticación: ${response.status}`);
          }
          if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            throw new Error(`Error de cliente: ${response.status}`);
          }
          throw new Error(`Error de red o servidor: ${response.status}`);
        }
        return await response.json();
      } catch (err) {
        if (i === retries - 1 || err.message.includes("Error de autenticación") || err.message.includes("Error de cliente")) throw err;
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

    const activeApiKey = userApiKey.trim(); 
    const model = activeApiKey ? "gemini-1.5-flash" : "gemini-2.5-flash-preview-09-2025";
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
      console.error("Detalle del fallo:", err);
      if (err.message.includes("Error de autenticación")) {
        setError("Error 401/403: No autorizado. Esto ocurre porque la API Key está vacía o es inválida fuera de Canvas.");
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
            <div className="flex justify-between items-center mb-4">
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
            
            <div className="mb-4">
              <input
                type="password"
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                placeholder="🔑 Tu API Key de Gemini (Requerida para uso externo)"
                value={userApiKey}
                onChange={(e) => setUserApiKey(e.target.value)}
              />
              <p className="text-[10px] text-slate-500 mt-1.5 ml-1">Consigue una gratis en Google AI Studio si estás fuera de la plataforma.</p>
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

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setIsLoggedIn(true);
    }, 1500); 
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

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Correo Electrónico</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="email" defaultValue="cliente@ejemplo.com" className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="password" defaultValue="********" className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors" />
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
          </div>
        ) : (
          <div className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col md:flex-row">
            
            <div className="w-full md:w-64 bg-slate-950/50 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/50">
                  <User className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Juan Pérez</p>
                  <p className="text-xs text-slate-500">Expediente #4892</p>
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
                onClick={() => setIsLoggedIn(false)}
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
                      <p className="text-lg font-bold text-emerald-400">Etapa Probatoria</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Próxima Audiencia</p>
                      <p className="text-lg font-bold text-white flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-cyan-400"/> 15 Oct, 2026</p>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Juzgado Asignado</p>
                      <p className="text-lg font-bold text-white">4° Laboral del Circuito</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6">
                    <h4 className="text-white font-semibold mb-6">Línea de Tiempo del Proceso</h4>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-slate-700 before:to-transparent">
                      {[
                        { title: 'Admisión de Demanda', date: '01 Sep, 2026', desc: 'Notificación personal realizada.', done: true },
                        { title: 'Contestación de Demanda', date: '15 Sep, 2026', desc: 'La contraparte allegó respuesta y excepciones.', done: true },
                        { title: 'Fijación de Audiencia Inicial', date: 'Pendiente', desc: 'A la espera de auto admisorio para fijar fecha.', done: false },
                      ].map((step, i) => (
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
                      {[
                        { name: 'Poder Firmado.pdf', date: '10 Ago, 2026' },
                        { name: 'Demanda Laboral Radicada.pdf', date: '01 Sep, 2026' },
                        { name: 'Auto Admisorio Juzgado 4.pdf', date: '05 Sep, 2026' },
                      ].map((doc, i) => (
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
              Conoce la diferencia entre las plataformas tecnológicas y elige la estructura perfecta para escalar tu firma legal en 2026.
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

// --- NEW SUCCESS STORIES MODULE ---
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
      {/* Background flares */}
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
              {/* Glow on hover */}
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

const CTASection = () => {
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
        <button className="px-10 py-5 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold text-lg transition-all flex items-center gap-3 mx-auto group shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          Solicitar Demostración Gratuita
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <Scale className="text-slate-500 w-6 h-6" />
        <span className="text-slate-400 font-semibold text-lg">LexNova</span>
      </div>
      <p className="text-slate-600 text-sm text-center md:text-left">
        © 2026 LexNova Digital Experiences. Todos los derechos reservados. Diseñado para firmas jurídicas de élite.
      </p>
      <div className="flex gap-6 text-sm text-slate-500">
        <a href="#" className="hover:text-cyan-400 transition-colors">Privacidad</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Términos</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a>
      </div>
    </div>
  </footer>
);

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular el envío seguro de datos
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', interest: '' });
        onClose();
      }, 3000); // Cierra automáticamente el modal después de 3 segundos
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay oscuro para fondo */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Contenedor principal del modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Efectos de luz decorativos de fondo */}
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

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

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
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

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
      <CTASection />
      <Footer />
      
      <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)} />

      {/* Botón Flotante: Volver al inicio */}
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