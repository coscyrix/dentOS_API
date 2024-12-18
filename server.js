// server.js

import ServerConfig from './config/server.config.js';

import {
  userRouter,
  authRouter,
  benefitsRouter,
  planRouter,
  userProfileRouter,
} from './routes/index.js';

async function main() {
  try {
    const PORT = process.env.PORT;
    const server = new ServerConfig({
      port: PORT,
      routers: [
        userRouter,
        authRouter,
        benefitsRouter,
        planRouter,
        userProfileRouter,
      ],
    });
    await server.listen();
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`);
    console.error(error);
  }
}

main();
