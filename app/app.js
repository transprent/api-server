const Application = require('souljs').Application;

const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    throw err;
  }
});

app.use(async (ctx, next) => {
  // b();
  next();
});

app.start();
