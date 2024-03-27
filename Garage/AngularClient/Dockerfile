FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@^17.0.7

RUN npm ci

CMD ["ng", "serve", "--host", "0.0.0.0"]