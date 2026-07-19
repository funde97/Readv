# 📖 Readers Log — World of Friction

## How Reader Names Are Collected

When someone visits your site for the first time, they enter their name in the welcome modal.
That name is sent to **your email** via [Web3Forms](https://web3forms.com) — a free service, no account needed.

---

## 🔧 One-Time Setup (1 minute)

1. Open `assets/js/app.js` and find the `sendReaderName` function (search for `ACCESS_KEY`).
2. Go to [web3forms.com](https://web3forms.com), type your email, and click "Create Access Key."
3. Copy the key it gives you (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
4. Paste it in place of the existing value:
   ```js
   const ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
   ```
5. Save the file and push to GitHub. **No verification email needed** — Web3Forms
   emails you instantly from the very first submission.

**This project already has a key configured.** If you forked/copied this repo,
the reader-name emails are going to whoever set that key up — replace it with
your own key using the steps above so they come to you instead.

---

## 📬 Reading Your Reader List

Every new reader → you get an email like this:
```
Subject: 📖 New Reader — World of Friction
From: Web3Forms

reader_name: Priya Sharma
visited_at: 6/4/2024, 10:32:15 AM
device: Mozilla/5.0 ...
```

To keep a running list, create a Gmail label "Friction Readers" and set a filter:
- From: `noreply@web3forms.com`
- Subject contains: `New Reader — World of Friction`
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
