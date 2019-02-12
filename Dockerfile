FROM node:8

COPY . /app
WORKDIR /app

RUN npm install
RUN npm install -g typescript
RUN tsc

EXPOSE 3000
CMD ["node", "dist/index.js"]
