const request = require('request')

log = console.log

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiamhwcGJhcnRoIiwiYSI6ImNrZDBrZG90MTA4M20yeG52YWVrdXVwdmUifQ._9tJrqj4QuCypUWpKmR2TA'
    
    request({url, json: true}, (error, {body} = {}) =>{
        if (error){
            callback('Unnable to connect', undefined)
        } else if(body.features.length === 0){
            callback('Unnable to find location')
        } else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode