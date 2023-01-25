const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000, function(){
    console.log("Port running on port 3000");
});

app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/weather", function(req, res){
    const query = req.body.cityName;
    const apiKey = "6bdd737247f9b8b5969e244b5bf10d40";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees fahrenheit.</h1>" );
            res.write("<img src=" + imageURL + ">");
            res.write("<img src='icon'")
            res.send()
        })
    })
})