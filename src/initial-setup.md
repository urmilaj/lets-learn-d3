---
title: Initial setup
toc: false
---

# Getting Started with D3.js: Setup Guide for Beginners

Welcome! This guide will help you set up everything you need to start creating amazing data visualizations with D3.js. Don't worry if you're new to coding - we'll walk through each step together.

---

## Basic tool requirement: Install Visual Studio Code (VS Code)

**What is VS Code?** It's a free, user-friendly text editor where you'll write your D3.js code.

1. Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click the big **Download** button for your operating system (Windows/Mac/Linux)
3. Run the installer and follow the setup wizard
4. Open VS Code once installation is complete

### Helpful VS Code Extensions

Once VS Code is installed, add these extensions to make your life easier:

- **Live Server** - See your visualizations update in real-time as you code
  - Click the Extensions icon (four squares) on the left sidebar
  - Search for "Live Server" by Ritwick Dey
  - Click Install
  
- **Prettier** (Optional) - Automatically formats your code to look neat and organized
  - Search for "Prettier - Code formatter"
  - Click Install

---

## Advanced tools (Required later): Install Node.js

<div class="note">
Node.js is required when we work on advanced data visualization projects with modern frontend libraries like Vue.js, Svelte, Vite etc. Right now, you can ignore this step, you can come back to it when we work on a project that requires these tools.
</div>

**What is Node.js?** It's a tool that lets you run JavaScript code on your computer (not just in a web browser). We need it to manage our D3.js project.

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (Long Term Support - the stable one)
3. Run the installer with default settings
4. To verify it worked, open a terminal/command prompt and type:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers appear!

**What is npm?** It stands for Node Package Manager. Think of it as an app store for code - it helps you install and manage tools like D3.js.



<style>
    * {
        font-family: sans-serif;
    }
</style>