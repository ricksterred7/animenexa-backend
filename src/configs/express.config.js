import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import useragent from 'express-useragent';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import http from 'http';
import routes from '../routes';

import passConfig from './passport.config';
import './mongodb.config';

/* This is creating an express app. */
const app = express();

const server = http.createServer(app);

/* This is a middleware that will detect the brandApp agent of the client and add it to the request object. */
app.use(useragent.express());

/* This is serving the upload folder. */
app.use(express.static('public'));

/* This is serving the `node` folder in the `upload` folder. */
//app.use('/node', express.static(path.resolve(__dirname, '../../node/')));

/* This is telling express to parse the body of the request as JSON. */
app.use(express.json());

/* This is limiting the size of the request body to 500kb. */
// app.use(express.urlencoded({ extended: true, limit: '500kb' }));

/* Parsing cookies from the request. */
app.use(cookieParser());

/* This is a middleware that compresses the response. */
app.use(compress());

/* This is telling express to use the passport middleware. */
passConfig(passport);

/* This is telling express to use the passport middleware. */
app.use(passport.initialize());

/* This is a middleware that will add security headers to the response. */
app.use(helmet());

/* This is a middleware that will allow the client to make cross-origin requests. */
app.use(cors());

/* This is a middleware that will sanitize the request body from potentially malicious code. */
app.use(mongoSanitize());

/* This is a middleware that will sanitize the request body from potentially malicious code. */
app.use(xss());

/* This is a middleware that will prevent the server from being possible to be DoSed by a malicious brandApp. */
app.use(hpp());

/* This is telling express to use the routes in the `routes.js` file. */
app.use(routes);

/* This is a catch-all route that will catch all the routes that are not defined in the `routes.js`
file. */
app.all('*', ()=>{
    console.log('route not found!!')
});

export default server;
