FROM node:14-alpine As Builder 



WORKDIR /app

COPY . . 

 
RUN npm install --production
RUN npm run build:prod
RUN npm prune --production 

FROM nginx:alpine 

WORKDIR /app 
 
COPY --from=Builder /app/dist /usr/share/nginx/html 
RUN true
EXPOSE 80