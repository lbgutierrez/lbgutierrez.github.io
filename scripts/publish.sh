#!/usr/bin/env bash
# Publica el sitio en www.bastiangutierrez.com:
#   1. compila (next build → out/)
#   2. copia out/ al repo lbgutierrez.github.io (rama main, la que sirve GitHub Pages)
#   3. hace commit y push de ese repo
#   4. respalda este código en la rama "source"
#
# Uso:   npm run publish
#        npm run publish -- --dry-run   (prueba todo sin hacer commit ni push)
#
# El repo publicado se busca en ~/workspace/lbgutierrez.github.io; para usar otra
# ruta: SITE_REPO=/otra/ruta npm run publish
set -euo pipefail

SITE_REPO="${SITE_REPO:-$HOME/workspace/lbgutierrez.github.io}"
SITE_BRANCH="main"
DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$SRC_DIR"

step() { printf '\n\033[1m→ %s\033[0m\n' "$1"; }
fail() { printf '\n\033[31m✗ %s\033[0m\n' "$1" >&2; exit 1; }

# Cambios del repo ignorando los .DS_Store de macOS
pending_changes() { git -C "$1" status --porcelain -- . ':!*.DS_Store'; }

step "Revisando el código fuente"
if [[ -n "$(pending_changes "$SRC_DIR")" ]] && ! $DRY_RUN; then
  pending_changes "$SRC_DIR"
  fail "Hay cambios sin commit en el código. Haz commit primero para que lo publicado quede respaldado."
fi

step "Revisando el repo publicado ($SITE_REPO)"
[[ -d "$SITE_REPO/.git" ]] || fail "No encuentro el repo en $SITE_REPO"
[[ "$(git -C "$SITE_REPO" branch --show-current)" == "$SITE_BRANCH" ]] ||
  fail "El repo publicado no está en la rama $SITE_BRANCH"
if [[ -n "$(pending_changes "$SITE_REPO")" ]]; then
  pending_changes "$SITE_REPO"
  fail "El repo publicado tiene cambios sin commit; revísalos antes de publicar."
fi
git -C "$SITE_REPO" pull --ff-only --quiet origin "$SITE_BRANCH"

step "Compilando"
rm -rf out
npm run build

step "Copiando out/ al repo publicado"
rsync -a --delete --exclude .git --exclude .DS_Store out/ "$SITE_REPO/"
git -C "$SITE_REPO" add -A -- . ':!*.DS_Store'

if git -C "$SITE_REPO" diff --cached --quiet; then
  step "No hay cambios que publicar: el sitio ya está al día"
  exit 0
fi
git -C "$SITE_REPO" diff --cached --stat | tail -1

if $DRY_RUN; then
  # Deja el repo publicado tal como estaba
  git -C "$SITE_REPO" reset --quiet
  git -C "$SITE_REPO" restore -- . ':!*.DS_Store'
  git -C "$SITE_REPO" clean -fdq -- . ':!*.DS_Store'
  step "Dry run: todo funciona; no se hizo commit ni push y el repo publicado quedó como estaba"
  exit 0
fi

step "Publicando"
SHA="$(git rev-parse --short HEAD)"
git -C "$SITE_REPO" commit --quiet -m "Publica sitio ($SHA: $(git log -1 --format=%s))"
git -C "$SITE_REPO" push --quiet origin "$SITE_BRANCH"

step "Respaldando el código en la rama source"
git push --quiet origin main:source

step "Listo. GitHub Pages tarda ~1 minuto: https://www.bastiangutierrez.com"
