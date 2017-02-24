FROM exiasr/alpine-yarn-nginx:test
MAINTAINER Michael(Zichun) Lin <michaellin@ualberta.ca>

# Copy file into the container
COPY * /workspace/

# install node and yarn
RUN export PATH=/usr/bin:/bin:/opt:$PATH && \
    cd /workspace && \
    yarn install && \
    yarn run build && \
    cp dist/* /usr/share/nginx/html/

# Work directory
WORKDIR /workspace
