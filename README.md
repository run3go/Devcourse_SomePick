# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

```
3_project
├─ eslint.config.js
├─ index.html
├─ package.json
├─ public
│  ├─ emoji.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ apis
│  ├─ App.tsx
│  ├─ assets
│  │  └─ images
│  │     ├─ 1.png
│  │     ├─ 1a0c54a2-c7e0-4eda-bb9c-fe6a1658b9d5.jpg
│  │     ├─ 2.png
│  │     ├─ 3.png
│  │     ├─ back1.png
│  │     ├─ back2.png
│  │     ├─ banner.png
│  │     ├─ banner2.png
│  │     ├─ calendar.png
│  │     ├─ couple1.png
│  │     ├─ logo.png
│  │     ├─ logo_white.png
│  │     ├─ PINK.png
│  │     ├─ taro.png
│  │     ├─ tarotarotaro.png
│  │     └─ taro_couple.png
│  ├─ components
│  │  ├─ fortune
│  │  │  └─ Fortune.tsx
│  │  └─ main
│  ├─ hooks
│  ├─ main.tsx
│  ├─ routes
│  │  ├─ index.tsx
│  │  ├─ layouts
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  └─ RootLayout.tsx
│  │  ├─ loader
│  │  └─ pages
│  │     ├─ AuthPage.tsx
│  │     ├─ CalendarPage.tsx
│  │     ├─ LoginPage.tsx
│  │     ├─ MainPage.tsx
│  │     ├─ MatchingPage.tsx
│  │     ├─ MessageDetailPage.tsx
│  │     ├─ MessagePage.tsx
│  │     ├─ NotFoundPage.tsx
│  │     ├─ PostCreatePage.tsx
│  │     ├─ PostDetailPage.tsx
│  │     ├─ PostsPage.tsx
│  │     ├─ ProfilePage.tsx
│  │     ├─ SignUpPage.tsx
│  │     └─ TodayFortunePage.tsx
│  ├─ stores
│  │  └─ authStore.ts
│  ├─ styles
│  │  ├─ icons.css
│  │  ├─ index.css
│  │  └─ tailwind.css
│  ├─ types
│  │  └─ type.d.ts
│  ├─ utils
│  │  └─ supabase.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```
