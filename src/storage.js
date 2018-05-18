var _ = require("lodash")
import { warn } from "./debug"

export function storageAvailable(type) {
    try {
        var storage = window[type]
        var x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    }
    catch (e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage.length !== 0
    }
}


export function populateStorage() {
    setArrayToStorage("localStorage", "days", _.range(7))
    setArrayToStorage("localStorage", "speeds", _.range(3))
    setArrayToStorage("localStorage", "expired", _.range(2))
}


export function getZeroBasedArrayFromStorage(storageType, key, length) {
    // fetch a string representing an (unordered) array from storage,
    // verify it's legitimacy, convert into an array of integers and
    // return said array.
    // storageType: "localStorage" or "sessionStorage"
    // key: key name to fetch
    // length: max number of items in array

    if (!_.includes(["localStorage", "sessionStorage"], storageType)) {
        throw "Invalid storageType requested"
    }

    var storage = window[storageType]
    var value = storage.getItem(key)

    if (value.length == 0) {
        // They turned off all days or speeds, so just return an empty array
        return []
    }

    // build regex to check validity of content.
    // pretty simple at the moment, could do something more fancy with
    // /()[0-9]{1,len},?)+/ in the future.
    var validDigitsRE = new RegExp("^[," + _.range(length).join('') + "]*$")
    warn("validDigitsRE: " + validDigitsRE)

    if (!validDigitsRE.test(value)) {
        throw "Invalid string representation for an array of given length:" + value
    }

    // "0,2,2,6" -> ["0", "2", "2", "6"] (split)
    // ["0", "2", "2", "6"] -> ["0", "2", "6"] (uniq)
    // ["0", "2", "6"] -> [0, 2, 6] (map)
    var arrayified = _.map(_.uniq(value.split(',')), _.partial(parseInt, _, 10))
    warn("array from storage: " + arrayified)

    return arrayified
}

export function setArrayToStorage(storageType, key, array) {
    // docstring

    if (!_.includes(["localStorage", "sessionStorage"], storageType)) {
        throw "Invalid storageType requested"
    }

    var storage = window[storageType]
    storage.setItem(key, array) // this will autoconvert [0, 1, 2] to "0,1,2"
}
