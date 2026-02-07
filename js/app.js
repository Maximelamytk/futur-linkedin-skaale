// ===========================================
// LINKEDIN 2036 — GÉNÉRATEUR DE POST DU FUTUR
// App Logic — Skaale 2025
// ===========================================

// State
const state = {
  formData: {},
  profileData: null,
  postData: null,
  currentLevel: 1,
  regenerationCount: 0,
  maxRegenerations: 5
};

// DOM Elements
const pages = {
  home: document.getElementById('page-home'),
  form: document.getElementById('page-form'),
  timemachine: document.getElementById('page-timemachine'),
  result: document.getElementById('page-result'),
  offers: document.getElementById('page-offers')
};

// Homepage elements
const btnStart = document.getElementById('btn-start');
const btnBackHome = document.getElementById('btn-back-home');
const taglineText = document.getElementById('tagline-text');

// Form elements
const form = document.getElementById('linkedin-form');
const linkedinInput = document.getElementById('linkedin');
const linkedinWrapper = document.getElementById('linkedin-wrapper');
const linkedinIcon = document.getElementById('linkedin-icon');
const linkedinError = document.getElementById('linkedin-error');
const submitBtn = document.getElementById('submit-btn');

// Time Machine elements
const yearDisplay = document.getElementById('year-display');
const bnYear = document.getElementById('bn-year');
const bnText = document.getElementById('bn-text');
const timelineProgress = document.getElementById('timeline-progress');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

// Result elements
const profileBanner = document.getElementById('profile-banner');
const profilePhoto = document.getElementById('profile-photo');
const profileName = document.getElementById('profile-name');
const profileHeadline = document.getElementById('profile-headline');
const postAccroche = document.getElementById('post-accroche');
const postCorps = document.getElementById('post-corps');
const postCta = document.getElementById('post-cta');
const commentsContainer = document.getElementById('comments-container');
const btnCopy = document.getElementById('btn-copy');
const btnEdit = document.getElementById('btn-edit');
const btnNext = document.getElementById('btn-next');

// Modal elements
const errorModal = document.getElementById('error-modal');
const errorTitle = document.getElementById('error-title');
const errorSubtitle = document.getElementById('error-subtitle');
const btnRetry = document.getElementById('btn-retry');
const btnModalClose = document.getElementById('btn-modal-close');

// ===========================================
// BREAKING NEWS DATA
// ===========================================

const breakingNews = {
  2030: "La France instaure le RSA Créateur de Contenu. Condition : minimum 3 posts inspirants par semaine.",
  2031: "Scandale : un post écrit par un humain détecté dans le feed. Les utilisateurs choqués.",
  2032: "'CEO de ma vie' devient un diplôme reconnu par l'État. 2 ans d'études, mention 'Mindset'.",
  2033: "Le personal branding devient matière obligatoire au baccalauréat. Coefficient 12.",
  2034: "Un homme condamné pour avoir liké un post sans commenter. Le juge : 'L'engagement, c'est sacré.'",
  2035: "Les bébés naissent désormais avec un profil LinkedIn. Leur premier post : 'Ravi d'annoncer ma naissance 👶🚀'",
  2036: "Connexion au métavers LinkedIn... Téléchargement du post en cours..."
};

// ===========================================
// ERROR MESSAGES
// ===========================================

