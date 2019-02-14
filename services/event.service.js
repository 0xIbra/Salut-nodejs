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