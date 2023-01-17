FROM node:16.14 as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

#https://gitlab.fcalatam.com/fca/banco-fidis/ms8/docker-images-base/-/blob/master/Dockerfile.node-18
FROM node:16.14

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --ignore-scripts --only=production

COPY --from=builder /usr/src/app/dist ./dist/

CMD [ "k6", "run", "dist/sponsors/load.test.js"]

