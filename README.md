# QA Engineer Recruitment test

## Before you start

The test is based on Playwright v1.53.1. You can find the full playwright documentation [here](https://playwright.dev/docs/intro). To build the project you will need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install).
In the file `widget.test.ts` are the initial steps of the test.

Before starting, create an `.env` file in the main directory and put shared values into it. Without this, you will not be able to log in to the test project.

### Commands

In the project directory, you can run:

#### `yarn`

Installs a package and any packages that it depends on.

#### `yarn playwright install`

Installs playwright default browsers.

#### `yarn run test`

Launches test headless.

#### `yarn run dev`

Launches test non-headless with playwright inspector.

## Docker Support

This project supports Docker containerization for consistent test execution across different environments.

### Prerequisites for Docker

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

### Docker Commands

#### Build the Docker image

```bash
docker build -t playwright-tests .
```

#### Run tests using Docker

```bash
# Using docker run (you need to pass environment variables)
docker run --rm \
  -e PROJECT_PUBLIC_KEY=your_project_key \
  -e API_TOKEN=your_api_token \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests
```

#### Run tests using Docker Compose (recommended)

```bash
# Make sure your .env file exists with PROJECT_PUBLIC_KEY and API_TOKEN
docker-compose up --build
```

#### Run tests in headless mode with Docker Compose

```bash
docker-compose up --build playwright-tests
```

#### Clean up Docker resources

```bash
# Remove the built image
docker rmi playwright-tests

# Remove all containers and networks created by docker-compose
docker-compose down
```

### Docker Environment Variables

The Docker setup uses the same environment variables as the local setup:

- `PROJECT_PUBLIC_KEY` - Your project's public key
- `API_TOKEN` - Your API token

These can be set in your `.env` file (for docker-compose) or passed directly to the `docker run` command.

### Docker Benefits

- **Consistent Environment**: Same Node.js version, Playwright version, and browser versions across all machines
- **Isolated Dependencies**: No conflicts with your local Node.js or browser installations
- **Easy CI/CD Integration**: Ready to use in continuous integration pipelines
- **No Local Setup Required**: No need to install Node.js, Yarn, or Playwright locally

## Rules

- Please do not fork the repo, clone it and put it in your own github.
- When possible use selectors which resemble how users interacts with the page.
- Don't push the .env file to the repository.
- If you have any questions or need help please ask us.

## Part 1

Add the two missing steps to the test. In the first step click on the button "Simulate a Conversation" a popup will open with livechat preview. Dismiss the running chatbot, send the message and verify that it reached the user panel. In the second step, send a reply message from the user panel.

## Part 2 (Optional)

Use a docker to containerize project. Use the official Playwright Docker image or build a custom image. Include information how to run test from the docker side in the readme.

Good luck!
