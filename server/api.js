
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const User = require('./db/models/user');
const Keyword = require('./db/models/Keyword');
const Route = require('./db/models/route');
const keyword_route = require('./db/models/keyword_route');
const Event = require('./db/models/event');

const userController = require('./db/controllers/userController');
const routeController = require('./db/controllers/routeController');
const eventController = require('./db/controllers/eventController');

const googleApiDirections = require('./googleApiDirections');
const app = express();

app.use(bodyParser.json());

app.post('/getRouteFromGoogle', (req, res) => {
    // req.body.start = 40.8534229,-73.9793236
    // req.body.end = 40.7466059,-73.9885128
    // req.body.waypoints = latlon | latlon | ...NOT USED
    googleApiDirections(req.body.start, req.body.end, (data) => {
        res.send(data);
    });
});

app.post('/signup', (req, res) => {
            //check if existing user..
            //login or add..
            //reurn userID from db
            const userEmail = req.body.email
            new User({ email: userEmail}).fetch()
                .then((user) => {
                    if (!user) {
                        //add new user
                        userController.createUser(req.body)
                           .then((user) => {
                            // const data = {
                            //     'userId': user['id'],
                            //     'username': user['username']
                            // };
                            res.status(200).send(user)
                        });
                    } else {
                        //const userPassword = user.password
                        //existing user
                        // User.comparePassword(userPassword, (matches) => {
                        //         if (matches) {
                        //             //log in
                                    // var data = {
                                    //     'userId': user['id'],
                                    //     'username': user['username']
                                    // };

                                    res.status(200).send(JSON.stringify(user))
                                // } else {
                                //     //send resp with error, wrong password
                                //     res.send(401, 'wrong password!')
                                // }
                      //  })
                  }
            })
 });

        // app.post('/updateUser', (req, res)=>{
        //   userController.updateUser(req.body.userId, req.body.data, (user)=>{
        //     res.send(user);
        //   });
        // });

        // app.post('/addRoute', (req, res)=>{
        //   userController.addRoute(req.body.userId, req.body.routeId, (user)=>{
        //     res.send(user);
        //   });
        // });



app.post('/searchRoutes', (req, res) => {
    //keywords is an array

  });

app.post('/createRoute', (req, res) => {
  const keywordIdList = [];
  var keyword_id;
  var route_id;
  var keywords = JSON.parse(req.body.keywords);
    //var addWords = helpers.generateKeywords(req.body)
    //keywords: req.body.keywords
    //"{title:'foo',start:{'lat:lon'},end:{lat:lon},keywords:'[key,key]',routeObject:'{sdfasf}''}"
    //on insert to routes, .get() route_id. on insert to keywords,
    // .get() each keword_id and insert pairs into this join table
    //add route object to route table
    routeController.createRoute(req.body)
      .then((input) => {
        route_id = input['id']
        //add each keyword to keywords table if new, else get id
        keywords.forEach((input) => {
           new Keyword({word:input}).fetch()
               .then ((result) => {
                   if(!result){
                     //new keyword.. make a new entry and get id
                     //add keyword_id to join table with route_id
                     new Keyword({word:input}).save()
                        .then((keyword) => {
                             keyword_id = keyword['id']
                             keywordIdList.push(keyword_id)
                        })
                   } else {
                     //existing keyword. get the keyword_id
                     keyword_id = result['id']
                     keywordIdList.push(keyword_id)
                   }
              })
        })
      })
      //add keyword_id to join table with route_id
      keywordIdList.forEach((input) => {
         const data = {
            keyword_id: input,
            route_id: route_id,
          }
        new keyword_route(data).save()
           .then((resp)=>{
          console.log('db updated')
        });
    })
 res.send('ok')
});



app.post('/createEvent', (req, res) => {
    eventController.createEvent(req.body, (event) => {
      //  var transporter = nodemailer.createTransport('smptps://karmickoalas42%40gmail.com:makersquare42@smptp.gmail.com');
        JSON.parse(event.get('invitees')).forEach((invitee) => {
            var options = {
                to: invitee,
                subject: 'Karmic Koalas',
                html: '<b>Karmic Koalas</b>'
            };
            transporter.sendMail(options, (err, data) => {
                if (err) return console.error(err);
                console.log("Message sent:", data.response);
            });
        });
    });
    res.send("ok");
});


app.post('/joinEvent', (req, res) => {

});

app.post('/getEvents', (req, res) => {
    userController.getEvents(req.body.id, (events) => {
        res.send(events);
    });
});

// app.post('/login', (req, res)=>{

// });

// app.post('/logout', (req, res)=>{

// });
module.exports = app;
