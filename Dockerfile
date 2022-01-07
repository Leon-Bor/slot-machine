FROM node:14-alpine As Builder 
WORKDIR /app
RUN npm install --production
RUN npm run build:prod 
RUN npm prune --production 

COPY . .

FROM nginx:alpine 
WORKDIR /app
EXPOSE 80

COPY . /usr/share/nginx/html  