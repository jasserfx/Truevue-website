/* =====================================================
   TrueVue Studio i18n (EN / FR)
   Loaded as its own <script> tag BEFORE components.js
   ===================================================== */

window.TVi18n = (function () {

  const T = {
    'nav.home':      { en: 'Home',        fr: 'Accueil' },
    'nav.services':  { en: 'Services',    fr: 'Services' },
    'nav.contact':   { en: 'Contact',     fr: 'Contact' },
    'nav.cta':       { en: 'Book a Call', fr: 'Prendre RDV' },

    'footer.tagline': { en: 'Cinematic visuals for brands that refuse to be ordinary.', fr: "Des visuels cinématiques pour les marques qui refusent l'ordinaire." },
    'footer.studio':  { en: 'Studio',              fr: 'Studio' },
    'footer.home':    { en: 'Home',                fr: 'Accueil' },
    'footer.copy':    { en: 'All rights reserved.', fr: 'Tous droits réservés.' },

    'home.hero.eyebrow': { en: 'Visual Storytelling Studio', fr: 'Studio de Narration Visuelle' },
    'home.hero.title':   { en: 'TrueVue<br><em>the Correct</em><br>View.', fr: 'TrueVue<br><em>the Correct</em><br>View.' },
    'home.hero.sub':     { en: 'We craft cinematic visuals that transform brands into experiences — photography and video that make the world stop and stare.', fr: 'Nous créons des visuels cinématiques qui transforment les marques en expériences — photographie et vidéo qui captivent.' },
    'home.hero.cta1':    { en: 'Start a Project', fr: 'Démarrer un Projet' },
    'home.hero.cta2':    { en: 'Our Services',    fr: 'Nos Services' },
    'home.hero.scroll':  { en: 'Scroll',          fr: 'Défiler' },

    'home.about.label1': { en: 'Our Story',  fr: 'Notre Histoire' },
    'home.about.title1': { en: 'Who We <em>Are</em>', fr: 'Qui <em>Nous Sommes</em>' },
    'home.about.p1a': { en: 'TrueVue Studio is a full-service visual production studio dedicated to delivering high-quality audiovisual and photographic content. We bring together creative direction, technical expertise, and a deep understanding of visual communication to craft impactful visuals that elevate brands, businesses, and personal projects.', fr: "TrueVue Studio est un studio de production visuelle offrant des services complets, dédié à la création de contenus audiovisuels et photographiques de haute qualité. Nous réunissons direction créative, expertise technique et une compréhension approfondie de la communication visuelle pour créer des visuels percutants." },
    'home.about.p1b': { en: 'With a comprehensive approach to content creation, we handle every stage of production from concept development to final delivery ensuring consistency, precision, and excellence in every project. Our work is driven by a commitment to detail, storytelling, and creating visuals that leave a lasting impression.', fr: "Avec une approche globale de la création de contenu, nous gérons chaque étape de la production du développement du concept jusqu'à la livraison finale en garantissant cohérence, précision et excellence. Notre travail est guidé par un engagement envers le détail, la narration et la création de visuels qui laissent une impression durable." },
    'home.about.label2': { en: 'Our Practice', fr: 'Notre Pratique' },
    'home.about.title2': { en: 'What We <em>Do</em>', fr: 'Ce Que <em>Nous Faisons</em>' },
    'home.about.p2a': { en: 'At TrueVue Studio, we create visual content that helps brands, businesses, and creators express their identity through high-quality video, photography, and digital media. From the first idea to the final output, we take care of the full production process with a focus on creativity, clarity, and detail.', fr: "Chez TrueVue Studio, nous créons du contenu visuel qui aide les marques, les entreprises et les créateurs à exprimer leur identité à travers la vidéo, la photographie et les médias numériques de haute qualité. De la première idée au résultat final, nous gérons l'ensemble du processus de production." },
    'home.about.p2b': { en: 'Our work includes video production, photography, editing, post-production, and tailored visual content for marketing, advertising, and social media. We also cover events and produce custom visuals for products, real estate, hospitality, and more, always aiming to tell stories that feel authentic and visually strong.', fr: "Notre travail comprend la production vidéo, la photographie, le montage, la post-production et du contenu visuel sur mesure pour le marketing, la publicité et les réseaux sociaux. Nous couvrons également les événements et produisons des visuels personnalisés pour les produits, l'immobilier, l'hôtellerie et bien plus." },

    'home.testi.label': { en: 'Client Stories',         fr: 'Témoignages Clients' },
    'home.testi.title': { en: 'What They <em>Say</em>', fr: "Ce Qu'ils <em>Disent</em>" },

    'home.cta.title': { en: 'Ready to Create<br><em>Something Unforgettable?</em>', fr: "Prêts à Créer<br><em>Quelque Chose d'Inoubliable ?</em>" },
    'home.cta.sub':   { en: "Tell us about your project and let's bring your vision to life.", fr: 'Parlez-nous de votre projet et donnons vie à votre vision.' },
    'home.cta.btn':   { en: 'Start the Conversation', fr: 'Commencer la Discussion' },

    'srv.hero.label': { en: 'What We Offer', fr: 'Ce Que Nous Proposons' },
    'srv.hero.title': { en: 'Crafting the <em>Perfect</em><br>Frame, Every Time.', fr: 'Le Cadre <em>Parfait</em>,<br>À Chaque Fois.' },

    'srv.photo.tag':   { en: 'Photography', fr: 'Photographie' },
    'srv.photo.title': { en: 'Commercial &amp; Brand <em>Photography</em>', fr: 'Photographie <em>Commerciale &amp; de Marque</em>' },
    'srv.photo.desc':  { en: 'High-quality photography crafted for brands that want to stand out. From concept to final delivery, every shoot is designed to capture attention, elevate your image, and communicate your story with precision.', fr: "Une photographie de haute qualité conçue pour les marques qui veulent se démarquer. Du concept à la livraison finale, chaque séance est pensée pour capter l'attention, valoriser votre image et communiquer votre histoire avec précision." },
    'srv.photo.f1': { en: 'Product &amp; campaign photography',    fr: 'Photographie de produit &amp; campagne' },
    'srv.photo.f2': { en: 'Corporate &amp; headshot sessions',     fr: 'Séances corporate &amp; portraits professionnels' },
    'srv.photo.f3': { en: 'Lifestyle &amp; editorial shoots',      fr: 'Séances lifestyle &amp; éditoriales' },
    'srv.photo.f4': { en: 'Architecture &amp; interiors',          fr: 'Architecture &amp; intérieurs' },
    'srv.photo.f5': { en: 'Full retouching &amp; color grading',   fr: 'Retouche complète &amp; étalonnage colorimétrique' },

    'srv.video.tag':   { en: 'Video Production', fr: 'Production Vidéo' },
    'srv.video.title': { en: 'Cinematic Video <em>&amp; Film</em>', fr: 'Vidéo <em>&amp; Film</em> Cinématique' },
    'srv.video.desc':  { en: 'Cinematic video production built to engage, convert, and tell powerful stories. We handle every stage of the process from idea to final delivery with a strong focus on visual impact and storytelling.', fr: "Une production vidéo cinématique conçue pour engager, convertir et raconter des histoires puissantes. Nous gérons chaque étape du processus de l'idée à la livraison finale avec un fort accent sur l'impact visuel et la narration." },
    'srv.video.f1': { en: 'Brand films &amp; commercials',        fr: 'Films de marque &amp; publicités' },
    'srv.video.f2': { en: 'Social media content packages',        fr: 'Packs de contenu pour réseaux sociaux' },
    'srv.video.f3': { en: 'Event &amp; documentary coverage',     fr: 'Couverture événementielle &amp; documentaire' },
    'srv.video.f4': { en: 'Motion graphics &amp; animation',      fr: 'Motion design &amp; animation' },
    'srv.video.f5': { en: 'Color grading &amp; sound design',     fr: 'Étalonnage colorimétrique &amp; sound design' },

    'srv.testi.label': { en: 'Proof of Work',                     fr: 'Preuves de Travail' },
    'srv.testi.title': { en: 'Trusted by <em>Great Brands</em>',  fr: 'La Confiance des <em>Grandes Marques</em>' },

    'srv.cta.title': { en: "Let's Build Something <em>Extraordinary</em>", fr: "Créons Quelque Chose <em>d'Extraordinaire</em>" },
    'srv.cta.sub':   { en: "Schedule a free discovery call and let's explore what's possible.", fr: 'Planifiez un appel découverte gratuit et explorons ce qui est possible.' },
    'srv.cta.btn':   { en: 'Book Your Discovery Call', fr: 'Réserver Votre Appel Découverte' },

    'contact.label':       { en: 'Get In Touch',   fr: 'Contactez-Nous' },
    'contact.title':       { en: "Let's Work<br><em>Together</em>", fr: 'Travaillons<br><em>Ensemble</em>' },
    'contact.subtitle':    { en: "Ready to bring your vision to life? Reach out directly — we'd love to hear about your project.", fr: "Prêts à donner vie à votre vision ? Contactez-nous directement — nous serions ravis d'entendre parler de votre projet." },
    'contact.loc.label':   { en: 'Location',   fr: 'Localisation' },
    'contact.loc.value':   { en: 'Sousse, Tunisia', fr: 'Sousse, Tunisie' },
    'contact.email.label': { en: 'Email',      fr: 'E-mail' },
    'contact.phone.label': { en: 'Phone',      fr: 'Téléphone' },
    'contact.follow':      { en: 'Follow us',  fr: 'Suivez-nous' },
  };

  function detectLang() {
    const saved = localStorage.getItem('tv_lang');
    if (saved === 'en' || saved === 'fr') return saved;
    const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return browser.startsWith('fr') ? 'fr' : 'en';
  }

  let currentLang = detectLang();

  function apply(lang) {
    currentLang = lang;
    localStorage.setItem('tv_lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.dataset.i18n;
      if (!T[key]) return;
      var val = T[key][lang];
      if (val === undefined) return;
      if (el.dataset.i18nAttr) {
        el.setAttribute(el.dataset.i18nAttr, val);
      } else {
        el.innerHTML = val;
      }
    });
    document.querySelectorAll('.lang-toggle').forEach(function(btn) {
      btn.querySelectorAll('[data-lang]').forEach(function(opt) {
        opt.classList.toggle('active', opt.dataset.lang === lang);
      });
    });
  }

  return {
    apply:   apply,
    toggle:  function() { apply(currentLang === 'en' ? 'fr' : 'en'); },
    get:     function(key) { return T[key] ? (T[key][currentLang] || T[key]['en']) : key; },
    current: function() { return currentLang; },
    init:    function() { apply(currentLang); },
  };

})();