const errorMessages = {
  400: {
    title: "Hé {prenom}, ce lien LinkedIn a l'air bizarre 🤔",
    subtitle: "Vérifie que c'est bien le bon format !"
  },
  404: {
    title: "Hé {prenom}, ton profil casse notre machine temporelle !! 😱",
    subtitle: "On dirait que ce profil n'existe pas ou est privé."
  },
  429: {
    title: "Wow {prenom}, trop de voyages temporels en même temps ! 🔥",
    subtitle: "Attends quelques secondes et réessaie."
  },
  500: {
    title: "Mince {prenom}, bug dans le continuum espace-temps 😅",
    subtitle: "C'est pas toi, c'est nous. Réessaie !"
  },
  name_mismatch: {
    title: "Hmm {prenom}, on dirait qu'il y a un souci 🤔",
    subtitle: "Le prénom ou nom que tu as entré ne correspond pas à ce profil LinkedIn."
  },
  default: {
    title: "Oups {prenom}, petite turbulence temporelle 😅",
    subtitle: "Tu veux bien réessayer ?"
  }
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;

  const editDistance = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

function fuzzyMatch(input, scraped) {
  const inputNorm = normalizeString(input);
  const scrapedNorm = normalizeString(scraped);
  if (inputNorm === scrapedNorm) return true;
  if (scrapedNorm.includes(inputNorm) || inputNorm.includes(scrapedNorm)) return true;
  const inputFirst = inputNorm.split(" ")[0];
  const scrapedFirst = scrapedNorm.split(" ")[0];
  if (inputFirst === scrapedFirst && inputFirst.length > 2) return true;
  return similarity(inputNorm, scrapedNorm) > 0.6;
}

function isValidLinkedInUrl(url) {
  const pattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;
  return pattern.test(url);
}

function showPage(pageId) {
  Object.values(pages).forEach(page => page.classList.remove('active'));
  pages[pageId].classList.add('active');
  window.scrollTo(0, 0);
}

function showError(code, prenom = 'toi') {
  const error = errorMessages[code] || errorMessages.default;
  errorTitle.textContent = error.title.replace('{prenom}', prenom);
  errorSubtitle.textContent = error.subtitle;
  errorModal.classList.add('active');
}

function hideError() {
  errorModal.classList.remove('active');
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===========================================
// FORM VALIDATION
// ===========================================

linkedinInput.addEventListener('input', () => {
  const value = linkedinInput.value.trim();

  if (!value) {
    linkedinWrapper.classList.remove('valid', 'invalid');
    linkedinInput.classList.remove('valid', 'invalid');
    linkedinIcon.textContent = '';
    linkedinError.textContent = '';
    return;
  }

  if (isValidLinkedInUrl(value)) {
    linkedinWrapper.classList.add('valid');
    linkedinWrapper.classList.remove('invalid');
    linkedinInput.classList.add('valid');
    linkedinInput.classList.remove('invalid');
    linkedinIcon.textContent = '✓';
    linkedinError.textContent = '';
  } else {
    linkedinWrapper.classList.add('invalid');
    linkedinWrapper.classList.remove('valid');
    linkedinInput.classList.add('invalid');
    linkedinInput.classList.remove('valid');
    linkedinIcon.textContent = '✗';
    linkedinError.textContent = "Dis donc, ça ressemble pas à un lien LinkedIn ça 👀";
  }
});

// ===========================================
// TIME MACHINE ANIMATION
// ===========================================

async function runTimeMachine(prenom) {
  const years = Object.keys(breakingNews).map(Number);
  const totalYears = years.length;

  let currentIndex = 0;

  for (const year of years) {
    currentIndex++;

    // Update year display with animation
    yearDisplay.style.animation = 'none';
    yearDisplay.offsetHeight; // Trigger reflow
    yearDisplay.style.animation = 'year-glow 2s ease-in-out infinite';
    yearDisplay.textContent = year;

    // Update breaking news
    bnYear.textContent = year;
    let newsText = breakingNews[year];
    if (year === 2036) {
      newsText = `Connexion au métavers LinkedIn... Téléchargement du post de ${prenom}...`;
    }
    bnText.style.animation = 'none';
    bnText.offsetHeight;
    bnText.style.animation = 'fade-in 0.5s ease';
    bnText.textContent = newsText;

    // Update timeline
    const progress = (currentIndex / totalYears) * 100;
    timelineProgress.style.width = progress + '%';
    progressFill.style.width = progress + '%';

    // Update progress text
    if (progress < 90) {
      progressText.textContent = 'Voyage temporel en cours...';
    } else {
      progressText.textContent = 'Atterrissage en 2036...';
    }

    // 3s per year (~21s total) — enough to read each breaking news
    await sleep(3000);
  }
}

// ===========================================
// API CALLS
// ===========================================

async function scrapeLinkedIn(linkedinUrl) {
  const response = await fetch('/api/scrape-linkedin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ linkedinUrl })
  });

  const data = await response.json();

  if (!response.ok) {
    throw { code: response.status, data };
  }

  return data;
}

async function generatePost(level = 1, previousPost = null) {
  const response = await fetch('/api/generate-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profileData: state.profileData,
      formData: state.formData,
      level,
      previousPost
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw { code: response.status, data };
  }

  return data;
}

// ===========================================
// DISPLAY RESULT
// ===========================================

function displayResult() {
  const { profileData, postData, formData } = state;

  // Profile info
  profileName.textContent = `${formData.prenom} ${formData.nom}`;
  profileHeadline.textContent = postData.headlineFuture;

  if (profileData?.photoUrl) {
    profilePhoto.src = profileData.photoUrl;
    profilePhoto.alt = `${formData.prenom} ${formData.nom}`;
  } else {
    profilePhoto.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.prenom + ' ' + formData.nom)}&background=00f0ff&color=fff&size=160`;
  }

  if (profileData?.backgroundUrl) {
    profileBanner.style.backgroundImage = `url(${profileData.backgroundUrl})`;
  }

  // Post content
  postAccroche.textContent = postData.post.accroche;
  postCorps.textContent = postData.post.corps;
  postCta.textContent = postData.post.cta;

  // Random stats
  document.getElementById('stat-likes').textContent = randomBetween(1000, 2000).toLocaleString();
  document.getElementById('stat-comments').textContent = randomBetween(200, 500);
  document.getElementById('stat-shares').textContent = randomBetween(500, 1000);
  document.getElementById('stat-sends').textContent = randomBetween(100, 300);

  // Comments with robot profile pictures (inline SVG, no external dependency)
  commentsContainer.innerHTML = '';
  if (postData.commentaires && postData.commentaires.length > 0) {
    postData.commentaires.forEach((comment, index) => {
      const commentEl = document.createElement('div');
      commentEl.className = 'lc-comment';
      const robotSrc = generateRobotSvg(comment.nom + index);
      commentEl.innerHTML = `
        <img class="comment-avatar-img" src="${robotSrc}" alt="${comment.nom}">
        <div class="comment-content">
          <div class="comment-name">${comment.nom} · 2036</div>
          <div class="comment-text">${comment.texte}</div>
        </div>
      `;
      commentsContainer.appendChild(commentEl);
    });
  }

  // Reset edit mode
  const lcPost = document.querySelector('.lc-post');
  lcPost.classList.remove('editing');
  postAccroche.contentEditable = 'false';
  postCorps.contentEditable = 'false';
  postCta.contentEditable = 'false';
  btnEdit.querySelector('span:last-child').textContent = 'Modifier le post';
  btnEdit.classList.remove('editing');

  showPage('result');
}

// ===========================================
// EVENT HANDLERS
// ===========================================

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const linkedinUrl = linkedinInput.value.trim();
  if (!isValidLinkedInUrl(linkedinUrl)) {
    linkedinError.textContent = "Dis donc, ça ressemble pas à un lien LinkedIn ça 👀";
    return;
  }

  // Collect form data
  state.formData = {
    prenom: document.getElementById('prenom').value.trim(),
    nom: document.getElementById('nom').value.trim(),
    metier: document.getElementById('metier').value.trim(),
    linkedin: linkedinUrl,
    delire: document.getElementById('delire').value.trim(),
    ambition: document.getElementById('ambition').value.trim(),
    trucPasAssume: document.getElementById('truc-pas-assume').value.trim()
  };

  // Reset state
  state.currentLevel = 1;
  state.regenerationCount = 0;

  // Disable button
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Initialisation...';

  // Show time machine
  showPage('timemachine');

  try {
    // Start animation
    const animationPromise = runTimeMachine(state.formData.prenom);

    // Scrape LinkedIn profile (runs in parallel with animation)
    const scrapedData = await scrapeLinkedIn(linkedinUrl);

    // Validate name match
    const person = scrapedData.person;
    const firstNameMatch = fuzzyMatch(state.formData.prenom, person.firstName || '');
    const lastNameMatch = fuzzyMatch(state.formData.nom, person.lastName || '');

    if (!firstNameMatch || !lastNameMatch) {
      throw { code: 'name_mismatch' };
    }

    // Store profile data
    state.profileData = {
      firstName: person.firstName,
      lastName: person.lastName,
      headline: person.headline,
      photoUrl: person.photoUrl,
      backgroundUrl: person.backgroundUrl,
      location: person.location,
      currentPosition: person.positions?.positionHistory?.[0]
    };

    // Generate post IN PARALLEL with remaining animation
    const [postResult] = await Promise.all([
      generatePost(state.currentLevel),
      animationPromise
    ]);
    state.postData = postResult;

    // Display result
    displayResult();

  } catch (error) {
    console.error('Error:', error);
    showError(error.code || 'default', state.formData.prenom);
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Lancer le voyage temporel';
  }
});

// Copy button — copies from the post content directly
btnCopy.addEventListener('click', async () => {
  try {
    const fullPost = `${postAccroche.textContent}\n\n${postCorps.textContent}\n\n${postCta.textContent}`;
    await navigator.clipboard.writeText(fullPost);
    btnCopy.querySelector('span:last-child').textContent = 'Copié !';

    setTimeout(() => {
      btnCopy.querySelector('span:last-child').textContent = 'Copier le post';
    }, 2000);
  } catch (error) {
    console.error('Copy failed:', error);
  }
});

// Edit button — toggle contentEditable on post elements
btnEdit.addEventListener('click', () => {
  const lcPost = document.querySelector('.lc-post');
  const isEditing = lcPost.classList.contains('editing');

  if (isEditing) {
    // Save & exit edit mode
    lcPost.classList.remove('editing');
    postAccroche.contentEditable = 'false';
    postCorps.contentEditable = 'false';
    postCta.contentEditable = 'false';
    btnEdit.querySelector('span:last-child').textContent = 'Modifier le post';
    btnEdit.classList.remove('editing');
  } else {
    // Enter edit mode
    lcPost.classList.add('editing');
    postAccroche.contentEditable = 'true';
    postCorps.contentEditable = 'true';
    postCta.contentEditable = 'true';
    btnEdit.querySelector('span:last-child').textContent = 'Valider';
    btnEdit.classList.add('editing');
    postAccroche.focus();
  }
});

// Next button
btnNext.addEventListener('click', () => {
  showPage('offers');
});

// Modal handlers
btnRetry.addEventListener('click', () => {
  hideError();
  showPage('form');
});

btnModalClose.addEventListener('click', () => {
  hideError();
  showPage('form');
});

errorModal.addEventListener('click', (e) => {
  if (e.target === errorModal) {
    hideError();
    showPage('form');
  }
});

// ===========================================
// ROBOT AVATAR GENERATOR
// ===========================================

function generateRobotSvg(seed) {
  // Simple hash from string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);

  const colors = ['#00e5ff', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6392', '#c084fc', '#f7883e'];
  const bodyColor = colors[hash % colors.length];
  const eyeColor = colors[(hash + 3) % colors.length];
  const antennaColor = colors[(hash + 5) % colors.length];

  // Vary features based on hash
  const eyeStyle = hash % 3; // 0=round, 1=square, 2=visor
  const mouthStyle = hash % 4;
  const hasAntenna = hash % 2 === 0;

  let eyes = '';
  if (eyeStyle === 0) {
    eyes = `<circle cx="20" cy="28" r="4" fill="${eyeColor}"/><circle cx="36" cy="28" r="4" fill="${eyeColor}"/>`;
  } else if (eyeStyle === 1) {
    eyes = `<rect x="17" y="25" width="7" height="7" rx="1" fill="${eyeColor}"/><rect x="32" y="25" width="7" height="7" rx="1" fill="${eyeColor}"/>`;
  } else {
    eyes = `<rect x="14" y="26" width="28" height="6" rx="3" fill="${eyeColor}" opacity="0.9"/>`;
  }

  let mouth = '';
  if (mouthStyle === 0) {
    mouth = `<rect x="22" y="37" width="12" height="3" rx="1.5" fill="${eyeColor}" opacity="0.6"/>`;
  } else if (mouthStyle === 1) {
    mouth = `<path d="M22 37 Q28 42 34 37" stroke="${eyeColor}" stroke-width="2" fill="none" opacity="0.6"/>`;
  } else if (mouthStyle === 2) {
    mouth = `<rect x="20" y="36" width="4" height="4" rx="1" fill="${eyeColor}" opacity="0.5"/><rect x="26" y="36" width="4" height="4" rx="1" fill="${eyeColor}" opacity="0.5"/><rect x="32" y="36" width="4" height="4" rx="1" fill="${eyeColor}" opacity="0.5"/>`;
  } else {
    mouth = `<path d="M22 40 Q28 36 34 40" stroke="${eyeColor}" stroke-width="2" fill="none" opacity="0.6"/>`;
  }

  const antenna = hasAntenna
    ? `<line x1="28" y1="10" x2="28" y2="2" stroke="${antennaColor}" stroke-width="2"/><circle cx="28" cy="2" r="3" fill="${antennaColor}"/>`
    : `<rect x="22" y="7" width="12" height="4" rx="2" fill="${antennaColor}"/>`;

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><rect width="56" height="56" rx="28" fill="#1a1a2e"/>${antenna}<rect x="12" y="14" width="32" height="30" rx="6" fill="${bodyColor}"/><rect x="8" y="24" width="6" height="10" rx="3" fill="${bodyColor}" opacity="0.7"/><rect x="42" y="24" width="6" height="10" rx="3" fill="${bodyColor}" opacity="0.7"/>${eyes}${mouth}</svg>`)}`;
}

// ===========================================
// HOMEPAGE ANIMATIONS
// ===========================================

const taglines = [
  "Où le personal branding est devenu obligatoire.",
  "Où chaque post est un manifeste existentiel.",
  "Où ton Why a son propre compte LinkedIn.",
  "Où l'humilité est un bug à corriger.",
  "Où ton clone IA commente à ta place.",
  "Où 'CEO de ma vie' est un diplôme.",
  "Où le cringe est devenu une compétence."
];

let currentTaglineIndex = 0;
let taglineInterval = null;

function animateTagline() {
  const el = document.getElementById('tagline-text');
  if (!el) return;

  // Fade out
  el.style.opacity = '0';
  el.style.transform = 'translateY(-10px)';

  setTimeout(() => {
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
    el.textContent = taglines[currentTaglineIndex];

    // Fade in
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 400);
}

function startTaglineAnimation() {
  const el = document.getElementById('tagline-text');
  if (taglineInterval) clearInterval(taglineInterval);
  if (el) {
    currentTaglineIndex = 0;
    el.textContent = taglines[0];
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    taglineInterval = setInterval(animateTagline, 3000);
  }
}

function stopTaglineAnimation() {
  if (taglineInterval) {
    clearInterval(taglineInterval);
    taglineInterval = null;
  }
}

// ===========================================
// NAVIGATION HANDLERS
// ===========================================

// Homepage -> Form
if (btnStart) {
  btnStart.addEventListener('click', () => {
    stopTaglineAnimation();
    showPage('form');
  });
}

// Form -> Homepage (back button)
if (btnBackHome) {
  btnBackHome.addEventListener('click', () => {
    showPage('home');
    startTaglineAnimation();
  });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  // Start on home page
  showPage('home');
  startTaglineAnimation();
});
