# Plugin for Figma With Vue

## Features:

- Vue
- Typescript
- [figma-plugin-ds](https://github.com/thomas-lowry/figma-plugin-ds) integration
- Message handler helper functions to simplify communication between the main code and the UI code

## How to use?

1. Install dependencies with `npm i`.
2. Run `npm run dev` and a folder named `dist` will be created.
3. In the Figma desktop app, click on **Create new plugin** / **Link existing plugin** and point it to the `manifest.json` in this project.
4. Now you can edit the main Figma code from `src/code.ts` and the UI code from `src/ui.vue`. Hitting save will auto-reload the build so you can see your changes right away.
5. When you're ready to publish the plugin, run `npm run build` to create a production build.
