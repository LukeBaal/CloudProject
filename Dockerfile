FROM node:8.15.1-alpine

WORKDIR /usr/src/app

# Backend
COPY backend/package.json backend/package.json
# Install backend dependencies
RUN npm --prefix ./backend install
# Copy remaining files
COPY ./backend ./backend


# Frontend
COPY frontend/package.json frontend/package.json
# Install frontend dependencies
RUN npm --prefix ./frontend install
# Copy remaing files
COPY ./frontend ./frontend
RUN npm --prefix ./frontend run build

# Run server
CMD ["npm", "--prefix", "./backend", "start"]