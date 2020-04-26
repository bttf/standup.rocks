FROM node:10-alpine as builder

COPY package*.json ./

COPY . .

RUN apk add --no-cache make gcc g++ python postgresql-dev && \
  yarn install && \
  yarn build

FROM node:10-alpine

WORKDIR /user/src/app

# We need this to run pg-native it seems
RUN apk add --no-cache postgresql-dev

COPY --from=builder node_modules node_modules
COPY --from=builder dist dist

# Needed for development
COPY . .

CMD ["yarn", "start"]
