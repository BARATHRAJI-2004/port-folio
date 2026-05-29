import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../assets/image.png';

export default function Contact() {
  const { currentTheme, persona } = useTheme();
  const [copied, setCopied] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Please enter your name and message.");
      return;
    }
    const text = encodeURIComponent(`Hi Barath, I am ${formData.name}.\n\n${formData.subject ? `Subject: ${formData.subject}\n\n` : ''}${formData.message}`);
    window.open(`https://wa.me/91${persona.contact.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Please enter your name and message.");
      return;
    }
    const subject = encodeURIComponent(formData.subject ? `${formData.subject} - from ${formData.name}` : `Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Hi Barath,\n\n${formData.message}\n\nBest regards,\n${formData.name}`);
    window.location.href = `mailto:${persona.contact.email}?subject=${subject}&body=${body}`;
  };

  const contactItems = [
    { icon: '✉', label: 'Email', value: persona.contact.email, href: `mailto:${persona.contact.email}`, copy: persona.contact.email },
    { icon: '📞', label: 'Phone', value: persona.contact.phone, href: `tel:${persona.contact.phone}`, copy: persona.contact.phone },
    { icon: '💬', label: 'WhatsApp', value: persona.contact.whatsapp, href: `https://wa.me/91${persona.contact.whatsapp}`, copy: persona.contact.whatsapp },
    { icon: '📸', label: 'Instagram', value: '@barath__raji', href: `https://${persona.contact.instagram}`, copy: persona.contact.instagram },
    { icon: '⌨', label: 'GitHub', value: persona.contact.github, href: `https://${persona.contact.github}`, copy: persona.contact.github },
    { icon: '🔗', label: 'LinkedIn', value: persona.contact.linkedin, href: `https://${persona.contact.linkedin}`, copy: persona.contact.linkedin },
    { icon: '📍', label: 'Location', value: persona.contact.location, copy: persona.contact.location },
  ];

  return (
    <section id="contact" className="section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: currentTheme.primary }}>
            Get In Touch
          </h2>
          <div className="section-line" style={{ background: `linear-gradient(90deg, ${currentTheme.primary}, transparent)` }} />
        </div>

        <div className="contact-wrap">
          <div className="contact-left">
            <h3 className="contact-heading" style={{ color: currentTheme.accent }}>
              Let's Build Something{' '}
              <span style={{ color: currentTheme.primary }}>Amazing</span> Together
            </h3>
            <p className="contact-text">
              I'm currently open to new opportunities. Whether you have a project in mind, 
              a job opportunity, or just want to say hi — my inbox is always open!
            </p>

            <div className="contact-form-container" style={{ background: `rgba(0,0,0,0.2)`, border: `1px solid ${currentTheme.primary}33`, padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required className="form-input" style={{ borderColor: currentTheme.primary + '55', color: '#fff' }} />
                </div>
                <div className="form-group">
                  <input type="text" name="subject" value={formData.subject} onChange={handleFormChange} placeholder="Subject (Optional)" className="form-input" style={{ borderColor: currentTheme.primary + '55', color: '#fff' }} />
                </div>
                <div className="form-group">
                  <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Your Message..." required rows="4" className="form-input" style={{ borderColor: currentTheme.primary + '55', color: '#fff', resize: 'vertical' }} />
                </div>
                <div className="form-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="button" onClick={handleEmail} className="btn-primary" style={{ background: currentTheme.primary, color: '#000', flex: 1, padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>✉</span> Send via Email
                  </button>
                  <button type="button" onClick={handleWhatsApp} className="btn-primary" style={{ background: '#25D366', color: '#fff', flex: 1, padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <span>💬</span> Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-cards">
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="contact-card"
                  style={{
                    borderColor: currentTheme.primary + '33',
                    background: currentTheme.surface,
                  }}
                >
                  <span className="contact-card-icon" style={{ color: currentTheme.primary }}>{item.icon}</span>
                  <div className="contact-card-info">
                    <span className="contact-card-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="contact-card-value" style={{ color: currentTheme.accent }}>
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-card-value" style={{ color: currentTheme.accent }}>{item.value}</span>
                    )}
                  </div>
                  <button
                    className="copy-btn"
                    onClick={() => copy(item.copy, item.label)}
                    style={{ color: copied === item.label ? currentTheme.primary : '#666' }}
                    title="Copy"
                  >
                    {copied === item.label ? '✓' : '⎘'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Profile photo right panel */}
          <div className="contact-right">
            <div
              className="contact-globe contact-profile-panel"
              style={{ borderColor: currentTheme.primary + '33', boxShadow: `0 0 60px ${currentTheme.glow}` }}
            >
              {/* Profile photo */}
              <div className="contact-photo-wrap" style={{ borderColor: currentTheme.primary, boxShadow: `0 0 30px ${currentTheme.glow}` }}>
                <img src={profileImg} alt="Barathraji P" className="contact-photo" />
                <div className="contact-photo-overlay" style={{ background: `linear-gradient(180deg, transparent 60%, ${currentTheme.primary}44)` }} />
              </div>
              <div className="globe-text" style={{ color: currentTheme.primary }}>
                <div className="globe-name">{persona.name}</div>
                <div className="globe-title">{persona.title}</div>
                <div className="globe-location">📍 Chennai, TN, India</div>
                <div className="globe-available" style={{ color: currentTheme.accent }}>
                  🟢 Available for Opportunities
                </div>
              </div>
              {/* Orbital rings */}
              <div className="orbit orbit-1" style={{ borderColor: currentTheme.primary + '33' }} />
              <div className="orbit orbit-2" style={{ borderColor: currentTheme.accent + '22' }} />
              <div className="orbit orbit-3" style={{ borderColor: currentTheme.primary + '18' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div style={{ color: '#666' }}>
          Designed & Built with ❤️ by{' '}
          <span style={{ color: currentTheme.primary }}>Barathraji P</span>
        </div>
        <div style={{ color: '#444', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          © 2026 All rights reserved
        </div>
      </footer>
    </section>
  );
}
