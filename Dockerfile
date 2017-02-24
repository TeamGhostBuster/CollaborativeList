FROM exiasr/alpine-yarn-nginx:latest
MAINTAINER Michael(Zichun) Lin <michaellin@ualberta.ca>

# Copy file into the container
COPY ./ /workspace/

# Work directory
WORKDIR /workspace

# install node and yarn
RUN yarn install && \
    yarn run build && \
    cp dist/* /usr/share/nginx/html/
