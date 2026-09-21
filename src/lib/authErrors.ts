// Traduit les messages d'erreur Supabase en francais lisible.
export function frError(msg: string): string {
  const m = (msg || "").toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed")) return "Ton email n'est pas encore confirmé.";
  if (m.includes("user already registered") || m.includes("already been registered")) return "Un compte existe déjà avec cet email. Connecte-toi.";
  if (m.includes("password should be at least")) return "Le mot de passe doit contenir au moins 8 caractères.";
  if (m.includes("unable to validate email") || m.includes("invalid email")) return "Adresse email invalide.";
  if (m.includes("for security purposes") || m.includes("rate limit")) return "Trop de tentatives. Réessaie dans quelques instants.";
  if (m.includes("failed to fetch") || m.includes("network")) return "Problème de connexion au serveur. Réessaie.";
  return "Une erreur est survenue. Réessaie.";
}
