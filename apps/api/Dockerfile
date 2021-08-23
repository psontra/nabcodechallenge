FROM node:12 as builder

WORKDIR /usr/src/app

ADD ./src ./src
ADD package.json .
ADD tsconfig.json .
ADD jest.config.js .
RUN yarn install --ignore-scripts
RUN yarn test
RUN yarn build

FROM node:12

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist .

CMD ['node', './dist/app.js']
