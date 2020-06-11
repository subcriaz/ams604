const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
.connect(
  // `mongodb+srv://${process.env.MONGO_USER}:${
   //  process.env.MONGO_PASSWORD
   //}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
   'mongodb+srv://riz604:Pasw0rd09@cluster-riaz-uuxpx.mongodb.net/events-react-dev?retryWrites=true&w=majority'

   )
  .then(() => {
    app.listen(80);
    console.log('ok conn  80');
  })
  .catch(err => {
    console.log( 'rr in onn' +err);
  });
