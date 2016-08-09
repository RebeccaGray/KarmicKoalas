var Route = require('../models/route.js');

module.exports = {
  createRoute: (body, cb)=>{
     const data = {
        title: body.title,
        start: body.start,
        end: body.end,
        route_object: body.routeObject
      }
     return new Route(data).save()
  }
}
 // searchRoutes: (body, cb)=>{
  //   new Route.where('keyword1','<>',body.keyword1 ||  ).then((keyword)=>{
  //     Promise.all(JSON.parse(user.get('routes')).map((eventId)=>{
  //       return new Route({id: routeId}).fetch()
  //     })).then((routes)=>{
  //       cb(routes);
  //     })
  //   })
 //  }


//search by proximity to start & end
//     search within some distance of start & end locs


//make join table of keyId and routeId
