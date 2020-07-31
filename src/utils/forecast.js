const request = require('request')

log = console.log

const forecast = (coordinates, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=17b11b3db90544d74ab595b0c78162bf&query=' + coordinates.longitude + ',' + coordinates.latitude

    request({url, json: true}, (error,{body} = {}) =>{
        if (error){
            callback('Unnable to connect', undefined)
        } else if(body.error){
            callback('Unnable to find location')
        } else{
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                forecast: body.current.weather_descriptions,
                location: coordinates.location
            })
        }
    })
}

module.exports = forecast