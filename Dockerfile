FROM node:14-alpine

WORKDIR /app
COPY . .

RUN apk update && apk upgrade
RUN apk add --upgrade bash
RUN npm install

WORKDIR /app/react-spa
RUN npm install

WORKDIR /app
RUN npm run-script build

EXPOSE 3000

CMD ["npm", "start"]
