const { log } = require("console");
const express = require("express");
const { stat } = require("fs");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {

res.sendFile(__dirname + "/index.html");

    });
    app.post("/", function (req, res) {
            const query= req.body.city;
            const apiKey ="624e8a4acecd2e9b879f5cc4c8451956";
            const unit ="metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit ;


    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const WeatherData = JSON.parse(data)
            const temp = WeatherData.main.temp
            const weaherDesc = WeatherData.weather[0].description
            const icon = WeatherData.weather[0].icon
            const imageURL ="https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently  " + weaherDesc + "</p>");
            res.write("<h1> The temprature in "+ query+" is: " + temp + " Degrees Celsius. </h1>");
            res.write("<img src="+ imageURL+">");
            res.send();
        })
    })
    })


    app.listen(3000,function () {
        console.log("server in port 3001 listening")
    })


