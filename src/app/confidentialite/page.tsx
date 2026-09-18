import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Politique de confidentialité — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="Dernière mise à jour : 2026">
      <div className="note">Modèle conforme aux principes du RGPD. Complète les champs <span className="ph">[À COMPLÉTER]</span> et adapte selon ce que tu fais réellement des données.</div>

      <h2>1. Responsable du traitement</h2>
      <p>Le responsable du traitement est <strong>Le Campus du Trading</strong>. Contact : <span className="ph">[email à compléter]</span>.</p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>Données de compte : adresse e-mail, mot de passe (chiffré).</li>
        <li>Données de paiement : traitées par Stripe (le Vendeur ne stocke aucune carte).</li>
        <li>Données d'usage : progression dans la Formation, historique de connexion.</li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>Créer et gérer ton compte, te donner accès à la Formation — <strong>exécution du contrat</strong>.</li>
        <li>Traiter ton paiement — <strong>exécution du contrat</strong>.</li>
        <li>Suivre ta progression — <strong>exécution du contrat</strong>.</li>
        <li>Communications éventuelles — <strong>consentement</strong>.</li>
      </ul>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>Tes données sont hébergées et traitées par des sous-traitants qui présentent des garanties conformes au RGPD : <strong>Supabase</strong> (comptes et base de données), <strong>Stripe</strong> (paiement), <strong>Vercel</strong> (hébergement du site).</p>

      <h2>5. Durée de conservation</h2>
      <p>Les données de compte sont conservées tant que le compte est actif, puis <span className="ph">[durée à compléter]</span>. Les données de facturation sont conservées conformément aux obligations légales (10 ans).</p>

      <h2>6. Tes droits</h2>
      <p>Tu disposes des droits d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de tes données. Pour les exercer, écris à <span className="ph">[email à compléter]</span>. Tu peux également introduire une réclamation auprès de la <a href="https://www.cnil.fr">CNIL</a>.</p>

      <h2>7. Cookies</h2>
      <p>Le site utilise des cookies strictement nécessaires à son fonctionnement (connexion, session). <span className="ph">[Si tu ajoutes des cookies de mesure d'audience ou publicitaires, un bandeau de consentement sera obligatoire.]</span></p>
    </LegalPage>
  );
}
