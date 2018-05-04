<template>
<v-app>
  <v-content>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 order-sm0 order-xs0>
          <h2>GEARs April 2018 Rides</h2>
        </v-flex>
        <v-flex xs12 sm6 order-sm1 order-xs5>
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
        <v-flex xs12 sm6 order-sm2 order-xs6>
          <v-layout row wrap>
            <v-flex>
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
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-text class="text-xs-left">
                  <p>
                    <strong>Food Key:</strong><br>
                    <strong>FS</strong> - Food store on route<br>
                    <strong>FR</strong> - Restaurant stop<br>
                    <strong>BF</strong> - Bring food<br>
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        
        <v-flex xs1 order-sm3 order-xs1>
          <v-btn color="primary" v-on:click.stop="filterDialog = true">
            <v-icon>filter_list</v-icon>&nbsp;Ride Filters
          </v-btn>
          <v-dialog v-model="filterDialog" max-width="440px">
            <v-card>
              <v-card-title>
                Ride Filters
              </v-card-title>
              <v-container fluid>
                <v-layout>
                  <v-flex>
                    <table>
                      <tr>
                        <td align="right"><strong>Day:</strong></td>
                        <td>
                          <v-btn-toggle multiple v-model="showDays" v-on:change="toggleDays()">
                            <v-btn outline color="primary">Su</v-btn>
                            <v-btn outline color="primary">Mo</v-btn>
                            <v-btn outline color="primary">Tu</v-btn>
                            <v-btn outline color="primary">We</v-btn>
                            <v-btn outline color="primary">Th</v-btn>
                            <v-btn outline color="primary">Fr</v-btn>
                            <v-btn outline color="primary">Sa</v-btn>
                          </v-btn-toggle>
                        </td>
                      </tr>
                      <tr>
                        <td align="right"><strong>History:</strong></td>
                        <td>
                          <v-btn-toggle multiple v-model="showExpireds" v-on:change="toggleExpired()">
                            <v-btn outline dark color="primary">Past</v-btn>
                            <v-btn outline dark color="primary">Future</v-btn>
                          </v-btn-toggle>
                        </td>
                      </tr>
                      <tr>
                        <td align="right"><strong>Pace:</strong></td>
                        <td>
                          <v-btn-toggle multiple v-model="showSpeeds" v-on:change="toggleSpeeds()">
                            <v-btn outline dark color="primary">10-12</v-btn>
                            <v-btn outline dark color="primary">12-15</v-btn>
                            <v-btn outline dark color="primary">16+</v-btn>
                          </v-btn-toggle>
                        </td>
                      </tr>
                    </table>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid align-end pa-0>
                <v-layout>
                  <v-flex xs2 offset-xs9>
                    <v-btn color="primary" flat v-on:click.stop="filterDialog = false">Close</v-btn>
                  </v-flex>
                </v-layout>
                </v-container>
            </v-card>
          </v-dialog>
        </v-flex>

        <v-flex xs12 order-sm6 order-xs4>
          <v-data-table v-bind:headers="headers" v-bind:items="rides" item-key="when"
                        hide-actions disable-initial-sort id="ridetable"
                        >
            <!-- <template slot="headers" slot-scope="rides"> -->
            <!--   <tr align="left" id="rideheader"> -->
            <!--     <th v-for="header in rides.headers" class="rideheadercell"> -->
            <!--       {{ header.text }} -->
            <!--     </th> -->
            <!--   </tr> -->
            <!-- </template> -->
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
                        <li>Time: {{ dateFormat(rides.item.when, "ddd mmm dd HH:MM TT")}}</li>
                        <li>Location: {{rides.item.meet}}</li>
                        <li>Pace: {{rides.item.pace}}</li>
                        <li>Length: {{rides.item.ridelength}}</li>
                        <li v-if="Object.keys(foodDescriptions).indexOf(rides.item.food) >= 0">
                          Food: {{ foodDescriptions[rides.item.food] }}
                        </li>
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

                  <td class="where hidden-xs-only">
                    {{ dateFormat(rides.item.when, 'h:MMTT') }}
                    {{ rides.item.meet }}
                  </td>

                  <td>{{ rides.item.ridenum }}</td>

                  <td class="ridedesc">
                    {{ rides.item.ridedesc }}
                  </td>

                  <td class="pace hidden-xs-only">
                    <span>
                      {{ rides.item.pace }}
                    </span>
                  </td>

                  <td class="ridelength">
                    {{ rides.item.ridelength }}
                  </td>

                  <td class="hidden-xs-only">
                    {{ rides.item.food }}
                  </td>

                  <td class="hidden-xs-only">
                    <strong>
                      {{ rides.item.rating }}
                    </strong>
                  </td>

                  <td class="leader hidden-xs-only">
                    {{ rides.item.leader }}
                    <br/>
                    {{ rides.item.phone }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12 order-sm7 order-xs4>
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
          <v-flex xs12 order-sm8 order-xs8>
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

          <v-flex xs12 order-sm9 order-xs9>
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
            filterDialog: false,
            dayOfWeek: function (d) {
                return dateFormat(d, "dddd")
            },
            shortDate: function (d) {
                return dateFormat(d, "mmmm d")
            },
            dateFormat: function (t, f) {
                return dateFormat(t, f)
            },
            
            title: 'April 2018',
            
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
            foodDescriptions: {
                "FS": "Food Store on Route",
                "BF": "Bring Food",
                "FR": "Restaurant Stop"
            },
            headers: [
                {
                    text: 'Date',
                    value: 'when',
                    class: 'rideheadercell',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Time/Place',
                    value: 'meet',
                    class: 'rideheadercell hidden-xs-only',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Ride #',
                    value: 'ridenum',
                    class: 'rideheadercell',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Description',
                    value: 'ridedesc',
                    class: 'rideheadercell',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Pace',
                    value: 'pace',
                    class: 'rideheadercell hidden-xs-only',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Length',
                    value: 'ridelength',
                    class: 'rideheadercell',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Food?',
                    value: 'food',
                    class: 'rideheadercell hidden-xs-only',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Rating',
                    value: 'rating',
                    class: 'rideheadercell hidden-xs-only',
                    sortable: false,
                    align: 'center'
                },
                {
                    text: 'Leader',
                    value: 'leader',
                    class: 'rideheadercell hidden-xs-only',
                    sortable: false,
                    align: 'center'
                },
      ],
      rides: [
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/09/409b-Cue.pdf",
      "food": "FS",
      "leader": "John Reidy",
      "mapurl": "https://ridewithgps.com/routes/3368991",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "805-807-5657",
      "rating": "B",
      "ridedesc": "Five Bridges (Flex of Dexter Ride)",
      "ridelength": "60 Miles",
      "ridenum": "409b",
      "thumbnail": "static/409b.png",
      "when": "Sun Apr 01 2018 09:00:01 GMT-0700 (PDT)"
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
      "when": "Mon Apr 02 2018 10:00:02 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/1125c-McKenzie-Clearwater.pdf",
      "food": "FS",
      "leader": "Paula Erickson",
      "mapurl": "http://www.gmap-pedometer.com/?r=6534478",
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-953-2894",
      "rating": "B",
      "ridedesc": "Clearwater, Sunderman, McKenzie View (Reverse)",
      "ridelength": "39 Miles",
      "ridenum": "125c",
      "thumbnail": "static/125c.png",
      "when": "Tue Apr 03 2018 10:00:03 GMT-0700 (PDT)"
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
      "when": "Tue Apr 03 2018 09:00:04 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/209c-Cue-Sheet-Sheet1.pdf",
      "food": "FR",
      "leader": "Larry Diffie",
      "mapurl": null,
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-729-7923",
      "rating": "A",
      "ridedesc": "Alvadore via Meadowview",
      "ridelength": "35 Miles",
      "ridenum": "209c",
      "thumbnail": "static/209c.png",
      "when": "Thu Apr 05 2018 09:00:05 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/10/319b-Cue-Sheet1.pdf",
      "food": "BF",
      "leader": "Paula Erickson",
      "mapurl": "http://www.gmap-pedometer.com/?r=6169490",
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-953-2894",
      "rating": "B",
      "ridedesc": "Petzold, Out & Back",
      "ridelength": "35 Miles",
      "ridenum": "319b",
      "thumbnail": "static/319b.png",
      "when": "Sat Apr 07 2018 09:00:06 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/210a-Cue-Sheet.pdf",
      "food": "FS",
      "leader": "Sue Wolling",
      "mapurl": "http://www.gmap-pedometer.com/?r=5809639",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-345-2110",
      "rating": "C",
      "ridedesc": "Poodle Creek Meteric Century",
      "ridelength": "62 Miles",
      "ridenum": "210a",
      "thumbnail": "static/210a.png",
      "when": "Sat Apr 07 2018 09:00:07 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/210a-Cue-Sheet.pdf",
      "food": "FS",
      "leader": "Dave Zumbrunnen",
      "mapurl": "http://www.gmap-pedometer.com/?r=5809639",
      "meet": "Alton Baker Park",
      "pace": "16+ mph",
      "phone": "541-972-9746",
      "rating": "C",
      "ridedesc": "Poodle Creek Meteric Century",
      "ridelength": "62 Miles",
      "ridenum": "210a",
      "thumbnail": "static/210a.png",
      "when": "Sat Apr 07 2018 09:00:08 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/214-Cue-Sheet-Sheet1.pdf",
      "food": "FS",
      "leader": "Steve Hecker",
      "mapurl": null,
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-954-1161",
      "rating": "A",
      "ridedesc": "Sovern Lane",
      "ridelength": "38 Miles",
      "ridenum": "214a",
      "thumbnail": "static/214a.png",
      "when": "Sun Apr 08 2018 09:00:09 GMT-0700 (PDT)"
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
      "when": "Mon Apr 09 2018 10:00:10 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/103d-Cue-Sheet-Sheet1.pdf",
      "food": "FS",
      "leader": "Paula Erickson",
      "mapurl": "http://www.gmap-pedometer.com/?r=5808976",
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-953-2894",
      "rating": "A",
      "ridedesc": "Coburg Bottom Loop to Herman Rd",
      "ridelength": "32 Miles",
      "ridenum": "103d",
      "thumbnail": "static/103d.png",
      "when": "Tue Apr 10 2018 10:00:11 GMT-0700 (PDT)"
      },
      {
      "food": "BF",
      "leader": "Jackie Murdoff",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-345-3941",
      "rating": "C",
      "ridedesc": "Riding some hills - Route will be determined at start",
      "ridelength": "25-50 Miles",
      "ridenum": "##",
      "when": "Tue Apr 10 2018 09:00:12 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/114b-Cue-Sheet-Sheet1.pdf",
      "food": "FS",
      "leader": "Steve Hecker",
      "mapurl": "http://www.gmap-pedometer.com/?r=5809459",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-954-1161",
      "rating": "B",
      "ridedesc": "McKenzie View & Sunderman",
      "ridelength": "35 Miles",
      "ridenum": "114b",
      "thumbnail": "static/114b.png",
      "when": "Thu Apr 12 2018 09:00:13 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/418a-Camp-Creek-thurston.pdf",
      "food": "FS",
      "leader": "Larry Diffie",
      "mapurl": "https://ridewithgps.com/routes/26547850",
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-729-7923",
      "rating": "B",
      "ridedesc": "Walterville via Camp Creek, Return Thurston Rd",
      "ridelength": "37 Miles",
      "ridenum": "418b",
      "thumbnail": "static/418b.png",
      "when": "Sat Apr 14 2018 09:00:14 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://www.eugenegears.org/ridesheets/413a.pdf",
      "food": "FS",
      "leader": "Steve Hecker",
      "mapurl": "http://www.gmap-pedometer.com/?r=2891849",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-954-1161",
      "rating": "B",
      "ridedesc": "Deerhorn Rd",
      "ridelength": "48 Miles",
      "ridenum": "413a",
      "thumbnail": "static/413a.png",
      "when": "Sat Apr 14 2018 09:00:15 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://www.eugenegears.org/ridesheets/413a.pdf",
      "food": "FS",
      "leader": "John Reidy",
      "mapurl": "http://www.gmap-pedometer.com/?r=2891849",
      "meet": "Alton Baker Park",
      "pace": "16+ mph",
      "phone": "805-807-5657",
      "rating": "B",
      "ridedesc": "Deerhorn Rd",
      "ridelength": "48 Miles",
      "ridenum": "413a",
      "thumbnail": "static/413a.png",
      "when": "Sat Apr 14 2018 09:00:16 GMT-0700 (PDT)"
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
      "ridedesc": "River Dr & Howe Lane",
      "ridelength": "41 Miles",
      "ridenum": "320a",
      "thumbnail": "static/320a.png",
      "when": "Sun Apr 15 2018 09:00:17 GMT-0700 (PDT)"
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
      "when": "Mon Apr 16 2018 10:00:18 GMT-0700 (PDT)"
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
      "when": "Tue Apr 17 2018 09:00:19 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/1125c-McKenzie-Clearwater.pdf",
      "food": "BF",
      "leader": "Mike Cantrell",
      "mapurl": "http://www.gmap-pedometer.com/?r=6534478",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-342-7649",
      "rating": "B",
      "ridedesc": "Clearwater Trail & Scenic Springfield",
      "ridelength": "25 Miles",
      "ridenum": "125c",
      "thumbnail": "static/125c.png",
      "when": "Thu Apr 19 2018 09:00:20 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2014/01/403b_Alt_Cue-Sheet.pdf",
      "food": "FS",
      "leader": "Mike Cantrell",
      "mapurl": null,
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-342-7649",
      "rating": "B",
      "ridedesc": "Jasper via Pleasant Hill",
      "ridelength": "34 Miles",
      "ridenum": "403b",
      "thumbnail": "static/403b.png",
      "when": "Sat Apr 21 2018 09:00:21 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/10/401f-Cue.pdf",
      "food": "FS",
      "leader": "Garry Swanson",
      "mapurl": null,
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-726-3997",
      "rating": "C",
      "ridedesc": "Pleasant Hill to Jasper",
      "ridelength": "39 Miles",
      "ridenum": "401f",
      "thumbnail": "static/401f.png",
      "when": "Sat Apr 21 2018 09:00:22 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/125b-Cue-Sheet.pdf",
      "food": "FS",
      "leader": "Larry Diffie",
      "mapurl": "https://ridewithgps.com/routes/17387599",
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-729-7923",
      "rating": "B",
      "ridedesc": "Clearwater Triail to McKenzie View",
      "ridelength": "29 Miles",
      "ridenum": "125b",
      "thumbnail": "static/125b.png",
      "when": "Sun Apr 22 2018 13:30:23 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/10/105a-Cue.pdf",
      "food": "FS",
      "leader": "Jackie Murdoff",
      "mapurl": "http://www.gmap-pedometer.com/?r=5809298",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-345-3941",
      "rating": "C",
      "ridedesc": "Brownsville via Marcola, Brush Creek, Rtn Gap Rd",
      "ridelength": "75 Miles",
      "ridenum": "105a",
      "thumbnail": "static/105a.png",
      "when": "Sun Apr 22 2018 09:00:24 GMT-0700 (PDT)"
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
      "when": "Mon Apr 23 2018 10:00:25 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/209c-Cue-Sheet-Sheet1.pdf",
      "food": "FR",
      "leader": "Paula Erickson",
      "mapurl": null,
      "meet": "Alton Baker Park",
      "pace": "10-12 mph",
      "phone": "541-953-2894",
      "rating": "A",
      "ridedesc": "Alvadore via Meadowview",
      "ridelength": "35 Miles",
      "ridenum": "209c",
      "thumbnail": "static/209c.png",
      "when": "Tue Apr 24 2018 10:00:26 GMT-0700 (PDT)"
      },
      {
      "food": "BF",
      "leader": "Jackie Murdoff",
      "meet": "Alton Baker Park",
      "pace": "12-15 mph",
      "phone": "541-345-3941",
      "rating": "C",
      "ridedesc": "Riding some hills - Route will be determined at start",
      "ridelength": "25-50 Miles",
      "ridenum": "##",
      "when": "Tue Apr 24 2018 09:00:27 GMT-0700 (PDT)"
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
      "ridedesc": "McKenzie View & Sunderman",
      "ridelength": "35 Miles",
      "ridenum": "114b",
      "thumbnail": "static/114b.png",
      "when": "Thu Apr 26 2018 09:00:28 GMT-0700 (PDT)"
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
      "when": "Sat Apr 28 2018 09:00:29 GMT-0700 (PDT)"
      },
      {
      "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/05/403a-CueSheet.pdf",
      "food": "FS",
      "leader": "Mike Cantrell",
      "mapurl": "http://www.gmap-pedometer.com/?r=2891769",
      "meet": "Clearwater",
      "pace": "12-15 mph",
      "phone": "541-342-7649",
      "rating": "B",
      "ridedesc": "Meet at Clearwater Trailhead Jasper via Weyerhauser (Flex)",
      "ridelength": "35 Miles",
      "ridenum": "403a",
      "thumbnail": "static/403a.png",
      "when": "Sun Apr 29 2018 09:00:30 GMT-0700 (PDT)"
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
      "when": "Mon Apr 30 2018 10:00:31 GMT-0700 (PDT)"
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
  .debug {
    background: pink;
  }
</style>
