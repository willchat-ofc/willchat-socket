import { server } from "./config/app";
import { logger } from "../utils/logger";

const portLocal = 8080;
const portHost = process.env.PORT;
const PORT = portHost || portLocal;

server.listen(PORT, () => {
  logger.info("listening on port " + PORT);
});
