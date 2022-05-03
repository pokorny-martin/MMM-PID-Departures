# MMM-PID-Departures
This an extension for the [Magic Mirror](https://github.com/MichMich/MagicMirror). It provides real-time data for departures of Prague public transport.  
## Installation
1. Clone this repository to your magic mirror modules directory `git clone https://github.com/pokorny-martin/MMM-PID-Departures`.
2. Add this module to your magic mirror config file `config/config.js`.  
```
{
    module: "MMM-PID-Departures",
    position: "top_left", // technically this can be any region, but left/right is the best
    header: "Departures", // optional
    config: {
      location: "<YOUR_DEPARTURE_STOP>", // specify stop you want to see the departures from
      apiKey: "<YOUR_API_KEY>", // api key, that can be obtained from Golemio website - see step bellow
    }
}
```
3. Create Golemio account, generate yourself an API key [Golemio API](https://golemioapi.docs.apiary.io/#reference) and add it to the config file.
4. Enjoy!!!
## Configuration
| Option        | Description                                                                                                           |                                                                |
|---------------|-----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| apiUrl        | url to the Golemio API                                                                                                | optional (default: https://api.golemio.cz/v2/departureboards/) |
| apiKey        | api key to the Golemio API                                                                                            | required                                                       |
| minutesBefore | interval to the past from which to retrieve the departures <br>(e.g. if it's 12:00, you'll see departures from 11:58) | optional (default: 2)                                          |
| limit         | number of departures displayed                                                                                        | optional (default: 10)                                         |
| location      | name of the public transport stop                                                                                     | optional (default: Florenc)                                    |
| fetchInterval | interval between api calls (in ms, 1s = 1000ms)                                                                       | optional (default: 5000)                                       |
