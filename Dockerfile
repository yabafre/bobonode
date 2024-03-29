# Étape de base pour l'installation des dépendances
FROM node:20.11-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Étape de construction pour construire l'application
FROM node:20.11-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Étape de production pour exécuter l'application
FROM node:20.11-alpine AS runner
WORKDIR /app

# Création et utilisation de l'utilisateur non privilégié
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

# Copie des fichiers nécessaires depuis l'étape builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
