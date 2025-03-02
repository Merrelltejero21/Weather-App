const apiKey = 'c5ec3688e3ad947178459450a4dacc28'

const cityInput = document.querySelector(".city-input")
const searchBtn = document.querySelector(".search-bar button")

const cityTxt = document.querySelector(".city")
const tempTxt = document.querySelector(".temp")
const conditionTxt = document.querySelector(".condition")
const dateTxt = document.querySelector(".date")
const humidityTxt = document.querySelector(".humidity")
const speedTxt = document.querySelector(".speed")
const weatherIcon = document.querySelector(".weather-icon")




searchBtn.addEventListener("click",function(){
    if (cityInput.value.trim() != ''){
        console.log(cityInput.value)
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '')
    {
        console.log(cityInput.value)
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})
async function getFetchData(endPoint, city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`  
   
    const response = await fetch(apiUrl)
    return response.json()

   }

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', options)
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'
    if (id <= 321) return 'drizzle.svg'
    if (id <= 531) return 'rain.svg'
    if (id <= 622) return 'snow.svg'
    if (id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'

}

async function updateWeatherInfo(city){
   const weatherData = await getFetchData('weather', city)
   console.log(weatherData)

   const {
    name: country,
    main: {temp, humidity},
    weather: [{id, main}],
    wind: {speed}
   } = weatherData

   cityTxt.textContent = country
   tempTxt.textContent = Math.round(temp) + '°C'
   conditionTxt.textContent = main
   humidityTxt.textContent = humidity + '%'
   speedTxt.textContent = speed + 'M/s'

   dateTxt.textContent = getCurrentDate()
   weatherIcon.src = `Images/${getWeatherIcon(id)}`

}

