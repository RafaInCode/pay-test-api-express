FROM node:8-slim

WORKDIR /pay-test-api

ENV NODE_ENV development

COPY package.json /pay-test-api/package.json

RUN npm -g config set user root
# RUN npm install -g node-sass typescript

COPY . /pay-test-api

RUN npm install --production
RUN npm run build

CMD ["npm","start"]

EXPOSE 8080 