// Curriculum affiche sur la landing (contenu marketing fixe).
// La source de verite de l'app reste la table "lessons" dans Supabase.
export type Module = { n: string; title: string; meta: string; lessons: { title: string; tm?: string }[] };

export const MODULES: Module[] = [
  { n: "01", title: "Les fondations du marche", meta: "3 lecons · theorie de l'enchere", lessons: [
    { title: "Les fondations du marche : comment naissent les mouvements", tm: "13:50" },
    { title: "Definition & concepts cles : POC, HVN, LVN, Value Area", tm: "12:19" },
    { title: "Introduction au Time Price Opportunity (TPO)", tm: "5:28" },
  ]},
  { n: "02", title: "Le TPO / Market Profile", meta: "3 lecons · structure de seance", lessons: [
    { title: "Introduction au TPO & zone de valeur", tm: "5:28" },
    { title: "Quadriller les zones cles du marche avec le TPO", tm: "4:56" },
    { title: "Identifier les zones d'intervention basees sur le TPO", tm: "9:44" },
  ]},
  { n: "03", title: "Le Volume Profile", meta: "6 lecons · shapes & zones cles", lessons: [
    { title: "Volume Profile : identifier les zones cles du marche" },
    { title: "D-shape & P-shape : distributions et psychologie", tm: "1:20" },
    { title: "b-shape & B-shape : accumulation et double distribution", tm: "1:48" },
    { title: "Installation et lecture du Volume Profile sur NinjaTrader", tm: "8:19" },
    { title: "Identifier les zones strategiques avec le Volume Profile", tm: "4:37" },
    { title: "Application en Weekly Volume Profile", tm: "11:44" },
  ]},
  { n: "04", title: "Le VWAP", meta: "3 lecons · niveaux & execution", lessons: [
    { title: "Comprendre le VWAP : principe, role et niveau cle", tm: "8:00" },
    { title: "VWAP en pratique : mise en place sur NinjaTrader", tm: "9:12" },
    { title: "Trade live au niveau du VWAP avec confirmation", tm: "8:20" },
  ]},
  { n: "05", title: "Order Flow & Footprint", meta: "8 lecons · lecture du carnet", lessons: [
    { title: "Decouverte du Footprint : lire le marche de l'interieur", tm: "15:53" },
    { title: "Configuration Footprint sur NinjaTrader", tm: "10:41" },
    { title: "Delta, Delta Max, Delta Min et Cumulative Delta", tm: "5:40" },
    { title: "Delta Divergence : lire l'absorption, anticiper le retournement", tm: "6:09" },
    { title: "Identifier l'absorption : la defense des niveaux", tm: "3:47" },
    { title: "Identifier l'epuisement : quand les gros acteurs levent le pied", tm: "5:12" },
    { title: "Desequilibres empiles / Stacked Imbalances", tm: "6:33" },
    { title: "POC Bar : comprendre l'acceptation du marche", tm: "4:52" },
  ]},
  { n: "06", title: "Le Gamma Exposure", meta: "2 lecons · flux d'options", lessons: [
    { title: "Fournisseurs de donnees Gamma Exposure", tm: "1:51" },
    { title: "Usage du Gamma Exposure : Combo Walls & confluence", tm: "4:09" },
  ]},
  { n: "07", title: "Les setups & plans de trade", meta: "6 lecons · entrees & objectifs", lessons: [
    { title: "Setup 1 : ouverture dans la zone de valeur de la veille", tm: "3:31" },
    { title: "Setup 2 : ouverture dans la VAH de la veille", tm: "3:59" },
    { title: "Setup 3 : ouverture dans la VAL de la veille", tm: "2:21" },
    { title: "Setup 4 : POC vierge", tm: "11:44" },
    { title: "Setup 5 : zone de valeur vierge en resistance", tm: "5:42" },
    { title: "Plan de trade : entree et objectifs" },
  ]},
  { n: "08", title: "Routine, scenario & psychologie", meta: "5 lecons · discipline", lessons: [
    { title: "Routine trader : analyser les actualites (calendrier eco & news)", tm: "4:53" },
    { title: "Elaborer un scenario de trading base sur le Volume Profile", tm: "2:32" },
    { title: "Surveiller l'arrivee du prix sur nos zones", tm: "14:04" },
    { title: "Discipline & gestion emotionnelle", tm: "8:11" },
    { title: "Les secrets neurochimiques : dopamine & vigilance", tm: "5:01" },
  ]},
];
