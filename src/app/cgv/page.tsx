import LegalPage from "@/components/LegalPage";
export const metadata = { title: "CGV — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Conditions Générales de Vente" updated="Dernière mise à jour : 2026">
      <h2>Article 1 — Objet et vendeur</h2>
      <p>Les présentes conditions générales de vente (CGV) régissent la vente de la formation en ligne « Le Campus du Trading » (ci-après « la Formation ») entre :</p>
      <ul>
        <li>le vendeur : <strong>Hosni Ben Hassen</strong>, entrepreneur individuel, nom commercial Le Campus du Trading, 16 allée de Tourny, 33000 Bordeaux, SIRET 810 255 836 00019 (ci-après « le Vendeur ») ;</li>
        <li>et toute personne physique majeure procédant à un achat (ci-après « le Client »).</li>
      </ul>

      <h2>Article 2 — La Formation</h2>
      <p>La Formation est un produit numérique composé de vidéos et de supports pédagogiques, accessibles en ligne depuis un espace personnel après création d&apos;un compte. L&apos;accès est fourni <strong>à vie</strong>, sous réserve du maintien du service.</p>

      <h2>Article 3 — Prix</h2>
      <p>Le prix de la Formation est de <strong>995 €</strong>, payable en une fois ou en trois fois selon les modalités proposées au paiement. TVA non applicable, article 293 B du Code général des impôts.</p>

      <h2>Article 4 — Commande et accès</h2>
      <p>Le Client crée un compte, procède au paiement, puis accède immédiatement à la Formation depuis son espace personnel. L&apos;accès est strictement personnel et nominatif. La validation de la commande implique l&apos;acceptation des présentes CGV.</p>

      <h2>Article 5 — Paiement</h2>
      <p>Le paiement est traité de manière sécurisée par le prestataire <strong>Stripe</strong>. Aucune donnée bancaire n&apos;est stockée par le Vendeur.</p>

      <h2>Article 6 — Droit de rétractation et renonciation expresse</h2>
      <p>Conformément à l&apos;article L.221-18 du Code de la consommation, le Client dispose en principe d&apos;un délai de 14 jours pour se rétracter. Toutefois, s&apos;agissant d&apos;un <strong>contenu numérique fourni immédiatement</strong>, le Client, en accédant à la Formation dès la validation de son achat, <strong>demande expressément l&apos;exécution immédiate et renonce expressément à son droit de rétractation</strong>, conformément à l&apos;article L.221-28 13° du Code de la consommation. En conséquence, aucun remboursement ne pourra être exigé une fois l&apos;accès à la Formation ouvert.</p>

      <h2>Article 7 — Licence d&apos;usage et propriété intellectuelle</h2>
      <p>Le Vendeur concède au Client une licence d&apos;usage personnelle, non exclusive et non transférable. Il est <strong>strictement interdit</strong> de partager ses identifiants, de diffuser, copier, revendre, enregistrer ou rendre accessible à des tiers tout ou partie de la Formation. Toute violation entraîne la suspension immédiate de l&apos;accès, sans remboursement, et pourra donner lieu à des poursuites.</p>

      <h2>Article 8 — Absence de garantie de résultat</h2>
      <p>La Formation est un contenu <strong>éducatif</strong>. Elle ne constitue pas un conseil en investissement ni une garantie de gains. Le trading comporte un risque de perte en capital. Le Client reste seul responsable de ses décisions et de ses résultats.</p>

      <h2>Article 9 — Responsabilité</h2>
      <p>La responsabilité du Vendeur ne saurait être engagée pour les pertes financières, décisions ou usages faits par le Client des enseignements. Le Vendeur met tout en œuvre pour assurer la disponibilité du service sans en garantir un accès ininterrompu.</p>

      <h2>Article 10 — Données personnelles</h2>
      <p>Le traitement des données est détaillé dans la <a href="/confidentialite">Politique de confidentialité</a>.</p>

      <h2>Article 11 — Droit applicable et litiges</h2>
      <p>Les présentes CGV sont soumises au droit français. Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige non résolu à l&apos;amiable, le Client consommateur peut recourir gratuitement à un médiateur de la consommation. À défaut de résolution amiable, les tribunaux français sont compétents.</p>
    </LegalPage>
  );
}
