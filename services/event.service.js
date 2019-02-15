const Event = require('../entities/event.model')

module.exports.createEvent = async (event) => {
    try {
        await event.save()
        await event.location.save()
        await event.location.address.save()
        if (event.programs !== undefined) {
            saveAll(event.programs)
        }
        return event
    } catch (e) {
        return false;
    }
}

const saveAll = async (data) => {
    if (data instanceof Array) {
        data.forEach(async (item) => {
            await item.save()
        })
    }
}

module.exports.find = async (query) => {
    try {
        return await Event.find(query)
    } catch (e) {
        return false
    }
}

module.exports.findById = async (id) => {
    try {
        return await Event.findById(id).populate('organizer')
    } catch (e) {
        return false
    }
}