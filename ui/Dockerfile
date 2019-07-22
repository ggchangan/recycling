FROM node:12 as build-stage
MAINTAINER yinchen@freewheel.com
WORKDIR /app
COPY package*.json  .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable
MAINTAINER yinchen@freewheel.com
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
