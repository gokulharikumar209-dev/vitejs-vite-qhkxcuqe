# Olivo Café — Website Concept

A responsive React + Vite demo for an independent bakery/café. It includes category filters, a shopping bag with quantity controls, a demo checkout action, and a custom-cake enquiry form.

## Run locally

1. Install Node.js (LTS) if it is not already installed.
2. Extract this ZIP.
3. Open a terminal in the extracted `olivo_cafe_website` folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL Vite prints in the terminal.

## Before showing as an official site

This is an unofficial concept/demo. Please verify all business details and get the owner's approval before publishing as the café's official website.

- Replace the illustrative product names, photos and prices with the café's approved menu.
- Confirm the exact address, opening hours, phone number and social media accounts.
- In `src/main.jsx`, replace `REPLACE_WITH_CAFE_NUMBER` with the café's verified WhatsApp number (international format, digits only, no `+`).
- The custom cake form is currently a demo form; it does not send or store personal data. Connect it to an approved WhatsApp destination or a secure form backend before launch.
- The image links use Unsplash URLs and require an internet connection.
- Confirm the café's permission to use its logo and branding.

## Build for production

```bash
npm run build
```

Vite creates the production site in `dist/`. This project can be deployed to a static hosting service such as Vercel or Netlify.
