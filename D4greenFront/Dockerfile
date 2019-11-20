FROM node:8

RUN mkdir -p /usr/src/app && \
chown -R node:node /usr/src/app && \
chown -R node:node /usr/local/lib/node_modules && \
chown -R node:node /usr/local/bin/

USER node

ADD package.json /tmp/package.json
RUN npm install -g @angular/cli@1.7.4 && \
cd /tmp && npm install && \
mv /tmp/node_modules /usr/src/app/node_modules

ADD . /usr/src/app
WORKDIR /usr/src/app

USER root

EXPOSE 4200
EXPOSE 49153
