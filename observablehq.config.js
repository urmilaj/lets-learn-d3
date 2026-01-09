// See https://observablehq.com/framework/config for documentation.
export default {
  title: "Lets learn D3",
  pages: [
    {
      name: "Session 1: Web development basics",
      pages: [
        { name: "Initial setup", path: "/initial-setup" },
        { name: "Basic HTML", path: "/basic-html" },
        { name: "Basic CSS", path: "/basic-css" },
        { name: "Basic SVG", path: "/basic-svg" },
        { name: "Basic Javascript", path: "/basic-js" },
        { name: "D3 example", path: "/d3-example-1" },
        {name: "Exercises", path: "/exercises-1"}
      ]
    },
    {
      name: "Session 2: D3 basics",
      open: false,
      pages: []
    },
    {
      name: "Session 3: D3 simple charts",
      open: false,
      pages: []
    },
    {
      name: "Session 4: D3 intermediate charts",
      open: false,
      pages: []
    },
    {
      name: "Session 5: D3 advanced charts",
      open: false,
      pages: []
    },
    {
      name: "Session 6: D3 custom charts",
      open: false,
      pages: []
    },
    {
      name: "Session 7: D3 and observable notebooks",
      open: false,
      pages: []
    },
    {
      name: "Session 8: Modern web development with D3",
      open: false,
      pages: []
    },
    {
      name: "Session 9: Github, git and git pages",
      open: false,
      pages: []
    },
    {
      name: "Session 10: D3 and Vue.js",
      open: false,
      pages: []
    },
    {
      name: "Session 11: D3 and Svelte.js",
      open: false,
      pages: []
    },
  ],
  head: '<link rel="icon" href="icon.png" type="image/png" sizes="32x32">',
  root: "src",
  theme: "dashboard", // try "light", "dark", "slate", etc.
  footer: `<div style="display: flex; align-items: center; ">
  <a href="https://github.com/urmilaj/lets-learn-d3" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
    <img src="icon.png" width="32" height="32"/>
    <span style="font-size: 15px; margin-top: 7px;">Lets learn D3</span>
  </a>
  </div>`,
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
