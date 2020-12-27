FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENV MONGODB_URI mongodb+srv://admin:admin@cluster0.rxh2n.mongodb.net/support-admin-2?retryWrites=true&w=majority
RUN npm run buildprod
EXPOSE 3000
CMD [ "npm", "start" ]
