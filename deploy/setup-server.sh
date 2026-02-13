#!/usr/bin/env bash
set -euo pipefail

# Usage:
# sudo ./setup-server.sh GITHUB_REPO_SSH_URL "ssh-rsa AAAA... user@host" server_ip
# Example:
# sudo ./setup-server.sh git@github.com:youruser/my-portfolio.git "ssh-rsa AAAA..." 203.0.113.45

REPO_URL=${1:-}
SSH_PUBKEY=${2:-}
SERVER_IP=${3:-127.0.0.1}

if [ -z "$REPO_URL" ] || [ -z "$SSH_PUBKEY" ]; then
  echo "Usage: sudo $0 GITHUB_REPO_SSH_URL \"SSH_PUBKEY\" [server_ip]"
  exit 1
fi

USERNAME=allan
HOME_DIR=/home/$USERNAME

# 1) create user if not exists
if ! id -u $USERNAME >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" $USERNAME
  usermod -aG sudo,docker $USERNAME || true
fi

# 2) add SSH key for user
mkdir -p $HOME_DIR/.ssh
echo "$SSH_PUBKEY" >> $HOME_DIR/.ssh/authorized_keys
chmod 700 $HOME_DIR/.ssh
chmod 600 $HOME_DIR/.ssh/authorized_keys
chown -R $USERNAME:$USERNAME $HOME_DIR/.ssh

# 3) update and install essentials
apt-get update
apt-get install -y curl gnupg2 ca-certificates lsb-release software-properties-common git nginx

# 4) install Docker
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

# Install docker compose plugin if not present
if ! docker compose version >/dev/null 2>&1; then
  apt-get install -y docker-compose-plugin
fi

# ensure docker group exists and add user
groupadd -f docker || true
usermod -aG docker $USERNAME || true

# 5) set hostname to the subdomain first part: 'allan'
hostnamectl set-hostname allan
if ! grep -q "127.0.1.1 allan" /etc/hosts; then
  echo "127.0.1.1 allan" >> /etc/hosts
fi

# 6) copy nginx site configs from repo and enable
DEPLOY_DIR=/opt/my-portfolio
mkdir -p $DEPLOY_DIR
chown $USERNAME:$USERNAME $DEPLOY_DIR

su - $USERNAME -s /bin/bash -c "git clone $REPO_URL $DEPLOY_DIR || (cd $DEPLOY_DIR && git fetch && git reset --hard origin/main)"

# Copy provided nginx config templates
cp $DEPLOY_DIR/deploy/nginx/allan.zivo.cloud.conf /etc/nginx/sites-available/allan.zivo.cloud.conf
cp $DEPLOY_DIR/deploy/nginx/sandbox.allan.zivo.cloud.conf /etc/nginx/sites-available/sandbox.allan.zivo.cloud.conf
ln -sf /etc/nginx/sites-available/allan.zivo.cloud.conf /etc/nginx/sites-enabled/allan.zivo.cloud.conf
ln -sf /etc/nginx/sites-available/sandbox.allan.zivo.cloud.conf /etc/nginx/sites-enabled/sandbox.allan.zivo.cloud.conf

nginx -t && systemctl restart nginx

# 7) start docker-compose (from deploy directory)
cd $DEPLOY_DIR/deploy
docker compose -f docker-compose.prod.yml pull || true
docker compose -f docker-compose.prod.yml up -d --build

echo "Now run certbot to obtain certificates (interactive):"
echo "  sudo snap install core; sudo snap refresh; sudo snap install --classic certbot"
echo "  sudo certbot --nginx -d allan.zivo.cloud -d sandbox.allan.zivo.cloud"

echo "SSH user $USERNAME created/updated. Don't disable root yet: verify $USERNAME sudo works and Docker services are running."
