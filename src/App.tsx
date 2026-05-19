import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Briefcase, GraduationCap, Grid, Mail, MessageSquare, ChevronDown, Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import LuminousCursor from './components/LuminousCursor';
import ChatBot from './components/ChatBot';
import Section from './components/Section';
import { cn } from './lib/utils';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'faq', 'testimonials', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'Chi sono', icon: <User size={18} /> },
    { id: 'skills', label: 'Competenze', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Progetti', icon: <Grid size={18} /> },
    { id: 'experience', label: 'Percorso', icon: <GraduationCap size={18} /> },
    { id: 'faq', label: 'FAQ', icon: <MessageSquare size={18} /> },
    { id: 'contact', label: 'Contatti', icon: <Mail size={18} /> },
  ];

  return (
    <div className="min-h-screen selection:bg-accent selection:text-neutral-900">
      <LuminousCursor />
      <ChatBot />

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 rounded-2xl bg-accent text-black flex items-center justify-center font-black text-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-transform group-hover:scale-110">
              GD
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-display font-light tracking-tighter text-3xl leading-none">GIACOMO <span className="font-bold text-accent">DIARA</span></span>
              <span className="text-[11px] uppercase tracking-[0.5em] text-gray-400 mt-1 font-black">Digital Solutions Specialist</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1 border border-gray-200 bg-gray-50/50 backdrop-blur-sm p-1 rounded-full px-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 relative",
                  activeSection === item.id ? "text-accent" : "text-gray-400 hover:text-black"
                )}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white shadow-sm border border-gray-100 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            ))}
          </div>

          <a 
            href="#contact" 
            className="hidden sm:inline-flex items-center px-6 py-3 bg-accent text-black rounded-xl text-[10px] uppercase tracking-widest font-black shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-white transition-all duration-500"
          >
            Contattami
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <Section id="hero" className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 px-6 text-center border-b border-gray-50">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-accent-dark/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:32px:32px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Available for new projects
            </div>
            <h1 className="text-6xl md:text-[9.5rem] font-light mb-8 tracking-tighter leading-[0.8] text-gray-900">
              GIACOMO <br />
              <span className="font-bold text-accent">DIARA</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-12">
              Social Media Manager Junior & Content Creator based in Italy. <br />
              <span className="italic underline decoration-accent/30 underline-offset-4 font-normal text-gray-900">"Trasformo idee semplici in coinvolgimento totale."</span>
            </p>

            {/* PC Workstation Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative max-w-4xl mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[100px] -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" 
                alt="Digital Workspace" 
                className="w-full rounded-[3rem] border border-gray-100 shadow-2xl transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 mt-8"
          >
            <a href="#projects" className="px-10 py-5 bg-accent text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-500 shadow-xl shadow-accent/20">
              Guarda i progetti
            </a>
            <a href="#contact" className="px-10 py-5 bg-white border border-gray-200 shadow-sm rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all duration-500">
              Lavoriamo insieme
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-600"
          >
            <ChevronDown size={32} />
          </motion.div>
        </Section>

        {/* About Section */}
        <Section id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-accent/5 blur-[100px]" />
              <div className="relative rounded-3xl overflow-hidden bg-white border-gray-100 shadow-xl aspect-square border-white/20 p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Giacomo Diara" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="section-label">Chi Sono</div>
              <h2 className="text-5xl font-light mb-10 leading-tight text-gray-900">
                Esperienza e passione per il <span className="font-bold italic">digitale</span>.
              </h2>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                <p>
                  Mi chiamo <strong className="text-gray-900">Giacomo</strong> e lavoro come Social Media Manager Junior. Negli ultimi anni ho avuto modo di gestire profili social e canali YouTube, occupandomi della creazione dei contenuti, della pubblicazione e dell'organizzazione delle pagine.
                </p>
                <p>
                  Mi piace seguire i progetti passo dopo passo, cercando di dare a ogni contenuto uno stile riconoscibile e naturale. Utilizzo strumenti di <strong className="text-gray-900">intelligenza artificiale</strong> per sviluppare idee, immagini, testi e format creativi.
                </p>
                <p>
                  Nel tempo ho lavorato su contenuti dedicati al calcio, all'intrattenimento e ai social network. Una delle cose che mi appassiona di più è trasformare un'idea semplice in qualcosa che possa attirare attenzione e coinvolgere le persone.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-16 pt-16 border-t border-gray-100">
                {[
                  { value: "3+", label: "Anni di Percorso" },
                  { value: "50+", label: "Progetti Gestiti" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-[10px] text-accent uppercase tracking-[0.3em] font-black">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" className="py-32 bg-gray-50 border-y border-gray-100 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <div className="section-label">Competenze</div>
              <h2 className="text-5xl font-light mb-6 text-gray-900">L'Arte della Comunicazione <span className="font-bold">Social</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
                Utilizzo le ultime tecnologie e strategie per garantire una presenza online d'impatto e performante.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Social Management", desc: "Gestione Facebook, IG e YouTube con focus sulla crescita organica.", icon: "📱" },
                { title: "Content Creation", desc: "Produzione post, video brevi (Reels/Shorts) e grafiche.", icon: "🎨" },
                { title: "SEO Strategy", desc: "Ottimizzazione motori di ricerca e scrittura persuasiva per il web.", icon: "✍️" },
                { title: "AI Integration", desc: "Utilizzo AI Tools per generare format creativi di nuova generazione.", icon: "🤖" },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-accent hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{skill.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">{skill.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed font-light">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
        {/* Projects Gallery */}
        <Section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="section-label">Portfolio</div>
              <h2 className="text-5xl font-light text-gray-900">Progetti <span className="font-bold italic">Selezionati</span></h2>
            </div>
            <p className="text-gray-500 max-w-md font-light text-lg leading-relaxed">
              L'estetica incontra la strategia. Una selezione dei lavori che meglio rappresentano la mia visione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Calcio & Community",
                category: "YouTube Management",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
                color: "from-accent/10"
              },
              {
                title: "Lifestyle Brand",
                category: "Instagram Strategy",
                image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
                color: "from-accent/10"
              },
              {
                title: "AI Innovation",
                category: "AI Content Creation",
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
                color: "from-accent/10"
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="group relative rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 aspect-[4/5] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent transition-opacity duration-500 group-hover:opacity-95", project.color)} />
                <div className="absolute inset-0 p-10 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">{project.category}</span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-none">{project.title}</h3>
                  <div className="pt-6 border-t border-gray-200 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Vedi caso studio</span>
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500">
                      <ChevronDown size={18} className="-rotate-90" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Experience & Education */}
        <Section id="experience" className="py-32 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <div className="section-label">Percorso Professionale</div>
              <h2 className="text-4xl font-light mb-16 text-gray-900">Esperienze <span className="font-bold">Lavoro</span></h2>
              <div className="space-y-16">
                {[
                  {
                    title: "SMM Junior - Freelance",
                    company: "Progetti Digitali",
                    period: "2022 - Presente",
                    desc: "Gestione profili social e YT, curando ogni fase: dalla creazione alla pubblicazione automatizzata."
                  },
                  {
                    title: "Content Manager",
                    company: "Sports YouTube Channel",
                    period: "2021 - 2022",
                    desc: "Produzione format creativi e immagini uniche per piattaforme ad alto traffico."
                  }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 border-l border-gray-200 hover:border-accent transition-all duration-500 group">
                    <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-all duration-500 group-hover:scale-[2.5] shadow-lg shadow-accent/20" />
                    <span className="text-[10px] font-black text-accent mb-3 block uppercase tracking-[0.2em]">{item.period}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                       <span className="w-4 h-px bg-gray-200" /> {item.company}
                    </p>
                    <p className="text-gray-500 leading-relaxed font-light text-sm italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label">Formazione</div>
              <h2 className="text-4xl font-light mb-16 text-gray-900">Istruzione <span className="font-bold">& Certificazioni</span></h2>
              <div className="space-y-16">
                {[
                  {
                    title: "Master in Digital Marketing",
                    company: "Focus SEO & Social Strategy",
                    period: "2022",
                    desc: "Certificato Google Ads e specializzazione in growth hacking organico."
                  },
                  {
                    title: "Social Media Strategy",
                    company: "Academy Certificata",
                    period: "2021",
                    desc: "Approfondimento sulle dinamiche di coinvolgimento dei nuovi ecosistemi digitali."
                  }
                ].map((item, i) => (
                  <div key={i} className="relative pl-10 border-l border-gray-200 hover:border-accent transition-all duration-500 group">
                    <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-accent transition-all duration-500 group-hover:scale-[2.5] shadow-lg shadow-accent/20" />
                    <span className="text-[10px] font-black text-accent mb-3 block uppercase tracking-[0.2em]">{item.period}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                       <span className="w-4 h-px bg-gray-200" /> {item.company}
                    </p>
                    <p className="text-gray-500 leading-relaxed font-light text-sm italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <div className="section-label">Feedback</div>
              <h2 className="text-5xl font-light mb-6 text-gray-900">Testimonianze <span className="font-bold italic">Clienti</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Testimonials cleared as requested */}
              {[].map((testimonial, i) => (
                <div key={i} className="bg-white p-12 rounded-[3rem] border border-gray-100 relative overflow-hidden group hover:border-accent hover:shadow-xl transition-all duration-500">
                  <div className="absolute top-0 right-0 p-10 opacity-5 text-accent group-hover:opacity-15 transition-opacity duration-500">
                    <MessageSquare size={100} />
                  </div>
                  <div className="border-l-2 border-accent/50 pl-6 mb-8">
                    <p className="text-gray-600 italic text-xl leading-relaxed font-light">"{testimonial.content}"</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-900">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ Section */}
        <Section id="faq" className="py-32 bg-gray-50 border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="section-label">Supporto</div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">Domande <span className="font-bold">Frequenti</span></h2>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "Lavori con l'AI?", a: "Sì, utilizzo l'IA per ottimizzare testi, generare immagini creative e sviluppare format innovativi." },
                { q: "Gestisci video brevi?", a: "Certamente. Sono specializzato in TikTok, Instagram Reels e YouTube Shorts." },
                { q: "Qual è il tuo metodo?", a: "Parto da un'idea semplice e la trasformo in coinvolgimento totale attraverso strategia e creatività." },
                { q: "Offri consulenze?", a: "Sì, sono disponibile per consulenze strategiche spot o collaborazioni periodiche." }
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group transition-all duration-500 hover:border-accent hover:shadow-md">
                   <summary className="p-8 cursor-pointer flex items-center justify-between font-bold text-gray-900 list-none group-hover:bg-gray-50 transition-colors uppercase tracking-widest text-[10px]">
                    {faq.q}
                    <ChevronDown size={16} className="text-accent group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-8 pb-8 text-gray-500 leading-relaxed font-light text-sm italic">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <div className="section-label">Connettiamoci</div>
              <h2 className="text-6xl font-light mb-10 leading-[0.9] text-gray-900">
                Hai un'idea? <br />
                <span className="font-bold text-accent italic">Realizziamola.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-16 font-light max-w-md leading-relaxed">
                Cerchi un partner creativo per la tua presenza digitale? Scrivimi per una consulenza o per avviare una nuova collaborazione.
              </p>
              
              <div className="space-y-10">
                <a href="mailto:diaragiacomo@gmail.com" className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-accent group-hover:text-black transition-all duration-500 shadow-sm group-hover:shadow-accent/30">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Canale Diretto</h4>
                    <span className="text-2xl font-light text-gray-900 group-hover:text-accent transition-colors tracking-tighter text-wrap break-all">diaragiacomo@gmail.com</span>
                  </div>
                </a>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Presenza Social</h4>
                    <div className="flex gap-6 mt-2">
                       {[
                         { icon: <Instagram size={20} />, url: "#", label: "Instagram" },
                         { icon: <Youtube size={20} />, url: "#", label: "YouTube" },
                         { icon: <Facebook size={20} />, url: "#", label: "Facebook" },
                         { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" }
                       ].map(social => (
                         <a key={social.label} href={social.url} className="text-gray-400 hover:text-accent transition-all transform hover:scale-125" title={social.label}>
                           {social.icon}
                         </a>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px]" />
              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Il tuo Nome</label>
                    <input type="text" required className="w-full bg-white border border-gray-200 rounded-xl py-5 px-8 text-gray-900 focus:outline-none focus:border-accent transition-colors font-light" placeholder="Inserisci il nome..." />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Aziendale</label>
                    <input type="email" required className="w-full bg-white border border-gray-200 rounded-xl py-5 px-8 text-gray-900 focus:outline-none focus:border-accent transition-colors font-light" placeholder="esempio@azienda.it" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Come posso aiutarti?</label>
                  <textarea rows={5} required className="w-full bg-white border border-gray-200 rounded-xl py-6 px-8 text-gray-900 focus:outline-none focus:border-accent transition-colors resize-none font-light" placeholder="Descrivi brevemente il tuo progetto o la tua idea creativa..." />
                </div>
                <button type="submit" className="w-full py-6 bg-accent text-black rounded-xl font-black text-xs uppercase tracking-[0.3em] shadow-lg shadow-accent/20 hover:bg-gray-900 hover:text-white transition-all transform active:scale-[0.98]">
                  Invia Proposta di Progetto
                </button>
              </form>
            </div>
          </div>
        </Section>

        {/* Newsletter Section */}
        <Section id="newsletter" className="py-32 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="section-label">Restiamo In Contatto</div>
              <h2 className="text-5xl font-light mb-8 text-gray-900">Iscriviti alla <span className="font-bold italic text-accent">Newsletter</span></h2>
              <p className="text-gray-500 text-lg mb-12 font-light">
                Ricevi approfondimenti sul mondo del digitale, trend social e consigli per far crescere la tua presenza online.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Inserisci la tua email..." 
                  className="flex-1 bg-white border border-gray-200 rounded-xl py-5 px-8 text-gray-900 focus:outline-none focus:border-accent transition-colors font-light"
                  required
                />
                <button type="submit" className="px-10 py-5 bg-accent text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-500 whitespace-nowrap">
                  Iscriviti Ora
                </button>
              </form>
              <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-widest">
                Niente spam. Solo contenuti di qualità una volta al mese.
              </p>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent text-black flex items-center justify-center font-black text-lg">
              GD
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-display font-light text-sm tracking-tighter leading-none uppercase">Giacomo <span className="font-bold">Diara</span></span>
              <span className="text-[8px] uppercase tracking-widest text-gray-400">Digital Solutions</span>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest leading-loose">
              &copy; {new Date().getFullYear()} Giacomo Diara | Professional Digital Services <br />
              <span className="text-gray-300">Eccellenza creativa nella gestione dei contenuti digitali.</span>
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { icon: <Instagram size={18} />, url: "#" },
              { icon: <Youtube size={18} />, url: "#" },
              { icon: <Facebook size={18} />, url: "#" },
              { icon: <Linkedin size={18} />, url: "#" }
            ].map((social, i) => (
              <a key={i} href={social.url} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all duration-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
