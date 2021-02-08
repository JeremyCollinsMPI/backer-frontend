FROM node:lts
RUN npx create-react-app my-app
RUN rm -f my-app/src/*
COPY package.json my-app/
WORKDIR my-app
RUN npm install


