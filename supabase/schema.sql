-- ============================================================
-- Le Campus du Trading — schema Supabase (v1)
-- A coller dans Supabase > SQL Editor, puis "Run".
-- ============================================================

-- 1) PROFILS ---------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "profiles: read own"   on public.profiles for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);

-- Cree le profil automatiquement a l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) ACCES (qui a paye) ---------------------------------------
create table if not exists public.entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  has_full_access boolean default false,
  stripe_customer_id text,
  granted_at timestamptz
);
alter table public.entitlements enable row level security;
-- L'eleve peut LIRE son acces ; seul le serveur (service role) peut l'ECRIRE (via webhook Stripe).
create policy "entitlements: read own" on public.entitlements for select using (auth.uid() = user_id);

-- 3) LECONS (le catalogue, contenu fixe) ----------------------
create table if not exists public.lessons (
  id text primary key,
  module_order int not null,
  module_title text not null,
  lesson_order int not null,
  title text not null,
  duration text,
  storage_path text,          -- chemin du fichier dans le bucket "course-videos"
  is_free boolean default false
);
alter table public.lessons enable row level security;
-- Metadonnees lisibles par tout utilisateur connecte (les URLs video sont generees a part, cote serveur).
create policy "lessons: read (auth)" on public.lessons for select to authenticated using (true);

-- 4) PROGRESSION ----------------------------------------------
create table if not exists public.progress (
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id text references public.lessons(id) on delete cascade,
  position_seconds int default 0,
  completed boolean default false,
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id)
);
alter table public.progress enable row level security;
create policy "progress: read own"   on public.progress for select using (auth.uid() = user_id);
create policy "progress: write own"  on public.progress for insert with check (auth.uid() = user_id);
create policy "progress: update own" on public.progress for update using (auth.uid() = user_id);

-- 5) SEED — les 8 modules / lecons reelles --------------------
insert into public.lessons (id, module_order, module_title, lesson_order, title, duration, is_free) values
('m1l1',1,'Les fondations du marche',1,'Les fondations du marche : comment naissent les mouvements','13:50',true),
('m1l2',1,'Les fondations du marche',2,'Definition & concepts cles : POC, HVN, LVN, Value Area','12:19',false),
('m1l3',1,'Les fondations du marche',3,'Introduction au Time Price Opportunity (TPO)','5:28',false),
('m2l1',2,'Le TPO / Market Profile',1,'Introduction au TPO & zone de valeur','5:28',false),
('m2l2',2,'Le TPO / Market Profile',2,'Quadriller les zones cles du marche avec le TPO','4:56',false),
('m2l3',2,'Le TPO / Market Profile',3,'Identifier les zones d''intervention basees sur le TPO','9:44',false),
('m3l1',3,'Le Volume Profile',1,'Volume Profile : identifier les zones cles du marche','',false),
('m3l2',3,'Le Volume Profile',2,'D-shape & P-shape : distributions et psychologie','1:20',false),
('m3l3',3,'Le Volume Profile',3,'b-shape & B-shape : accumulation et double distribution','1:48',false),
('m3l4',3,'Le Volume Profile',4,'Installation et lecture du Volume Profile sur NinjaTrader','8:19',false),
('m3l5',3,'Le Volume Profile',5,'Identifier les zones strategiques avec le Volume Profile','4:37',false),
('m3l6',3,'Le Volume Profile',6,'Application en Weekly Volume Profile','11:44',false),
('m4l1',4,'Le VWAP',1,'Comprendre le VWAP : principe, role et niveau cle','8:00',false),
('m4l2',4,'Le VWAP',2,'VWAP en pratique : mise en place sur NinjaTrader','9:12',false),
('m4l3',4,'Le VWAP',3,'Trade live au niveau du VWAP avec confirmation','8:20',false),
('m5l1',5,'Order Flow & Footprint',1,'Decouverte du Footprint : lire le marche de l''interieur','15:53',false),
('m5l2',5,'Order Flow & Footprint',2,'Configuration Footprint sur NinjaTrader','10:41',false),
('m5l3',5,'Order Flow & Footprint',3,'Delta, Delta Max, Delta Min et Cumulative Delta','5:40',false),
('m5l4',5,'Order Flow & Footprint',4,'Delta Divergence : lire l''absorption, anticiper le retournement','6:09',false),
('m5l5',5,'Order Flow & Footprint',5,'Identifier l''absorption : la defense des niveaux','3:47',false),
('m5l6',5,'Order Flow & Footprint',6,'Identifier l''epuisement : quand les gros acteurs levent le pied','5:12',false),
('m5l7',5,'Order Flow & Footprint',7,'Desequilibres empiles / Stacked Imbalances','6:33',false),
('m5l8',5,'Order Flow & Footprint',8,'POC Bar : comprendre l''acceptation du marche','4:52',false),
('m6l1',6,'Le Gamma Exposure',1,'Fournisseurs de donnees Gamma Exposure','1:51',false),
('m6l2',6,'Le Gamma Exposure',2,'Usage du Gamma Exposure : Combo Walls & confluence','4:09',false),
('m7l1',7,'Les setups & plans de trade',1,'Setup 1 : ouverture dans la zone de valeur de la veille','3:31',false),
('m7l2',7,'Les setups & plans de trade',2,'Setup 2 : ouverture dans la VAH de la veille','3:59',false),
('m7l3',7,'Les setups & plans de trade',3,'Setup 3 : ouverture dans la VAL de la veille','2:21',false),
('m7l4',7,'Les setups & plans de trade',4,'Setup 4 : POC vierge','11:44',false),
('m7l5',7,'Les setups & plans de trade',5,'Setup 5 : zone de valeur vierge en resistance','5:42',false),
('m7l6',7,'Les setups & plans de trade',6,'Plan de trade : entree et objectifs','',false),
('m8l1',8,'Routine, scenario & psychologie',1,'Routine trader : analyser les actualites (calendrier eco & news)','4:53',false),
('m8l2',8,'Routine, scenario & psychologie',2,'Elaborer un scenario de trading base sur le Volume Profile','2:32',false),
('m8l3',8,'Routine, scenario & psychologie',3,'Surveiller l''arrivee du prix sur nos zones','14:04',false),
('m8l4',8,'Routine, scenario & psychologie',4,'Discipline & gestion emotionnelle','8:11',false),
('m8l5',8,'Routine, scenario & psychologie',5,'Les secrets neurochimiques : dopamine & vigilance','5:01',false)
on conflict (id) do nothing;

-- 6) STORAGE : bucket prive pour les videos -------------------
insert into storage.buckets (id, name, public) values ('course-videos','course-videos', false)
on conflict (id) do nothing;
-- Pas de policy publique : l'acces se fait uniquement via des URLs signees generees cote serveur.
