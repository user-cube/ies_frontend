FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install

RUN npm build

RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build"]
