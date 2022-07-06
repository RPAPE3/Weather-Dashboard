var userFormEl = document.querySelector('#user-form');
var citySelectionEl = document.querySelector("#city");
var savedCities = document.querySelector(".saved-cities");
var currentDay = document.querySelector("#current-day");
var day5_forecast = document.querySelector("#day5-forecast")



var SaveTheCity = function () {

    var savedCity = localStorage.getItem("input");
    savedCityBtn = document.createElement('button');
    savedCityBtn.className = "btn"
    savedCityBtn.textContent = savedCity;
    savedCities.appendChild(savedCityBtn);

    if (savedCityBtn.addEventListener("click", function (event) {
        var cityClick = event.target.textContent
        getUserWeather(cityClick);
        getUserFutureWeather(cityClick);
    }));

}


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = citySelectionEl.value;
  
    if (cityName) {
      getUserWeather(cityName);
      getUserFutureWeather(cityName);

      localStorage.setItem("input", cityName)
      SaveTheCity();
  
      citySelectionEl.value = '';
    } else {
      alert('Please enter a valid City Name');
    }
  };

  // fetch request for current day weather forecast. 

  var getUserWeather = function (city) {
    var cityWeatherData = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units=imperial&appid=2da508702f2406bcdbbb02cc77f42804";

    fetch(cityWeatherData)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log(data);
            displayWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect the weather');
      });
  };

  // function for current day weather forecast. 

  var displayWeather = function (cityData) {
    currentDay.innerHTML = "";

    var todayEl = document.createElement('h2');
    var iconEl = document.createElement('img');
    var icon = cityData.weather[0].icon; 
    console.log(icon);
    iconEl.src = "http://openweathermap.org/img/w/"+ icon +".png"
    var day = cityData.name;
    var date = moment().format("M/D/YYYY");
    todayEl.textContent = day + " " + date;
    currentDay.appendChild(todayEl);
    todayEl.appendChild(iconEl);

    var todayTempEl = document.createElement('p');
    var temp = cityData.main.temp;
    todayTempEl.textContent = "Temp: " + temp; 
    currentDay.appendChild(todayTempEl);

    var todayWindEl = document.createElement('p');
    var wind = cityData.wind.speed;
    todayWindEl.textContent = "Wind: " + wind + " MPH"; 
    currentDay.appendChild(todayWindEl);

    var todayHumidityEl = document.createElement('p');
    var humidity = cityData.main.humidity;
    todayHumidityEl.textContent = "Humidity: " + humidity + "%"; 
    currentDay.appendChild(todayHumidityEl);

  }

// fetch request for 5 day weather forecast. 

  var getUserFutureWeather = function (city) {
    var cityWeatherFutureData = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=2da508702f2406bcdbbb02cc77f42804";

    fetch(cityWeatherFutureData)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log(data);
            displayFutureWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect the weather');
      });
  };

  //function to display the 5 day weather forecast. 

  var displayFutureWeather = function(futureCityData) {

    day5_forecast.innerHTML = "";

    var dateNumber = 0;

    for (let index = 0; index < futureCityData.list.length; index += 9) {
        const element = futureCityData.list[index];
        dateNumber++
        var ulEl_1 = document.createElement('ul');
        day5_forecast.appendChild(ulEl_1);
        var liEl_1_1 = document.createElement('li');
        var date_1 = moment().add(dateNumber, 'day').format("M/D/YYYY");
        liEl_1_1.textContent = date_1;
        var iconEl = document.createElement('img');
        var icon = element.weather[0].icon; 
        console.log(icon);
        iconEl.src = "http://openweathermap.org/img/w/"+ icon +".png"
        ulEl_1.appendChild(liEl_1_1);
        liEl_1_1.appendChild(iconEl);

        var liEl_1_2 = document.createElement('li');
        var temp_1 = element.main.temp;
        liEl_1_2.textContent = "Temp: " + temp_1;
        ulEl_1.appendChild(liEl_1_2);

        var liEl_1_3 = document.createElement('li');
        var humidity_1 = element.main.humidity;
        liEl_1_3.textContent = "Humidity: " + humidity_1 + "%";
        ulEl_1.appendChild(liEl_1_3);

        var liEl_1_4 = document.createElement('li');
        var wind_1 = element.wind.speed;
        liEl_1_4.textContent = "Wind: " + wind_1 + " MPH";
        ulEl_1.appendChild(liEl_1_4);
            
    }
};





  userFormEl.addEventListener('submit', formSubmitHandler);