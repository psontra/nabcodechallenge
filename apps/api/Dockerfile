FROM node:12-alpine as builder

WORKDIR /usr/src/app

ADD ./src ./src
ADD package.json .
ADD tsconfig.json .
ADD yarn.lock .
RUN yarn install --ignore-scripts
RUN yarn build

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/yarn.lock .
RUN yarn install --production --ignore-scripts

CMD [ "node", "./dist/app.js", "2>&1"]
