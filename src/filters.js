var _ = require("lodash")

export function filterRides(ride, speeds, expireds, days) {
    let ss = true
    if (/10./.test(ride["pace"])) {
        ss = _.includes(speeds, 0)
    } else if (/16/.test(ride["pace"])) {
        ss = _.includes(speeds, 2)
    } else {
        ss = _.includes(speeds, 1)
    }

    let se = false
    if (_.includes(expireds, 0) && _.includes(expireds, 1)) {
        se = true
    } else {
        let now = new Date()
        let ridedate = Date.parse(ride["when"])
        if ((ridedate < now) && _.includes(expireds, 0)) {
            se = true
        }
        if ((ridedate > now) && _.includes(expireds, 1)) {
            se = true
        }
    }

    let sd = false
    let dateMillis = Date.parse(ride["when"])
    let dateObj = new Date(dateMillis)
    sd = _.includes(days, dateObj.getDay())

    return ss && se && sd
}
