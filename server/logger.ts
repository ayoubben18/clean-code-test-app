import pino from "pino";
import PinoPretty from "pino-pretty";
const stream = PinoPretty({
  colorize: true,
});
export const pinoLogger = pino(stream);
