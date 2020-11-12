# Stage 1
FROM node:10-alpine as build-frontend
RUN mkdir -p /app
WORKDIR /app
COPY synonims-front/package.json /app
RUN npm install
ENV PATH="./node_modules/.bin:$PATH"
COPY synonims-front/. /app
RUN ng build

# Stage 2
FROM node:10-alpine as build-backend
RUN mkdir -p /app
WORKDIR /app
COPY  synonims-back/package*.json /app/
RUN npm install
COPY synonims-back/. /app
RUN npm run build

#Stage 3 
FROM node:10-alpine
RUN mkdir -p /app
WORKDIR /app
COPY --from=build-backend /app /app
COPY --from=build-frontend /app/dist/synonyms-front dist/synonyms-front
CMD ["node", "dist/index.js"]
