var apiKey = `108258adba7f1bfffa0206980a7a93b2`;

//Event Listners
window.addEventListener("load", () => {
  let monthText = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let long;
  let lat;
  let tempDes = document.querySelector(".temp-des");
  let tempDeg = document.querySelector(".temp-deg");
  let locationTimezone = document.querySelector(".location-timezone");
  let feelsLikeSpan = document.querySelector(".temp-info .feels-like .val");
  let tempMinSpan = document.querySelector(".temp-info .min .val");
  let tempMaxSpan = document.querySelector(".temp-info .max .val");
  let sunriseSpan = document.querySelector(".sunset-rise .sunrise .val");
  let sunsetSpan = document.querySelector(".sunset-rise .sunset .val");
  let windSpeedSpan = document.querySelector(".wind .wind-speed .val");
  let windDirSpan = document.querySelector(".wind .wind-dir .val");
  let humiditySpan = document.querySelector(".humidity .val");
  let visibilitySpan = document.querySelector(".visibility .val");
  let pressureSpan = document.querySelector(".pressure .val");
  let canvasSunrise = document.querySelector(".canvas-sunrise");
  let canvasSunset = document.querySelector(".canvas-sunset");
  let currentDate = document.querySelector(".currentDate");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          // extracting values
          const { weather, name, main, visibility, wind, sys, dt } = data;
          let description = weather[0].main;
          let temp = main.temp - 273.15;
          let feelsLike = (main.feels_like - 273.15).toFixed(2);
          let tempMin = (main.temp_min - 273.15).toFixed(2);
          let tempMax = (main.temp_max - 273.15).toFixed(2);
          let pressure = main.pressure;
          let humidity = main.humidity;
          let windSpeed = wind.speed;
          let windDeg = wind.deg;
          let sunset = new Date(sys.sunset * 1000);
          let sunrise = new Date(sys.sunrise * 1000);
          let today = new Date();
          let iconId = weather[0].icon;

          //Setting DOM elements from api
          tempDeg.textContent = temp.toFixed(2);
          tempDes.textContent = description;
          locationTimezone.textContent = name;
          feelsLikeSpan.textContent = feelsLike;
          tempMinSpan.textContent = tempMin;
          tempMaxSpan.textContent = tempMax;
          pressureSpan.textContent = pressure;
          humiditySpan.textContent = humidity;
          currentDate.textContent =
            today.getDate() +
            " " +
            monthText[today.getMonth()] +
            " ," +
            today.getFullYear() +
            " " +
            `${today.getHours() % 12}:${today.getMinutes()} ${
              today.getHours() > 12 ? "PM" : "AM"
            }`;
          if (isNaN(visibility)) {
            visibilitySpan.textContent = "N/A";
          } else {
            visibilitySpan.textContent = (visibility / 1000).toFixed(2);
          }

          windSpeedSpan.textContent = windSpeed;
          windDirSpan.textContent = windDeg;
          sunriseSpan.textContent =
            sunrise.getHours() + ":" + sunrise.getMinutes();
          sunsetSpan.textContent =
            (sunset.getHours() % 12) + ":" + sunset.getMinutes();

          setIcons(canvasSunrise, "01d", "#c9c9c9");
          setIcons(canvasSunset, "01n", "#c9c9c9");

          setIcons(document.querySelector(".icon"), iconId, "white");

          //changing temp format
          document
            .querySelector(".changeUnit")
            .addEventListener("click", (event) => {
              if (event.target.textContent === "F") {
                tempDeg.textContent = ((temp * 9) / 5 + 32).toFixed(2);
                feelsLikeSpan.textContent = ((feelsLike * 9) / 5 + 32).toFixed(
                  2
                );
                feelsLikeSpan.nextSibling.textContent = "F";
                tempMinSpan.textContent = ((tempMin * 9) / 5 + 32).toFixed(2);
                tempMinSpan.nextSibling.textContent = "F";
                tempMaxSpan.textContent = ((tempMax * 9) / 5 + 32).toFixed(2);
                tempMaxSpan.nextSibling.textContent = "F";
                event.target.textContent = "C";

                tempDeg.setAttribute("data-content", "F");
              } else {
                tempDeg.textContent = temp.toFixed(2);
                feelsLikeSpan.textContent = feelsLike;
                feelsLikeSpan.nextSibling.textContent = "C";
                tempMinSpan.textContent = tempMin;
                tempMinSpan.nextSibling.textContent = "C";
                tempMaxSpan.textContent = tempMax;
                tempMaxSpan.nextSibling.textContent = "C";
                event.target.textContent = "F";

                tempDeg.setAttribute("data-content", "C");
              }
            });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  } else {
    locationTimezone.textContent = "Error Fetching Data";
  }

  function setIcons(iconElement, iconId, color) {
    const skycons = new Skycons({ color: color });
    const currentIcon = getIconCode(iconId);
    skycons.play();
    return skycons.set(iconElement, Skycons[currentIcon]);
  }
});
