// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Lets learn D3",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {name: "Initial setup", path: "/initial-setup"},
    {name: "Basic HTML", path: "/basic-html"},
    {name: "Basic CSS", path: "/basic-css"},
    {name: "Basic SVG", path: "/basic-svg"},
    {name: "Basic Javascript", path: "/basic-js"},
  ],
  // pages: [
  //   {
  //     name: "Examples",
  //     pages: [
  //       {name: "Dashboard", path: "/example-dashboard"},
  //       {name: "Report", path: "/example-report"}
  //     ]
  //   }
  // ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="icon.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "dashboard", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: `<div style="display: flex; align-items: center; ">
  <a href="https://github.com/urmilaj/lets-learn-d3" target="_blank" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
    <img src="icon.png" width="32" height="32"/>
    <span style="font-size: 15px; margin-top: 7px;">Lets learn D3 | Urmila J</span>
  </a>
  </div>`, // what to show in the footer (HTML)
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
