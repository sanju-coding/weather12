var inputValue = document.querySelector('#cityinput');
var btn = document.querySelector('#submit');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "b15765c67ef2242af4687a54c2a80df0";

function conversion(val) {
    return (val - 273.15).toFixed(2); // Correct conversion to Celsius
}

btn.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=' + apik)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data); // Debugging: Log the API response

            var nameval = data['name'];
            var descrip = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var windspeed = data['wind']['speed'];

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} m/s</span>`;
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
        })
        .catch(err => {
            console.error('Error:', err); // Debugging: Log the error
            alert('You entered wrong city name');
        });
});
