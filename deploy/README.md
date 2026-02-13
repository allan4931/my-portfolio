# Deployment helper

This folder contains helper files and a setup script to deploy the project to an Ubuntu server.

Quick steps (summary):

- Generate an SSH key locally (if you don't have one):

```bash
ssh-keygen -t ed25519 -C "deploy@yourmachine"
cat ~/.ssh/id_ed25519.pub
```

- Create a GitHub repo and push the project to it (do not copy files directly to the server). Example:

```bash
git remote add origin git@github.com:youruser/my-portfolio.git
git push -u origin main
```

- On the server (run as root or via sudo):

```bash
# replace REPO and PUBKEY with your values
sudo /opt/my-portfolio/deploy/setup-server.sh git@github.com:youruser/my-portfolio.git "ssh-rsa AAAA..." 203.0.113.45
```

- After the script finishes, obtain HTTPS certificates with certbot:

```bash
sudo snap install core; sudo snap refresh
sudo snap install --classic certbot
sudo certbot --nginx -d allan.zivo.cloud -d sandbox.allan.zivo.cloud
```

- Test both domains in a browser. The `/api` path will be proxied to the appropriate backend instance.

Mobile app & Frontend configuration:

- `frontend/.env.example` already contains:

```
VITE_API_BASE=https://allan.zivo.cloud/api
```

Update your mobile app configuration to use the same base URL for production; for sandbox builds point to `https://sandbox.allan.zivo.cloud/api`.

Notes & safety:

- Do NOT disable root SSH until you have verified the `allan` user has sudo and SSH access.
- Keep your GitHub repo private for deployment secrets; use environment variables for secrets.
