const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=92495d000d8d67319984fa4f1ed50efd&query=' + latitude + ',' + longitude+'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' - It is currently ' + body.current.temperature + '°C  out. hunidity is '+body.current.humidity + ' wind speed '+ body.current.wind_speed )
        }
    })
}

module.exports = forecast