FROM node:14-alpine As Builder 
WORKDIR /usr/src/app
RUN npm install --production
RUN npm run build:prod 
RUN npm prune --production 

FROM nginx:alpine 
WORKDIR /usr/src/app
EXPOSE 80

COPY --from=Builder /usr/src/app/dist /usr/share/nginx/html 
RUN true