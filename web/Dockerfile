# build your source
FROM node:20 as build
WORKDIR /app
COPY web/package*.json .
RUN npm ci
COPY web/ .
RUN npm run build

# copy the build output to a production image
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]