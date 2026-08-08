# MNA Trader

MNA Trader is an AI-style trading signal dashboard for Quotex and TradoWix. It includes major currency, gold, and Bitcoin pairs, forex and binary strategies, signal history, analytics, backtesting, and direct access to the MNA Trader Telegram channel.

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

## Managing licenses

Licenses are stored as SHA-256 hashes in `public/licenses.csv`, so the plain license keys are not
published with the website. License changes stay entirely in this repository and are deployed by
the existing GitHub Pages workflow.

Create a random key (the command prints the key once):

```sh
npm run license:add -- --generate 2027-12-31 "Customer name"
```

Or add a key you selected yourself. Leave the expiry blank by passing an empty string:

```sh
npm run license:add -- XXXX-XXXX-XXXX-XXXX 2027-12-31 "Customer name"
npm run license:add -- XXXX-XXXX-XXXX-XXXX "" "No expiry customer"
```

Revoke a key:

```sh
npm run license:revoke -- XXXX-XXXX-XXXX-XXXX
```

Confirm that a key is present, active, and unexpired before sending it to a customer:

```sh
npm run license:verify -- XXXX-XXXX-XXXX-XXXX
```

Commit and push the updated CSV to publish the change. Visitors may skip the initial license screen
and explore the dashboard, but **GET SIGNAL** validates the saved key against the latest CSV before
generating a signal. Because GitHub Pages is a static host, this browser-side license gate is suitable
for access control and customer management but cannot provide the same tamper resistance as a private
server-side licensing API.
