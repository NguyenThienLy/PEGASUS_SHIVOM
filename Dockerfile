FROM node:9

ADD package.json /tmp/package.json
# RUN npm install -g typescript
RUN npm install nodemon -g
RUN cd /tmp && npm install --only=prod
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
# Create app directory
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cd /usr/src/app
EXPOSE 3000
CMD [ "node", "./dist/app" ]