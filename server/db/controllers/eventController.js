var Event = require('../models/event')

module.exports = {
createEvent: (body, cb)=>{
  const data = {
    hostId: body.hostId,
    routeId: body.routeId,
    invitees: body.invitees,
    acceptedInvitees: body.acceptedInvitees
  }
    return new Event(data).save()
 }
}
