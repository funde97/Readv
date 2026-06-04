# 🌑 World of Friction — Story Website

A dark, literary website to host your original stories. Built for GitHub Pages.

---

## 🚀 DEPLOY TO GITHUB — Step by Step

### Prerequisites
- A free [GitHub account](https://github.com)
- [Git](https://git-scm.com/downloads) installed on your computer
- OR you can use the GitHub website to upload files directly (no Git needed)

---

### METHOD A — Using GitHub Desktop (Easiest, no command line)

1. **Download [GitHub Desktop](https://desktop.github.com)** and install it.

2. **Create a new repository on GitHub.com:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `friction-stories` (or any name you like)
   - Keep it **Public**
   - Click **Create repository**

3. **Clone it using GitHub Desktop:**
   - Open GitHub Desktop → File → Clone Repository
   - Find your new repo and clone it to your computer

4. **Copy all the files** from this folder into the cloned folder.

5. **Commit and push:**
   - GitHub Desktop will show all the new files
   - Type a message like "Initial upload" in the Summary box
   - Click **Commit to main**
   - Click **Push origin**

6. **Enable GitHub Pages:**
   - Go to your repo on github.com
   - Click **Settings** (top tab)
   - Scroll down to **Pages** (left sidebar)
   - Under "Source" select **Deploy from a branch**
   - Branch: `main` / folder: `/ (root)`
   - Click **Save**

7. **Wait 2–3 minutes**, then visit:
   `https://YOUR-USERNAME.github.io/friction-stories/`

   ✅ Your site is live!

---

### METHOD B — Upload Files Directly on GitHub.com (No software needed)

1. **Create a repository** at [github.com/new](https://github.com/new)
   - Name: `friction-stories`
   - Public ✓ → **Create repository**

2. **Upload files:**
   - On the repo page, click **Add file → Upload files**
   - Drag ALL the files and folders from this package into the upload area
   - ⚠️ Important: GitHub's drag-and-drop uploader works best folder by folder.
     Upload in this order:
     1. Drag the `assets/` folder
     2. Drag the `stories/` folder
     3. Drag `index.html`, `readers.md`, `README.md`
   - Click **Commit changes**

3. **Enable GitHub Pages** (same as Step 6 above)

---

### METHOD C — Git Command Line

```bash
# 1. Create repo on github.com first, then:
cd /path/to/friction-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/friction-stories.git
git push -u origin main
```
Then enable GitHub Pages in Settings.

---

## ✏️ CUSTOMIZING YOUR SITE

### Add Your Email (for reader tracking)
Open `assets/js/app.js` and find:
```javascript
const EMAIL = 'YOUR_EMAIL_HERE';
```
Replace with your real email. See `readers.md` for full instructions.

### Edit Story Titles & Descriptions
Open `index.html` and look for `✏️ EDIT` comments — they mark every place to customize.

### Add a Story Cover Image
1. Save your image as `assets/images/cover-story1.jpg`
2. Push to GitHub — it appears automatically on the homepage.

### Add a Chapter
1. Copy `stories/story1/chapters/CHAPTER-TEMPLATE.html`
2. Rename to `chapter-02.html`
3. Edit the title and paste your content
4. In `stories/story1/index.html`, add a new `<a class="chapter-entry">` block (see the instruction comment inside that file)
5. Push to GitHub

---

## 📁 FILE STRUCTURE

```
friction-site/
├── index.html                    ← Homepage (splash + books)
├── readers.md                    ← Reader tracking instructions
├── assets/
│   ├── css/style.css             ← All visual styling
│   ├── js/app.js                 ← All JavaScript
│   └── images/                   ← Put ALL images here
│       ├── cover-story1.jpg      ← Homepage book cover (story 1)
│       ├── cover-story2.jpg      ← Homepage book cover (story 2)
│       ├── banner-story1.jpg     ← Story 1 hero banner (wide)
│       ├── banner-story2.jpg     ← Story 2 hero banner (wide)
│       ├── thumb-s1-ch01.jpg     ← Chapter 1 thumbnail (story 1)
│       ├── chapter-s1-ch01.jpg   ← Chapter 1 cover image (story 1)
│       └── ...                   ← Add more following same pattern
├── stories/
│   ├── story1/
│   │   ├── index.html            ← Story 1 chapter list
│   │   └── chapters/
│   │       ├── chapter-01.html   ← Chapter 1 (edit this)
│   │       ├── chapter-02.html   ← Chapter 2 (copy from TEMPLATE)
│   │       └── CHAPTER-TEMPLATE.html  ← Copy this for new chapters
│   └── story2/
│       └── (same structure)
```

---

## 🔄 ADDING A NEW CHAPTER (Quick Reference)

1. Copy `CHAPTER-TEMPLATE.html` → rename to `chapter-0X.html`
2. Edit: title, story name, content, and the `initChapterPage({...})` config at the bottom
3. In story's `index.html`, add a new `<a class="chapter-entry" data-chapter="X">` block
4. In the PREVIOUS chapter's `initChapterPage`, change `nextUrl: null` to `nextUrl: 'chapter-0X.html'`
5. Push to GitHub ✓

---

## 🆘 TROUBLESHOOTING

**Site shows "404 Not Found"**
→ Make sure GitHub Pages is enabled and pointing to the `main` branch, root folder.

**Images not showing**
→ File names are case-sensitive on GitHub. `Cover-Story1.jpg` ≠ `cover-story1.jpg`

**Reader names not arriving by email**
→ Make sure you replaced `YOUR_EMAIL_HERE` in `app.js` and verified your email with FormSubmit.

**Changes not showing on live site**
→ GitHub Pages can take 2–5 minutes to update after a push. Try a hard refresh (Ctrl+Shift+R).
