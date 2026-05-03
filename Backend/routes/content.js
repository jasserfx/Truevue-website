import express from 'express';
import { getDB } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/content — public, returns all site content
router.get('/', async (req, res) => {
  const db = getDB();
  await db.read();
  res.json(db.data.content);
});

// PUT /api/content — update content fields (admin only)
router.put('/', authenticate, async (req, res) => {
  const db = getDB();
  await db.read();

  const allowed = [
    'hero_title','hero_subtitle','hero_cta_text','hero_cta_link','hero_image',
    'about_title','about_text','about_image',
    'services',
    'contact_title','contact_subtitle','contact_email','contact_phone','contact_address',
    'footer_text',
    'social_instagram','social_facebook','social_twitter','social_linkedin',
    'site_name','meta_description'
  ];

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      db.data.content[key] = req.body[key];
    }
  }

  await db.write();
  res.json({ success: true, content: db.data.content });
});

// GET /api/content/testimonials — public
router.get('/testimonials', async (req, res) => {
  const db = getDB();
  await db.read();
  res.json(db.data.content.testimonials || []);
});

// PUT /api/content/testimonials (admin)
router.put('/testimonials', authenticate, async (req, res) => {
  const { testimonials } = req.body;
  if (!Array.isArray(testimonials)) {
    return res.status(400).json({ error: 'testimonials must be an array.' });
  }
  const db = getDB();
  await db.read();
  db.data.content.testimonials = testimonials;
  await db.write();
  res.json({ success: true });
});

export default router;
