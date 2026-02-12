import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowUpRight, Filter, X } from 'lucide-react';
import { MessageSquare } from 'lucide-react';

const PROJECT_DATA = [
  { id: 1, name: "Quantum-Node", type: "Automation", tech: "n8n / Python", desc: "Commercial-grade workflow for lead generation and CRM synchronization." },
  { id: 2, name: "EcoTrack ZW", type: "Mobile App", tech: "React Native", desc: "Environmental monitoring system with real-time hardware telemetry." },
  { id: 3, name: "Auth-Titan", type: "Security", tech: "Supabase / JWT", desc: "Custom identity provider designed for high-security commercial portals." },
  { id: 4, name: "FastAPI Bridge", type: "Backend", tech: "Python / Redis", desc: "High-performance API gateway with custom rate-limiting middleware." },
  { id: 5, name: "Vision-Retail", type: "AI", tech: "OpenCV / Node", desc: "Automated inventory scanning using computer vision for retail clients." },
  { id: 6, name: "Stripe-Master", type: "Fintech", tech: "Next.js", desc: "Global e-commerce engine with complex billing logic and sub-accounts." },
  { id: 7, name: "Cloud-S3-UI", type: "Tools", tech: "React", desc: "Visual file manager for managing massive enterprise asset buckets." },
  { id: 8, name: "Logistics-Map", type: "Mapping", tech: "Google API", desc: "Fleet tracking dashboard for regional logistics companies." },
  { id: 9, name: "Neural-Mesh", type: "Network", tech: "WebSockets", desc: "Low-latency communication layer for real-time collaboration tools." },
  { id: 10, name: "Zim-Stock-V2", type: "Data", tech: "PostgreSQL", desc: "Price tracking engine for local commodities and market volatility." },
  { id: 11, name: "Dev-Docs-UI", type: "Design", tech: "Framer Motion", desc: "Architectural design system for developer documentation." },
  { id: 12, name: "Safe-Chat", type: "Mobile", tech: "Expo / SQLite", desc: "Encrypted offline-first messaging app for sensitive business data." },
  { id: 13, name: "Asset-Vault", type: "Crypto", tech: "Solidity / React", desc: "Smart contract dashboard for tracking commercial tokenized assets." },
  { id: 14, name: "Ubuntu-Bash-Bot", type: "DevOps", tech: "Bash / Node", desc: "Server management bot for automated Ubuntu server maintenance." },
  { id: 15, name: "Portfolio-Core", type: "Web", tech: "React / Vite", desc: "The cinematic, code-driven archive of my commercial career." }
];

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

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Automation', 'Mobile App', 'Backend', 'AI', 'Design', 'Web'];

  const filteredProjects = PROJECT_DATA.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.type === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* WORK SECTION (15 PROJECTS) */}
      <section style={{ padding: '20vh 12vw' }}>
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '5rem', fontWeight: 900, margin: '0 0 1rem 0' }}>MY WORK.</h2>
          <p style={{ color: '#666', fontSize: '1.2rem', margin: 0 }}>Real projects. Real results.</p>
          <div style={{ marginTop: '1.5rem', color: '#bbb' }}>
            <strong style={{ color: '#fff' }}>Skills & Expertise</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {[
                { title: 'n8n (Automation)', text: "I wire systems together with n8n so your apps talk like polite coworkers. Triggers, webhooks, and retries? Handled. I automate the boring, leave you the clever stuff — and yes, I test the happy path and the one that cries at 2AM." },
                { title: 'React Native', text: "I build mobile apps that actually behave on phones — no excuses. React Native lets me reuse smarts, ship faster, and keep UI buttery-smooth. I handle native quirks, performance, and battery manners so your users keep tapping and not cursing." },
                { title: 'React (Web)', text: "I craft React frontends that feel fast, obvious, and strangely delightful. Component-driven, test-backed, and accessible — I build interfaces people enjoy using and teams enjoy maintaining. Expect clean hooks, clear state, and fewer 'it works on my machine' excuses." },
                { title: 'Full‑stack Mobile Apps', text: "From DB to device, I stitch backend APIs, real-time sync, and polished UI into one deployable package. Authentication, offline sync, push notifications — I build full apps that survive real users and actual coffee spills." },
                { title: 'Figma & Design', text: "I speak Figma fluently: rapid prototyping, design handoffs, and pixel-checks. I turn ideas into clickable flows and collaborate with designers to keep visuals consistent and delightful. Your product will look loved and ship-ready." },
                { title: 'Problem Solving', text: "I find the leaky pipes before they flood the app. Root cause analysis, pragmatic trade-offs, and a bias for shipping fixes fast — I solve problems so you can sleep, or at least worry about something trendier." },
                { title: 'Databases', text: "PostgreSQL, Supabase, Appwrite — I model data for speed, integrity, and scale. Indexes, migrations, and backups are not mythical: they are part of my morning routine. I design schemas that survive feature creep and analyst queries." },
                { title: 'GitHub Driven', text: "I live in branches, PRs, and sensible commit messages. CI, reviews, and release pipelines are my ritual; I make merging painless and history useful. If it’s on GitHub, it’s versioned, tested, and documented." }
              ].map((s, i) => (
                <div key={i} style={{ background: '#070707', padding: '1rem', border: '1px solid #111', borderRadius: '8px' }}>
                  <div style={{ color: '#0070f3', fontWeight: 900, marginBottom: '0.5rem' }}>{s.title}</div>
                  <div style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: 1.5 }}>{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div style={{ marginBottom: '4rem' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: '#080808',
              border: '2px solid #111',
              color: '#fff',
              fontSize: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              outline: 'none',
              transition: '0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0070f3'}
            onBlur={(e) => e.target.style.borderColor = '#111'}
          />

          {/* CATEGORY FILTERS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.7rem 1.5rem',
                  background: selectedCategory === cat ? '#0070f3' : '#080808',
                  border: selectedCategory === cat ? '2px solid #0070f3' : '2px solid #111',
                  color: '#fff',
                  fontWeight: 900,
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: '0.3s',
                  fontSize: '0.9rem'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = '#0070f3';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.borderColor = '#111';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {filteredProjects.map((p, index) => (
            <motion.div 
              key={p.id} 
              onClick={() => setSelectedProject(p)}
              whileHover={{ y: -10, borderColor: '#0070f3' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ border: '1px solid #111', padding: '3.5rem', background: '#080808', transition: '0.4s', cursor: 'pointer', borderRadius: '8px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                <Code2 size={20} color="#333" />
                <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 900 }}>No external links — contact for details</div>
              </div>
              <div style={{ color: '#555', fontSize: '0.9rem', fontWeight: 900, marginBottom: '1rem' }}>{p.tech}</div>
              <h3 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '1rem 0' }}>{p.name}</h3>
              <p style={{ color: '#666', fontSize: '1.3rem', lineHeight: 1.6 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#888', fontSize: '1.2rem' }}>
            No projects found matching your criteria.
          </div>
        )}
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0a0a0a',
              border: '2px solid #0070f3',
              borderRadius: '12px',
              padding: '2rem',
              width: 'min(900px, 95%)',
              maxHeight: '85vh',
              overflow: 'auto'
            }}
          >
            {(() => {
              const sp = selectedProject || {};
              const tech = sp.tech || '';
              const desc = sp.desc || 'No description available.';
              const title = sp.name || 'Project';
              const techItems = (tech && tech.split(/\s*\/?\s*/)) || [];
              const screenshot = sp.screenshotUrl || 'https://via.placeholder.com/800x400?text=No+Preview';

              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '0.5rem' }}>PROJECT</div>
                      <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>{title}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '1.6rem',
                        padding: 0
                      }}
                    >
                      <X size={28} />
                    </button>
                  </div>

                  <img src={screenshot} alt={title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />

                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 900, marginBottom: '0.5rem', color: '#888', fontSize: '0.95rem', letterSpacing: '1px' }}>DESCRIPTION</h3>
                    <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: 1.7 }}>{desc}</p>
                  </div>

                  <div style={{ marginBottom: '1rem', background: '#080808', padding: '1rem', borderRadius: '8px' }}>
                    <h3 style={{ fontWeight: 900, marginBottom: '0.75rem', fontSize: '1rem', color: '#888' }}>TECH STACK</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {techItems.length ? techItems.map((t, i) => (
                        <span key={i} style={{ background: 'rgba(0, 112, 243, 0.18)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.85rem', color: '#ddd' }}>{t}</span>
                      )) : <span style={{ color: '#666' }}>No tech listed.</span>}
                    </div>
                  </div>

                  <div style={{ width: '100%', background: '#0070f3', color: '#fff', padding: '1rem', fontWeight: 900, borderRadius: '8px', textAlign: 'center' }}>Contact me to view project details or source</div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
