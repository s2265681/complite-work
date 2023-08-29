FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18.0-alpine3.14 as production-stage

WORKDIR /app

RUN npm install pm2 -g

# RUN npm install --production 只安装生产环境 的依赖
# RUN npm ci --only=production 

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

COPY --from=build-stage /app/node_modules /app/node_modules


EXPOSE 3000

# CMD ["node", "/app/main.js"]
CMD ["pm2-runtime","/app/main.js"]
