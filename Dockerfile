FROM node:12-alpine

WORKDIR /app
COPY . .

RUN apk update && apk upgrade
RUN apk add --upgrade bash
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
