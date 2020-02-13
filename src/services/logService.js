import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://2c6a6f0b108b43c6a80dcfeb9da961be@sentry.io/1962493"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
