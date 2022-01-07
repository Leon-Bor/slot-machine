FROM node:14-alpine As Builder 

RUN npm install --production
RUN npm run build:prod 
RUN npm prune --production 

FROM nginx:alpine 

EXPOSE 80

COPY ./dist /usr/share/nginx/html  