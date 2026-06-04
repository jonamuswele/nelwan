import React, { useState, useRef, useEffect } from 'react';
import {
  Compass, CheckCircle, Award, HardHat, Layers,
  Play, ArrowRight, Eye, Sparkles, Home as HomeIcon, MapPin
} from 'lucide-react';
import imgVilla      from '../assets/exterior_villa.png';
import imgAlabaster  from '../assets/living_alabaster.png';
import imgObsidian   from '../assets/living_obsidian.png';
import imgTerracotta from '../assets/living_terracotta.png';
//import heroVideo1    from '../assets/const1.mp4';
//import heroVideo2    from '../assets/construction_hero.mp4';
import heroVideo3    from '../assets/presents.mp4';

// ─── HERO IMAGES (construction + architecture mood) ──────────────────────────
// Using reliable Unsplash CDN images; swap with your own assets as needed
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=90",
    tag: "Construction",
    headline: ["Bâtir", "l'Avenir"],
  },
  {
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=90",
    tag: "Architecture",
    headline: ["Concevoir", "l'Excellence"],
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=90",
    tag: "Résidentiel Prestige",
    headline: ["Votre Rêve,", "Notre Métier"],
  },
];

const STATS = [
  { val: "10+",    label: "Années d'expérience" },
  { val: "200+",   label: "Projets livrés" },
  { val: "12",     label: "Étages max réalisés" },
  { val: "11 provinces", label: "de présence" },
];

