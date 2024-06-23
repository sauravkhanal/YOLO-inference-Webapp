# build stage

FROM node:20 as build_stage

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Final stage
FROM nginx:alpine

COPY --from=build_stage /build/build/ /usr/share/nginx/html

