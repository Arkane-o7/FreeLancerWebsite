import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, CheckCircle2, Zap, Target, Database, 
  Layers, Code2, Mail, Bot, LineChart, ChevronDown, ChevronUp, Github, Linkedin, Mailbox, Command 
} from 'lucide-react';

// --- SCROLL REVEAL COMPONENT ---
// Wraps elements to fade them in and slide them up when they enter the viewport
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const { current } = domRef;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-y-0 translate-x-0 scale-100';
    switch (direction) {
      case 'up': return 'translate-y-12 scale-95';
      case 'down': return '-translate-y-12 scale-95';
      case 'left': return 'translate-x-12 scale-95';
      case 'right': return '-translate-x-12 scale-95';
      default: return 'translate-y-12 scale-95';
    }
  };

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${isVisible ? 'opacity-100' : 'opacity-0'} ${getTransform()} ${className}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // --- FORM STATE ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // --- FORM SUBMIT HANDLER ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // PASTE YOUR MAKE.COM WEBHOOK URL OR FORMSPREE URL HERE:
    const endpointUrl = "https://hook.eu2.make.com/m6zjyrz5mxm33kksw2ijj75o8ryroy8z"; 

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setFormStatus('idle'), 5000); // Reset after 5s
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F9F9F9] font-sans selection:bg-[#0A84FF] selection:text-white pb-12 overflow-x-hidden">
      
      {/* CUSTOM ANIMATIONS & SCROLLBAR */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #050505;
          }
          ::-webkit-scrollbar-thumb {
            background: #222;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #0A84FF;
          }
          * {
            scrollbar-width: thin;
            scrollbar-color: #222 #050505;
          }
          
          @keyframes blob-pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.07; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.07; }
          }
          .animate-blob {
            animation: blob-pulse 10s ease-in-out infinite;
          }

          .btn-shine {
            position: relative;
            overflow: hidden;
          }
          .btn-shine::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -60%;
            width: 20%;
            height: 200%;
            background: rgba(255,255,255,0.2);
            transform: rotate(30deg);
            transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          }
          .btn-shine:hover::after {
            transform: translateX(350%) rotate(30deg);
          }
        `}
      </style>

      {/* FLOATING PILL NAVIGATION */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 ${isScrolled ? 'top-4 scale-95' : 'top-6 scale-100'}`}>
        <div className={`bg-[#111]/80 backdrop-blur-xl border transition-all duration-500 rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_0_40px_rgba(0,0,0,0.5)] ${isScrolled ? 'border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'border-white/10'}`}>
          <div className="text-xl font-bold tracking-tighter cursor-pointer flex items-center gap-2 group" onClick={() => scrollTo('home')}>
            <Command size={20} className="text-[#0A84FF] group-hover:rotate-90 transition-transform duration-500" />
            SYS<span className="text-white/40 transition-colors duration-300 group-hover:text-white">.</span>ARCHITECT
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {['services', 'projects', 'about', 'process'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="relative hover:text-white transition-colors duration-300 group capitalize">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0A84FF] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button onClick={() => scrollTo('contact')} className="bg-white text-black hover:scale-105 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Book Audit
            </button>
          </div>

          <button className="md:hidden text-white hover:rotate-90 transition-transform duration-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl pt-32 px-6 flex flex-col space-y-6 transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {['services', 'projects', 'about', 'process', 'contact'].map((item, i) => (
          <button 
            key={item} 
            onClick={() => scrollTo(item)} 
            style={{ transitionDelay: `${i * 50}ms` }}
            className={`text-3xl font-bold text-left capitalize text-white/80 hover:text-white border-b border-white/5 pb-4 transition-all duration-300 ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* HERO SECTION */}
      <section id="home" className="pt-48 pb-32 px-6 relative flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <FadeIn delay={100}>
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#111] text-xs font-semibold text-gray-300 mb-8 shadow-xl hover:border-white/20 transition-colors duration-300 cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse"></span>
              <span>AI Automation for B2B Founders</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <h1 className="text-6xl md:text-[6rem] font-bold tracking-tighter mb-8 leading-[0.95] text-white">
              Stop Hunting Leads.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                Build a Machine.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Custom AI-powered lead generation systems that scrape, score, and reach out to your best prospects on autopilot.
            </p>
          </FadeIn>
          
          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button onClick={() => scrollTo('contact')} className="w-full sm:w-auto bg-[#0A84FF] text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center group shadow-[0_0_30px_rgba(10,132,255,0.3)] hover:shadow-[0_0_50px_rgba(10,132,255,0.5)] hover:scale-105 transition-all duration-300 btn-shine">
                Book Free Automation Audit
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button onClick={() => scrollTo('projects')} className="w-full sm:w-auto bg-[#111] border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:bg-white/5">
                View Systems
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* BENTO GRID: PROBLEM & SOLUTION */}
      <section className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">The manual trap.</h2>
            <p className="text-xl text-gray-400 max-w-2xl">If you are copy-pasting data or sending generic cold emails, you don't have a sales problem. You have a systems problem.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Box 1 */}
          <FadeIn delay={100} className="md:col-span-2">
            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/5 flex flex-col justify-between group overflow-hidden relative hover:border-[#0A84FF]/30 transition-all duration-500 h-full hover:shadow-[0_10px_40px_rgba(10,132,255,0.1)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] rounded-full group-hover:bg-[#0A84FF]/20 group-hover:scale-150 transition-all duration-700"></div>
              <div className="relative z-10">
                <Zap size={32} className="text-[#0A84FF] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                <h3 className="text-3xl font-bold tracking-tight mb-4">You spend hours hunting.</h3>
                <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors duration-300">My system finds and qualifies your ideal prospects automatically, so you only see leads worth talking to. Stop browsing, start closing.</p>
              </div>
            </div>
          </FadeIn>
          
          {/* Box 2 */}
          <FadeIn delay={200}>
            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-all duration-500 hover:-translate-y-1 h-full">
               <Target size={32} className="text-white/30 mb-6 group-hover:text-[#0A84FF] group-hover:scale-110 transition-all duration-500" />
               <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">AI writes it all.</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Personalized emails based on actual prospect data. No generic templates.</p>
               </div>
            </div>
          </FadeIn>
          
          {/* Box 3 */}
          <FadeIn delay={300}>
            <div className="bg-[#111] rounded-[2rem] p-10 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-all duration-500 hover:-translate-y-1 h-full">
               <LineChart size={32} className="text-white/30 mb-6 group-hover:text-[#0A84FF] group-hover:scale-110 transition-all duration-500" />
               <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3">Live Dashboards.</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Everything lands in a clean, real-time sheet. Scored and ready.</p>
               </div>
            </div>
          </FadeIn>
          
          {/* Box 4 */}
          <FadeIn delay={400} className="md:col-span-2">
            <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] rounded-[2rem] p-10 border border-[#0A84FF]/20 flex flex-col md:flex-row items-center justify-between group hover:border-[#0A84FF]/50 transition-all duration-500 h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(10,132,255,0.1)_0,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="mb-6 md:mb-0 md:mr-8 relative z-10">
                <h3 className="text-3xl font-bold tracking-tight mb-4 text-white">Delivered in days.</h3>
                <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors duration-300">No bloated 3-month timelines. From discovery call to a live production engine in less than a week.</p>
              </div>
              <button onClick={() => scrollTo('process')} className="shrink-0 relative z-10 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center">
                View Process <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES (SLUSH BENTO STYLE) */}
      <section id="services" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 max-w-3xl">Built from scratch.<br/>Not borrowed.</h2>
            <p className="text-xl text-gray-400 max-w-2xl">I don't sell packages. I build systems designed exclusively for your workflow and ICP.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Flagship */}
          <FadeIn delay={100} className="md:col-span-2">
            <div className="bg-[#0A84FF]/5 rounded-[2rem] p-10 md:p-16 border border-[#0A84FF]/20 relative overflow-hidden group hover:border-[#0A84FF]/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#0A84FF]/5 to-transparent pointer-events-none group-hover:from-[#0A84FF]/10 transition-colors duration-500"></div>
              <div className="inline-block bg-[#0A84FF] text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(10,132,255,0.5)]">Flagship Service</div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 group-hover:text-[#0A84FF] transition-colors duration-500">Tailored Lead Gen Engine</h3>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl">A fully custom, AI-powered machine built to scrape, enrich, score, and contact your exact ICP without manual input.</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[
                  'Custom Scraping Architecture', 
                  'Deep Data Enrichment', 
                  'AI Lead Scoring Logic', 
                  'Dynamic Email Personalization', 
                  'Automated Sending Infra', 
                  'Live Tracking Dashboards'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-[#111]/50 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                    <CheckCircle2 size={18} className="text-[#0A84FF] shrink-0" />
                    <span className="text-sm font-medium text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} className="btn-shine bg-[#0A84FF] hover:bg-[#0066FF] text-white px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(10,132,255,0.4)]">
                Request Blueprint →
              </button>
            </div>
          </FadeIn>

          {/* Secondary Services */}
          {[
            { icon: <Database size={24}/>, title: 'Scraping & Enrichment', desc: 'Pull structured prospect data from any source. Get actionable profiles instantly.' },
            { icon: <Mail size={24}/>, title: 'AI Email Systems', desc: 'Feed a list, output highly researched, unique emails per lead. Real personalization.' },
            { icon: <Layers size={24}/>, title: 'Internal Ops Automation', desc: 'Connect CRM, Slack, and Notion to remove repetitive manual middle steps.' },
            { icon: <Code2 size={24}/>, title: 'System Architecture', desc: 'Audit your workflow and get a blueprint to build the automations yourself.' }
          ].map((service, i) => (
            <FadeIn delay={200 + (i * 100)} key={i}>
              <div className="bg-[#111] p-10 rounded-[2rem] border border-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 group h-full hover:shadow-[0_10px_30px_rgba(255,255,255,0.03)]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 group-hover:bg-[#0A84FF] group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(10,132,255,0.5)]">
                  {React.cloneElement(service.icon, { className: 'transition-transform duration-500 group-hover:scale-90' })}
                </div>
                <h4 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">{service.title}</h4>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS (Minimalist Cards) */}
      <section id="projects" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto bg-[#0A0A0A] rounded-[3rem] border border-white/5 my-12 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Real systems.<br/>Real data.</h2>
              <p className="text-xl text-gray-400">Not mockups. Systems that actually ran in production.</p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {/* Project 1 */}
            <FadeIn direction="up">
              <div className="bg-[#111] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col md:flex-row group hover:border-[#0A84FF]/30 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(10,132,255,0.05)]">
                <div className="p-10 md:p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 relative z-10 bg-[#111]">
                  <div className="text-xs font-mono text-[#0A84FF] mb-4 tracking-widest uppercase flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#0A84FF] mr-2 animate-pulse"></span> Case Study 01
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">Zero-Budget AI Lead Gen</h3>
                  <p className="text-gray-400 mb-8 text-lg">Scrapes GitHub for tech signals, scores leads via AI, and generates hyper-specific cold emails for freelancers.</p>
                  <div className="space-y-3 font-mono text-sm text-gray-500 bg-black/50 p-6 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-500">
                    <div className="flex justify-between"><span className="text-gray-600">Tech:</span><span className="text-white">Make.com, Custom AI, Sheets</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="text-white">Built in 48 hrs</span></div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 bg-black/40 flex items-center justify-center min-h-[300px] relative overflow-hidden group-hover:bg-black/20 transition-colors duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,132,255,0.05)_0,transparent_100%)] group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
                  <div className="w-full max-w-sm space-y-3 relative z-10 transform group-hover:scale-105 transition-transform duration-700">
                    <div className="flex justify-between text-xs text-gray-500 font-mono mb-2"><span>Dashboard.csv</span><span className="text-green-500 flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>Live</span></div>
                    {[94, 88, 76].map((score, i) => (
                      <div key={i} className="bg-[#111] p-4 rounded-xl border border-white/10 flex items-center justify-between shadow-2xl group-hover:border-[#0A84FF]/20 transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                        <div className="h-2 w-full max-w-[120px] bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0A84FF] transition-all duration-1000 ease-out origin-left" style={{ width: `${score}%` }}></div>
                        </div>
                        <div className="text-[#0A84FF] font-mono text-xs">Match: {score}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Project 2 */}
            <FadeIn direction="up" delay={200}>
              <div className="bg-[#111] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col md:flex-row-reverse group hover:border-green-500/30 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(34,197,94,0.05)]">
                <div className="p-10 md:p-12 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-l border-white/5 relative z-10 bg-[#111]">
                  <div className="text-xs font-mono text-green-500 mb-4 tracking-widest uppercase flex items-center">
                     <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Case Study 02
                  </div>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">Email Personalization Engine</h3>
                  <p className="text-gray-400 mb-8 text-lg">Replaces 'Hey First_Name' with AI-analyzed, contextually relevant hooks based on actual prospect data.</p>
                  <div className="space-y-3 font-mono text-sm text-gray-500 bg-black/50 p-6 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors duration-500">
                    <div className="flex justify-between"><span className="text-gray-600">Input:</span><span className="text-white">Raw Lead CSV</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Output:</span><span className="text-green-500">100% Unique Drafts</span></div>
                  </div>
                </div>
                <div className="md:w-1/2 p-8 bg-black/40 flex items-center justify-center min-h-[300px] relative overflow-hidden group-hover:bg-black/20 transition-colors duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.05)_0,transparent_100%)] group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
                  <div className="w-full max-w-sm bg-[#111] p-6 rounded-2xl border border-green-500/10 group-hover:border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.02)] group-hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] transition-all duration-700 transform group-hover:scale-105 relative z-10">
                    <div className="text-xs font-mono text-green-400 bg-green-500/10 px-3 py-1 rounded-full w-fit mb-4 flex items-center">
                       <Bot size={12} className="mr-1" /> AI Output
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div></div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.2s]"></div></div>
                      <div className="h-2 w-5/6 bg-white/10 rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.4s]"></div></div>
                      <div className="h-2 w-1/2 bg-white/10 rounded-full mt-4 overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite_0.6s]"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ABOUT & PROCESS (Minimal Text Grid) */}
      <section id="about" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* About Text */}
          <FadeIn direction="right">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Builder first.<br/>Student second.</h2>
              <div className="space-y-6 text-gray-400 text-xl font-light leading-relaxed">
                <p>I got tired of watching smart people waste their time on work that machines should be doing.</p>
                <p>I build custom lead engines and workflow automations from scratch, designed around how your specific business actually works.</p>
                <p className="text-white font-medium">I think like a founder, not a contractor. I care about the outcome and whether the system I built actually makes you money.</p>
              </div>
              <div className="mt-12 flex space-x-4">
                <button className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-lg"><Linkedin size={20}/></button>
                <button className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 shadow-lg"><Github size={20}/></button>
              </div>
            </div>
          </FadeIn>

          {/* Process List */}
          <FadeIn direction="left" delay={200}>
            <div id="process" className="bg-[#111] p-10 md:p-12 rounded-[2rem] border border-white/5 hover:border-white/10 transition-colors duration-500 shadow-2xl">
              <h3 className="text-2xl font-bold tracking-tight mb-8">The Process</h3>
              <div className="space-y-8">
                {[
                  { n: '01', t: 'Audit Call', d: '20 mins. Map out your ICP and current bottlenecks.' },
                  { n: '02', t: 'Blueprint', d: 'Review the custom architecture before building starts.' },
                  { n: '03', t: 'Build & Test', d: 'System assembled in Make.com. Live demo in days.' },
                  { n: '04', t: 'Launch', d: 'Engine goes live. Leads flow into your dashboard.' },
                  { n: '05', t: 'Retainer', d: 'Monthly monitoring, fixing, and prompt optimization.' }
                ].map((step, i) => (
                  <div key={i} className="flex space-x-6 border-b border-white/5 pb-6 last:border-0 last:pb-0 group cursor-default">
                    <div className="text-gray-600 font-mono font-bold mt-1 group-hover:text-[#0A84FF] group-hover:-translate-y-1 transition-all duration-300">{step.n}</div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h4 className="text-white/70 font-bold text-lg mb-1 group-hover:text-white transition-colors duration-300">{step.t}</h4>
                      <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT (Floating Card Style) */}
      <section id="contact" className="py-32 px-4 md:px-8 max-w-[1400px] mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A84FF]/5 to-transparent rounded-[3rem] pointer-events-none"></div>
        
        <FadeIn direction="up">
          <div className="max-w-4xl mx-auto bg-[#111] border border-white/10 hover:border-[#0A84FF]/30 transition-colors duration-700 rounded-[3rem] p-8 md:p-16 relative z-10 text-center shadow-2xl shadow-black overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#0A84FF]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Let's build.</h2>
              <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">Book a free 20-minute audit. No pitch. Just a technical conversation about your bottleneck.</p>
              
              <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={handleFormSubmit}>
                <div className="relative group/input">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0A84FF] focus:bg-[#0A84FF]/5 transition-all duration-300 relative z-10" 
                  />
                  <div className="absolute inset-0 bg-[#0A84FF]/20 blur-md rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 z-0"></div>
                </div>
                
                <div className="relative group/input">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0A84FF] focus:bg-[#0A84FF]/5 transition-all duration-300 relative z-10" 
                  />
                  <div className="absolute inset-0 bg-[#0A84FF]/20 blur-md rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 z-0"></div>
                </div>
                
                <div className="relative group/input">
                  <textarea 
                    rows="3" 
                    placeholder="What are you trying to automate?" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#0A84FF] focus:bg-[#0A84FF]/5 transition-all duration-300 resize-none relative z-10"
                  ></textarea>
                  <div className="absolute inset-0 bg-[#0A84FF]/20 blur-md rounded-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 z-0"></div>
                </div>
                
                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-shine w-full bg-white text-black hover:bg-gray-200 hover:scale-[1.02] py-4 rounded-2xl font-bold text-lg transition-all duration-300 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Book My Free Audit'}
                </button>
                
                {formStatus === 'success' && (
                  <p className="text-center text-sm text-green-400 mt-4">Message sent! I'll be in touch within 24 hours.</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-400 mt-4">Oops! Something went wrong. Please try emailing me directly.</p>
                )}
                {formStatus === 'idle' && (
                  <p className="text-center text-sm text-gray-600 mt-4">I respond within 24 hours.</p>
                )}
              </form>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-8 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 font-mono border-t border-white/5 mt-10">
        <div className="mb-4 md:mb-0">© {new Date().getFullYear()} SYS.ARCHITECT</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300">LinkedIn</a>
          <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300">GitHub</a>
          <a href="mailto:hello@yourdomain.com" className="hover:text-white hover:-translate-y-1 transition-all duration-300">Email</a>
        </div>
      </footer>

      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>

    </div>
  );
}
