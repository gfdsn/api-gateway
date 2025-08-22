FROM node:18

WORKDIR /app

# Copy package.json only for npm install caching
COPY package*.json ./
RUN npm install

COPY .env /app

# Copy src just for initial build (will be overridden by bind mount)
COPY src ./src

EXPOSE 3000
CMD ["npm", "run", "dev"]