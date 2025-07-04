# Using the official Playwright image
FROM mcr.microsoft.com/playwright:v1.53.1-jammy

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV CI=true
ENV NODE_ENV=production

# Default command
CMD ["yarn", "run", "test"]
