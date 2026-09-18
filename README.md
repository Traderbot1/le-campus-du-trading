# Le Campus du Trading — plateforme de formation (v1)

Next.js + Supabase (comptes + base + stockage video) + Stripe (paiement 995 €) + lecteur video protege (watermark email + liens signes qui expirent).

## Ce que fait le site
- Page de vente
- Inscription / connexion (Supabase)
- Paiement Stripe 995 € -> acces debloque automatiquement (webhook)
- Espace eleve : 8 modules, 35+ lecons
- Lecteur video protege : watermark a l'email de l'eleve + URL signee
- Suivi de progression : reprise a la seconde pres + lecons terminees + %

---
 
## MISE EN LIGNE — a suivre dans l'ordre

### 1. Mettre le code sur GitHub
Dans ce dossier :
```
git init
git add .
git commit -m "Le Campus du Trading v1"
git branch -M main
git remote add origin https://github.com/TON-COMPTE/campus-trading.git
git push -u origin main
```
(Cree d'abord un depot vide "campus-trading" sur github.com.)

### 2. Supabase : creer la base
1. Ouvre ton projet Supabase > **SQL Editor** > New query.
2. Colle tout le contenu de `supabase/schema.sql` > **Run**.
   -> Cree les tables, la securite (RLS), tes 8 modules, et le bucket video "course-videos".

### 3. Supabase : uploader les videos
1. Storage > bucket **course-videos** (deja cree par le script).
2. Upload tes videos (une par lecon). Note le **chemin** de chaque fichier (ex: `module1/lecon1.mp4`).
3. SQL Editor : relie chaque video a sa lecon, ex :
```sql
update public.lessons set storage_path = 'module1/lecon1.mp4' where id = 'm1l1';
```
(Les IDs des lecons sont dans `supabase/schema.sql`.)

### 4. Stripe : produit + webhook
1. Cree un produit "Formation Le Campus du Trading", prix **995 € paiement unique** -> copie le **Price ID** (`price_...`).
2. Developers > Webhooks > Add endpoint :
   - URL : `https://lecampusdutrading.fr/api/webhook`
   - Evenement : `checkout.session.completed`
   - Copie le **Signing secret** (`whsec_...`).

### 5. Vercel : importer + variables
1. Vercel > **Add New > Project > Import** ton depot GitHub (il detecte Next.js tout seul).
2. **Settings > Environment Variables** : ajoute (valeurs = les tiennes) :
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRICE_ID
NEXT_PUBLIC_BUNNY_LIBRARY_ID   (laisse vide en v1 Supabase Storage)
NEXT_PUBLIC_SITE_URL           = https://lecampusdutrading.fr
```
3. **Deploy**.

### 6. Domaine Hostinger -> Vercel
1. Vercel > Settings > Domains > ajoute `lecampusdutrading.fr`.
2. Vercel te donne des enregistrements DNS -> mets-les dans Hostinger (zone DNS du domaine).
3. Attends la propagation (quelques minutes a quelques heures).

### 7. Tester
- Cree un compte sur ton site.
- Paye en **mode test** Stripe (carte `4242 4242 4242 4242`).
- Verifie que l'acces se debloque et que la video se lit.
- Passe Stripe en **live** quand tout est bon.

---
 
## Local (optionnel, pour tester sur ton PC)
```
npm install
cp .env.example .env.local   # puis remplis tes cles
npm run dev
```
Pour le webhook en local : `stripe listen --forward-to localhost:3000/api/webhook`

## Passer a Bunny plus tard (protection maximale)
Une seule fonction a changer : `src/lib/storage.ts` (remplacer l'URL signee Supabase par un token Bunny). Le reste ne bouge pas.
