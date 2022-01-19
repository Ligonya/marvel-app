# Marvel app

## Installation

### Récupération du projet

```bash
git clone https://github.com/Ligonya/marvel-app.git
cd marvel-app/
rm -R ./.git
```

### Variables d'environnement

```bash
cp .env.dist .env
```

Puis remplacer `xxxxxxxxxx`, dans `.env`, par la clef privée fournie dans le sujet. 

### Compilation

```bash
npm install
npm run build
npm run preview
```
