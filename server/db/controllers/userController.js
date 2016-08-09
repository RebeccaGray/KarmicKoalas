var User = require('../models/user.js');

  module.exports = {
  createUser: (body) =>{
    const data = {
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password
    }
    return new User(data).save()
  }
}

  //,
  // getUser: (userId, cb)=>{
  //   new User({id: userId}).fetch().then((user)=>{
  //     cb(user);
  //   });
  // },
  // updateUser: (userId, data, cb)=>{
  //   new User({id: userId}).save(data).then((user)=>{
  //     cb(user);
//   //   });
//   // },
//   addEvent: (userId, eventId, cb)=>{
//     new User({id: userId}).fetch().then((user)=>{
//       var events = JSON.parse(user.get('events'));
//       events.push(+eventId);
//       new User({id: userId}).save({events: JSON.stringify(events)}).then((user)=>{
//         cb(user);
//       });
//     });
//   },
//   getEvents: (userId, cb)=>{
//     new User({id: userId}).fetch().then((user)=>{
//       Promise.all(JSON.parse(user.get('events')).map((eventId)=>{
//         return new Event({id: eventId}).fetch()
//       })).then((events)=>{
//         cb(events);
//       });
//     });
//   },
//   addRoute: (userId, routeId, cb)=>{
//     new User({id: userId}).fetch().then((user)=>{
//       var routes = JSON.parse(user.get('routes'));
//       routes.push(+routeId);
//       new User({id: userId}).save({routes: JSON.stringify(routes)}).then((user)=>{
//         cb(user);
//       });
//     });
//   },
//   getRoutes: (id, cb)=>{
//     new User({id: id}).fetch().then((user)=>{
//       Promise.all(JSON.parse(user.get('routes')).map((eventId)=>{
//         return new Route({id: routeId}).fetch()
//       })).then((routes)=>{
//         cb(routes);
//       })
//     })
//   }
// };
