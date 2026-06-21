export const siteConfig = {
  name: "Font Face Generator",
  title: "Font Face Generator — @font-face CSS Code Builder",
  description:
    "Generate @font-face CSS declarations for custom web fonts instantly. Set font family, weights, styles, font-display, and file URLs — copy production-ready code in seconds.",
  url: "https://font-face-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  headerIcon: "Type",
  brandAccentColor: "#a855f7",

  keywords: [
    "font face generator",
    "@font-face generator",
    "custom web font css",
    "font face css code",
    "web font generator",
    "font-display swap",
    "woff2 font face",
    "embed custom font css",
    "font-face declaration builder",
    "css font embedding tool",
  ],
  applicationCategory: "DeveloperApplication",

  themeColor: "#7c3aed",

  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/font-face-generator",
    website: "https://jagodana.com",
  },

  footer: {
    about:
      "Font Face Generator helps developers embed custom web fonts with clean, optimised @font-face CSS. No uploads, no signup — 100% client-side.",
    featuresTitle: "Features",
    features: [
      "Multi-weight font support",
      "Auto format detection",
      "font-display control",
      "One-click copy",
    ],
  },

  hero: {
    badge: "Free Developer Tool",
    titleLine1: "Generate",
    titleGradient: "@font-face CSS Instantly",
    subtitle:
      "Build production-ready @font-face declarations for any custom web font. Set family name, weights, styles, file URLs, and font-display — get clean CSS in seconds.",
  },

  featureCards: [
    {
      icon: "🔤",
      title: "Multi-Weight Support",
      description:
        "Add as many font weight and style variants as you need — thin, regular, bold, italic — all in one click.",
    },
    {
      icon: "⚡",
      title: "Auto Format Detection",
      description:
        "Paste any font URL (.woff2, .woff, .ttf, .otf) and the correct format() hint is added automatically.",
    },
    {
      icon: "📋",
      title: "Copy-Ready Output",
      description:
        "Get clean, properly indented @font-face CSS that you can paste directly into your stylesheet.",
    },
  ],

  relatedTools: [
    {
      name: "CSS Variables Generator",
      url: "https://css-variables-generator.tools.jagodana.com",
      icon: "🎨",
      description: "Generate CSS custom property declarations.",
    },
    {
      name: "CSS Unit Converter",
      url: "https://css-unit-converter.tools.jagodana.com",
      icon: "📐",
      description: "Convert px, rem, em, vw and other CSS units instantly.",
    },
    {
      name: "Google Fonts",
      url: "https://fluid-type-scale.tools.jagodana.com",
      icon: "🔡",
      description: "Generate fluid type scales for responsive typography.",
    },
    {
      name: "Color Palette Generator",
      url: "https://color-palette-generator.tools.jagodana.com",
      icon: "🎭",
      description: "Generate beautiful colour palettes in one click.",
    },
    {
      name: "CSS Gradient Generator",
      url: "https://css-gradient-generator.tools.jagodana.com",
      icon: "🌈",
      description: "Build CSS linear, radial, and conic gradients visually.",
    },
    {
      name: "Favicon Generator",
      url: "https://favicon-generator.tools.jagodana.com",
      icon: "🖼️",
      description: "Generate all favicon sizes from any image.",
    },
  ],

  howToSteps: [
    {
      name: "Enter Font Family Name",
      text: "Type your font family name — this will be used in the font-family property in your CSS.",
      url: "",
    },
    {
      name: "Add Font Variants",
      text: "Click 'Add Variant' to add each weight and style (e.g. 400 normal, 700 bold, 400 italic). Paste the font file URL for each variant.",
      url: "",
    },
    {
      name: "Copy the CSS",
      text: "Click 'Copy CSS' to copy the generated @font-face declarations. Paste them at the top of your stylesheet before any rules that use the font.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  faq: [
    {
      question: "What is @font-face in CSS?",
      answer:
        "@font-face is a CSS rule that lets you load a custom font from a file URL rather than relying on system fonts. You specify the font-family name, the file src (one or more URLs), and optionally the font-weight, font-style, and font-display. Once defined, you use the family name anywhere in your CSS like any other font.",
    },
    {
      question: "Which font format should I use — woff2 or woff?",
      answer:
        "Use woff2 as your primary format. It has the best compression and is supported by all modern browsers. Woff is a good fallback for older browsers (IE 11). TTF and OTF are rarely needed on the web today. If you're self-hosting, serve woff2 first, woff second.",
    },
    {
      question: "What does font-display: swap do?",
      answer:
        "font-display: swap tells the browser to show a fallback system font immediately while the custom font loads, then swap it in once downloaded. This prevents invisible text during page load (FOIT) and is recommended for most body text. Use 'optional' for decorative fonts where a fallback is acceptable permanently.",
    },
    {
      question: "Can I add multiple font weights in one @font-face block?",
      answer:
        "No — each @font-face block defines exactly one weight and style combination. For a full type system you need separate blocks for each variant (400 normal, 700 normal, 400 italic, etc.). This generator handles that automatically — just click 'Add Variant' for each combination you need.",
    },
    {
      question: "Do I need to upload my font file to use this tool?",
      answer:
        "No. This is a 100% client-side tool — nothing is uploaded to any server. You provide the URL where your font file is hosted (your CDN, GitHub, Google Fonts CDN, etc.), and the generator builds the @font-face CSS for you.",
    },
  ],

  pages: {
    "/": {
      title: "Font Face Generator — @font-face CSS Code Builder",
      description:
        "Generate @font-face CSS declarations for custom web fonts instantly. Set font family, weights, styles, font-display, and file URLs — copy production-ready code in seconds.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