const teaserRooms = [
  { img: imgAlabaster,  label: "Blanc Albâtre",      desc: "Sérénité lumineuse & bois de chêne" },
  { img: imgObsidian,   label: "Noir Volcanique",     desc: "Prestige sombre & accents dorés" },
  { img: imgTerracotta, label: "Terre Cuite Organic", desc: "Chaleur naturelle & matières brutes" },
];

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function Home({ onNavigate }) {
  const [slide, setSlide]         = useState(0);
  const [fading, setFading]       = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const heroVideoRef = useRef(null);
  //const videos = [heroVideo1, heroVideo2];

  // Auto-advance slides every 6s
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % HERO_SLIDES.length);
        setFading(false);
      }, 500);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goSlide = (i) => {
    if (i === slide) return;
    setFading(true);
    setTimeout(() => { setSlide(i); setFading(false); }, 500);
  };

  const current = HERO_SLIDES[slide];

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600&display=swap');

        .hero-img {
          transition: opacity 0.5s ease, transform 7s ease;
        }
        .hero-img.fading {
          opacity: 0;
        }
        .hero-img.visible {
          opacity: 1;
          transform: scale(1.04);
        }

        .slide-dot {
          width: 28px; height: 2px;
          background: rgba(255,255,255,0.35);
          border: none; cursor: pointer;
          transition: all 0.3s ease; padding: 0;
        }
        .slide-dot.active {
          width: 48px;
          background: #C5A880;
        }

        .stat-pill {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0 24px;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .stat-pill:last-child { border-right: none; }

        .hero-cta-primary {
          background: #C5A880;
          color: #0F172A;
          border: none;
          padding: 15px 28px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .hero-cta-primary:hover {
          background: #d4b990;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(197,168,128,0.4);
        }

        .hero-cta-ghost {
          background: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 15px 28px;
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .hero-cta-ghost:hover {
          border-color: #C5A880;
          color: #C5A880;
        }

        .service-card {
          background: #FFFFFF;
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 36px 32px;
          display: flex; flex-direction: column;
          box-shadow: 0 4px 16px rgba(15,44,89,0.04);
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(15,44,89,0.09);
          border-color: var(--accent-gold);
        }

        .teaser-card {
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border);
          background: #FFFFFF;
          box-shadow: 0 4px 14px rgba(15,44,89,0.04);
          transition: all 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .teaser-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 40px rgba(15,44,89,0.1);
        }
        .teaser-card:hover .teaser-overlay {
          opacity: 1 !important;
        }
        .teaser-card:hover .teaser-img {
          transform: scale(1.05);
        }
        .teaser-img {
          transition: transform 0.5s ease;
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .teaser-overlay {
          position: absolute; inset: 0;
          background: rgba(15,44,89,0.55);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tag-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(197,168,128,0.15);
          border: 1px solid rgba(197,168,128,0.4);
          color: #C5A880;
          padding: 5px 14px;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — Full-bleed image with controlled dark overlay & clear text
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        height: '92vh',
        minHeight: '620px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>

        {/* ── Background image ── */}
        <img
          key={slide}
          src={current.img}
          alt=""
          className={`hero-img ${fading ? 'fading' : 'visible'}`}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
          }}
          onError={e => { e.target.src = imgVilla; }}
        />

        {/* ── Multi-layer overlay for perfect legibility ── */}
        {/* Bottom-up dark gradient — text always readable */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(8,16,32,0.97) 0%, rgba(8,16,32,0.72) 38%, rgba(8,16,32,0.25) 65%, rgba(8,16,32,0.08) 100%)',
        }} />
        {/* Left edge vignette so left-side text has max contrast */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(8,16,32,0.55) 0%, transparent 55%)',
        }} />

        {/* ── Gold left border rule ── */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '4px',
          background: 'linear-gradient(to bottom, transparent 5%, #C5A880 30%, #C5A880 70%, transparent 95%)',
        }} />

        {/* ── Slide indicators top-right ── */}
        <div style={{
          position: 'absolute',
          top: '36px', right: '6%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'flex-end',
          zIndex: 10,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`slide-dot ${i === slide ? 'active' : ''}`} onClick={() => goSlide(i)} />
          ))}
        </div>

        {/* ── NELWAN wordmark top-left ── */}
        
        {/* ── MAIN TEXT BLOCK ── */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          padding: '0 6% 0 6%',
          maxWidth: '900px',
          marginBottom: '0',
        }}>
          {/* Category tag */}
          <div className="tag-pill" style={{ marginBottom: '22px' }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#C5A880', display: 'inline-block'
            }} />
            {current.tag}
          </div>

          {/* Big headline */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            fontWeight: 300,
            color: '#FFFFFF',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}>
            {current.headline[0]}<br />
            <span style={{ fontStyle: 'italic', color: '#C5A880' }}>{current.headline[1]}</span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(0.9rem, 1.8vw, 1.08rem)',
            color: 'rgba(255,255,255,0.72)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: '520px',
            marginBottom: '36px',
          }}>
            Dirigée par l'ingénieur BTP <strong style={{ color: '#FFFFFF', fontWeight: 500 }}>Nelson Wanga</strong>,
            NELWAN SARL réalise des projets de construction, d'architecture et de design d'intérieur de prestige
            en RDC depuis plus de 10 ans.
          </p>

          {/* CTA row */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '56px' }}>
            <button className="hero-cta-primary" onClick={() => onNavigate('visualizer')}>
              <Sparkles size={14} />
              Visualiser Mon Projet
            </button>
            <button className="hero-cta-ghost" onClick={() => onNavigate('portfolio')}>
              Voir Nos Réalisations
              <ArrowRight size={14} />
            </button>
            <button className="hero-cta-ghost" onClick={() => onNavigate('contact')}>
              Envoyer un message
            </button>
          </div>
        </div>

        {/* ── STATS BAR — anchored to bottom of hero ── */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          background: 'rgba(8,16,32,0.75)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(197,168,128,0.2)',
          padding: '20px 6%',
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-pill">
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.7rem',
                fontWeight: 600,
                color: '#C5A880',
                lineHeight: 1.1,
              }}>
                {s.val}
              </span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}>
                {s.label}
              </span>
            </div>
          ))}

          {/* Right side of stats bar: location + scroll hint */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={13} style={{ color: '#C5A880' }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em',
            }}>
              1ère rue industrielle, Kinshasa
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INTRO STRIP — brief company positioning line
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#0F172A',
        padding: '36px 6%',
        borderBottom: '1px solid rgba(197,168,128,0.15)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.5,
          }}>
            "De la fondation au dernier détail de finition — nous livrons des espaces qui durent."
          </p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.68rem',
              color: '#C5A880',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              Nelson Wanga
            </span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>·</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Directeur Général & Ingénieur BTP
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)', padding: '90px 6%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Nos Compétences</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '56px' }}>Ce Que Nous Faisons</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
            {[
              {
                icon: <HardHat size={24} />,
                color: 'var(--accent)',
                bg: '#F1F5F9',
                title: 'Bâtiments & Travaux Publics (BTP)',
                desc: 'Fondations béton armé, élévations multi-étages et voiries durables conformes aux standards internationaux.',
                points: ['Gros Œuvre & Maçonnerie Générale', 'Fondations Antisismiques & Ouvrages d\'Art', 'Infrastructure Routière & VRD'],
                cta: null,
              },
              {
                icon: <Layers size={24} />,
                color: 'var(--accent)',
                bg: '#F1F5F9',
                title: 'Architecture & Modélisation 3D',
                desc: 'Concepts innovants, visites virtuelles réalistes et modélisation BIM pour valider chaque volume avant de construire.',
                points: ['Plans de Masse & Études Structurelles', 'Rendu Photoréaliste Extérieur & Intérieur', 'BIM (Building Information Modeling)'],
                cta: null,
              },
              {
                icon: <Award size={24} />,
                color: '#C5A880',
                bg: 'rgba(197,168,128,0.08)',
                title: 'Design d\'Intérieur Sur-Mesure',
                desc: 'Du mariage couleur-mobilier aux agencements lumineux, nous créons des espaces qui vous ressemblent.',
                points: ['Nuanciers & Matériaux Nobles', 'Conseil Couleur Mur ↔ Mobilier', 'Agencements Lumineux Intégrés'],
                cta: { label: 'Tester le Visualiseur', action: () => onNavigate('visualizer') },
              },
            ].map((s, i) => (
              <div key={i} className="service-card" style={s.cta ? { borderColor: 'rgba(197,168,128,0.35)' } : {}}>
                <div>
                  <div style={{
                    color: s.color, background: s.bg,
                    padding: '13px', borderRadius: '4px',
                    width: 'fit-content', marginBottom: '20px',
                    border: `1px solid ${s.cta ? 'rgba(197,168,128,0.2)' : 'var(--border)'}`,
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.35rem', color: 'var(--text-title)',
                    fontWeight: 400, marginBottom: '10px',
                  }}>{s.title}</h3>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.87rem', color: 'var(--text-body)',
                    lineHeight: 1.65, fontWeight: 300, marginBottom: '16px',
                  }}>{s.desc}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '0', listStyle: 'none', marginBottom: s.cta ? '24px' : '0' }}>
                    {s.points.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', color: 'var(--text-title)', fontWeight: 300 }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                {s.cta && (
                  <button className="btn-primary"
                    onClick={s.cta.action}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '12px', fontSize: '0.78rem' }}>
                    <Eye size={13} />
                    {s.cta.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VIDEO SECTION — full width, own space, clear context
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '90px 6%',
      }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '48px',
          }}>
            <div>
              <p className="section-subtitle">NELWAN SARL en Action</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--text-title)',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                Découvrez Notre<br />
                <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Savoir-Faire</span>
              </h2>
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.92rem',
                color: 'var(--text-body)',
                fontWeight: 300,
                lineHeight: 1.75,
                marginBottom: '28px',
              }}>
                De la fondation jusqu'aux finitions les plus raffinées — regardez comment nos équipes transforment des terrains bruts en propriétés d'exception à travers la RDC.<br/><br/> Pour faciliter votre création; nous avons conçu le visualiseur. Le visualiseur est là pour faciliter l'expression de vos idées; explorez des styles, combinez des ambiances, choisissez vos couleurs et matières. Voyez exactement à quoi ressemblera votre espace avant même qu'une brique soit posée.
                À la fin, un seul clic envoie votre vision directement à nos architectes. C'est votre rêve, en images. Il ne reste plus qu'à le construire. 
              </p>
              <button className="btn-secondary" onClick={() => onNavigate('portfolio')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
                Voir toutes nos réalisations
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Stats column */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              {[
                { val: "10+",  label: "Ans d'expérience",     icon: "🏗️" },
                { val: "200+", label: "Projets livrés",        icon: "🏛️" },
                { val: "RDC",  label: "Basé à Kinshasa",       icon: "📍" },
                { val: "24h",  label: "Délai de réponse",      icon: "📞" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#FAFAF8',
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}>
                  <span style={{ fontSize: '1.3rem' }}>{s.icon}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}>{s.val}</span>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.72rem',
                    color: 'var(--text-body)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video player */}
          <div style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '52%',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 60px rgba(15,44,89,0.08)',
            background: '#0F172A',
          }}>
            {!videoPlaying ? (
              <div
                onClick={() => setVideoPlaying(true)}
                style={{
                  position: 'absolute', inset: 0,
                  cursor: 'pointer',
                  backgroundImage: `url(${imgVilla})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,16,32,0.5)' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '16px',
                }}>
                  <div style={{
                    width: '76px', height: '76px', borderRadius: '50%',
                    background: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Play size={28} style={{ color: 'var(--accent)', marginLeft: '5px' }} fill="currentColor" />
                  </div>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#FFFFFF', fontWeight: 400,
                    fontSize: '0.9rem', letterSpacing: '0.06em',
                  }}>
                    Voir la vidéo NELWAN SARL
                  </p>
                </div>
              </div>
            ) : (
              <video
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                src={heroVideo3}
                autoPlay controls playsInline
                onCanPlay={e => { e.currentTarget.playbackRate = 0.5; }}
              />
            )}
          </div>
        </div>
      </section>

      

      {/* ══════════════════════════════════════════════════════════════════════
          VISUALIZER EXPLAINER — How it works, split residential / BTP
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0F172A', padding: '100px 6%', position: 'relative', overflow: 'hidden' }}>

        {/* Decorative background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(197,168,128,0.04) 79px,rgba(197,168,128,0.04) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(197,168,128,0.04) 79px,rgba(197,168,128,0.04) 80px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.68rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#C5A880',
              fontWeight: 600, marginBottom: '16px',
            }}>
              Comment ça marche
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300, color: '#FFFFFF',
              lineHeight: 1.05, marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              <span style={{ fontStyle: 'italic', color: '#C5A880' }}>Avec le Visualiseur, </span>
              Vous avez une vision.<br />
              <span style={{ fontStyle: 'italic', color: '#C5A880' }}>Nous la rendons réelle.</span>
            </h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1rem', color: 'rgba(255,255,255,0.55)',
              fontWeight: 300, lineHeight: 1.8,
              maxWidth: '580px', margin: '0 auto',
            }}>
              On sait à quel point il est difficile d'expliquer ce qu'on veut. Le visualiseur est là pour ça — explorez, combinez, choisissez. Et laissez le reste entre nos mains.
            </p>
          </div>

          {/* ── TWO COLUMNS: Résidentiel / BTP ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '72px' }}>

            {/* LEFT — Résidentiel */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(197,168,128,0.15)',
              borderRight: 'none',
              borderRadius: '10px 0 0 10px',
              padding: '48px 44px',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(197,168,128,0.1)', border: '1px solid rgba(197,168,128,0.25)',
                borderRadius: '4px', padding: '6px 14px',
                marginBottom: '28px',
              }}>
                <span style={{ fontSize: '1rem' }}>🏠</span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.68rem', fontWeight: 600,
                  color: '#C5A880', letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>
                  Pour votre maison
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2rem', fontWeight: 300,
                color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px',
              }}>
                Explorez. Combinez.<br />
                <span style={{ fontStyle: 'italic', color: '#C5A880' }}>Trouvez votre style.</span>
              </h3>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.93rem', color: 'rgba(255,255,255,0.6)',
                fontWeight: 300, lineHeight: 1.8, marginBottom: '36px',
              }}>
                Plus besoin de chercher des exemples pendant des heures ou de tenter d'expliquer ce que vous imaginez. Avec le visualiseur, vous le voyez directement — et vous le montrez à nos architectes.
              </p>

              {/* 3 paths explained */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                {[
                  {
                    icon: '🏗️',
                    label: 'Construire ou Rénover',
                    color: '#6B9FD4',
                    desc: 'Vous partez de zéro ou vous refaites tout. Choisissez votre façade, vos sols, les finitions de vos murs, le type de plafond, l\'escalier et les extérieurs. Chaque élément est structurel — nos équipes BTP s\'occupent de l\'exécution.',
                  },
                  {
                    icon: '🛋️',
                    label: 'Aménager l\'Intérieur',
                    color: '#C5A880',
                    desc: 'Vos murs sont là. Vous voulez les transformer. Définissez l\'ambiance de votre salon, le style de votre cuisine, l\'atmosphère de votre chambre, votre salle de bain, vos lumières et vos rangements — pièce par pièce.',
                  },
                  {
                    icon: '🎨',
                    label: 'Décoration & Couleurs',
                    color: '#7A9E7E',
                    desc: 'Juste un rafraîchissement. Choisissez une humeur générale, votre mur accent, les textiles et matières, vos luminaires et la place du végétal. Parfois, un changement de couleur suffit à tout transformer.',
                  },
                ].map((path, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px',
                    padding: '18px 20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${path.color}22`,
                    borderLeft: `3px solid ${path.color}`,
                    borderRadius: '0 6px 6px 0',
                  }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{path.icon}</span>
                    <div>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.82rem', fontWeight: 600,
                        color: path.color, marginBottom: '6px', letterSpacing: '0.03em',
                      }}>
                        {path.label}
                      </p>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)',
                        fontWeight: 300, lineHeight: 1.65,
                      }}>
                        {path.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* How it ends */}
              <div style={{
                padding: '20px 22px',
                background: 'rgba(197,168,128,0.07)',
                border: '1px solid rgba(197,168,128,0.2)',
                borderRadius: '6px',
                marginBottom: '32px',
              }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)',
                  fontWeight: 300, lineHeight: 1.7,
                }}>
                  À la fin, vous entrez vos coordonnées et votre dossier complet — style, ambiances, palette de couleurs — est envoyé directement à nos architectes. Ils vous contactent dans les <strong style={{ color: '#C5A880' }}>24 heures</strong> pour étudier votre espace et adapter chaque choix à ce qui est réellement disponible à Kinshasa.
                </p>
              </div>

              {/* Price reassurance */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', marginTop: '2px', flexShrink: 0 }}>💡</span>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)',
                  fontWeight: 300, lineHeight: 1.65, fontStyle: 'italic',
                }}>
                  Certaines options peuvent sembler hors de portée — ne vous limitez pas. Grâce à notre réseau de fournisseurs et à notre expérience du marché local, nous obtenons les meilleurs matériaux aux meilleurs prix. Le luxe est souvent moins loin qu'on ne le croit.
                </p>
              </div>

              <button
                onClick={() => onNavigate('visualizer')}
                style={{
                  marginTop: '36px',
                  background: '#C5A880', color: '#0F172A',
                  border: 'none', padding: '14px 28px',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                  fontSize: '0.8rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d4b990'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C5A880'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Eye size={14} />
                Ouvrir le Visualiseur
              </button>
            </div>

            {/* RIGHT — BTP */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0 10px 10px 0',
              padding: '48px 44px',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(15,44,89,0.4)', border: '1px solid rgba(15,44,89,0.6)',
                borderRadius: '4px', padding: '6px 14px',
                marginBottom: '28px', width: 'fit-content',
              }}>
                <span style={{ fontSize: '1rem' }}>🏙️</span>
                <span style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.68rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>
                  Projets Publics & Commerciaux
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2rem', fontWeight: 300,
                color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px',
              }}>
                Un projet d'infrastructure ?<br />
                <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>On travaille ensemble, étape par étape.</span>
              </h3>

              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.93rem', color: 'rgba(255,255,255,0.55)',
                fontWeight: 300, lineHeight: 1.8, marginBottom: '36px',
              }}>
                Routes, bâtiments administratifs, écoles, hôpitaux, ponts, immeubles commerciaux — chaque infrastructure est unique. Il n'existe pas de visualiseur universel pour ça, et nous ne prétendons pas en avoir un.
              </p>

              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', flex: 1, marginBottom: '36px' }}>
                {[
                  {
                    num: '01',
                    title: 'Vous décrivez votre projet',
                    desc: 'Type d\'infrastructure, localisation, capacité souhaitée, délai, maître d\'ouvrage. Pas besoin de plans — juste votre intention.',
                  },
                  {
                    num: '02',
                    title: 'Nos ingénieurs vous contactent',
                    desc: 'Dans les 48 heures, un ingénieur NELWAN SARL vous appelle pour comprendre précisément vos besoins et les contraintes du terrain.',
                  },
                  {
                    num: '03',
                    title: 'On conçoit ensemble',
                    desc: 'Étude de faisabilité, plans préliminaires, modélisation 3D si nécessaire. Vous validez chaque étape avant qu\'on avance.',
                  },
                  {
                    num: '04',
                    title: 'On réalise. Vous approuvez.',
                    desc: 'Suivi de chantier en temps réel, compte-rendus réguliers. Rien ne se fait sans votre accord. C\'est votre projet jusqu\'au bout.',
                  },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: '24px', position: 'relative' }}>
                    {/* Vertical connector */}
                    {i < 3 && (
                      <div style={{
                        position: 'absolute', left: '19px', top: '40px', bottom: 0,
                        width: '1px', background: 'rgba(255,255,255,0.08)',
                      }} />
                    )}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)',
                        fontWeight: 700, letterSpacing: '0.05em',
                      }}>{step.num}</span>
                    </div>
                    <div style={{ paddingTop: '8px' }}>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem', fontWeight: 500,
                        color: '#FFFFFF', marginBottom: '5px',
                      }}>{step.title}</p>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
                        fontWeight: 300, lineHeight: 1.65,
                      }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project types */}
              <div style={{ marginBottom: '36px' }}>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>Nous intervenons sur</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Routes & Voirie','Bâtiments Administratifs','Écoles','Hôpitaux','Immeubles Commerciaux','Ponts','Logements Sociaux','Aménagement Urbain'].map(t => (
                    <span key={t} style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '5px 12px', borderRadius: '50px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('visualizer')}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '14px 28px',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 400,
                  fontSize: '0.8rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'all 0.2s ease', width: 'fit-content',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C5A880'; e.currentTarget.style.color = '#C5A880'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                Décrire mon projet BTP
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Bottom unified process strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {[
              { icon: '🔍', title: 'Vous explorez', desc: 'Le visualiseur ou le formulaire BTP — selon votre projet' },
              { icon: '📋', title: 'Vous envoyez', desc: 'Votre dossier complet arrive directement chez nous' },
              { icon: '📞', title: 'On vous rappelle', desc: 'Sous 24h pour le résidentiel, 48h pour le BTP' },
              { icon: '🏛️', title: 'On construit', desc: 'Ensemble, étape par étape, jusqu\'à la livraison' },
            ].map((step, i) => (
              <div key={i} style={{
                padding: '28px 24px',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'center',
              }}>
                <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '12px' }}>{step.icon}</span>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1rem', fontWeight: 400,
                  color: '#FFFFFF', marginBottom: '6px',
                }}>{step.title}</p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '0.76rem', color: 'rgba(255,255,255,0.38)',
                  fontWeight: 300, lineHeight: 1.6,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VISUALIZER TEASER
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '90px 6%',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p className="section-subtitle">Votre Projet de Rêve</p>
            <h2 className="section-title" style={{ marginBottom: '14px' }}>
              À Quoi Pourrait Ressembler<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Votre Maison ?</span>
            </h2>
            <p style={{
              maxWidth: '620px', margin: '0 auto',
              color: 'var(--text-body)', fontWeight: 300,
              fontSize: '0.97rem', lineHeight: 1.75,
            }}>
              Notre <strong style={{ color: 'var(--accent)' }}>Visualiseur Interactif</strong> vous laisse choisir
              façades, ambiances intérieures, couleurs et matières — et transmet votre vision directement à nos architectes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '44px' }}>
            {teaserRooms.map((room, i) => (
              <div key={i} className="teaser-card" onClick={() => onNavigate('visualizer')}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={room.img} alt={room.label} className="teaser-img" />
                  <div className="teaser-overlay">
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFFFFF', fontWeight: 500,
                      fontSize: '0.82rem', letterSpacing: '0.08em',
                      border: '1px solid rgba(255,255,255,0.5)',
                      padding: '9px 18px', borderRadius: '2px',
                    }}>
                      Essayer ce style →
                    </span>
                  </div>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <h4 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.05rem', color: 'var(--text-title)', fontWeight: 500, marginBottom: '4px',
                  }}>{room.label}</h4>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', color: 'var(--text-body)', fontWeight: 300 }}>{room.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ══════════════════════════════════════════════════════════════════════
          FOUNDER SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#FAFAF8', padding: '90px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '60px', alignItems: 'center' }}>

          {/* Quote card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--accent-gold)',
            borderRadius: '0 8px 8px 0',
            padding: '40px 36px',
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '4rem',
              color: 'var(--accent-gold)',
              lineHeight: 0.5,
              display: 'block',
              marginBottom: '16px',
              fontWeight: 300,
            }}>"</span>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--text-body)',
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: '28px',
            }}>
              Notre ambition chez NELWAN SARL est de démontrer que la durabilité antisismique et l'élégance architecturale ne sont pas incompatibles avec la maîtrise des coûts. Nous faisons du luxe un investissement rationnel et atteignable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)',
                letterSpacing: '0.05em',
              }}>Nelson Wanga</span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.7rem', color: 'var(--text-body)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>Directeur Général & Ingénieur BTP</span>
            </div>
          </div>

          {/* Philosophy */}
          <div>
            <p className="section-subtitle">Notre Philosophie</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
              color: 'var(--text-title)',
              fontWeight: 300, lineHeight: 1.1,
              marginBottom: '18px',
            }}>
              Bâtir avec<br /><span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Rigueur et Confiance</span>
            </h2>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.93rem', color: 'var(--text-body)',
              lineHeight: 1.75, fontWeight: 300, marginBottom: '24px',
            }}>
              Chaque projet mené par NELWAN SARL s'appuie sur une étude géotechnique complète des sols de Kinshasa et un cahier des charges rigoureux. De la sélection des aciers à la pose des marbres, nos ingénieurs supervisent chaque étape.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
              {[
                'Normes de sécurité BTP internationales',
                'Modélisation 3D validée avant travaux',
                'Suivi de chantier en temps réel',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', color: 'var(--text-title)', fontWeight: 300 }}>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-secondary"
              onClick={() => onNavigate('contact')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
              <ArrowRight size={14} />
              Démarrer Votre Projet
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
