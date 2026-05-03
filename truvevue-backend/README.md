# TrueVue Studio — Backend

Full backend for TrueVue Studio: admin panel, contact form API, email notifications, and site content management.

---

## 🚀 Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env

# 3. Start the server
npm start
# Admin panel: http://localhost:3001/admin
# Default login: admin / admin123
```

---

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Create an App Password for "Mail"
4. Set in `.env`:
   ```
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx   ← the 16-char app password
   NOTIFY_EMAIL=Contact@truevuestudio.com
   ```

---

## 🌐 Deploy to Railway (Free)

1. Push this folder to a GitHub repo
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Select this repo
4. Add environment variables from `.env.example` in Railway's Variables tab
5. Deploy! Railway gives you a URL like `https://truvevue-backend.up.railway.app`

---

## 🔗 Connect Frontend

In `Contact.html`, update this line:
```js
const BACKEND_URL = 'https://your-backend.railway.app';
```

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | — | Admin login |
| GET | /api/auth/me | ✓ | Verify token |
| POST | /api/auth/change-password | ✓ | Change password |
| POST | /api/contact | — | Submit contact form |
| GET | /api/contact | ✓ | List all inquiries |
| PUT | /api/contact/:id/read | ✓ | Mark as read |
| DELETE | /api/contact/:id | ✓ | Delete inquiry |
| GET | /api/content | — | Get site content |
| PUT | /api/content | ✓ | Update site content |
| GET | /api/content/testimonials | — | Get testimonials |
| PUT | /api/content/testimonials | ✓ | Update testimonials |
| POST | /api/upload | ✓ | Upload image |

---

## 📁 File Structure

```
truvevue-backend/
├── index.js              # Main server
├── .env.example          # Environment variables template
├── db/
│   └── database.js       # DB init (lowdb / JSON)
├── data/
│   └── db.json           # Auto-created database file
├── middleware/
│   └── auth.js           # JWT middleware
├── routes/
│   ├── auth.js           # Login / password
│   ├── contact.js        # Contact form + email
│   ├── content.js        # Site content CRUD
│   └── upload.js         # Image uploads
├── uploads/              # Uploaded images
└── public/
    └── admin/
        └── index.html    # Admin panel UI
```
