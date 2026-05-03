import express from 'express';
import nodemailer from 'nodemailer';
import { getDB } from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// POST /api/contact
router.post('/', async (req, res) => {
  const { firstName, lastName, email, phone, company, project, companySize } = req.body;
  if (!firstName || !lastName || !email || !company || !project) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  const submission = {
    id: Date.now().toString(),
    firstName, lastName, email,
    phone: phone || '—',
    company, project,
    companySize: companySize || '—',
    submittedAt: new Date().toISOString(),
    read: false,
  };
  const db = getDB();
  await db.read();
  db.data.contacts.push(submission);
  await db.write();
  sendEmails(submission).catch(err => console.error('Email error:', err));
  res.json({ success: true, message: 'Your project brief has been received!' });
});

async function sendEmails(s) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured — skipping email');
    return;
  }
  const transporter = createTransporter();
  const toEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"TrueVue Studio" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `New Project Brief — ${s.firstName} ${s.lastName} (${s.company})`,
    replyTo: s.email,
    html: `<div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0f1210;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0d0f1a,#1a1d2e);padding:40px;text-align:center;">
        <h1 style="margin:0;font-size:26px;font-weight:300;color:#fff;">New Project Brief</h1>
        <p style="color:#5863f8;margin:8px 0 0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">TrueVue Studio</p>
      </div>
      <div style="padding:40px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em;width:130px">Name</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${s.firstName} ${s.lastName}</td></tr>
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em">Email</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${s.email}</td></tr>
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em">Phone</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${s.phone}</td></tr>
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em">Company</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${s.company}</td></tr>
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em">Size</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${s.companySize}</td></tr>
          <tr><td style="padding:9px 0;font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:.1em">Date</td><td style="padding:9px 0;font-size:14px;color:rgba(255,255,255,0.8)">${new Date(s.submittedAt).toLocaleString('en-GB')}</td></tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:rgba(88,99,248,0.08);border:1px solid rgba(88,99,248,0.2);border-radius:10px;">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Project</p>
          <p style="margin:0;font-size:15px;font-weight:300;line-height:1.7;color:rgba(255,255,255,0.8)">${s.project.replace(/\n/g,'<br>')}</p>
        </div>
      </div>
      <div style="padding:20px 40px;background:rgba(0,0,0,0.3);text-align:center;">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3)">Reply directly to reach ${s.firstName}</p>
      </div>
    </div>`,
  });

  await transporter.sendMail({
    from: `"TrueVue Studio" <${process.env.SMTP_USER}>`,
    to: s.email,
    subject: `We received your brief — TrueVue Studio`,
    html: `<div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0f1210;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0d0f1a,#1a1d2e);padding:40px;text-align:center;">
        <h1 style="margin:0;font-size:26px;font-weight:300;color:#fff;">Brief Received.</h1>
        <p style="color:#5863f8;margin:8px 0 0;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">TrueVue Studio</p>
      </div>
      <div style="padding:40px;">
        <p style="font-size:16px;font-weight:300;line-height:1.7;color:rgba(255,255,255,0.75)">Hi ${s.firstName},</p>
        <p style="font-size:15px;font-weight:300;line-height:1.7;color:rgba(255,255,255,0.6)">Thank you for reaching out! We've received your project brief and will get back to you within 24 hours on business days to schedule a discovery call.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="https://www.instagram.com/truevuestudio/" style="display:inline-block;background:#5863f8;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:13px;font-weight:500;letter-spacing:.1em">Follow @truevuestudio</a>
        </div>
      </div>
      <div style="padding:20px 40px;background:rgba(0,0,0,0.3);text-align:center;">
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3)">TrueVue Studio · Sousse, Tunisia</p>
      </div>
    </div>`,
  });
}

// GET /api/contact (admin)
router.get('/', authenticate, async (req, res) => {
  const db = getDB();
  await db.read();
  const contacts = [...db.data.contacts].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  res.json(contacts);
});

// PUT /api/contact/:id/read (admin)
router.put('/:id/read', authenticate, async (req, res) => {
  const db = getDB();
  await db.read();
  const c = db.data.contacts.find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found.' });
  c.read = true;
  await db.write();
  res.json({ success: true });
});

// DELETE /api/contact/:id (admin)
router.delete('/:id', authenticate, async (req, res) => {
  const db = getDB();
  await db.read();
  const idx = db.data.contacts.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found.' });
  db.data.contacts.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

export default router;
