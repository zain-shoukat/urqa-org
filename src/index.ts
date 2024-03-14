// import * as dotenv from 'dotenv';
// dotenv.config(); // load env variables
import 'reflect-metadata';
import WebServer from './app/index.js';
import { server } from './config/env.js';
import { env } from 'process';

enum ExitStatus {
  failure = 1,
  success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.log(
    '\n\n\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\n\n ~ App exiting due to an unhandled promise: ',
    promise,
  );
  console.log(
    '\n\n\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\n\n ~ App exiting due to an unhandled promise reason: ',
    JSON.stringify(reason),
  );
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log(
    '\n\n\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\n\n ~ App exiting due to an uncaught exception:',
    JSON.stringify(error),
  );
  process.exit(ExitStatus.failure);
});

(async (): Promise<void> => {
  try {
    const SERVER = new WebServer();
    await SERVER.init();
    SERVER.start(
      server.port,
      server.container,
      server.exposed,
    );
    const EXIT_SIGNALS: NodeJS.Signals[] = [
      'SIGINT',
      'SIGTERM',
      'SIGQUIT',
    ];
    for (const EXIT_SIGNAL of EXIT_SIGNALS) {
      process.on(EXIT_SIGNAL, async () => {
        try {
          //   await SERVER.close();
          console.log('App exited with success');
          process.exit(ExitStatus.success);
        } catch (error) {
          console.log(
            '\n\n\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\n\n ~ App exited with error:',
            JSON.stringify(error),
          );
          console.log(error);
          process.exit(ExitStatus.failure);
        }
      });
    }
  } catch (error) {
    console.log(
      '\n\n\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n\n\n ~ App exited with error:',
      JSON.stringify(error),
    );
    console.log(error);
    process.exit(ExitStatus.failure);
  }
})();
