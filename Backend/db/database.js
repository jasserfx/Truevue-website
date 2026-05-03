import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/db.json');

const defaultData = {
  admin: { username: 'admin', passwordHash: '' },
  contacts: [],
  content: {
    hero_eyebrow: 'Visual Storytelling Studio',
    hero_title_line1: 'TrueVue',
    hero_title_line2: 'the Correct',
    hero_title_line3: 'View.',
    hero_subtitle: 'We craft cinematic visuals that transform brands into experiences - photography and video that make the world stop and stare.',
    hero_cta_primary_text: 'Start a Project',
    hero_cta_secondary_text: 'Our Services',
    about_story_title: 'Who We Are',
    about_story_body: 'TrueVue Studio is a full-service visual production studio dedicated to delivering high-quality audiovisual and photographic content. We bring together creative direction, technical expertise, and a deep understanding of visual communication to craft impactful visuals that elevate brands, businesses, and personal projects.',
    about_story_body2: 'With a comprehensive approach to content creation, we handle every stage of production from concept development to final delivery ensuring consistency, precision, and excellence in every project.',
    about_practice_title: 'What We Do',
    about_practice_body: 'At TrueVue Studio, we provide end-to-end visual production services tailored to meet a wide range of client needs.',
    about_practice_body2: 'In addition, we offer comprehensive coverage for events of all kinds, alongside the creation of tailored visual content for businesses, products, real estate, hospitality, and more.',
    services_hero_title: 'Crafting the Perfect Frame, Every Time.',
    service_photo_tag: 'Photography',
    service_photo_title: 'Commercial & Brand Photography',
    service_photo_desc: 'High-end photography that transforms your products, people, and spaces into magnetic visual assets.',
    service_photo_features: 'Product & campaign photography\nCorporate and headshot sessions\nLifestyle and editorial shoots\nArchitecture & interiors\nFull retouching & color grading',
    service_video_tag: 'Video Production',
    service_video_title: 'Cinematic Video & Film',
    service_video_desc: 'From brand films to social reels, we produce video that moves people.',
    service_video_features: 'Brand films & commercials\nSocial media content packages\nEvent & documentary coverage\nMotion graphics & animation\nColor grading & sound design',
    service_content_tag: 'Content Strategy',
    service_content_title: 'Social & Digital Content',
    service_content_desc: 'Consistent, scroll-stopping content built for your platforms.',
    service_content_features: 'Monthly content retainers\nPlatform-specific formatting\nContent calendar planning\nStories, reels & short-form video\nPerformance analysis',
    contact_location: 'Sousse, Tunisia',
    contact_email: 'Contact@truevuestudio.com',
    contact_phone: '+216 94 644 226',
    contact_instagram_handle: '@truevuestudio',
    contact_instagram_url: 'https://www.instagram.com/truevuestudio/',
    footer_tagline: 'Cinematic visuals for brands that refuse to be ordinary.',
    social_linkedin: 'https://www.linkedin.com/company/truevue-studio/',
    social_instagram: 'https://www.instagram.com/truevuestudio/',
    social_facebook: 'https://www.facebook.com/TrueVueStudio',
    cta_home_title: "Ready to Create Something Unforgettable?",
    cta_home_subtitle: "Tell us about your project and let's bring your vision to life.",
    cta_services_title: "Let's Build Something Extraordinary",
    cta_services_subtitle: 'Schedule a free discovery call and let\'s explore what\'s possible.',
  },
  testimonials: [
    { id: 1, stars: 5, text: 'TrueVue completely transformed how we present our brand.', initials: 'S', avatar: '', name: 'Sarah M.', role: 'Marketing Director, Lumière Co.' },
    { id: 2, stars: 5, text: 'Working with TrueVue was seamless from brief to delivery.', initials: 'K', avatar: '', name: 'Karim B.', role: 'Founder, Noura Hospitality' },
    { id: 3, stars: 5, text: "The cinematic quality of our launch film set us apart.", initials: 'L', avatar: '', name: 'Leila H.', role: 'CEO, Atlas Tech' },
    { id: 4, stars: 5, text: 'Our product photography went from generic to gallery-worthy.', initials: 'A', avatar: '', name: 'Amine T.', role: 'Creative Lead, Saffron Collective' },
    { id: 5, stars: 5, text: 'The video series generated over 2 million organic views.', initials: 'R', avatar: '', name: 'Rania K.', role: 'Brand Manager, Vivace Foods' },
    { id: 6, stars: 5, text: 'Our e-commerce conversion rate jumped 40%.', initials: 'O', avatar: '', name: 'Omar F.', role: 'Founder, Maison Olive' }
  ]
};

let db;

export async function initDB() {
  mkdirSync(path.join(__dirname, '../data'), { recursive: true });
  const adapter = new JSONFile(dbPath);
  db = new Low(adapter, defaultData);
  await db.read();
  if (!db.data.admin) db.data.admin = defaultData.admin;
  if (!db.data.contacts) db.data.contacts = [];
  if (!db.data.testimonials) db.data.testimonials = defaultData.testimonials;
  if (!db.data.content) db.data.content = defaultData.content;
  else { for (const [k,v] of Object.entries(defaultData.content)) { if (db.data.content[k] === undefined) db.data.content[k] = v; } }
  if (!db.data.admin.passwordHash) {
    const pw = process.env.ADMIN_PASSWORD || 'admin123';
    db.data.admin.passwordHash = await bcrypt.hash(pw, 12);
  }
  await db.write();
  console.log('💾 Database ready');
  return db;
}

export function getDB() { return db; }
