FROM node:10

# Install Truffle
RUN npm install -g truffle
RUN npm config set bin-links false

# Move Contract Files
COPY contracts ./contracts
COPY migrations ./migrations
COPY test ./test
COPY node_modules ./node_modules
COPY bs-config.json ./bs-config.json
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY truffle-config.js ./truffle-config.js


# Move React Files
COPY src ./src

# Clean Install NPM Dependencies
RUN cd / && npm ci &&  npm install  




