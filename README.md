
  # A Place Called Home

  This is a code bundle for A Place Called Home. The original project is available at https://www.figma.com/design/W57BP2b2wgLZD7rXBqDfo1/A-Place-Called-Home.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deploying (Vercel Free Tier)

  - Repo: Your code is in GitHub `aplacecalledhome-collab/a-place-called-home`.
  - Import in Vercel: New Project → Import the repo → Framework: Vite (auto-detected).
  - Build settings (already configured):
    - Build command: `vite build` (also in `vercel.json`)
    - Output directory: `build`
  - Environment variables (Project → Settings → Environment Variables):
    - `VITE_SUPABASE_FUNCTIONS_URL=https://follmsqgovcvloywunax.supabase.co/functions/v1`
    - `VITE_SUPABASE_ANON_KEY=<your anon key>` (same as `.env`)
  - Deploy to get a preview URL.

  ### Custom Domain (IONOS → Vercel)
  - Add domain in Vercel (Project → Settings → Domains): `www.apchllc.com` (and optionally `apchllc.com`).
  - In IONOS DNS:
    - `www` CNAME → `cname.vercel-dns.com`
    - Apex `apchllc.com` A → `76.76.21.21` (or set a redirect to `www` in Vercel)
  - Wait for DNS/SSL (5–30 minutes typically).

  ### Supabase Edge Functions CORS
  - In Supabase (Studio → Edge Functions → Secrets), set:
    - `ALLOWED_ORIGIN=https://www.apchllc.com,https://apchllc.com`
  - Redeploy functions if you change secrets.

  ## Deploying (Firebase Hosting)

  - Build locally: `npm run build` (output in `build/`).
  - Hosting config: `firebase.json` already points to `build` and adds SPA rewrite.
  - Choose one of these deployment paths:
    - Firebase Console (no CLI):
      1) Create a Firebase project in https://console.firebase.google.com
      2) Hosting → Get Started → Connect to GitHub → pick `aplacecalledhome-collab/a-place-called-home`
      3) Set build command `vite build` and output `build`
      4) Add custom domain `www.apchllc.com` and follow DNS prompts at IONOS
    - Firebase CLI:
      1) Install: `npm i -g firebase-tools`
      2) Login: `firebase login`
      3) Set project: `firebase use <your-project-id>` (update `.firebaserc` if desired)
      4) Deploy: `firebase deploy --only hosting`

  ### Domain (IONOS)
  - Keep the domain at IONOS and point DNS to Firebase Hosting using the exact records shown in Firebase when you add the domain.
  - SSL certificates are issued automatically when DNS is correct.

  ### Supabase Edge Functions (backend)
  - Frontend calls are controlled by `VITE_SUPABASE_FUNCTIONS_URL`.
  - For production, set these env vars in your hosting provider (or a `.env` used during build):
    - `VITE_SUPABASE_FUNCTIONS_URL=https://<your-supabase-project>.supabase.co/functions/v1`
    - `VITE_SUPABASE_ANON_KEY=<anon-key>`
  - In Supabase, set function secret `ALLOWED_ORIGIN` to include your live domain(s), e.g.
    `https://www.apchllc.com,https://apchllc.com`, then redeploy functions.
  
