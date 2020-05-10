var apiKey = `108258adba7f1bfffa0206980a7a93b2`;

//Event Listners
window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDes = document.querySelector(".temp-des");
  let tempDeg = document.querySelector(".temp-deg");
  let locationTimezone = document.querySelector(".location-timezone");
  let tepmeratureSection = document.querySelector(".temp-deg-section");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          const { weather, name, main } = data;
          let description = weather[0].main;

          let temp = main.temp - 273.15;
          let iconId = weather[0].icon;
          //Setting DOM elements from api
          tempDeg.textContent = temp.toFixed(2);
          tempDes.textContent = description;
          locationTimezone.textContent = name;
          setIcons(document.querySelector(".icon"), iconId);

          //aas
          tepmeratureSection.addEventListener("click", () => {
            if (tepmeratureSection.children[1].textContent === "C") {
              tepmeratureSection.children[0].textContent = (
                (temp * 9) / 5 +
                32
              ).toFixed(2);
              tepmeratureSection.children[1].textContent = "F";
            } else {
              tepmeratureSection.children[0].textContent = temp.toFixed(2);
              tepmeratureSection.children[1].textContent = "C";
            }
          });
        });
    });
  } else {
  }

  function setIcons(iconElement, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = getIconCode(iconId);
    console.log(getIconCode(iconId));
    skycons.play();
    return skycons.set(iconElement, Skycons[currentIcon]);
  }
});
