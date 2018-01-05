<template>
  <v-app>
    <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <h2>GEARs January 2018 Rides</h2>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-text class="text-xs-left gears-intro">
                GEARs (Greater Eugene Area Riders) invites all
                bicyclists to join in riding together through some
                beautiful bicycling terrain. We require that all
                participants wear a bike helmet and bring a bike in
                safe riding condition. A frame tire pump, tube/patch
                kit, basic tools, full water bottle and appropriate
                clothing are strongly encouraged. Ride leaders will
                help to ensure that you have a safe and pleasant
                experience. If you have questions about a
                scheduled ride, feel free to contact the ride leader
                or Ride Coordinator Garry Swanson at
                541-726-3997 or garry@eugenegears.org.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6>
            <v-card>
              <v-card-text class="text-xs-left">
                <p>
                  <strong>Terrain Key:</strong><br>
                  <strong>A:</strong> Flat with gently rolling terrain.<br>
                  <strong>B:</strong> Rolling Terrain with a few short, steep climbs.<br>
                  <strong>C:</strong> Moderate rolling terrain with steeper, longer climbs.<br>
                  <strong>D:</strong> Demanding terrain with frequent steep and/or sustained climbs.<br>
                  <strong>Note:</strong> You should be an experienced cyclist to participate and enjoy
                  C and D rides, or rides over 50 miles.
                </p>
                <p>
                  <strong>Food Key:</strong><br>
                  <strong>FS</strong> - Food store on route<br>
                  <strong>FR</strong> - Restaurant stop<br>
                  <strong>BF</strong> - Bring food<br>
                </p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12 sm5 class="text-xs-left">
            <strong>Day Filter:</strong>
            <v-btn-toggle multiple round v-model="showDays" v-on:change="toggleDays()">
              <v-btn outline color="primary">
                Su
              </v-btn>
              <v-btn outline color="primary">
                Mo
              </v-btn>
              <v-btn outline color="primary">
                Tu
              </v-btn>
              <v-btn outline color="primary">
                We
              </v-btn>
              <v-btn outline color="primary">
                Th
              </v-btn>
              <v-btn outline color="primary">
                Fr
              </v-btn>
              <v-btn outline color="primary">
                Sa
              </v-btn>
            </v-btn-toggle>
          </v-flex>

          <v-flex xs12 sm3 class="">
            <strong>Show:</strong>
            <v-btn-toggle multiple v-model="showExpireds" v-on:change="toggleExpired()">
              <v-btn outline dark color="primary">
                Past
              </v-btn>
              <v-btn outline dark color="primary">
                Future
              </v-btn>
            </v-btn-toggle>
          </v-flex>

          <v-flex xs12 sm4 class="text-xs-left text-sm-right">
            <strong>Pace Filter:</strong>
            <v-btn-toggle multiple v-model="showSpeeds" v-on:change="toggleSpeeds()">
              <v-btn outline dark color="primary">
                10-12
              </v-btn>
              <v-btn outline dark color="primary">
                12-15
              </v-btn>
              <v-btn outline dark color="primary">
                16+
              </v-btn>
            </v-btn-toggle>
          </v-flex>

          <!-- <v-flex xs12 md12 lg12>
            <v-btn>
              filters
              <v-switch class="pa-0" color="green" v-model="filter_enabled"></v-switch>
            </v-btn>
          </v-flex> -->

          <v-flex xs12>
            <v-data-table v-bind:headers="headers" v-bind:items="rides" item-key="when"
              hide-actions disable-initial-sort id="ridetable"
              >
              <template slot="headers" slot-scope="rides">
                <tr align="left" id="rideheader">
                  <th v-for="header in rides.headers" class="rideheadercell">
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="expand" slot-scope="rides">
                <v-container grid-list-md text-xs-left pa-0>
                  <v-layout align-center>
                    <v-flex xs4>
                      <v-card tile flat v-bind:href="rides.item.mapurl">
                        <v-card-media v-bind:src="rides.item.thumbnail" contain height=300px></v-card-media>
                      </v-card>
                    </v-flex>
                    <v-flex xs7 pa-3 left>
                      <h3>{{rides.item.ridenum}} - {{rides.item.ridedesc}}</h3>
                      <ul style="list-style: none;">
                        <li>Time: {{rides.item.when}}</li>
                        <li>Location: {{rides.item.meet}}</li>
                        <li>Pace: {{rides.item.pace}}</li>
                        <li>Length: {{rides.item.ridelength}}</li>
                        <li>Food?: {{rides.item.food}}</li>
                        <li>Rating: {{rides.item.rating}}</li>
                        <li>Leader: {{rides.item.leader}}</li>
                        <li>Contact: {{rides.item.phone}}</li>
                        <li v-if="rides.item.cuesheet">
                          Cue Sheet: <a v-bind:href="rides.item.cuesheet">link</a>
                        </li>
                        <li v-else>
                          Cue Sheet: N/A
                        </li>
                      </ul>
                    </v-flex>
                  </v-layout>
                </v-container>
              </template>
              <template slot="items" slot-scope="rides">
                <tr id="riderow"
                    v-show="showSpeedAndDay(rides.item.pace, rides.item.when)"
                    v-bind:class="speedAndExpiredClasses(rides.item.pace, rides.item.when)"
                    v-on:click="rides.expanded = !rides.expanded"
                    >

                  <td class="date">
                      {{ dayOfWeek(rides.item.when) }}
                      <br/>
                      <span class="nowrap">
                        {{ shortDate(rides.item.when) }}
                      </span>
                  </td>

                  <td class="where">
                    {{ dateFormat(rides.item.when, 'h:MMTT') }}
                    {{ rides.item.meet }}
                  </td>

                  <td>{{ rides.item.ridenum }}</td>

                  <td class="ridedesc">
                    {{ rides.item.ridedesc }}
                  </td>

                  <td class="pace">
                    <span>
                      {{ rides.item.pace }}
                    </span>
                  </td>

                  <td class="ridelength">
                    {{ rides.item.ridelength }}
                  </td>

                  <td>{{ rides.item.food }}</td>

                  <td>
                    <strong>
                      {{ rides.item.rating }}
                    </strong>
                  </td>

                  <td class="leader">
                    {{ rides.item.leader }}
                    <br/>
                    {{ rides.item.phone }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12>
            <table>
              <tr>
                <td><strong>Color Key:</strong></td>
                <td class="speed1" align="left">10-12 MPH leader pace</td>
              </tr>
              <tr>
                <td/>
                <td class="speed2" align="left">12-15 MPH leader pace</td>
              </tr>
              <tr>
                <td/>
                <td class="speed3" align="left">16+ MPH leader pace</td>
              </tr>
            </table>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-text class="text-xs-left">
                <p>
                  The Average Pace indicated is based on the actual riding speed with a neutral wind on flat terrain.
                  Terrain and weather conditions will influence the actual speed at any one time during the ride. At
                  times the actual speed may be higher than the upper range of the average pace.
                </p>
                <p>
                  The <strong>16+ mph</strong> rides are fast paced, usually in a pace line with few stops. The
                  leader will try to keep the group together. The ride leader will announce where regrouping will
                  take place and will try to keep the group together when possible.<br/>
                  The <strong>12-15 mph</strong> rides are medium paced and regroups often. The ride may get
                  stretched out, but will regroup at turns and at the top of climbs.<br/>
                  The <strong>10-12 mph</strong> rides are slower paced, the group tends to stay together and
                  takes the time to look at the scenery.
                </p>
                <p>
                  If you decide to drop out of a ride along the way, please let the ride leader know so we don't
                  come looking for you.
                </p>
                <p>
                  The Ride Schedule is also available for download at the GEARs website:
                  <a href="https://www.eugenegears.org/">www.eugenegears.org</a>.
                  Most of the rides listed above now have cue sheets and links to maps on our website,
                  <a href="https://www.eugenegears.org/rides/ridelist">www.eugenegears.org/rides/ridelist</a>.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <img src="static/gears_web_logo.png"/>
          </v-flex>

        </v-layout>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>
var dateFormat = require("dateformat")
var _ = require("lodash")
import { storageAvailable, getZeroBasedArrayFromStorage, setArrayToStorage, populateStorage } from "./storage"

export default {
  mounted: function () {
    // console.log("mounted, and value of showSpeeds is: " + this.showSpeeds)
    var storage = window.localStorage
    // if it exists and is empty (OK) or if it exists and has value (i.e. "truthy")
    if (!(storage.getItem("speeds") === "" || storage.getItem("speeds"))) {
      populateStorage()
    }
    this.showSpeeds = getZeroBasedArrayFromStorage("localStorage", "speeds", 3)
    this.showDays = getZeroBasedArrayFromStorage("localStorage", "days", 7)
    this.showExpireds = getZeroBasedArrayFromStorage("localStorage", "expired", 2)
      // console.log("showDays: " + this.showDays)
      // console.log("showSpeeds: " + this.showSpeeds)
  },
  data () {
    return {
      filter_enabled: true,
      dayOfWeek: function (d) {
        return dateFormat(d, "dddd")
      },
      shortDate: function (d) {
        return dateFormat(d, "mmmm d")
      },
      dateFormat: function (t, f) {
        return dateFormat(t, f)
      },

      title: 'January 2018',

      // showSpeeds and showDays will be filled in from localStorage
      showSpeeds: [],
      showDays: [],
      showExpireds: [],

      toggleDays: function() {
        // console.log("locally store this for days: " + this.showDays)
        setArrayToStorage("localStorage", "days", this.showDays)
      },

      toggleSpeeds: function() {
        // console.log('locally store this for speeds: ' + this.showSpeeds)
        setArrayToStorage("localStorage", "speeds", this.showSpeeds)
      },

      toggleExpired: function() {
        setArrayToStorage("localStorage", "expired", this.showExpireds)
      },

      showSpeed: function (s) {
        if (/10./.test(s)) {
          return _.includes(this.showSpeeds, 0)
          // return this.showSpeeds[0]
        } else if (/16/.test(s)) {
          return _.includes(this.showSpeeds, 2)
          // return this.showSpeeds[2]
        } else {
          return _.includes(this.showSpeeds, 1)
          // return this.showSpeeds[1]
        }
      },
      showDay: function (d) {
        // var dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        var dateMillis = Date.parse(d)
        var dateObj = new Date(dateMillis)
        // return _.includes(this.showDays, dayNames[dateObj.getDay()])
        return _.includes(this.showDays, dateObj.getDay())
      },
      showExpired: function(d) {
        if (_.includes(this.showExpireds, 0) && _.includes(this.showExpireds, 1)) {
          return true
        }
        var now = new Date()
        var ridedate = Date.parse(d)
        if ((ridedate < now) && _.includes(this.showExpireds, 0)) {
          // ride happened in the past, but we're showing past events
          return true
        }
        //console.log("dateinfo: " + ridedate + " " + now + " " + this.showExpireds)
        if ((ridedate > now) && _.includes(this.showExpireds, 1)) {
          // ride happens in the future, and we're showing future events
          return true
        }
        return false
      },
      showSpeedAndDay: function (s, d) {
        var ss = this.showSpeed(s)
        // console.log("showSpeed(" + s + "): " + ss)
        var sd = this.showDay(d)
        // console.log("showDay(" + d + "): " + sd)

        var se = this.showExpired(d)
        return ss && sd && se
        // return this.showSpeed(s) && this.showDay(d)
      },

      speedAndExpiredClasses: function (pace, date) {
        var speedClass = /10/.test(pace) ? "speed1" : /16/.test(pace) ? "speed3" : "speed2"
        var now = new Date()
        var ridedate = Date.parse(date)
        var expiredClass = ""
        if (ridedate < now) {
          expiredClass = "pastride"
        }
        return speedClass + " " + expiredClass
      },

      headers: [
        {text: 'Date', value: 'when'},
        {text: 'Time/Place', value: 'meet'},
        {text: 'Ride #', value: 'ridenum'},
        {text: 'Description', value: 'ridedesc'},
        {text: 'Pace', value: 'pace'},
        {text: 'Length', value: 'ridelength'},
        {text: 'Food?', value: 'food'},
        {text: 'Rating', value: 'rating'},
        {text: 'Leader', value: 'leader'},
      ],
      rides: [
        {
          "food": "BF",
          "leader": "Not a GEARs ride",
          "meet": "5th St. Market",
          "pace": "10+ mph",
          "phone": "N/A",
          "rating": "A",
          "ridedesc": "Annual Polar Bear Ride. Not a GEARs ride, but we do it for fun",
          "ridelength": "40 Miles",
          "ridenum": "##",
          "when": "Mon Jan 01 2018 09:00:01 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "John Reidy",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "805-807-5657",
          "rating": "C",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "ridelength": "25-50 Miles",
          "ridenum": "##",
          "when": "Tue Jan 02 2018 09:30:02 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/209c-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Garry Swanson",
          "mapurl": null,
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-726-3997",
          "rating": "A",
          "ridedesc": "Alvadore via Meadowview",
          "ridelength": "34 Miles",
          "ridenum": "209c",
          "thumbnail": "static/209c.png",
          "when": "Thu Jan 04 2018 09:30:03 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/406a-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Larry Diffie",
          "mapurl": "https://ridewithgps.com/routes/22561777",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-729-7923",
          "rating": "B",
          "ridedesc": "Weyerhauser, Pleasant Hill, Out and Back",
          "ridelength": "39 Miles",
          "ridenum": "406a",
          "thumbnail": "static/406a.png",
          "when": "Sat Jan 06 2018 09:30:04 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/406a-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Sue Wolling",
          "mapurl": "https://ridewithgps.com/routes/22561777",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-345-2110",
          "rating": "B",
          "ridedesc": "Weyerhauser, Pleasant Hill, Out and Back",
          "ridelength": "39 Miles",
          "ridenum": "406a",
          "thumbnail": "static/406a.png",
          "when": "Sat Jan 06 2018 09:30:05 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/406a-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Dave Zumbrunnen",
          "mapurl": "https://ridewithgps.com/routes/22561777",
          "meet": "Alton Baker Park",
          "pace": "16+ mph",
          "phone": "541-972-9746",
          "rating": "B",
          "ridedesc": "Weyerhauser, Pleasant Hill, Out and Back",
          "ridelength": "39 Miles",
          "ridenum": "406a",
          "thumbnail": "static/406a.png",
          "when": "Sat Jan 06 2018 09:30:06 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/10/319b-Cue-Sheet1.pdf",
          "food": "BF",
          "leader": "John Reidy",
          "mapurl": "http://www.gmap-pedometer.com/?r=6169490",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "805-807-5657",
          "rating": "C",
          "ridedesc": "Petzold, Out and Back",
          "ridelength": "35 Miles",
          "ridenum": "319b",
          "thumbnail": "static/319b.png",
          "when": "Sun Jan 07 2018 09:30:07 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "Jackie Murdoff",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-345-3941",
          "rating": "C",
          "ridedesc": "Hills for the 'dis-in-climbed'",
          "ridelength": "20-40 Miles",
          "ridenum": "##",
          "when": "Mon Jan 08 2018 09:30:08 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/125b-Cue-Sheet.pdf",
          "food": "BF",
          "leader": "Paula Erickson",
          "mapurl": "https://ridewithgps.com/routes/17387599",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-998-8420",
          "rating": "B",
          "ridedesc": "Clearwater path to McKenzie View",
          "ridelength": "29 Miles",
          "ridenum": "125b",
          "thumbnail": "static/125b.png",
          "when": "Tue Jan 09 2018 09:30:09 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "Dave Zumbrunnen",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-972-9746",
          "rating": "C",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "ridelength": "25-50 Miles",
          "ridenum": "##",
          "when": "Tue Jan 09 2018 09:30:10 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2014/01/125a-Cue-Sheet-.pdf",
          "food": "BF",
          "leader": "Steve Hecker",
          "mapurl": "http://www.gmap-pedometer.com/?r=6295596",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-954-1161",
          "rating": "B",
          "ridedesc": "Clearwater Path and Scenic Springfield",
          "ridelength": "25 Miles",
          "ridenum": "125a",
          "thumbnail": "static/125a.png",
          "when": "Thu Jan 11 2018 09:30:11 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/114b-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Paula Erickson",
          "mapurl": "http://www.gmap-pedometer.com/?r=5809459",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-998-8420",
          "rating": "B",
          "ridedesc": "McKenzie View and Sunderman Rd",
          "ridelength": "35 Miles",
          "ridenum": "114b",
          "thumbnail": "static/114b.png",
          "when": "Sat Jan 13 2018 09:30:12 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/106-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Garry Swanson",
          "mapurl": "http://www.gmap-pedometer.com/?r=5809265",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-726-3997",
          "rating": "B",
          "ridedesc": "Wendling Covered Bridge",
          "ridelength": "51 Miles",
          "ridenum": "106a",
          "thumbnail": "static/106a.png",
          "when": "Sat Jan 13 2018 09:30:13 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/302e-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Jackie Murdoff",
          "mapurl": "http://www.gmap-pedometer.com/?r=5834240",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-345-3941",
          "rating": "C",
          "ridedesc": "Veneta via Bolton Hill flex - via Petzold, Central",
          "ridelength": "49 Miles",
          "ridenum": "302e",
          "thumbnail": "static/302e.png",
          "when": "Sun Jan 14 2018 09:30:14 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/302e-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Jeff Sprague",
          "mapurl": "http://www.gmap-pedometer.com/?r=5834240",
          "meet": "Alton Baker Park",
          "pace": "16+ mph",
          "phone": "541-484-4434",
          "rating": "C",
          "ridedesc": "Veneta via Bolton Hill flex - via Petzold, Central",
          "ridelength": "49 Miles",
          "ridenum": "302e",
          "thumbnail": "static/302e.png",
          "when": "Sun Jan 14 2018 09:30:15 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/114b-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Larry Diffie",
          "mapurl": "http://www.gmap-pedometer.com/?r=5809459",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-729-7923",
          "rating": "B",
          "ridedesc": "McKenzie View and Sunderman Rd",
          "ridelength": "35 Miles",
          "ridenum": "114b",
          "thumbnail": "static/114b.png",
          "when": "Thu Jan 18 2018 09:30:16 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/114b-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Ted Conover",
          "mapurl": "http://www.gmap-pedometer.com/?r=5809459",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-344-4994",
          "rating": "B",
          "ridedesc": "McKenzie View and Sunderman Rd",
          "ridelength": "35 Miles",
          "ridenum": "114b",
          "thumbnail": "static/114b.png",
          "when": "Thu Jan 18 2018 09:30:17 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://www.eugenegears.org/ridesheets/417a.pdf",
          "food": "FS",
          "leader": "Mel Huey",
          "mapurl": "http://www.gmap-pedometer.com/?r=2891876",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-255-2741",
          "rating": "B",
          "ridedesc": "Upper Camp Creek flex - go out Clearwater",
          "ridelength": "42 Miles",
          "ridenum": "417a",
          "thumbnail": "static/417a.png",
          "when": "Sat Jan 20 2018 09:30:18 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://www.eugenegears.org/ridesheets/417a.pdf",
          "food": "FS",
          "leader": "Tyler Stewart",
          "mapurl": "http://www.gmap-pedometer.com/?r=2891876",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-954-2009",
          "rating": "B",
          "ridedesc": "Upper Camp Creek flex - go out Clearwater",
          "ridelength": "42 Miles",
          "ridenum": "417a",
          "thumbnail": "static/417a.png",
          "when": "Sat Jan 20 2018 09:30:19 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/320a-Cue-Sheet-Sheet1.pdf",
          "food": "FS",
          "leader": "Ray Linneman",
          "mapurl": "http://www.gmap-pedometer.com/?r=5813632",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "458-205-1497",
          "rating": "A",
          "ridedesc": "River Dr and Howe Lane",
          "ridelength": "41 Miles",
          "ridenum": "320a",
          "thumbnail": "static/320a.png",
          "when": "Sun Jan 21 2018 09:30:20 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "Jackie Murdoff",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-345-3941",
          "rating": "C",
          "ridedesc": "Hills for the 'dis-in-climbed'",
          "ridelength": "20-40 Miles",
          "ridenum": "##",
          "when": "Mon Jan 22 2018 09:30:21 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/05/215b-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Paula Erickson",
          "mapurl": "http://www.gmap-pedometer.com/?r=5809957",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-998-8420",
          "rating": "A",
          "ridedesc": "Alvadore & Fern Ridge path",
          "ridelength": "34 Miles",
          "ridenum": "215b",
          "thumbnail": "static/215b.png",
          "when": "Tue Jan 23 2018 09:30:22 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "John Reidy",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "805-807-5657",
          "rating": "C",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "ridelength": "25-50 Miles",
          "ridenum": "##",
          "when": "Tue Jan 23 2018 09:30:23 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2014/01/125a-Cue-Sheet-.pdf",
          "food": "BF",
          "leader": "Mike Cantrell",
          "mapurl": "http://www.gmap-pedometer.com/?r=6295596",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-342-7649",
          "rating": "B",
          "ridedesc": "Clearwater Trail and Scenic Springfield",
          "ridelength": "25 Miles",
          "ridenum": "125a",
          "thumbnail": "static/125a.png",
          "when": "Thu Jan 25 2018 09:30:24 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://www.eugenegears.org/ridesheets/315a.pdf",
          "food": "FS",
          "leader": "Paula Erickson",
          "mapurl": "http://www.gmap-pedometer.com/?r=2852832",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-998-8420",
          "rating": "C",
          "ridedesc": "Creswell (Town)",
          "ridelength": "34 Miles",
          "ridenum": "315a",
          "thumbnail": "static/315a.png",
          "when": "Sat Jan 27 2018 09:30:25 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/06/310b-CueSheet-Sheet1.pdf",
          "food": "BF",
          "leader": "Jackie Murdoff",
          "mapurl": "http://www.gmap-pedometer.com/?r=2852251",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-345-3941",
          "rating": "C",
          "ridedesc": "Dillard Rd, Cloverdale, flex - add Bear Creek, Rogers",
          "ridelength": "40 Miles",
          "ridenum": "310b",
          "thumbnail": "static/310b.png",
          "when": "Sat Jan 27 2018 09:30:26 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/207a-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Mike Cantrell",
          "mapurl": "http://www.gmap-pedometer.com/?r=5810033",
          "meet": "Alton Baker Park",
          "pace": "12-15 mph",
          "phone": "541-342-7649",
          "rating": "B",
          "ridedesc": "Franklin Firehouse",
          "ridelength": "39 Miles",
          "ridenum": "207a",
          "thumbnail": "static/207a.png",
          "when": "Sun Jan 28 2018 09:30:27 GMT-0800 (PST)"
        },
        {
          "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/207a-Cue-Sheet.pdf",
          "food": "FS",
          "leader": "Jeff Sprague",
          "mapurl": "http://www.gmap-pedometer.com/?r=5810033",
          "meet": "Alton Baker Park",
          "pace": "16+ mph",
          "phone": "541-484-4434",
          "rating": "B",
          "ridedesc": "Franklin Firehouse",
          "ridelength": "39 Miles",
          "ridenum": "207a",
          "thumbnail": "static/207a.png",
          "when": "Sun Jan 28 2018 09:30:28 GMT-0800 (PST)"
        },
        {
          "food": "BF",
          "leader": "Jackie Murdoff",
          "meet": "Alton Baker Park",
          "pace": "10-12 mph",
          "phone": "541-345-3941",
          "rating": "C",
          "ridedesc": "Hills for the 'dis-in-climbed'",
          "ridelength": "20-40 Miles",
          "ridenum": "##",
          "when": "Mon Jan 29 2018 09:30:29 GMT-0800 (PST)"
        }
      ]
    }
  }
}
</script>

<style media="screen">
  #ridetable {
    border: 1px solid black;
  }
  #rideheader {
    border: 2px solid black;
    height: 28px;
  }
  #ridetable .rideheadercell {
    border: 1px solid black;
    padding-left: 8px;
    padding-right: 8px;
    text-align: center;
    color: black;
  }
  #ridetable td {
    padding-left: 2px;
    padding-right: 2px;
    line-height: 1.2;
    height: 38px;
    border: 1px solid black;
  }
  .speed1 {
    background-color: #FFF3CA;
  }
  .speed2 {
    background-color: white;
  }
  .speed3 {
    background-color: #F7D1D3;
  }
  .pastride {
    color: #BBBBBB;
  }
  .ridelength {
    white-space: nowrap;
  }
  .pace {
    white-space: nowrap;
  }
  .date {
    text-align: left;
  }
  .where {
    text-align: left;
  }
  .leader,.ridedesc {
    text-align: left;
  }
  .nowrap {
    white-space: nowrap;
  }
  .gears-intro {
    font-size: 17px;
  }
</style>
