FROM node:20

WORKDIR /usr/src/app

COPY package* .
COPY ./prisma .
    
RUN npm install
RUN npx prisma generate

COPY . .

RUN npx tsc -b

EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
