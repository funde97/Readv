# 📖 Readers Log — World of Friction

## How Reader Names Are Collected

When someone visits your site for the first time, they enter their name in the welcome modal.  
That name is sent to **your email** via [FormSubmit.co](https://formsubmit.co) — a free service, no account needed.

---

## 🔧 One-Time Setup (5 minutes)

1. Open `assets/js/app.js`
2. Find this line near the top of the `sendReaderName` function:
   ```
   const EMAIL = 'YOUR_EMAIL_HERE';
   ```
3. Replace `YOUR_EMAIL_HERE` with your actual email address:
   ```
   const EMAIL = 'yourname@gmail.com';
   ```
4. Save the file and push to GitHub.

**First submission:** The very first time someone submits their name, FormSubmit will send YOU a verification email. Click the link to activate. After that, every new reader sends you an email automatically.

---

## 📬 Reading Your Reader List

Every new reader → you get an email like this:
```
Subject: 📖 New Reader on World of Friction
From: noreply@formsubmit.co

reader_name: Priya Sharma
visited_at: 6/4/2024, 10:32:15 AM
```

To keep a running list, create a Gmail label "Friction Readers" and set a filter:
- From: `formsubmit.co`
- Subject contains: `New Reader on World of Friction`
- Apply label: Friction Readers

---

## 📝 Manual Log (Optional)

You can also maintain a manual list here in this file.

| Name | Date First Visited | Notes |
|------|-------------------|-------|
| _(add names here as you receive emails)_ | | |

---

## Privacy Note

- Reader names are stored only on their own device (localStorage) and in your email.
- No database, no third-party tracking beyond the one email notification.
- If someone skips the name prompt, they're recorded as "Anonymous Reader."
- Each device only sends the name ONCE (tracked in localStorage).
