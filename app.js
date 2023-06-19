const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const key = "API key"
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(data);

      res.write(
        "<h1>The temparature in "+ city + " is " + temp + " degree celsius </h1>"
      );
      res.write("<p>The weather is " + weatherDescription + "</p>");
      res.write("<img src=" + imageUrl + ">");

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
