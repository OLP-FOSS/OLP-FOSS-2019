ARG VERSION=latest

FROM ubuntu:18.04

RUN apt-get update -yq \
    && apt-get install iputils-ping curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq

RUN mkdir /app

RUN mkdir /server

COPY --chown=0 ./app /app

COPY --chown=0 ./server /server

WORKDIR /server
ENTRYPOINT [ "/bin/sh", "-c", "(cd /server && node ./tictactoe.js) & (cd /app && node ./index.js) &" ]

EXPOSE 8080 3001

