FROM node:alpine

WORKDIR /app

COPY . .

ENV PORT=3000
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/pelandodb?schema=public"
RUN npm install 

RUN npm run prisma:generate

EXPOSE 3000
