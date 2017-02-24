FROM nginx:1.11.10-alpine
MAINTAINER Michael(Zichun) Lin <michaellin@ualberta.ca>

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 7.6.0

# Work directory
WORKDIR /workspace

# Copy file into the container
COPY * /workspace/

# install node and yarn
RUN echo http://dl-cdn.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
    echo http://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache --update ca-certificates musl libcrypto1.0 libgcc http-parser libssl1.0 libstdc++ libuv zlib nodejs-current yarn && \
    cd /workspace && \
    yarn install && \
    yarn run build && \
    cp dist/* /usr/share/nginx/html/
