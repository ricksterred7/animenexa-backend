import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './configs/express.config';
import { connectToMongo } from './configs/mongodb.config';
/* This is a catch-all for any uncaught exceptions. */
process.on('uncaughtException', (err) => {
    process.exit(1);
});

/* This is a catch-all for any unhandled rejections. */
process.on('unhandledRejection', (reason, promise) => {
    process.exit(1);
});

/* This is a callback function that is called when the server is started. */
app.listen(process.env.PORT, async () => {
    await connectToMongo();
    console.log(`Server Started on Port : ${process.env.PORT} 💚`);

});

export default app;
