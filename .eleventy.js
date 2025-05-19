const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Add syntax highlighting plugin
    eleventyConfig.addPlugin(syntaxHighlight);
    
    // Ignore blog-related files
    eleventyConfig.ignores.add("src/blog/**");
    eleventyConfig.ignores.add("src/blog.html");
    
    // Copy asset directories to the output
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    
    // Date filters
    eleventyConfig.addFilter("dateIso", date => {
        return date.toISOString();
    });
    
    eleventyConfig.addFilter("dateReadable", date => {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    });
    
    eleventyConfig.addFilter("dateString", date => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        });
    });
      // Custom shortcode for responsive images
    eleventyConfig.addShortcode("image", function(src, alt, className) {
        return `<img src="${src}" alt="${alt}" class="${className || ''}" loading="lazy">`;
    });
      // Add a truncate filter
    eleventyConfig.addFilter("truncate", function(text, length) {
        if (!text || !length) return text;
        if (text.length <= length) return text;
        return text.substr(0, length) + "...";
    });
    
    // Add a stripTags filter
    eleventyConfig.addFilter("striptags", function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    });    // Return your configuration object
    return {
        // Directory structure
        dir: {
            input: "src",         // Input directory (src folder)
            output: "_site",      // Output directory
            includes: "_includes", // Where your includes/partials are stored
            layouts: "_includes/layouts",
            data: "_data"
        },
        templateFormats: ["html", "njk", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        pathPrefix: "/"
    };
};
