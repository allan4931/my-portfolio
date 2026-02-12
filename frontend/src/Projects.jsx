import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Upload, Trash2, Star, Clock } from 'lucide-react';
import { MessageSquare } from 'lucide-react';

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "EcoTrack ZW",
    type: "Mobile App (APK)",
    description: "Environmental monitoring system with real-time hardware telemetry. Track air quality, temperature, and pollution levels in your region.",
    version: "2.1.0",
    size: "45.3 MB",
    downloads: 1240,
    rating: 4.8,
    date: "2025-11-15",
    tech: "React Native, Firebase",
    features: ["Real-time data", "Offline mode", "Push notifications", "Export CSV"],
    downloadUrl: "#",
    screenshotUrl: "https://via.placeholder.com/300x500?text=EcoTrack"
  },
  {
    id: 2,
    title: "Safe-Chat",
    type: "Mobile App (APK)",
    description: "Encrypted offline-first messaging app for sensitive business data. End-to-end encryption with zero-knowledge architecture.",
    version: "1.5.2",
    size: "32.8 MB",
    downloads: 876,
    rating: 4.9,
    date: "2025-10-20",
    tech: "Expo, SQLite, Crypto",
    features: ["E2E encryption", "Offline messaging", "Voice notes", "Group chats"],
    downloadUrl: "#",
    screenshotUrl: "https://via.placeholder.com/300x500?text=SafeChat"
  },
  {
    id: 3,
    title: "Vision-Retail",
    type: "Desktop App",
    description: "Automated inventory scanning using computer vision for retail clients. AI-powered product recognition and stock management.",
    version: "3.2.1",
    size: "156.4 MB",
    downloads: 524,
    rating: 4.7,
    date: "2025-09-10",
    tech: "OpenCV, Node.js, Python",
    features: ["Real-time scanning", "Stock alerts", "Reports", "Multi-store support"],
    downloadUrl: "#",
    screenshotUrl: "https://via.placeholder.com/400x300?text=Vision-Retail"
  }
];

