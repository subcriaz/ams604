const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const EndUser = require('../../models/enduser');

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const enduser = async enduserId => {
  try {
    const enduser = await EndUser.findById(enduserId);
    return {
      ...enduser._doc,
      _id: enduser.id
      //,
      //createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw new Error('4-End User find by id  :  ' + err);
  }
};


module.exports = {

getallendusers :  async () => {
  
    try {
      const allendusers = await EndUser.find();
    return allendusers.map(enduser1 => {
        return {
        ...enduser1._doc,
        _id: enduser1.id
        
      };  
    });

    }catch (err) {
      throw ' error in getallendusers()  '+err;
    }
},


  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5ee0def30928d31ad81d338e'
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById('5ee0def30928d31ad81d338e');

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  createEndUser: async args => {
    try {
      const existingEndUser = await EndUser.findOne({ usermobileno: args.endUserInput.usermobileno });
      if (existingEndUser) {
        throw new Error('1-EndUser exists already. '  + args.endUserInput.usermobileno);
        
      }
      
      const hashedPassword = await bcrypt.hash(args.endUserInput.userpw, 12);

      const enduser = new EndUser({
        usermobileno: args.endUserInput.usermobileno,
        userlabel : args.endUserInput.userlabel,
        username : args.endUserInput.username,
        userpw: hashedPassword
      });

      const result = await enduser.save();

      return { ...result._doc, userpw: null, _id: result.id };
    } catch (err) {
      throw new Error('2-End User Save error :  '  +err);
    }
  }


};
