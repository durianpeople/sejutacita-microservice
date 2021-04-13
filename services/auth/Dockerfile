FROM node:lts as dev

WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install
RUN npm install -g nodemon
EXPOSE 3000 9229
CMD ["nodemon", "--inspect=0.0.0.0", "index.js"]

FROM node:lts as prod

WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]