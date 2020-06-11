const bcrypt = require('bcryptjs');

const User = require('../../models/user');


const user = async userId => {
  try {
    const enduser = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id
      
    };
  } catch (err) {
    throw new Error('4-User find by id  :  ' + err);
  }
};


module.exports = {

getAllUsers :  async () => {
  
    try {
      const allusers = await User.find();
    return allusers.map(user => {
        return {
        ...user._doc,
        _id: user.id
        
      };  
    });

    }catch (err) {
      throw ' error in getallendusers()  '+err;
    }
},

//(usermobileno: UserMobileNo) :User

getUserByMobileNo :  async args => {
  try {
    const existingUser = await User.findOne( {usermobileno : args.usermobileno });
    if (!existingUser) {
      throw new Error('1-User does not exist with mobile no : ' + args.usermobileno  );
      
    }
    return existingUser; 
    //.map(user => {
      //return {
      //...user._doc,
      //_id: user.id
     
    //};  
  //}

  }catch (err) {
    throw ' error in getuserbymob()  '+err;
  }
},
 
  
  
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ usermobileno: args.userInput.usermobileno });
      if (existingUser) {
        throw new Error('1-User exists already. '  + args.userInput.usermobileno);
        
      }
      
      const hashedPassword = await bcrypt.hash(args.userInput.userpw, 12);

      const user = new User({
        usermobileno: args.userInput.usermobileno,
        userlabel : args.userInput.userlabel,
        username : args.userInput.username,
        userpw: hashedPassword,
        ismanager     : args.userInput.ismanager,
        usermanagerid : args.userInput.usermanagerid,
        userststus    : args.userInput.userststus,
        usercreatedon : args.userInput.usercreatedon,
        usercreatedby : args.userInput.usercreatedby



      });

      const result = await user.save();

      return { ...result._doc, userpw: null, _id: result.id };
    } catch (err) {
      throw new Error('2- User Save error :  '  +err);
    }
  }


};
