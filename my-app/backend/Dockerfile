FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV NODE_ENV=production

ENV MONGO_URL=mongodb://romashkoyp:CHY5BxIJ5OoQRT3Q@mongo:27017/phoneBook

ENV DEBUG=playground:*

USER node

CMD ["npm", "start"]