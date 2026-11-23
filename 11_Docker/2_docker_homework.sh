#!/usr/bin/env bash
# Крок 2 (Ubuntu у WSL). Встановлює Docker і виконує обидва ДЗ.
# Запуск з Ubuntu:  bash 2_docker_homework.sh
set -e

step() { printf '\n\033[1;36m==> %s\033[0m\n' "$1"; }

# ---------- Встановлення Docker (команди з docker_install_commnads.txt) ----------
if ! command -v docker >/dev/null 2>&1; then
  step "Встановлюю Docker"
  sudo apt update
  sudo apt install -y ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc
  sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  sudo usermod -aG docker "$USER"
fi

sudo systemctl start docker 2>/dev/null || sudo service docker start
DOCKER="sudo docker"   # sudo, щоб не потрібно було перезапускати WSL після usermod

# ---------- ДЗ 1: Docker вступ ----------
step "ДЗ 1: завантажую образи"
$DOCKER run --rm hello-world
for img in hello-world mysql postgres httpd nginx redis; do
  $DOCKER pull "$img"
done

# ---------- ДЗ 2: Docker контейнери ----------
step "ДЗ 2: Postgres на порту 5400"
$DOCKER rm -f pg >/dev/null 2>&1 || true
$DOCKER run -d --name pg -p 5400:5432 \
  -e POSTGRES_PASSWORD=1234 -e POSTGRES_USER=student -e POSTGRES_DB=homework postgres

# Запускає гру на заданому порту хоста; внутрішній порт береться з EXPOSE образу (або 80)
run_game() {
  local name=$1 host_port=$2 image=$3
  $DOCKER rm -f "$name" >/dev/null 2>&1 || true
  $DOCKER pull "$image"
  local inner
  inner=$($DOCKER inspect --format '{{range $p, $_ := .Config.ExposedPorts}}{{$p}} {{end}}' "$image" | awk '{print $1}' | cut -d/ -f1)
  inner=${inner:-80}
  $DOCKER run -d --name "$name" -p "$host_port:$inner" "$image"
  echo "   $name -> http://localhost:$host_port  (порт у контейнері: $inner)"
}

step "ДЗ 2: ігри"
run_game tetris 80 bsord/tetris
run_game chess  81 rmeira/chess
run_game snake  82 jairoblanco/snake-game
run_game sudoku 83 dockergelb/sudoku

# ---------- Що скріншотити ----------
step "СКРІНШОТ 1 (ДЗ 1): список образів"
$DOCKER images

step "СКРІНШОТ 5 (ДЗ 2): запущені контейнери"
$DOCKER ps

cat <<'EOF'

==================== ЩО ЗАЛИШИЛОСЬ ЗРОБИТИ ====================
Скріншоти (Win + Shift + S):
  1. Вивід "docker images" вище                         -> ДЗ "Docker вступ"
  2. DBeaver: нове з'єднання PostgreSQL
       Host: localhost  Port: 5400  DB: homework
       User: student    Password: 1234                  -> ДЗ "Docker контейнери"
  3. Браузер: http://localhost      (тетріс)
              http://localhost:81   (шахи)
              http://localhost:82   (змійка)
              http://localhost:83   (судоку)            -> ДЗ "Docker контейнери"
  4. Вивід "docker ps" вище                             -> ДЗ "Docker контейнери"
Збережіть скріншоти в одну папку і скажіть Claude шлях - він завантажить їх у MyStat.
================================================================
EOF
