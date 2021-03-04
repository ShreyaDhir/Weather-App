window.addEventListener('load', () => {
  let lat;
  let long;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degrees');
  let locationTimezone = document.querySelector('.location-timezone');
  let locationIcon = document.querySelector('.weather-icon');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      //const proxy = "https://cors-anywhere.herokuapp.com"
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=9bbb698ddd701b20d490c2c664ac01cc`

      fetch(api)
        .then(response => {
           return response.json()
      })
        .then(data => {
          console.log(data)
          const {
            feels_like
          } = data.main;
          
          const {
              description
          } = data.weather[0];

        //   const {
        //    name
        // } = data.main[0];

          //Set DOM elements from the API
          temperatureDegree.textContext = feels_like;;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;

           //SETTING UP THE ICON 
           var icons = new Skycons({
            "color": "white"
        });

        icons.set("Clear", Skycons[CLEAR_DAY]);
        icons.set("Clear-night", Skycons[CLEAR_NIGHT]);
        icons.set("Partly-cloudy-day", Skycons[PARTLY_CLOUDY_DAY]);
        icons.set("Partly-cloudy-night", Skycons[PARTLY_CLOUDY_NIGHT]);
        icons.set("Clouds", Skycons[CLOUDY]);
        icons.set("Rain", Skycons[RAIN]);
        icons.set("Sleet", Skycons[SLEET]);
        icons.set("Snow", Skycons[SNOW]);
        icons.set("Wind", Skycons[WIND]);
        icons.set("Fog", Skycons[FOG]);
        icons.play();
        })
      }
    ); 
  }  
})


// ${lat},${long}