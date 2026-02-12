import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Github, Mail, Terminal, Cpu, Database, 
  Smartphone, Zap, ArrowUpRight, Code2, Globe,
  Shield, Server, Layers, Box, Monitor, Layout, MessageSquare
} from 'lucide-react';
import Portfolio from './Portfolio';
import Projects from './Projects';

// Initialize EmailJS (you'll need to set up your EmailJS account)
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your actual key

// --- DATASET (15 PROJECTS) ---
const PROJECT_DATA = [
  { id: 1, name: "Quantum-Node", type: "Automation", tech: "n8n / Python", desc: "Lead generation automation. Built systems that turn raw data into qualified leads." },
  { id: 2, name: "EcoTrack ZW", type: "Mobile App", tech: "React Native", desc: "Mobile app for environmental monitoring. Real-time data, offline support, clean UX." },
  { id: 3, name: "Auth-Titan", type: "Security", tech: "Supabase / JWT", desc: "Authentication system. Secure, scalable, and built right the first time." },
  { id: 4, name: "FastAPI Bridge", type: "Backend", tech: "Python / Redis", desc: "API gateway. High-speed, reliable, production-ready backend infrastructure." },
  { id: 5, name: "Vision-Retail", type: "AI", tech: "OpenCV / Node", desc: "Computer vision for inventory. AI that actually works in the real world." },
  { id: 6, name: "Stripe-Master", type: "Backend", tech: "Next.js", desc: "Payment processing. Complex billing made simple and bulletproof." },
  { id: 7, name: "Cloud-S3-UI", type: "Tools", tech: "React", desc: "File management interface. Handles massive amounts of data gracefully." },
  { id: 8, name: "Zim-Stock-V2", type: "Backend", tech: "PostgreSQL", desc: "Data system. Real-time price tracking with bulletproof accuracy." },
  { id: 9, name: "Dev-Docs-UI", type: "Design", tech: "Framer Motion", desc: "Design system. Beautiful, functional, and easy for teams to use." },
  { id: 10, name: "Safe-Chat", type: "Mobile", tech: "Expo / SQLite", desc: "Secure messaging. Encrypted conversations that work offline." },
  { id: 11, name: "Portfolio-Core", type: "Design", tech: "React / Vite", desc: "This site. Built for performance and to show what I can do." },
  { id: 12, name: "React-Dashboard", type: "Web", tech: "React / TypeScript", desc: "Admin dashboard. Fast, intuitive, and built to scale." },
  { id: 13, name: "Python-Scripts", type: "Backend", tech: "Python / Automation", desc: "Automation tools. Making repetitive tasks disappear." },
  { id: 14, name: "Mobile-Prototype", type: "Mobile", tech: "React Native", desc: "App prototypes. From idea to working app in days." },
  { id: 15, name: "API-Integration", type: "Backend", tech: "Node / REST", desc: "Third-party integrations. Making different systems talk smoothly." }
];

// --- COMPONENTS ---

const Nav = ({ currentPage, setCurrentPage }) => (
  <header className="nav-wrapper" style={{ background: '#030303', borderBottom: '1px solid #111', position: 'sticky', top: 0, zIndex: 100 }}>
    <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 12vw' }}>
      {/* Logo - Left - Not clickable */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}
      >
        ALLAN <span style={{ background: 'white', color: 'black', padding: '0 6px' }}>MARIMO</span>
      </motion.div>

      {/* Navigation - Center */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}
      >
        <motion.button 
          onClick={() => setCurrentPage('portfolio')}
          whileHover={{ color: '#0070f3', y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#fff', fontWeight: 900, letterSpacing: '1px', fontSize: '0.95rem', transition: '0.3s' }}
        >
          PORTFOLIO
        </motion.button>
        <motion.button 
          onClick={() => setCurrentPage('projects')}
          whileHover={{ color: '#0070f3', y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#fff', fontWeight: 900, letterSpacing: '1px', fontSize: '0.95rem', transition: '0.3s' }}
        >
          PROJECTS
        </motion.button>
        <motion.button 
          onClick={() => setCurrentPage('contact')}
          whileHover={{ color: '#0050d0', y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#0070f3', fontWeight: 900, letterSpacing: '1px', fontSize: '0.95rem', transition: '0.3s' }}
        >
          CONTACT
        </motion.button>
      </motion.div>

      {/* GitHub - Right */}
      <motion.a 
        href="https://github.com/allan4931" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <Github size={28} />
      </motion.a>
    </div>
  </header>
);

const CodeOrb = () => (
  <div className="orb-scene">
    <div className="orb-inner">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="orb-layer" style={{ transform: `rotateY(${i * 15}deg) rotateX(${i * 10}deg)` }} />
      ))}
      <div style={{ position: 'absolute', transform: 'translateZ(10px)' }}>
        <Cpu size={60} color="#0070f3" strokeWidth={1} />
      </div>
    </div>
  </div>
);

const TerminalProfile = () => (
  <div className="pc-container">
    <div className="pc-header">
      <div className="pc-dot" style={{ background: '#ff5f56' }} />
      <div className="pc-dot" style={{ background: '#ffbd2e' }} />
      <div className="pc-dot" style={{ background: '#27c93f' }} />
    </div>
    <div className="pc-content">
      <div style={{ color: '#555', marginBottom: '1.5rem' }}>// System Initialized: Allan Marimo</div>
      <div><span style={{ color: '#c678dd' }}>const</span> profile = {'{'}</div>
      <div style={{ paddingLeft: '20px' }}>
        role: <span style={{ color: '#98c379' }}>"Mid-Level Developer"</span>, <br />
        location: <span style={{ color: '#98c379' }}>"Harare, Zimbabwe"</span>, <br />
        specialty: [<span style={{ color: '#e06c75' }}>"React", "Python", "n8n"</span>], <br />
        focus: <span style={{ color: '#98c379' }}>"Commercial Scalability"</span>
      </div>
      <div>{'}'};</div>
      <div style={{ marginTop: '20px' }}>
        <span style={{ color: '#61afef' }}>$</span> npm start project_vault
        <span style={{ animation: 'blink 1s infinite', marginLeft: '5px', background: '#fff' }}>&nbsp;</span>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer style={{ padding: '20vh 12vw 10vh 12vw', textAlign: 'center', background: '#020202' }}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ 
        display: 'inline-flex', alignItems: 'center', gap: '10px', 
        background: 'rgba(0, 112, 243, 0.1)', padding: '12px 25px', 
        borderRadius: '30px', border: '1px solid #111', marginBottom: '4rem' 
      }}>
        <span style={{ 
          width: '8px', height: '8px', background: '#27c93f', 
          borderRadius: '50%', boxShadow: '0 0 10px #27c93f',
          animation: 'pulse 2s infinite' 
        }}></span>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '3px' }}>
          SYSTEM ONLINE / OPEN TO WORK
        </span>
      </div>

      <h2 style={{ 
        fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, 
        lineHeight: 1.2, margin: '0 auto 5rem auto', maxWidth: '900px' 
      }}>
        READY TO DEPLOY <br /> 
        <span style={{ color: '#555' }}>SCALABLE ARCHITECTURE FOR YOUR BUSINESS.</span>
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a 
          href="https://wa.me/263788447689?text=Hi%20Allan,%20let's%20build." 
          style={{ 
            background: '#fff', color: '#000', padding: '1.5rem 3rem', 
            fontWeight: 900, fontSize: '1rem', letterSpacing: '2px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#0070f3'}
          onMouseOut={(e) => e.target.style.background = '#fff'}
        >
          <MessageSquare size={20} /> SEND TEXT MESSAGE
        </a>
      </div>

      <div style={{ marginTop: '12rem', color: '#222', fontSize: '0.8rem', letterSpacing: '5px' }}>
        © 2026 ALLAN MARIMO / HARARE, ZW / COMMERCIAL GRADE
      </div>
    </motion.div>
  </footer>
);

