import { useEffect, useRef } from "react";

function Section({ id, titre, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("opacity-100", "translate-y-0");
    }, { threshold: 0.2 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className="opacity-0 translate-y-6 transition-all duration-700">
      <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-fuchsia-300 mb-3">{titre}</h2>
      <div className="bg-white/5 backdrop-blur-md rounded-2xl ring-1 ring-white/10 p-5 md:p-6">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] bg-fuchsia-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-3xl ring-1 ring-white/10 p-6 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Quentin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-300">Faber</span>
                </h1>
                <p className="mt-2 text-neutral-300">Alternance DATA/IA</p>
                <div className="mt-3 text-sm text-neutral-300 space-y-1">
                  <p>📞 <a className="hover:underline" href="tel:+33768833098">+33 7 68 88 30 98</a></p>
                  <p>✉️ <a className="hover:underline" href="mailto:faber.quentin@gmail.com">faber.quentin@gmail.com</a></p>
                  <p>📍 Istres, 13800 — France</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/cv.pdf" className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-semibold hover:opacity-90">Télécharger le CV</a>
                <a href="/quentin-faber.vcf" download className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15">Ajouter le contact (.vcf)</a>
                <a href="mailto:faber.quentin@gmail.com" className="px-4 py-2 rounded-full bg-white/10 ring-1 ring-white/20 hover:bg-white/15">Me contacter</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grille de contenu */}
      <div className="max-w-5xl mx-auto px-4 pb-20 grid md:grid-cols-3 gap-6">
        {/* Colonne gauche */}
        <div className="md:col-span-1 space-y-6">
          <Section id="formation" titre="Formation">
            <ul className="list-disc pl-5 space-y-2 text-neutral-200 text-sm">
              <li><span className="font-medium">2024–2025</span> — AFPA Marseille — DWWM</li>
              <li><span className="font-medium">2025–2026</span> — Développeur en IA (projet en cours)</li>
              <li><span className="font-medium">2008</span> — Bac STI2D (Génie électronique, circuits imprimés)</li>
            </ul>
          </Section>

          <Section id="competences" titre="Compétences clés">
            <div className="flex flex-wrap gap-2">
              {["Python","HTML5","CSS3","JavaScript ES6+","Tailwind","SQL","Initiation IA","Data","Automatisation","Bases de données","APIs","Git","Docker","Linux/WSL","VSCode","Méthodique","Analytique","Autonomie","Travail en équipe"].map((c) => (
                <span key={c} className="text-sm px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10">{c}</span>
              ))}
            </div>
          </Section>

          <Section id="langues" titre="Langues">
            <ul className="space-y-1 text-sm text-neutral-200">
              <li>Français — langue maternelle</li>
              <li>Anglais — intermédiaire</li>
            </ul>
          </Section>
        </div>

        {/* Colonne droite */}
        <div className="md:col-span-2 space-y-6">
          <Section id="profil" titre="Profil professionnel">
            <p className="text-neutral-200 text-sm leading-relaxed">
              En reconversion vers le développement web et l'IA (AFPA — DWWM). Solides bases en Python, HTML, CSS, JavaScript, Tailwind, SQL. Passionné par l'IA, la data et l'automatisation. Recherche une alternance en DATA/IA.
            </p>
          </Section>

          <Section id="xp" titre="Expériences professionnelles">
            <div className="space-y-4 text-sm text-neutral-200">
              <div>
                <p className="font-semibold">10/2024 – 06/2025 · Développeur Web et Web mobile niv. 2 · AFPA | Marseille</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Dév. d’interfaces web (front & back).</li>
                  <li>Sécurisation, optimisation et collaboration en équipe.</li>
                  <li>Intégration d’APIs et création de sites responsives.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">01/2019 – 01/2025 · Militaire · Armée de Terre | Istres</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Gestion d’équipes et opérations en environnements exigeants.</li>
                  <li>Adaptation rapide, rigueur et objectifs sous contraintes.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">2013 – 2019 · Électricien indépendant · Autoentrepreneur | Samoëns</p>
                <p className="font-semibold">2011 – 2013 · Électricien · Neo Conect | Samoëns</p>
                <p className="font-semibold">2008 – 2011 · Agent maintenance · EDF-GDF</p>
              </div>
            </div>
          </Section>

          <Section id="perso" titre="Personnalisé & centres d’intérêt">
            <p className="text-neutral-200 text-sm">Sites web interactifs en formation, scripts Python (automatisation/data), conception 3D & workflows impression 3D, expérimentations IA & domotique.</p>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-neutral-200">
              <li>Informatique</li><li>Sport</li><li>Impression 3D</li>
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
