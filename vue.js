const API_KEY = '94952ba348c3d74567413cb7aeef2c1b';
const PREFERRED_TIME = '06:00:00';
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CITY = 'vancouver';

function formatTemperature(temperature) {
  return Math.round(temperature);
}

function getDayName(unix){
  const date = new Date(unix * 1000);
  return DAYS[date.getDay()];
}

new Vue({
  el: '#app',
  data: {
    weathers: [],
    city: CITY,
  },
  methods: {
    fetchWeather() {
      axios
        .get(`http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&q=${this.city},ca&units=metric`)
        .then(response => {
          this.weathers = response.data.list.filter(weather => {
            return weather["dt_txt"].includes(PREFERRED_TIME);
          })
        })
    },
    submit() {
      this.fetchWeather();
    }
  },
  mounted () {
    this.fetchWeather();
  }
})
