
FROM node:22-bookworm-slim

WORKDIR /app

# Install tools needed by native dependencies such as bcrypt
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY src/ ./src/

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

USER node

CMD ["node", "src/server.js"]
