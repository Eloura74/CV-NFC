import { useEffect, useRef, useMemo, useState } from "react";

// Calcul d'âge dynamique à partir d'une date de naissance.
// TODO: Remplace la date ci-dessous par ta vraie date de naissance (format YYYY-MM-DD)
function calculerAge(dateNaissance) {
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - dateNaissance.getFullYear();
  const m = aujourdHui.getMonth() - dateNaissance.getMonth();
  if (m < 0 || (m === 0 && aujourdHui.getDate() < dateNaissance.getDate())) {
    age--;
  }
  return age;
}

function Section({ id, titre, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("opacity-100", "translate-y-0");
      },
      { threshold: 0.2 }
    );
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-700"
    >
      <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-fuchsia-300 mb-3">
        {titre}
      </h2>
      <div className="relative gradient-border bg-white/5 backdrop-blur-md rounded-2xl ring-1 ring-white/10 p-5 md:p-6">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  // Âge dynamique (modifie la date selon ton profil)
  const age = useMemo(() => calculerAge(new Date("1990-01-01")), []);
  // QR code vers la vCard (sans dépendance externe)
  const vcfUrl = useMemo(
    () => `${window.location.origin}/quentin-faber.vcf`,
    []
  );
  const qrUrl = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
        vcfUrl
      )}`,
    [vcfUrl]
  );
  const [qrOpen, setQrOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef(null);

  // Barre de progression du scroll
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parallax léger au survol du hero
  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--px", px.toFixed(3));
    heroRef.current.style.setProperty("--py", py.toFixed(3));
  };
  return (
    <main className="min-h-screen">
      {/* Barre de progression */}
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      {/* Hero */}
      <header
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden parallax"
      >
        <div className="parallax-layer absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="parallax-layer absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-fuchsia-400/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 aurora opacity-70"></div>

        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12">
          <div className="relative gradient-border bg-white/5 backdrop-blur-md rounded-3xl ring-1 ring-white/10 p-6 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Quentin{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300 text-shimmer">
                    Faber
                  </span>
                </h1>
                <p className="mt-2 text-neutral-300">Alternance DATA/IA</p>
                <div className="mt-3 text-sm text-neutral-300 space-y-1">
                  <p>
                    📞{" "}
                    <a className="hover:underline" href="tel:+33768833098">
                      +33 7 68 88 30 98
                    </a>
                  </p>
                  <p>
                    ✉️{" "}
                    <a
                      className="hover:underline"
                      href="mailto:faber.quentin@gmail.com"
                    >
                      faber.quentin@gmail.com
                    </a>
                  </p>
                  <p>📍 Istres, 13800 — France</p>
                  <p>🎂 {age} ans</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/cv.pdf"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-semibold hover:opacity-90 animate-glow"
                >
                  Télécharger le CV
                </a>
                <a
                  href="/quentin-faber.vcf"
                  download
                  className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
                >
                  Ajouter le contact (.vcf)
                </a>
                <a
                  href="mailto:faber.quentin@gmail.com"
                  className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
                >
                  Me contacter
                </a>
                <a
                  href="https://github.com/Eloura74?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15 flex items-center gap-2"
                >
                  {/* Icône GitHub */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.8-.25.8-.57v-2.1c-3.26.71-3.95-1.57-3.95-1.57-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.22 1.8 1.22 1.05 1.79 2.76 1.27 3.43.97.11-.76.41-1.27.74-1.56-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.53.12-3.18 0 0 .99-.32 3.25 1.2a11.3 11.3 0 0 1 5.92 0c2.26-1.52 3.25-1.2 3.25-1.2.65 1.65.24 2.88.12 3.18.76.82 1.22 1.87 1.22 3.15 0 4.49-2.75 5.47-5.37 5.77.42.36.79 1.06.79 2.15v3.19c0 .32.21.69.81.57A11.5 11.5 0 0 0 12 .5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setQrOpen((v) => !v)}
                  className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15"
                >
                  QR Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* QR code vCard (affichage optionnel) */}
      {qrOpen && (
        <div className="max-w-5xl mx-auto px-4 -mt-8 mb-6">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl ring-1 ring-white/10 p-4">
            <img
              src={qrUrl}
              alt="QR code vCard Quentin Faber"
              className="w-40 h-40 rounded-lg bg-white/5 ring-1 ring-white/10 p-2"
            />
            <div className="text-sm text-neutral-300">
              Scannez ce QR pour ajouter mon contact (.vcf). Idéal si la carte
              n'est pas NFC.
            </div>
          </div>
        </div>
      )}

      {/* Grille de contenu */}
      <div className="max-w-5xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="md:col-span-1 space-y-6">
          <Section id="formation" titre="Formation">
            <ul className="space-y-3 text-neutral-200 text-sm">
              <li>
                <div className="flex items-start gap-3">
                  <span className="badge badge-date">01/2024 – 01/2025</span>
                  <div>
                    <p className="font-semibold">AFPA · Marseille — DWWM</p>
                    <p className="meta">Développement web et web mobile</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="badge badge-date">01/2025 – 01/2026</span>
                  <div>
                    <p className="font-semibold">Développeur en intelligence artificielle</p>
                    <p className="meta">Projet en cours</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="badge badge-date">01/2008</span>
                  <div>
                    <p className="font-semibold">Bac STI2D — Cluses</p>
                    <p className="meta">Génie électronique, conception circuits imprimés</p>
                  </div>
                </div>
              </li>
            </ul>
          </Section>

          <Section id="competences" titre="Compétences clés">
            <div className="flex flex-wrap gap-2">
              {[
                "Python",
                "HTML5",
                "CSS3",
                "JavaScript ES6+",
                "Tailwind",
                "SQL",
                "Initiation à l'IA",
                "Manipulation de données",
                "Automatisation",
                "Bases de données relationnelles",
                "Git",
                "Docker",
                "Linux/WSL",
                "VSCode",
                "Fusion360",
                "Méthodique",
                "Analytique",
                "Autonomie",
                "Travail en équipe",
              ].map((c) => (
                <span
                  key={c}
                  className="text-sm px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 transition-transform duration-200 hover:scale-105"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>

          <Section id="langues" titre="Langues">
            <ul className="space-y-1 text-sm text-neutral-200">
              <li>Français — Langue maternelle</li>
              <li>Anglais — Intermédiaire</li>
            </ul>
          </Section>
        </div>

        {/* Colonne droite */}
        <div className="md:col-span-2 space-y-6">
          <Section id="profil" titre="Profil professionnel">
            <p className="text-neutral-200 text-sm leading-relaxed">
              En reconversion vers le développement web et l'intelligence
              artificielle (AFPA Marseille – DWWM). Compétences solides en
              programmation (Python, HTML, CSS, JavaScript, Tailwind, SQL).
              Passionné par l'IA, la data et l'automatisation, je recherche une
              alternance en développement IA. Rigueur, curiosité et capacité
              d'adaptation éprouvées au cours de mes expériences variées.
            </p>
          </Section>

          <Section id="xp" titre="Expériences professionnelles">
            <div className="timeline space-y-5 text-sm text-neutral-200">
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-date">10/2024 – 06/2025</span>
                    <h3 className="font-semibold text-neutral-100">Développeur Web et Web mobile niveau 2</h3>
                  </div>
                  <p className="meta">AFPA · Marseille</p>
                  <ul className="list-tight">
                    <li>Développement d'applications web interactives.</li>
                    <li>Mise en place et gestion de bases de données.</li>
                    <li>Sécurisation et optimisation des plateformes web.</li>
                    <li>Collaboration en équipe sur projets complets.</li>
                    <li>Développement d'interfaces web, front et back.</li>
                    <li>Codage en HTML, CSS, JavaScript, PHP.</li>
                    <li>Fonctionnalités back-end avec PHP/MySQL.</li>
                    <li>Sites web responsives (HTML, CSS, JS).</li>
                    <li>
                      Analyse des besoins, étude de faisabilité, cahier des
                      charges.
                    </li>
                    <li>
                      Intégration d’APIs (paiement, réseaux sociaux, etc.).
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-date">01/2019 – 01/2025</span>
                    <h3 className="font-semibold text-neutral-100">Militaire</h3>
                  </div>
                  <p className="meta">Armée de Terre · Istres</p>
                  <ul className="list-tight">
                    <li>
                      Responsable décontamination et réhabilitation de sites
                      sensibles.
                    </li>
                    <li>
                      Gestion d'équipes et travail collaboratif en milieu
                      exigeant.
                    </li>
                    <li>
                      Rigueur opérationnelle et atteinte d'objectifs sous
                      contraintes.
                    </li>
                    <li>Opérations militaires à l'étranger.</li>
                    <li>
                      Préparation physique et mentale aux exigences du métier.
                    </li>
                    <li>Adaptation rapide aux imprévus sur le terrain.</li>
                    <li>
                      Collaboration étroite avec l'équipe pour atteindre les
                      objectifs.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-date">01/2013 – 01/2019</span>
                    <h3 className="font-semibold text-neutral-100">Électricien indépendant</h3>
                  </div>
                  <p className="meta">Autoentrepreneur · Samoëns</p>
                  <ul className="list-tight">
                    <li>Installation et maintenance électrique & réseaux.</li>
                    <li>Solutions domotiques et vidéosurveillance.</li>
                    <li>Relation clients et satisfaction.</li>
                    <li>Gestion du matériel et de l'outillage sur chantier.</li>
                    <li>Lecture de schémas/plans/diagrammes.</li>
                    <li>
                      Dépannage de câblages défectueux (sécurité des
                      installations).
                    </li>
                    <li>
                      Installations en rénovation et construction (compteurs,
                      prises, éclairage, tableau électrique), vérification
                      finale.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-date">01/2011 – 01/2013</span>
                    <h3 className="font-semibold text-neutral-100">Électricien</h3>
                  </div>
                  <p className="meta">Neo Concet · Samoëns · CDI</p>
                  <ul className="list-tight">
                    <li>
                      Tirage de câbles, chemins de câbles, raccordement aux
                      armoires et tableaux.
                    </li>
                    <li>
                      Pose de prises et interrupteurs, raccordement des fils
                      électriques.
                    </li>
                    <li>Raccordement des équipements au tableau électrique.</li>
                  </ul>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot" />
                <div className="timeline-content">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-date">01/2008 – 01/2011</span>
                    <h3 className="font-semibold text-neutral-100">Agent maintenance</h3>
                  </div>
                  <p className="meta">EDF-GDF</p>
                  <ul className="list-tight">
                    <li>
                      Mise en place du matériel pour les tâches d'entretien et
                      de réparation.
                    </li>
                    <li>
                      Dépannages simples: identification des pannes,
                      remplacement des éléments.
                    </li>
                    <li>
                      Diagnostic et dépannage d’équipements
                      industriels/électromécaniques.
                    </li>
                    <li>Entretien préventif et correctif des installations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          <Section id="perso" titre="Personnalisé & centres d’intérêt">
            <p className="text-neutral-200 text-sm">
              Réalisation de sites web interactifs dans le cadre de la
              formation. Développement de scripts Python pour automatisation et
              gestion de données. Conception 3D et optimisation de workflows en
              impression 3D. Expérimentations personnelles en IA et systèmes
              domotiques.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-200">
              <li>Informatique</li>
              <li>Sport</li>
              <li>Impression 3D</li>
            </ul>
          </Section>
        </div>
      </div>

      <footer className="pb-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} Quentin Faber — CV interactif
      </footer>
    </main>
  );
}
