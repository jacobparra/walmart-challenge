FROM node:12.19-stretch-slim

WORKDIR /usr/src/app

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY . .

# Build dist
RUN npm run build

# Expose port 3000
EXPOSE 3000

CMD ["node","dist/server.js"]
