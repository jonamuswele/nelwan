import React, { useState } from 'react';
import { Compass, Phone, Sparkles, Mail, MapPin, Menu, X } from 'lucide-react';

// Import our new subcomponents
import Home from './components/Home';
import PortfolioPage from './components/PortfolioPage';
import VisualizerPage from './components/VisualizerPage';
import ContactPage from './components/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, portfolio, visualizer, contact
  const [menuOpen, setMenuOpen] = useState(false);

  // Shared Design Dossier State from showroom / visualizer selections
  const [dossierData, setDossierData] = useState({
    design_persona: 'Crème Albâtre (Standard)',
    material_choice: 'Murs: Blanc Albâtre (Alabaster) | Mobilier: Canapé en bouclé blanc cassé, lin beige',
    estimated_area: 250,
    luxury_tier: 'Elite Bespoke',
    estimated_cost: 380000
  });

  const handleApplyDossier = (dossier) => {
    setDossierData(prev => ({
      ...prev,
      ...dossier
    }));
    // Redirect tab directly to Contact page so they can submit this custom profile!
    setActiveTab('contact');
  };

  // Navigating through page click actions
  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Selection of preset from realizations gallery
  const handleSelectPortfolioPreset = (presetTheme) => {
    let personaName = 'Blanc Albâtre';
    let materialBase = 'Murs: Blanc Albâtre (Alabaster) | Mobilier: Canapé en bouclé blanc cassé, lin beige';

    if (presetTheme === 'obsidian') {
      personaName = 'Noir Volcanique';
      materialBase = 'Murs: Noir Volcanique (Obsidian) | Mobilier: Canapé en bouclé crème';
    } else if (presetTheme === 'terracotta') {
      personaName = 'Terre Cuite Organic';
      materialBase = 'Murs: Terre Cuite Organic (Terracotta) | Mobilier: Mobiliers en frêne clair';
    } else if (presetTheme === 'velvet') {
      personaName = 'Bleu Indigo Métropole';
      materialBase = 'Murs: Bleu Indigo Métropole (Velvet) | Mobilier: Canapé en velours bleu';
    }

    setDossierData(prev => ({
      ...prev,
      design_persona: personaName,
      material_choice: materialBase
    }));
    
    // Switch to visualizer tab
    handleNavigate('visualizer');
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* Floating White Header Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: '75px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 6%',
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
      }}>
        {/* Brand signature */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--text-title)',
            letterSpacing: '0.05em'
          }}
        >
          <Compass size={24} style={{ color: 'var(--accent)' }} />
          <span style={{ fontWeight: 400 }}>NELWAN <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent-gold)' }}>SARL</span></span>
        </div>

        {/* Dynamic Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '30px',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontWeight: 600,
          height: '100%',
          alignItems: 'center'
        }}>
          {['home', 'portfolio', 'visualizer', 'contact'].map(tab => {
            const isActive = activeTab === tab;
            let label = 'Accueil';
            if (tab === 'portfolio') label = 'Nos Réalisations';
            else if (tab === 'visualizer') label = 'Visualiseur';
            else if (tab === 'contact') label = 'Contact';

            return (
              <span
                key={tab}
                onClick={() => handleNavigate(tab)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '8px 0',
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  transition: 'var(--transition-fast)'
                }}
                className={`nav-link-tab ${isActive ? 'active' : ''}`}
              >
                {label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent)'
                  }} />
                )}
              </span>
            );
          })}
        </nav>

        {/* Contact quick actions */}
        <div className="header-cta-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-primary" 
            onClick={() => handleNavigate('contact')}
            style={{ padding: '10px 20px', fontSize: '0.8rem', borderRadius: '4px' }}
          >
            Prendre Contact
          </button>
        </div>

        {/* Hamburger Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            color: 'var(--text-title)',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} style={{ color: 'var(--accent)' }} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      {menuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '75px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 6%',
            zIndex: 99,
            gap: '16px'
          }} 
          className="mobile-nav-menu"
        >
          {['home', 'portfolio', 'visualizer', 'contact'].map(tab => {
            const isActive = activeTab === tab;
            let label = 'Accueil';
            if (tab === 'portfolio') label = 'Nos Réalisations';
            else if (tab === 'visualizer') label = 'Visualiseur';
            else if (tab === 'contact') label = 'Contact';

            return (
              <span
                key={tab}
                onClick={() => {
                  handleNavigate(tab);
                  setMenuOpen(false);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  borderBottom: '1px solid rgba(0,0,0,0.03)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {label}
              </span>
            );
          })}
          <button 
            className="btn-primary" 
            onClick={() => {
              handleNavigate('contact');
              setMenuOpen(false);
            }}
            style={{ padding: '12px 20px', fontSize: '0.85rem', borderRadius: '4px', marginTop: '8px', width: '100%', textAlign: 'center' }}
          >
            Prendre Contact
          </button>
        </div>
      )}

      {/* Render active page state */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'portfolio' && <PortfolioPage onSelectPreset={handleSelectPortfolioPreset} />}
        {activeTab === 'visualizer' && <VisualizerPage onApplyDossier={handleApplyDossier} />}
        {activeTab === 'contact' && <ContactPage dossierData={dossierData} />}
      </main>

      {/* Corporate Light Footer */}
      <footer style={{
        background: '#FAF9F6',
        borderTop: '1px solid var(--border)',
        padding: '60px 6% 40px',
        color: 'var(--text-body)',
        fontSize: '0.85rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr',
          gap: '50px'
        }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: 'var(--text-title)', marginBottom: '14px', fontWeight: 300 }}>
              NELWAN <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-gold)' }}>SARL</span>
            </h4>
            <p style={{ lineHeight: '1.6', marginBottom: '18px', fontWeight: 300 }}>
              Leader de la construction générale (BTP), de l'architecture moderne et du design d'intérieur de prestige à Kinshasa, RDC. Nelson Wanga et ses équipes concrétisent vos visions structurelles.
            </p>
            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>© 2026 Nelwan SARL. Tous droits réservés.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Plan du site</span>
            <span onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>Accueil</span>
            <span onClick={() => handleNavigate('portfolio')} style={{ cursor: 'pointer' }}>Nos Réalisations</span>
            <span onClick={() => handleNavigate('visualizer')} style={{ cursor: 'pointer' }}>Visualiseur de Design</span>
            <span onClick={() => handleNavigate('contact')} style={{ cursor: 'pointer' }}>Contact BTP</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Contacts RDC</span>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
              <strong>+(243) 819929338</strong>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>contact@nelwansarl.com</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>1ère rue industrielle, en diagonale de la station Sonahydro, Kinshasa, RDC.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Embedded Navigation Hover CSS */}
      <style>{`
        .nav-link-tab:hover {
          color: var(--accent) !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-nav-menu {
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 900px) {
          header nav {
            display: none !important;
          }
          .header-cta-container {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          footer div {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>

    </div>
  );
}
