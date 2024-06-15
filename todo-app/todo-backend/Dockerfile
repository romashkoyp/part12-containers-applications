FROM node:20
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV NODE_ENV=production

ENV MONGO_URL=mongodb://the_username:the_password@mongo:27017/the_database

ENV REDIS_URL=redis://redis:6379

ENV DEBUG=playground:*

USER node

CMD ["npm", "start"]