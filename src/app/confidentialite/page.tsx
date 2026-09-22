import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Politique de confidentialité — Le Campus du Trading" };

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité" updated="Dernière mise à jour : 2026">
      <h2>1. Responsable du traitement</h2>
      <p>Le responsable du traitement est <strong>Hosni Ben Hassen</strong> (Le Campus du Trading), 16 allée de Tourny, 33000 Bordeaux. Contact : contact@lecampusdutrading.fr.</p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>Données de compte : adresse e-mail, mot de passe (chiffré).</li>
        <li>Données de paiement : traitées par Stripe (le Vendeur ne stocke aucune donnée de carte bancaire).</li>
        <li>Données d&apos;usage : progression dans la Formation, historique de connexion.</li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>Créer et gérer ton compte, te donner accès à la Formation — <strong>exécution du contrat</strong>.</li>
        <li>Traiter ton paiement — <strong>exécution du contrat</strong>.</li>
        <li>Suivre ta progression pédagogique — <strong>exécution du contrat</strong>.</li>
        <li>Répondre à tes demandes via le formulaire de contact — <strong>consentement</strong>.</li>
      </ul>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>Tes données sont hébergées et traitées par des sous-traitants présentant des garanties conformes au RGPD : <strong>Supabase</strong> (comptes et base de données), <strong>Stripe</strong> (paiement), <strong>Vercel</strong> (hébergement du site), <strong>Web3Forms</strong> (transmission des messages de contact).</p>

      <h2>5. Durée de conservation</h2>
      <p>Les données de compte sont conservées tant que le compte est actif, puis supprimées dans un délai de 3 ans après la dernière activité. Les données de facturation sont conservées 10 ans conformément aux obligations légales comptables.</p>

      <h2>6. Tes droits</h2>
      <p>Tu disposes des droits d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de limitation et de portabilité de tes données. Pour les exercer, écris à contact@lecampusdutrading.fr. Tu peux également introduire une réclamation auprès de la <a href="https://www.cnil.fr">CNIL</a>.</p>

      <h2>7. Cookies</h2>
      <p>Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement (connexion, session). Ils ne nécessitent pas de consentement préalable et ne servent pas à des fins publicitaires ou de suivi.</p>
    </LegalPage>
  );
}