const Footer = () => (
  <footer style={{ padding: '20vh 12vw 10vh 12vw', textAlign: 'center', background: '#020202', marginTop: '10rem' }}>
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

export default function Projects() {
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [techInput, setTechInput] = useState('React Native');
  const [typeInput, setTypeInput] = useState('Mobile App (APK)');

  useEffect(() => {
    // load projects from backend
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setProjects(data.projects);
        }
      })
      .catch(err => {
        console.warn('Failed to fetch projects from API', err);
      });
  }, []);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* HEADER SECTION */}
      <section style={{ padding: '10vh 12vw', background: 'linear-gradient(135deg, #0070f3 0%, #030303 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ fontSize: '5rem', fontWeight: 900, margin: '0 0 2rem 0' }}>PROJECT VAULT.</h1>
          <p style={{ fontSize: '1.3rem', color: '#ddd', maxWidth: '600px', lineHeight: 1.8 }}>
            Downloadable applications, APKs, and executable projects. All built with commercial-grade standards and ready for deployment.
          </p>
        </motion.div>
      </section>

      {/* SEARCH & FILTER */}
      <section style={{ padding: '5vh 12vw', background: '#050505', borderBottom: '1px solid #111' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '1rem 1.5rem',
              background: '#0a0a0a',
              border: '2px solid #111',
              color: '#fff',
              fontSize: '1rem',
              borderRadius: '8px',
              transition: '0.3s',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0070f3'}
            onBlur={(e) => e.target.style.borderColor = '#111'}
          />
          <button
            onClick={() => {
              if (!uploadMode) {
                const envToken = import.meta.env.VITE_ADMIN_TOKEN || '';
                if (envToken) {
                  setAdminToken(envToken);
                  setUploadMode(true);
                  return;
                }
                const t = window.prompt('Enter admin token to enable uploads');
                if (!t) return alert('Admin token required to upload');
                setAdminToken(t);
                setUploadMode(true);
              } else {
                setUploadMode(false);
              }
            }}
            style={{
              background: '#0070f3',
              color: '#fff',
              padding: '1rem 2rem',
              fontWeight: 900,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              letterSpacing: '1px',
              borderRadius: '8px',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = '#0050d0'}
            onMouseOut={(e) => e.target.style.background = '#0070f3'}
          >
            <Upload size={20} /> UPLOAD PROJECT
          </button>
        </div>

        {/* Upload Form */}
        {uploadMode && (
          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#0a0a0a', border: '1px solid #111', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Title" value={titleInput} onChange={e=>setTitleInput(e.target.value)} style={{flex:1, padding:'0.8rem'}} />
              <input type="text" placeholder="Tech stack" value={techInput} onChange={e=>setTechInput(e.target.value)} style={{flex:1, padding:'0.8rem'}} />
            </div>
            <textarea placeholder="Description" value={descInput} onChange={e=>setDescInput(e.target.value)} style={{width:'100%', marginTop:'1rem', padding:'0.8rem'}} />
            <div style={{ display:'flex', gap:'1rem', marginTop:'1rem', alignItems:'center' }}>
              <input type="file" accept=".apk" onChange={e=>setUploadFile(e.target.files[0])} />
              <input type="text" placeholder="Or paste GitHub raw file URL" value={githubUrl} onChange={e=>setGithubUrl(e.target.value)} style={{flex:1, padding:'0.6rem'}} />
              <button onClick={async ()=>{
                if(!titleInput || !descInput) return alert('Please add title and description');
                const form = new FormData();
                form.append('title', titleInput);
                form.append('description', descInput);
                form.append('tech_stack', techInput);
                form.append('project_type', typeInput);
                if(uploadFile) form.append('file', uploadFile);
                if(!uploadFile && githubUrl) form.append('github_url', githubUrl);
                if(adminToken) form.append('admin_token', adminToken);

                try{
                  const res = await fetch(`${API_BASE}/api/projects/upload`, { method: 'POST', body: form });
                  const data = await res.json();
                  if(data && data.success){
                    setProjects(prev => [data.project, ...prev]);
                    setUploadMode(false);
                    setUploadFile(null);
                    setGithubUrl('');
                    setTitleInput('');
                    setDescInput('');
                    alert('Upload successful');
                  } else {
                    alert(data.detail || 'Upload failed');
                  }
                }catch(err){
                  console.error(err);
                  alert('Upload failed');
                }
              }} style={{background:'#27c93f', color:'#000', padding:'0.8rem 1rem', border:'none', fontWeight:900}}>SUBMIT</button>
            </div>
          </div>
        )}
      </section>

      {/* PROJECTS GRID */}
      <section style={{ padding: '10vh 12vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -15, boxShadow: '0 20px 40px rgba(0, 112, 243, 0.3)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => setSelectedProject(project)}
              style={{
                background: '#080808',
                border: '2px solid #111',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {/* Project Image/Screenshot */}
              <div style={{ height: '200px', background: '#0a0a0a', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={project.screenshotUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(project.title)}` } 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#0070f3', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.8rem' }}>
                  {project.type}
                </div>
              </div>

              {/* Project Info */}
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 1rem 0' }}>{project.title}</h3>
                <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {project.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #111' }}>
                  <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>VERSION</div>
                      <div style={{ fontWeight: 900, color: '#0070f3' }}>{project.version || '1.0.0'}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>SIZE</div>
                    <div style={{ fontWeight: 900, color: '#0070f3' }}>{project.size || '0 MB'}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>RATING</div>
                    <div style={{ fontWeight: 900, color: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                      <Star size={16} fill="#0070f3" /> {project.rating || 0}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 900, marginBottom: '0.5rem' }}>FEATURES</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {(project.features || []).slice(0, 3).map((feature, i) => (
                      <span key={i} style={{ background: 'rgba(0, 112, 243, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 900 }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  style={{
                    width: '100%',
                    background: '#0070f3',
                    color: '#fff',
                    padding: '1rem',
                    fontWeight: 900,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderRadius: '8px',
                    transition: '0.3s',
                    letterSpacing: '1px'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#0050d0'}
                  onMouseOut={(e) => e.target.style.background = '#0070f3'}
                  onClick={async (e)=>{
                    e.stopPropagation();
                    try{
                      await fetch(`${API_BASE}/api/projects/${project.id}/download`, { method: 'POST' });
                      // open file
                      const url = `${API_BASE}${project.file_url}`;
                      window.open(url, '_blank');
                      // update local state
                      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, downloads: (p.downloads||0)+1 } : p));
                    }catch(err){
                      console.error(err);
                      alert('Download failed');
                    }
                  }}
                >
                  <Download size={20} /> DOWNLOAD
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* STATS SECTION */}
        <section style={{ background: '#080808', border: '2px solid #111', borderRadius: '12px', padding: '4rem', marginBottom: '5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 4rem 0' }}>PROJECT STATISTICS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0070f3', marginBottom: '1rem' }}>
                {projects.length}
              </div>
              <div style={{ fontSize: '1.2rem', color: '#888', fontWeight: 900, letterSpacing: '2px' }}>TOTAL PROJECTS</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#27c93f', marginBottom: '1rem' }}>
                {projects.reduce((a, b) => a + b.downloads, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '1.2rem', color: '#888', fontWeight: 900, letterSpacing: '2px' }}>TOTAL DOWNLOADS</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#ffb81c', marginBottom: '1rem' }}>
                {(projects.reduce((a, b) => a + b.rating, 0) / projects.length).toFixed(1)}
              </div>
              <div style={{ fontSize: '1.2rem', color: '#888', fontWeight: 900, letterSpacing: '2px' }}>AVG RATING</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#00d9ff', marginBottom: '1rem' }}>
                {(projects.reduce((a, b) => {
                  const size = parseFloat(b.size);
                  return a + size;
                }, 0)).toFixed(1)} GB
              </div>
              <div style={{ fontSize: '1.2rem', color: '#888', fontWeight: 900, letterSpacing: '2px' }}>TOTAL SIZE</div>
            </motion.div>
          </div>
        </section>
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
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0a0a0a',
              border: '2px solid #111',
              borderRadius: '12px',
              padding: '3rem',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
          >
            {(() => {
              const sp = selectedProject || {};
              const features = sp.features || [];
              const screenshot = sp.screenshotUrl || 'https://via.placeholder.com/700x400?text=No+Preview';
              const released = sp.date || 'Unknown';
              const version = sp.version || '1.0.0';
              const size = sp.size || '0 MB';
              const downloads = sp.downloads || 0;
              const rating = sp.rating || 0;
              const tech = sp.tech || '';

              return (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                    <div>
                      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 1rem 0' }}>{sp.title || 'Untitled Project'}</h2>
                      <div style={{ color: '#888', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} /> Released {released}
                      </div>
                    </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  background: '#111',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '2rem',
                  padding: '0',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            <img 
              src={screenshot} 
              alt={sp.title || 'Preview'}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '2rem' }}
            />

            <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {sp.description || 'No description available.'}
            </p>

              <div style={{ background: '#080808', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
                <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem' }}>SPECIFICATIONS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  <div>
                    <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 900 }}>VERSION</div>
                    <div style={{ color: '#0070f3', fontWeight: 900, fontSize: '1.1rem' }}>{version}</div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 900 }}>SIZE</div>
                    <div style={{ color: '#0070f3', fontWeight: 900, fontSize: '1.1rem' }}>{size}</div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 900 }}>DOWNLOADS</div>
                    <div style={{ color: '#27c93f', fontWeight: 900, fontSize: '1.1rem' }}>{downloads.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ color: '#666', fontSize: '0.9rem', fontWeight: 900 }}>RATING</div>
                    <div style={{ color: '#ffb81c', fontWeight: 900, fontSize: '1.1rem' }}>★ {rating}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem' }}>TECH STACK</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {tech.split(', ').filter(Boolean).map((t, i) => (
                    <span key={i} style={{ background: 'rgba(0, 112, 243, 0.2)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.9rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontWeight: 900, marginBottom: '1rem', fontSize: '1.2rem' }}>FEATURES</h3>
                <ul style={{ list: 'none', padding: 0 }}>
                  {features.length ? features.map((feature, i) => (
                    <li key={i} style={{ padding: '0.5rem 0', color: '#ccc', fontSize: '1rem' }}>
                      ✓ {feature}
                    </li>
                  )) : <li style={{ color: '#666' }}>No feature list available.</li>}
                </ul>
              </div>

            </>
              )
            })()}

            <div style={{ width: '100%', background: '#0070f3', color: '#fff', padding: '1.2rem', fontWeight: 900, borderRadius: '8px', textAlign: 'center' }}>Contact me to request access or view source</div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
