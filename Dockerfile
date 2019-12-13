FROM node:8-slim

WORKDIR /pay-test-api

ENV NODE_ENV production

COPY package.json /pay-test-api/package.json

RUN npm -g config set user root

COPY . /pay-test-api

RUN npm install --production
RUN npm install -g apidoc
RUN npm run build

CMD ["npm","start"]

EXPOSE 8080 