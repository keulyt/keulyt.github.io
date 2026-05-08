# Portfolio — Static Site

A modern, dark-themed personal portfolio.

---

## File Structure

```
portfolio/
├── index.html           ← ALL static content hardcoded here (header, hero, about, contact, footer)
├── styles.css           ← All visual styling (colors, layout, animations)
├── app.js               ← Loads JSON for dynamic sections, handles UI interactions
├── skills.json          ← Skill categories with progress bar values
├── projects.json        ← Project cards with features, tech tags, dual-image hover swap
├── testimonials.json    ← Client testimonial cards in a carousel slider
├── assets/
│   └── keuly.png      ← Your headshot photo
└── README.md            ← This file
```

---

## How to Edit Content

### Static Content (Header, Hero, About, Contact, Footer)
**Edit `index.html` directly.** All text, links, and images for these sections are hardcoded in the HTML.

### Dynamic Content (Skills, Projects, Testimonials)
**Edit the JSON files:**

| File | What it controls |
|------|-----------------|
| `skills.json` | Skill categories, names, and progress bar percentages |
| `projects.json` | Project cards — title, description, features, tech tags, images, links |
| `testimonials.json` | Testimonial carousel slides — quotes, names, roles |

### Styles & Colors
**Edit `styles.css`** — CSS custom properties at the top (`:root`) control all theme colors.

---


##  Editing Projects

Each project in `projects.json` has this structure:

```json
{
  "title": "Project Name",
  "description": "Short description of the project.",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  "image": "https://...",
  "imageHover": "https://...",
  "tech": ["Tag1", "Tag2", "Tag3"],
  "links": [{ "label": "GitHub", "url": "https://github.com/..." }]
}
```

- `image` / `imageHover`: URLs for the default and hover images (swap effect)
- `features`: Bullet points under "Special Features"
- `tech`: Technology tags displayed as pills
- `links`: Action buttons at the bottom of each card

