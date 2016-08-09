
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const googleApiDirections = require('./googleApiDirections');
const app = express();
var mysql = require('mysql');

app.use(bodyParser.json());

var db_config = {
  connectionLimit: 15,
  port     :  3030,
  host     : 'mysqlcluster11.registeredsite.com',
  user     : 'adminkoala',
  password : '!Qaz2wsx3edc',
  database : 'koala',
  multipleStatements: true,
//  acquireTimeout: 1000000000,
  minConnections: 1
};

var createConnection = function createConnection() {
    var connection = mysql.createConnection(db_config);
  console.log("connected",connection)
    connection.connect(function (err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
        }
        else {
          console.log("connected")
        }
    });

    connection.on('error',function(err){
        console.error(err);
        createConnection();
    });
};

createConnection();

app.post('/getRouteFromGoogle', (req, res) => {
    // req.body.start = 40.8534229,-73.9793236
    // req.body.end = 40.7466059,-73.9885128
    // req.body.waypoints = latlon | latlon | ...NOT USED
    googleApiDirections(req.body.start, req.body.end, (data) => {
        res.send(data);
    });
});

 app.post('/signup', (req, res) => {
   const email = req.body['email'];
   const username = req.body['username'];
   const password = req.body['password'];
   //res.send(email)
   var callback =  (resp)=>{res.send('ok')}

   (email, username, password, callback) => {
   var sql = 'INSERT into Users (email, username, password) values(?, ?, ?);';
   var values = [email, username, password];

   connection.query(sql, values, function(err){
     if(err) {
       console.error('error in db addUser: ', err);
     }
   });

   connection.query('SELECT id FROM Users WHERE email = ?;', email, function(err, data) {
     if(err) {
       console.error("error in db addUser: ", err);
     }
     callback(data);
   });
 }
 })
 //   // Get all the user information
 //    const email = req.body['email'];
 //    const username = req.body['username'];
 //    const password = req.body['password'];
 //    // If no missing data
 // if (email !== null && username !== null && password !== null) {
 //     // Search in db in User table for existing email
 //       console.log(email)
 //    //  db.query('SELECT * FROM Users WHERE email = ?;', [email], (err, rows) => {
 //    db.query(`SELECT * FROM Users; `, (err, rows) => {
 //       // If it doesn't exists
 //        console.log('indb')
 //       if (err){console.log(err)}
 //       if(rows.length === 0) {
 //         // Encrypt password
 //         console.log(password)
 //         //password = bcrypt.hashSync(password);
 //         // Create user
 //         db.query('INSERT INTO Users SET email = ?, username = ?, password = ?;',
 //         [email, username, password],
 //            (err, rows) => {
 //           if(err){
 //             console.log(err);
 //             res.send('error');
 //           }
 //           //return user_id and username to client for storage on device
 //           //util.createToken(request, response, rows.insertId);
 //           const data = {userId:'foo'}
 //           res.send(JSON.stringify(data));
 //         });
 //       } else {
 //         //exitsing user
 //         // Password check
 //         bcrypt.compare(password, rows[0].password, function(err, result) {
 //           if (err) {
 //             console.error(err);
 //             res.send('error');
 //           } else if (result) {
 //             //return user_id and username to client for storage on device
 //             //util.createToken(request, response, rows.insertId);
 //             const data = {userId:'foo'}
 //             res.send(JSON.stringify(data));
 //           } else {
 //             // Password mismatch, unauthorized
 //             console.log("Password mismatch!");
 //             res.send('ok');
 //           }
 //         });
 //
 //       }
 //     });
 //   } else {
 //     res.send('ok');
 //   }
 //});


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
