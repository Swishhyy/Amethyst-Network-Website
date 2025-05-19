# Amethyst Network Website

A modern website for the Amethyst Network Minecraft server built with Eleventy.

## Features

- Static site generation with Eleventy
- Responsive design with custom CSS
- Dark amethyst-themed interface
- Blog/news functionality with collections and tags
- Interactive server features (map, status, screenshots)

## Development

### Requirements

- Node.js (v14 or later)
- npm (v6 or later)

### Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run development server:
   ```bash
   npm start
   ```
   
The site will be available at http://localhost:8080/

### Build for Production

```bash
npm run build
```

The built site will be in the `_site` directory.

## Project Structure

```
amethyst-network-website/
├── .eleventy.js            # Eleventy configuration
├── build.ps1               # Build script
├── cleanup.ps1             # Cleanup script
├── package.json            # Project dependencies
├── netlify.toml            # Netlify deployment config
└── src/                    # Source files
    ├── _data/              # Global data files
    │   └── site.js         # Site configuration
    ├── _includes/          # Template includes
    │   ├── layouts/        # Page layouts
    │   │   ├── base.njk    # Base layout template
    │   │   └── post.njk    # Post layout template
    │   └── partials/       # Reusable components
    │       ├── footer.njk  # Site footer
    │       ├── head.njk    # Document head
    │       ├── header.njk  # Site header
    │       └── scripts.njk # JavaScript includes
    ├── assets/             # Static assets
    │   ├── css/            # CSS stylesheets
    │   ├── images/         # Image files
    │   └── js/             # JavaScript files
    ├── blog/               # Blog post content (markdown)
    │   ├── welcome-post.md # Example blog post
    │   └── eleventy-tutorial.md # Example tutorial post
    ├── index.html          # Home page
    ├── about.html          # About page
    ├── blog.html           # Blog listing page
    ├── server-map.html     # Interactive server map
    ├── screenshots.html    # Server screenshots gallery
    └── 404.html            # Error page
```

## Configuration

Site configuration is managed in `src/_data/site.js`. Update this file to change:

- Server IP
- Discord link
- Site name and description
- Other global settings

The Eleventy configuration is in `.eleventy.js` in the project root.

## Deployment

The site is built for deployment on Netlify. The configuration is in `netlify.toml`.

## License

Copyright (c) 2025 Amethyst Network. All rights reserved.
