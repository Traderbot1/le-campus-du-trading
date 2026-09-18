import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Mentions légales — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Mentions légales" updated="Dernière mise à jour : 2026">
      <div className="note">Ce document est un modèle de base. Complète les champs marqués <span className="ph">[À COMPLÉTER]</span> et fais-le valider par un professionnel du droit avant la mise en vente.</div>

      <h2>1. Éditeur du site</h2>
      <p>Le présent site est édité par <strong>Le Campus du Trading</strong>.</p>
      <ul>
        <li>Forme juridique : <span className="ph">[À COMPLÉTER]</span></li>
        <li>Siège social : <span className="ph">[À COMPLÉTER]</span></li>
        <li>SIREN / SIRET : <span className="ph">[À COMPLÉTER]</span></li>
        <li>Numéro de TVA intracommunautaire : <span className="ph">[À COMPLÉTER, le cas échéant]</span></li>
        <li>Adresse e-mail : <span className="ph">[À COMPLÉTER]</span></li>
        <li>Directeur de la publication : Hosni Ben Hassen</li>
      </ul>

      <h2>2. Hébergeur</h2>
      <p>Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — <a href="https://vercel.com">vercel.com</a>. <span className="ph">[Vérifie l'adresse exacte de l'hébergeur.]</span></p>

      <h2>3. Propriété intellectuelle</h2>
      <p>L'ensemble des contenus du site et de la formation (vidéos, textes, visuels, méthodes, supports) est protégé par le droit d'auteur et reste la propriété exclusive de Le Campus du Trading. Toute reproduction, diffusion, revente ou partage, total ou partiel, sans autorisation écrite, est interdit et constitue une contrefaçon.</p>

      <h2>4. Données personnelles</h2>
      <p>Le traitement de tes données personnelles est décrit dans notre <a href="/confidentialite">Politique de confidentialité</a>.</p>

      <h2>5. Avertissement sur les risques</h2>
      <p>Le trading d'instruments financiers comporte un risque élevé de perte en capital. Les contenus de ce site ont une vocation strictement éducative et ne constituent ni un conseil en investissement, ni une incitation à investir. Les performances passées ne préjugent pas des performances futures.</p>
    </LegalPage>
  );
}
