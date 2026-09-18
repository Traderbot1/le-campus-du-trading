import LegalPage from "@/components/LegalPage";
export const metadata = { title: "CGV — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Conditions Générales de Vente" updated="Dernière mise à jour : 2026">
      <div className="note">Modèle de base pour une formation numérique. Complète les champs <span className="ph">[À COMPLÉTER]</span> et fais valider par un juriste. Le parcours d'achat doit permettre au client d'accepter les CGV avant paiement.</div>

      <h2>Article 1 — Objet</h2>
      <p>Les présentes CGV régissent la vente de la formation en ligne « Le Campus du Trading » (ci-après « la Formation ») entre Le Campus du Trading (« le Vendeur ») et toute personne physique majeure (« le Client »).</p>

      <h2>Article 2 — La Formation</h2>
      <p>La Formation est un produit numérique composé de vidéos et de supports pédagogiques, accessibles en ligne depuis un espace personnel après création d'un compte. L'accès est fourni <strong>à vie</strong>, sous réserve du maintien du service.</p>

      <h2>Article 3 — Prix</h2>
      <p>Le prix de la Formation est de <strong>995 €</strong>, payable en une fois ou en 3 fois, selon les modalités proposées au paiement. <span className="ph">[Précise si le prix est TTC / HT et la mention TVA selon ton statut.]</span></p>

      <h2>Article 4 — Commande et accès</h2>
      <p>Le Client crée un compte, procède au paiement, puis accède immédiatement à la Formation depuis son espace personnel. L'accès est strictement personnel et nominatif.</p>

      <h2>Article 5 — Paiement</h2>
      <p>Le paiement est traité de manière sécurisée par le prestataire <strong>Stripe</strong>. Aucune donnée bancaire n'est stockée par le Vendeur.</p>

      <h2>Article 6 — Droit de rétractation et renonciation expresse</h2>
      <p>Conformément à l'article L.221-18 du Code de la consommation, le Client dispose en principe d'un délai de 14 jours pour se rétracter. Toutefois, s'agissant d'un <strong>contenu numérique fourni immédiatement</strong>, le Client, en accédant à la Formation dès la validation de son achat, <strong>demande expressément l'exécution immédiate et renonce expressément à son droit de rétractation</strong>, conformément à l'article L.221-28 13° du Code de la consommation. En conséquence, aucun remboursement ne pourra être exigé une fois l'accès à la Formation ouvert.</p>

      <h2>Article 7 — Licence d'usage et propriété intellectuelle</h2>
      <p>Le Vendeur concède au Client une licence d'usage personnelle, non exclusive et non transférable. Il est <strong>strictement interdit</strong> de partager ses identifiants, de diffuser, copier, revendre, enregistrer ou rendre accessible à des tiers tout ou partie de la Formation. Toute violation entraîne la suspension immédiate de l'accès, sans remboursement, et pourra donner lieu à des poursuites.</p>

      <h2>Article 8 — Absence de garantie de résultat</h2>
      <p>La Formation est un contenu <strong>éducatif</strong>. Elle ne constitue pas un conseil en investissement ni une garantie de gains. Le trading comporte un risque de perte en capital. Le Client reste seul responsable de ses décisions et de ses résultats.</p>

      <h2>Article 9 — Responsabilité</h2>
      <p>La responsabilité du Vendeur ne saurait être engagée pour les pertes financières, décisions ou usages faits par le Client des enseignements. Le Vendeur met tout en œuvre pour assurer la disponibilité du service sans en garantir un accès ininterrompu.</p>

      <h2>Article 10 — Données personnelles</h2>
      <p>Le traitement des données est détaillé dans la <a href="/confidentialite">Politique de confidentialité</a>.</p>

      <h2>Article 11 — Droit applicable et litiges</h2>
      <p>Les présentes CGV sont soumises au droit français. En cas de litige, le Client peut recourir gratuitement à un médiateur de la consommation <span className="ph">[nom du médiateur à compléter]</span>. À défaut de résolution amiable, les tribunaux compétents sont ceux du ressort applicable.</p>
    </LegalPage>
  );
}
