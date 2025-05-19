---
layout: post.njk
title: Getting Started with Eleventy
date: 2025-05-19
permalink: /blog/eleventy-tutorial/index.html
tags:
  - post
  - tutorial
  - eleventy
---

# Getting Started with Eleventy

In this post, we'll look at how to set up a basic Eleventy site like the one we're using for the Amethyst Network website.

## Installation

First, you'll need to install Eleventy as a development dependency:

```bash
npm install --save-dev @11ty/eleventy
```

## Basic Configuration

Create an `.eleventy.js` file in the root of your project:

```javascript
module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};
```

## Creating Templates

Eleventy supports multiple template languages. Here's an example using Nunjucks (with a .njk extension):

```html
---
layout: base.njk
title: My First Page
---

<h1>{{ title }}</h1>
<p>Welcome to my Eleventy site!</p>
```

## Running the Development Server

To start the development server, add this to your `package.json`:

```json
{
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  }
}
```

Then run:

```bash
npm start
```

## Conclusion

Eleventy is a powerful static site generator that makes it easy to build fast, simple websites. Its flexibility with templates and data makes it a great choice for projects of any size.
