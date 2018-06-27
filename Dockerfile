FROM node:6.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PORT 8080
ENV NODE_ENV production

EXPOSE 8080

COPY package.json /usr/src/app/
COPY . /usr/src/app

CMD [ "npm", "run", "start:prod" ]
