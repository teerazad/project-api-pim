FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install yarn
RUN yarn add ./
# RUN yarn add ts-node-dev --save-dev
COPY . .
EXPOSE 8080
CMD [ "yarn","start"]

# WORKDIR /github-project/Cooperative_sys

# COPY . /package.json

# RUN npm install
# RUN npm i ts-node-dev --save-dev

# EXPOSE 3000

# CMD ["npm", "start"]

# WORKDIR /app
# COPY package.json .
# RUN npm install
# CMD ["npm", "start"]

# Create app directory