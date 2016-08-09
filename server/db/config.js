//
// var db = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'karmic'
//   }
// });
//
// db.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.schema.createTable('users', function(user) {
//         user.increments('id').primary();
//         //user.string('name', 100);
//         user.string('username', 100).unique();
//         user.string('email', 100).unique();
//         user.string('password', 100);
//         user.timestamps();
//       })
//       .createTable('keywords', function(keyword) {
//         keyword.increments('id').primary();
//         keyword.string('word', 100);
//         keyword.timestamps();
//       })
//       .createTable('routes', function(route) {
//         route.increments('id').primary();
//         route.string('title', 100);
//         route.json('start', 100);
//         route.json('end', 100);
//         route.json('points_of_interest');
//         route.json('route_object');
//         route.timestamps();
//       })
//       .createTable('events', function(event) {
//         event.increments('id').primary();
//         event.string('name', 100);
//         event.integer('host_Id', 100).references('users.id');
//         event.integer('route_Id', 100).references('routes.id');
//         event.json('invitees', 400); //this is a list of contacts from user phonebook
//         event.timestamps();
//       })
//       .createTable('events_participants', function(eptable) {
//         eptable.integer('events_id',11).unsigned().references('id').inTable('events');
//         eptable.integer('participant',11).unsigned().references('id').inTable('users');
//       })
//       .createTable('keywords_routes', function(table) {
//         table.integer('route_id',11).unsigned().references('id').inTable('routes');
//         table.integer('keyword_id',11).unsigned().references('id').inTable('keywords');
//       })
//       .then(function(table) {
//         table.index('keyword_id');
//       });
//   }
// });
//
// var bookshelf = require('bookshelf')(db);
// module.exports = bookshelf;