const HomePage = ({ setCurrentPage }) => (
  <div>
    {/* HERO SECTION */}
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
        <CodeOrb />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '6rem' }}
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '11vw', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.06em', margin: 0 }}
        >
          BUILD. <br /> <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: '#0070f3' }}
          >SHIP. SCALE.</motion.span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ letterSpacing: '0.8rem', color: '#444', marginTop: '3rem', fontSize: '1rem' }}
        >REACT • PYTHON • AUTOMATION</motion.p>
      </motion.div>
    </section>

    {/* ABOUT / PC SCREEN SECTION */}
    <section style={{ padding: '20vh 12vw', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10rem', alignItems: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TerminalProfile />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 900, letterSpacing: '0.5rem' }}>01. NARRATIVE</span>
        <h2 style={{ fontSize: '6rem', margin: '3rem 0', fontWeight: 900, lineHeight: 1 }}>I BUILD <br /> REAL SOFTWARE.</h2>
          <p style={{ fontSize: '1.6rem', color: '#888', lineHeight: 2 }}>
            I'm <span style={{ color: '#fff' }}>Allan Marimo</span>. I build products that work. From React frontends to Python automation, I focus on code that ships fast and scales right.
          </p>
          <p style={{ fontSize: '1.6rem', color: '#888', lineHeight: 2, marginTop: '2rem' }}>
            <span style={{ color: '#0070f3', fontWeight: 900 }}>Always learning.</span> Always open to new tech, new challenges, and growing with your team.
        </p>
      </motion.div>
    </section>

    <Footer />
  </div>
);

const PortfolioPage = () => (
  <Portfolio />
);

const ProjectsPage = () => (
  <Projects />
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Using WhatsApp as fallback since EmailJS requires setup
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/263788447689?text=${message}`, '_blank');
    
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div>
      <section style={{ padding: '20vh 12vw', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: '8rem', fontWeight: 900, margin: '0 0 3rem 0' }}>GET IN TOUCH.</h2>
          <p style={{ fontSize: '1.6rem', color: '#888', marginBottom: '4rem', maxWidth: '600px' }}>
            Have a project in mind? Let's talk about how I can help bring your vision to life with clean, scalable code and commercial-grade solutions.
          </p>

          <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
            <div style={{ marginBottom: '2rem' }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#080808',
                  border: '1px solid #111',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#080808',
                  border: '1px solid #111',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#080808',
                  border: '1px solid #111',
                  color: '#fff',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: '#0070f3',
                color: '#fff',
                padding: '1rem 2rem',
                fontWeight: 900,
                fontSize: '1rem',
                border: 'none',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                letterSpacing: '1px',
                transition: '0.3s',
                opacity: status === 'sending' ? 0.7 : 1
              }}
              onMouseOver={(e) => status !== 'sending' && (e.target.style.background = '#0050d0')}
              onMouseOut={(e) => (e.target.style.background = '#0070f3')}
            >
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#27c93f', marginTop: '1rem', fontWeight: 900 }}
              >
                Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ color: '#ff5f56', marginTop: '1rem', fontWeight: 900 }}
              >
                Error sending message. Please try again or contact via WhatsApp.
              </motion.div>
            )}
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div style={{ background: '#030303', color: '#fff', minHeight: '100vh' }}>
      <Nav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
          {currentPage === 'portfolio' && <PortfolioPage />}
          {currentPage === 'projects' && <ProjectsPage />}
          {currentPage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};