FROM node:lts-alpine as build-runner

WORKDIR /tmp/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine as prod-runner

WORKDIR /app

COPY --from=build-runner /tmp/app/package.json /app/package.json

RUN npm install --omit=dev

COPY --from=build-runner /tmp/app/build /app/build
COPY --from=build-runner /tmp/app/knexfile.js /app/knexfile.js
COPY --from=build-runner /tmp/app/biome.json /app/biome.json
COPY --from=build-runner /tmp/app/database /app/database

RUN mkdir -p /app/data

CMD [ "npm", "run", "start" ]
