const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express
const publicDirectory = path.join(__dirname,'../public');
const viewsDirectory = path.join(__dirname,'../templates/views');
const partialsDirectory = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsDirectory)

hbs.registerPartials(partialsDirectory)

// Setup static directory
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Toth'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'App about page',
        name: 'Toth'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'App HELP page',
        helpText: 'Help text',
        name: 'Toth'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        res.send({
            error: 'Must provide search term'
        })
    }else{

        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }else{
    
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    }else{
                        return res.send({
                            forecast: forecastData,
                            location: location,
                            address: req.query.address
                        })
                    }
                })
            }
        })

    }
})

app.get('/products',(req,res)=>{

    console.log(req.query)

    if(!req.query.search){
        res.send({
            error: 'Must provide search term'
        })
    }else{
        res.send({
            products: []
        })
    }
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'App 404 help not foud',
        errorMessage: 'Help page not found!',
        name: 'Toth'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'App 404 page not found',
        notFoundText: 'Page not found 404!',
        name: 'Toth'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})