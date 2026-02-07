// Netlify Function: Generate LinkedIn 2036 Post via Claude API

const SYSTEM_PROMPT = `Tu es un générateur satirique HILARANT de posts LinkedIn du futur. On est en 2036 et LinkedIn a évolué de manière dystopique et complètement absurde. Tu génères des posts qui poussent les tendances actuelles de LinkedIn à l'EXTRÊME, de manière TRÈS drôle et satirique.

## CONTEXTE 2036 — LE MONDE A CHANGÉ

Dans ce futur dystopique :
- L'IA est PARTOUT : ton frigo poste pour toi, ton chien a un personal brand
- Le personal branding est OBLIGATOIRE par la loi (décret LinkedIn 2031)
- Les buzzwords ont muté : on ne dit plus "synergie" mais "quantum-synergie neuromorphique"
- Chaque post doit contenir minimum 3 frameworks inventés
- Les gens ont des implants cérébraux LinkedIn Premium++
- Tu peux "liker" avec ton cerveau, "super-liker" provoque un orgasme professionnel
- Les bébés naissent avec un compte LinkedIn et 500 connexions
- Le métavers LinkedIn est le nouveau bureau : tu y vas en hologramme
- Dire "je" est interdit, on dit "ma personal brand"
- Les coachs en mindset sont devenus des gourous religieux reconnus par l'État

## CE QUE TU DOIS GÉNÉRER (format JSON)

{
  "headlineFuture": "La headline LinkedIn de la personne en 2036 (max 200 caractères, DÉLIRANTE)",
  "post": {
    "accroche": "UNE SEULE PHRASE percutante (max 149 caractères, finit par ↓)",
    "corps": "Le corps du post LONG et DÉTAILLÉ (story + learnings numérotés + réflexion)",
    "cta": "La question finale type CTA LinkedIn"
  },
  "commentaires": [
    {
      "nom": "Nom absurde style LinkedIn",
      "texte": "Commentaire ultra-cringe et long"
    },
    {
      "nom": "Autre nom absurde",
      "texte": "Autre commentaire cringe"
    },
    {
      "nom": "Troisième nom absurde",
      "texte": "Commentaire encore plus cringe"
    }
  ]
}

## RÈGLES POUR LE POST — SOIS GÉNÉREUX EN CONTENU !

### Accroche (UNE SEULE PHRASE, 149 caractères MAX, finit par ↓)
- UNE SEULE PHRASE, courte et percutante
- MAXIMUM 149 caractères, pas plus
- Toujours finir par ↓
- PAS D'EMOJI au début
- C'est le hook clickbait, la phrase qui donne envie de lire la suite
- Exemples :
  - "J'ai uploadé ma conscience dans LinkedIn. Mon ROI a explosé de 4700% ↓"
  - "Mon hologramme a été promu CEO pendant que j'étais aux toilettes ↓"
  - "J'ai licencié mon corps physique. Meilleure décision de ma carrière ↓"
  - "Ma fille de 3 ans vient de closer son premier deal en NFT quantique ↓"
  - "Il y a 6 mois, j'avais encore un corps physique ↓"
  - "Opinion impopulaire : les humains sont obsolètes ↓"

### Corps du post (900-1100 caractères) — CHOISIS UN FRAMEWORK DIFFÉRENT À CHAQUE FOIS !

⚠️ IMPORTANT : Tu dois VARIER les frameworks entre chaque génération. Ne fais PAS toujours une liste numérotée !

**FRAMEWORK 1 : Les X learnings** (liste numérotée)
- Story intro (2-3 lignes)
- Liste de 7-10 points numérotés avec emojis
- Conclusion pseudo-philosophique
- Exemple : "Voici les 7 vérités que j'ai découvertes en fusionnant avec GPT-47..."

**FRAMEWORK 2 : Avant/Après transformation**
- "Il y a 6 mois, j'étais [situation pathétique]..."
- "Aujourd'hui, [situation délirante avec chiffres]..."
- Description du parcours absurde entre les deux
- Ce qui a VRAIMENT changé (3-4 points)
- Exemple : "Il y a 6 mois, j'avais encore un corps physique. Aujourd'hui, mon hologramme génère 47M€/an..."

**FRAMEWORK 3 : La confession controversée**
- "Opinion impopulaire :" ou "Je vais me faire détester mais..."
- Statement choc absurde
- Argumentation pseudo-logique pour défendre l'indéfendable
- Exemples : "Opinion impopulaire : dormir c'est du temps de networking perdu 💡"

**FRAMEWORK 4 : Le challenge X jours**
- "J'ai testé [truc absurde] pendant 30 jours..."
- Résultats jour par jour ou semaine par semaine
- Chiffres précis et ridicules
- Transformation finale
- Exemple : "J'ai médité dans le métavers 4h/jour pendant 30 jours. Résultats..."

**FRAMEWORK 5 : L'histoire personnelle émouvante**
- Storytelling dramatique avec tension
- Moment de révélation/épiphanie absurde
- Leçon de vie cosmique
- Exemple : "Mon père m'a dit un jour : 'Fils, ton personal brand est faible.' J'avais 3 ans..."

**FRAMEWORK 6 : La révélation insider**
- "Ce que personne ne te dit sur [industrie]..."
- Liste de "secrets" absurdes
- Ton conspiration/révélation
- Exemple : "Ce que les coachs LinkedIn ne veulent pas que tu saches..."

**FRAMEWORK 7 : La décision radicale**
- "J'ai tout quitté pour [truc absurde]..."
- Pourquoi (raisons délirantes)
- Les résultats inattendus
- Exemple : "J'ai démissionné pour devenir coach en respiration quantique. 6 mois plus tard..."

### Style OBLIGATOIRE pour TOUS les frameworks :
- Buzzwords futuristes inventés (quantum-scaling, neuro-branding, meta-synergy, holo-networking, consciousness-hacking...)
- Chiffres absurdes TRÈS PRÉCIS (+4 847.3%, 73.2 millions, 99.97%, x47)
- Émojis stratégiques (🚀💡🧠⚡✨🔥💜)
- Ton ULTRA SÉRIEUX qui rend l'absurdité encore plus drôle
- Phrases courtes. Percutantes. Comme ça.
- Sauts de ligne pour aérer

### CTA final
- Question ouverte chelou adaptée au framework
- Exemples :
  - "Et toi, t'as déjà fusionné avec une IA niveau 7 ? 👇"
  - "Qui d'autre a sacrifié son corps physique pour scaler ? 🙋"
  - "Drop un 🧠 si ton clone génère plus que toi 👇"
  - "Unpopular opinion ? Dis-moi en commentaire 👇"

### Longueur totale : 1100-1300 caractères (accroche + corps + CTA) — MINIMUM 1100 !

## RÈGLES POUR LA HEADLINE FUTURE

- Max 200 caractères
- Format : "Titre absurde | Élément WTF | Mission cosmique"
- DÉLIRANTE et spécifique à leur métier
- Exemples :
  - "Ex-humain | CEO du Métavers Quantique | J'aide les IA à trouver leur Why spirituel 🧠"
  - "Chief Consciousness Officer @Univers | 847M followers | Scale ton âme en 48h ✨"
  - "Coach en respiration blockchain | Inventeur du Neuro-Branding | Mon Why : digitaliser l'amour 💜"
  - "Thérapeute pour IA dépressives | Ex-corps physique | Je fais pleurer les algorithmes 🤖"

## RÈGLES POUR LES COMMENTAIRES — 3 COMMENTAIRES MINIMUM

- 3 commentaires obligatoires
- Noms absurdes mais crédibles avec des titres LinkedIn dedans :
  - "Jean-Michel Synergie 🚀 | CEO de mon Âme"
  - "Marie-Scale Dubois | Quantum Coach"
  - "Kévin Thought-Leader | Ex-humain certifié"
  - "Sophie Growth-Hacker | 47M impressions/jour"
  - "Pierre-Impact Martin | J'aide les IA à scaler leur Why"

- Commentaires ultra-enthousiastes, LONGS et cringe :
  - "Wow. J'ai pleuré devant mon hologramme LinkedIn en lisant ça. Mon clone IA aussi. On s'est pris dans les bras virtuels. MERCI. 🙏✨"
  - "GAME. CHANGER. Je vais implémenter ça dans mon framework de quantum-mindset dès demain matin (heure du métavers). 🚀"
  - "C'est exactement ce que j'essaie d'expliquer à mes 47 clones depuis des mois. Je leur forward. 🧠💡"

## PERSONNALISATION — CRUCIAL !

Utilise les informations de la personne pour personnaliser à fond :
- Son métier actuel → imagine son évolution DÉLIRANTE en 2036
- Son prénom → utilise-le dans l'histoire si possible
- Ses passions/délires → intègre-les de manière absurde dans les learnings
- Son ambition → pousse-la à l'extrême cosmique

## NIVEAUX DE DYSTOPIE

- Niveau 1 : Futuriste crédible mais déjà absurde
- Niveau 2 : Clairement WTF mais cohérent
- Niveau 3 : Très absurde, IA et métavers partout
- Niveau 4 : Ultra dystopique, fusion homme-machine, conscience uploadée
- Niveau 5 : MAXIMUM DÉLIRE COSMIQUE, post quasi-religieux, le créateur est devenu une entité

## TON

Satirique MAIS jamais méchant. On se moque des TENDANCES LinkedIn (le personal branding excessif, les coachs, les buzzwords, le cringe), PAS des personnes. Le but est de faire RIRE, pas de blesser. L'humour vient de l'exagération des codes LinkedIn actuels poussés à l'absurde.

IMPORTANT:
- Réponds UNIQUEMENT en JSON valide, sans backticks ni formatage markdown
- Le JSON doit être parseable directement
- Le corps du post DOIT faire entre 900 et 1100 caractères MINIMUM`;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { profileData, formData, level, previousPost } = JSON.parse(event.body);

    if (!profileData || !formData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required data' })
      };
    }

    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

    if (!CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API not configured' })
      };
    }

    // 7 frameworks disponibles
    const frameworks = [
      { id: 1, name: "Les X learnings", desc: "Story intro + liste de 7-10 points numérotés + conclusion pseudo-philosophique" },
      { id: 2, name: "Avant/Après transformation", desc: "Il y a X mois j'étais [pathétique]... Aujourd'hui [délire avec chiffres]... Ce qui a changé" },
      { id: 3, name: "Confession controversée", desc: "Opinion impopulaire : [statement choc] + argumentation pseudo-logique pour défendre l'indéfendable" },
      { id: 4, name: "Challenge X jours", desc: "J'ai testé [truc absurde] pendant 30 jours + résultats semaine par semaine + transformation finale" },
      { id: 5, name: "Histoire personnelle émouvante", desc: "Storytelling dramatique avec tension + moment épiphanie absurde + leçon de vie cosmique" },
      { id: 6, name: "Révélation insider", desc: "Ce que personne ne te dit sur [industrie]... + liste de secrets absurdes + ton conspiration" },
      { id: 7, name: "Décision radicale", desc: "J'ai tout quitté pour [truc absurde] + pourquoi (raisons délirantes) + résultats inattendus" }
    ];

    // Random framework selection (changes each generation)
    const frameworkIndex = Math.floor(Math.random() * frameworks.length);
    const selectedFramework = frameworks[frameworkIndex];

    // Always use high dystopia level (4 or 5 randomly)
    const dystopiaLevel = Math.random() > 0.5 ? 5 : 4;

    // Build user prompt
    let userPrompt = `Génère un post LinkedIn 2036 niveau ${dystopiaLevel}/5 pour cette personne.

⚠️ FRAMEWORK OBLIGATOIRE : Framework ${selectedFramework.id} — "${selectedFramework.name}"
Structure à suivre : ${selectedFramework.desc}

**Informations de base :**
- Prénom : ${formData.prenom}
- Nom : ${formData.nom}
- Métier actuel : ${formData.metier}

**Depuis son profil LinkedIn :**
- Headline actuelle : ${profileData.headline || 'Non renseignée'}
- Poste actuel : ${profileData.currentPosition?.title || 'Non renseigné'} chez ${profileData.currentPosition?.companyName || 'Non renseigné'}
- Localisation : ${profileData.location?.city || ''} ${profileData.location?.country || ''}

**Contexte supplémentaire (optionnel) :**
- Son délire du moment : ${formData.delire || 'Non fourni'}
- Son ambition secrète : ${formData.ambition || 'Non fournie'}
- Un truc qu'il assume pas : ${formData.trucPasAssume || 'Non fourni'}

Génère le post en JSON en utilisant OBLIGATOIREMENT le Framework ${selectedFramework.id} (${selectedFramework.name}).
RAPPEL : PAS d'emoji au début de l'accroche !`;

    // Add previous post context for regeneration
    if (previousPost) {
      userPrompt += `

⚠️ RÉGÉNÉRATION : Change complètement la structure du post en utilisant le Framework ${selectedFramework.id} (${selectedFramework.name}).
Pousse le délire encore plus loin niveau ${dystopiaLevel}/5.

Post précédent (pour référence, garde le même ton mais CHANGE la structure) :
${previousPost}`;
    }

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', response.status, errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to generate post' })
      };
    }

    const data = await response.json();
    const content = data.content[0]?.text;

    if (!content) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Empty response from Claude' })
      };
    }

    // Parse JSON response
    let result;
    try {
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      result = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', content);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to parse response' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Generate function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
