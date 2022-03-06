
# Stage 1

FROM node:16 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm install -g @angular/cli

RUN npm run build --prod

# Stage 2

FROM nginx:latest

COPY --from=build-step /app/dist/capstone-product /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
