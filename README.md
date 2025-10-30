# Baha Eddine Ammar — Personal Website

This is a fast, responsive portfolio site built with vanilla HTML/CSS/JS for easy hosting anywhere (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.).

## Getting Started

1. Place your portrait image at `assets/profile.jpg` (create the `assets` folder if it doesn't exist). Use the photo you shared.
2. Open `index.html` in your browser.
3. Edit contact links in the `#contact` section (GitHub/LinkedIn/Resume/Email).

## Development

No build step required. You can use a simple local server for nicer caching:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Deploy

- GitHub Pages: push to a public repo and enable Pages.
- Netlify/Vercel: drag-and-drop the folder or connect the repo.
- Firebase Hosting: `firebase init` then `firebase deploy`.

## Customize

- Colors and spacing: edit CSS variables at the top of `styles.css`.
- Social links and email: update the `#contact` section in `index.html`.
- Favicon: add a `favicon.ico` at the project root.


