# MNA Trader

MNA Trader is an AI-style trading signal dashboard for Quotex and Tradevix. It includes 20 major currency pairs, forex and binary strategies, signal history, analytics, backtesting, and direct access to the MNA Trader Telegram channel.

## Live website

**Website:** https://bot.mnatrader.com/

## Local development

Requirements: Node.js 20 or newer and npm.

```sh
npm install
npm run dev
```

The development server is available at http://localhost:8080.

## Production build

```sh
npm run build
```

The build prerenders the application to `.output/public`. Pushes to the configured deployment branch are automatically published by the GitHub Pages workflow.
