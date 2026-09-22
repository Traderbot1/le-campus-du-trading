import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Mentions légales — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Mentions légales" updated="Dernière mise à jour : 2026">
      <h2>1. Éditeur du site</h2>
      <p>Le site <strong>lecampusdutrading.fr</strong> est édité par :</p>
      <ul>
        <li><strong>Hosni Ben Hassen</strong> — Entreprise individuelle</li>
        <li>Nom commercial : Le Campus du Trading</li>
        <li>Siège : 16 allée de Tourny, 33000 Bordeaux, France</li>
        <li>SIRET : 810 255 836 00019</li>
        <li>Immatriculée au Registre du Commerce et des Sociétés de Bordeaux sous le numéro 810 255 836</li>
        <li>E-mail : contact@lecampusdutrading.fr</li>
        <li>Directeur de la publication : Hosni Ben Hassen</li>
      </ul>

      <h2>2. Hébergeur</h2>
      <p>Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com">vercel.com</a>.</p>

      <h2>3. Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus du site et de la formation (vidéos, textes, visuels, méthodes, supports pédagogiques) est protégé par le droit d&apos;auteur et reste la propriété exclusive de Le Campus du Trading. Toute reproduction, représentation, diffusion, revente ou partage, total ou partiel, sans autorisation écrite préalable, est interdit et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.</p>

      <h2>4. Données personnelles</h2>
      <p>Les modalités de traitement de vos données personnelles sont détaillées dans notre <a href="/confidentialite">Politique de confidentialité</a>.</p>

      <h2>5. Avertissement sur les risques</h2>
      <p>Le trading d&apos;instruments financiers comporte un risque élevé de perte en capital. Les contenus de ce site ont une vocation strictement éducative et ne constituent ni un conseil en investissement, ni une incitation à investir. Les performances passées ne préjugent pas des performances futures.</p>
    </LegalPage>
  );
}
