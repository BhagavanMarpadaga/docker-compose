FROM node:20.18.2-alpine3.21 as base

# builder stage : Only to build
FROM base as builder

WORKDIR home/build

COPY package*.json ./
COPY tsconfig.json ./ 

RUN npm install

COPY src/ ./


RUN npm run build

# stage 2 : runner stage
FROM base as runner

WORKDIR home/app
COPY --from=builder /home/build/dist dist/
COPY --from=builder /home/build/package*.json ./

RUN npm install --omit=dev

CMD ["npm", "start"]




