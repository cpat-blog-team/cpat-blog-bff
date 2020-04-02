FROM node:10

# Add package file
COPY . . 

# Install deps
RUN npm install --only=prod

# Expose port 3000
EXPOSE 3000

CMD npm run start
