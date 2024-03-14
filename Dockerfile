# base image
FROM node:20.10.0-alpine


LABEL org.opencontainers.image.authors="Muhammad Adeel <madeel385@gmail.com>"

RUN apk --no-cache --update add dumb-init vim nano bash git curl && \
    rm -rf /var/cache/apk/* /tmp && \
    mkdir /tmp && \
    chmod 777 /tmp

# Global installs to non root owned directory and add that to path so they're executable
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH="/home/node/.npm-global/bin:${PATH}"

# Install global Yarn packages:
# - typescript: Run tsc  -p server on docker-compose up
# - nodemon: Run the node server in development mode on docker-compose up
# - concurrently: Run tsc and nodemon in parallel on docker-compose up


RUN yarn global add  typescript
RUN yarn global add nodemon
RUN yarn global add concurrently

ARG application_dir=.

# Set the application directory
WORKDIR /organization_service/

RUN chown node:node /organization_service/

USER node

# Add all the files needed for yarn install
ADD --chown=node:node $application_dir/package.json \
    $application_dir/yarn.lock \
    /organization_service/




# Switch to non-root user and install dependencies
RUN npm ci

# Add files to the container, perform chmod and chown
ADD --chown=node:node $application_dir /organization_service/

RUN npm run build:prod


