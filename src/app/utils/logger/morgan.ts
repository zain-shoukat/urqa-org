import morgan, { StreamOptions } from 'morgan';

import { server } from '../../../config/index.js';
import { CustomLogger } from './winston.js';

const stream: StreamOptions = {
  write: (message: string) =>
    CustomLogger.logger.http(message),
};

const skip = () => {
  const env = server.nodeEnv || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':method :url :status :res[content-length] - :response-time ms',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream: stream, skip: skip },
);

export { morganMiddleware as MorganMiddleWare };
