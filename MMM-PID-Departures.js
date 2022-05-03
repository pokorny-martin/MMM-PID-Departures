Module.register("MMM-PID-Departures", {
  defaults: {
    apiUrl: "https://api.golemio.cz/v2/departureboards/",
    apiKey: "",
    minutesBefore: 2,
    limit: 10,
    names: "Florenc",
    response: "No departures available",
    fetchInterval: 5000,
  },

  start: function () {
    var self = this;
    self.config.names = self.config.location;
    self.updateRequest();
    setInterval(() => {self.updateRequest()}, self.defaults.fetchInterval);
  },

  loaded: function(callback) {
    var self = this;
    self.finishLoading()
    callback();
  },

  getStyles: function() {
    return ["MMM-PID-Departures.css"];
  },

  getDom: function() {
    var self = this;
    let wrapper = document.createElement("div");
    if (typeof self.config.response === "string") {
      const response = document.createElement("div");
      response.innerText = self.config.response;
      self.config.response = response;
    }
    wrapper.appendChild(self.config.response);
    return wrapper;
  },

  updateRequest: function() {
    Log.info("New departures fetched");
    var self = this;

    var xhttp = new XMLHttpRequest();

    var completeUrl = this.config.apiUrl + "?";
    completeUrl += "minutesBefore=" + self.config.minutesBefore + "&";
    completeUrl += "names=" + self.config.names + "&";
    completeUrl += "limit=" + self.config.limit;

    xhttp.open("GET", completeUrl, true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhttp.setRequestHeader("x-access-token", self.config.apiKey);

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          self.requestComplete = true;
          self.config.response =  self.parseRequest(JSON.parse(this.responseText));
        }
        else {
          self.config.response = this.responseText;
        }
        self.updateDom();
      }
    };
    xhttp.send();
  },

  zeroPad: function (num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  },

  parseRequest: function(response) {
    var self = this;

    let table = document.createElement("table");
    table.classList.add("departures");
    for (let departure of response) {
      let row = document.createElement("tr");
      let nr = departure.route.short_name;
      let destination = departure.trip.headsign;
      let departure_date = new Date(departure.departure_timestamp.predicted);
      let departure_time = [self.zeroPad(departure_date.getHours(), 2), self.zeroPad(departure_date.getMinutes(), 2), self.zeroPad(departure_date.getSeconds(), 2)].join(":")

      row.innerHTML = "<td>"+nr+"</td>"+"<td>"+destination+"</td>"+"<td>"+departure_time+"</td>";
      table.appendChild(row);
    }
    return table;
  },
});

