const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type EndUser {
  _id: ID!
  usermobileno : String! 
  userlabel: String!
  username: String!
  userpw: String
  }


type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

input EndUserInput {
  usermobileno:String!
  userlabel: String
  username: String
  userpw: String 
  
}



type RootQuery {
  getallendusers :[EndUser]!
  events: [Event!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createEndUser(endUserInput: EndUserInput): EndUser
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
