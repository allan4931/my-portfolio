import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Replace these with your actual EmailJS IDs from their dashboard
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then(() => {
          setIsSuccess(true);
          setIsSending(false);
      }, (error) => {
          console.log(error.text);
          setIsSending(false);
      });
  };

  return (
    <section id="contact" style={{ minHeight: '100vh', padding: '15vh 10vw', background: '#030303' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '8rem' }}>
          <span style={{ color: '#0070f3', fontWeight: 900, letterSpacing: '0.5rem' }}>COMMERCIAL INQUIRY</span>
          <h2 style={{ fontSize: 'clamp(4rem, 8vw, 9rem)', fontWeight: 900, margin: '2rem 0', lineHeight: 1 }}>
            LET'S SECURE <br /> <span style={{ color: '#0070f3' }}>THE BAG.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '8rem' }}>
          
          {/* LEFT SIDE: DIRECT CONTACT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ background: '#080808', padding: '3rem', border: '1px solid #111' }}>
              <Phone size={24} color="#0070f3" style={{ marginBottom: '2rem' }} />
              <h4 style={{ letterSpacing: '2px', color: '#444', marginBottom: '1rem' }}>CALL / WHATSAPP</h4>
              <a href="https://wa.me/263788447689" target="_blank" rel="noreferrer" 
                 style={{ color: '#fff', fontSize: '1.8rem', textDecoration: 'none', fontWeight: 900 }}>
                +263 788 447 689
              </a>
            </div>

            <div style={{ background: '#080808', padding: '3rem', border: '1px solid #111' }}>
              <Mail size={24} color="#0070f3" style={{ marginBottom: '2rem' }} />
              <h4 style={{ letterSpacing: '2px', color: '#444', marginBottom: '1rem' }}>OFFICIAL EMAIL</h4>
              <a href="mailto:allanmarimo455@gmail.com" 
                 style={{ color: '#fff', fontSize: '1.6rem', textDecoration: 'none', fontWeight: 900 }}>
                allanmarimo455@gmail.com
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: THE PERFECT FORM */}
          <div style={{ position: 'relative' }}>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <CheckCircle size={60} color="#27c93f" style={{ marginBottom: '2rem' }} />
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900 }}>MESSAGE SENT</h3>
                <p style={{ color: '#666', marginTop: '1rem' }}>I will get back to you within 24 hours.</p>
                <button onClick={() => setIsSuccess(false)} style={{ background: 'none', border: '1px solid #333', color: '#fff', padding: '1rem 2rem', marginTop: '2rem', cursor: 'pointer' }}>SEND ANOTHER</button>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="form-group">
                  <input type="text" name="user_name" placeholder="YOUR NAME" className="form-input" required style={{ width: '100%' }} />
                </div>
                <div className="form-group">
                  <input type="email" name="user_email" placeholder="YOUR EMAIL ADDRESS" className="form-input" required style={{ width: '100%' }} />
                </div>
                <div className="form-group">
                  <select name="project_type" className="form-input" style={{ width: '100%', appearance: 'none' }}>
                    <option value="automation">n8n Automation</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="server">Ubuntu Server Config</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="TELL ME ABOUT YOUR PROJECT" className="form-input" rows="5" required style={{ width: '100%', resize: 'none' }} />
                </div>
                <button type="submit" disabled={isSending} className="submit-btn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                  {isSending ? "SENDING..." : <><Send size={18} /> INITIATE PROJECT</>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}