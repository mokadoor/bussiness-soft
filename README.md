# bussiness-soft

Guide d'installation étape par étape depuis GitHub (pour un utilisateur tunisien)

1. Ouvrir GitHub et accéder au dépôt : https://github.com/mokadoor/bussiness-soft
2. Cliquer sur le bouton "Code" puis copier l'URL du dépôt.
3. Sur ton ordinateur, ouvrir un terminal ou PowerShell.
4. Exécuter :
   `git clone https://github.com/mokadoor/bussiness-soft.git`
5. Aller dans le dossier du projet :
   `cd bussiness-soft`
6. Copier le fichier d'exemple d'environnement :
   `cp .env.example .env`
   ou sur Windows PowerShell :
   `copy .env.example .env`
7. Ouvrir `.env` avec un éditeur de texte.
8. Remplir les valeurs Supabase avec tes secrets :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (ou `NEXT_PUBLIC_SUPABASE_ANON_KEY` si tu utilises cette variable)
   - `SUPABASE_SERVICE_ROLE_KEY`
9. Pour inisialiser la base de données Supabase, applique les migrations disponibles dans le dossier `supabase/migrations`.
10. Enregistrer le fichier `.env`.
11. Installer les dépendances si nécessaire (par exemple avec npm) :
    `npm install`
12. Lancer l'application :
    `npm run dev` ou la commande indiquée dans le projet.
13. Dashboard admin:
   Default Email:`admin@bussiness-sfotware.com.tn`
   Default Password:`admin123`

Maintenant l'application devrait fonctionner avec tes variables d'environnement locales.
