const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User {
  _id: ID!
  usermobileno  : String! 
  userlabel     : String!
  username      : String!
  userpw        : String
  ismanager     : String!
  usermanagerid : String!
  userststus    : String!
  usercreatedon : String!
  usercreatedby : String!
  }



input UserInput {
  usermobileno  : String!
  userlabel     : String!
  username      : String!
  userpw        : String! 
  ismanager     : String!
  usermanagerid : String!
  userststus    : String!
  usercreatedon : String!
  usercreatedby : String!
  
}



type RootQuery {
  getAllUsers :[User]!
  getUserByMobileNo (usermobileno  : String ) :User
}

type RootMutation {

    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
