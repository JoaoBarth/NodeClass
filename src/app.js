const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'barth'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "no address provided"
        })
    }
    else{
        geocode(req.query.address, (error,geocodeData) => {
            if(error) {
                return res.send({
                    error: "Error geocoding address"
                })
            }
            forecast(geocodeData, (error, {forecast, temperature, location} = {}) =>{
                if(error) {
                    return log('Error: ', error)
                }
                res.send({
                    address: req.query.address,
                    forecast,
                    temperature,
                    location,
                    humidity
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "no search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'barth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'help help help',
        title: 'Help',
        name: 'barth'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'barth',
        errorMessage: "Help article not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'barth',
        errorMessage: "Page not Found"
    })
})


app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
