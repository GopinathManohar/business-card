# Stage 1
FROM --platform=linux/amd64 node:19-alpine as builder
WORKDIR /app
COPY . .
COPY package.json .
RUN npm install -force
RUN npm run build:uat

# Stage 2, copy from the builder to the final image (inginx)
FROM --platform=linux/amd64 nginx:1.25.0-alpine
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html