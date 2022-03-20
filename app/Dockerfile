FROM node:16.13.2-alpine
WORKDIR /app
COPY . .
COPY package.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]