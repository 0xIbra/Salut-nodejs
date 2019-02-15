const Event = require('../../entities/event.model')

const supports = (event) => {
    if (!event instanceof Event)
        return false

    return true
}


module.exports.canView = async (event, user) => {
    if (!supports(event)){
        console.log('nope')
        return false
    }

    if (event.published)
        return true

    if (user.role === "ADMIN")
        return true

    if (user._id.equals(event.organizer._id))
        return true
    else
        return false
}


module.exports.canEdit = (event, user) => {
    if (!supports(event))
        return false

    if (user.role === "ADMIN")
        return true

    if (user._id === event.organizer._id)
        return true
    else
        return false
}