FROM node:10-alpine

WORKDIR /user/src/app

ADD package.json /user/src/app/package.json

RUN apk add --no-cache make gcc g++ python postgresql-dev && \
  yarn install

CMD ["yarn", "dev"]
