const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { read } = require('fs');

const app = express();

//Define paths for express config
const defaultPage = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath)

app.use(express.static(defaultPage))

app.get('',(req,res)=>{
  res.render('index',{
      title:'Ninja Village',
      Name:'Hashirama'
  });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Nine Tales',
        Name:'Sage of Six Paths'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Ninja',
        message:'Please be calm we will call you in a minute',
        Name:'Tunade'
    });
})

app.get('/ninja',(req,res)=>{
    res.send('This is MY NINDO,...My ninja way');
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help article not founnd'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'Please provide an Address message'
        })
    }
    //GEOCODE
    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        //FORECAST CODE
            forecast(longitude,latitude, (error, fordata) => {
              if(error){
                  return res.send({error})
              }

              res.send({
                forecast:fordata,
                location,
                address:req.query.address
            })
            })
        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Please select a specific product'
        })
    }
    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('The is running');
})