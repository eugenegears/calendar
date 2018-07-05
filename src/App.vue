<template>
<v-app>
  <v-content>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 order-sm0 order-xs0>
          <h2>GEARs July 2018 Rides</h2>
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
                  <strong>Terrain Key:</strong><br>
                  <strong>A:</strong> Flat with gently rolling terrain.<br>
                  <strong>B:</strong> Rolling Terrain with a few short, steep climbs.<br>
                  <strong>C:</strong> Moderate rolling terrain with steeper, longer climbs.<br>
                  <strong>D:</strong> Demanding terrain with frequent steep and/or sustained climbs.<br>
                  <strong>Note:</strong> You should be an experienced cyclist to participate and enjoy
                  C and D rides, or rides over 50 miles.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card>
                <v-card-text class="text-xs-left">
                  <strong>Food Key:</strong><br>
                  <strong>FS</strong> - Food store on route<br>
                  <strong>FR</strong> - Restaurant stop<br>
                  <strong>BF</strong> - Bring food<br>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        
        <v-flex xs1 order-sm3 order-xs1>
          <v-btn color="primary" v-on:click.stop="filterDialog = true">
            <v-icon>filter_list</v-icon>&nbsp;Ride Filters
          </v-btn>
          <v-dialog v-model="filterDialog" max-width="314px">
            <v-card>
              <v-card-title>
                <strong>Ride Filters</strong>
              </v-card-title>
              <v-container align-center pa-2>
                <v-layout>
                  <v-flex d-flex>
                    <table>
                      <tr>
                        <td align="right"><strong>Day:</strong></td>
                        <td>
                          <v-container grid-list-xs>
                            <v-layout>
                              <v-flex d-flex>
                                <v-btn-toggle multiple v-model="showDays" v-on:change="toggleDays()">
                                  <v-btn outline class="flex-grow" color="primary">S</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">M</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">T</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">W</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">T</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">F</v-btn>
                                  <v-btn outline class="flex-grow" color="primary">S</v-btn>
                                </v-btn-toggle>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </td>
                      </tr>
                      <tr>
                        <td align="right"><strong>History:</strong></td>
                        <td>
                          <v-container grid-list-xs>
                            <v-layout>
                              <v-flex d-flex>
                                <v-btn-toggle multiple v-model="showExpireds" v-on:change="toggleExpired()">
                                  <v-btn outline dark class="flex-grow" color="primary">Past</v-btn>
                                  <v-btn outline dark class="flex-grow" color="primary">Future</v-btn>
                                </v-btn-toggle>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </td>
                      </tr>
                      <tr>
                        <td align="right"><strong>Pace:</strong></td>
                        <td>
                          <v-container grid-list-xs>
                            <v-layout>
                              <v-flex d-flex>
                                <v-btn-toggle multiple v-model="showSpeeds" v-on:change="toggleSpeeds()">
                                  <v-btn outline dark class="flex-grow" color="primary">10-12</v-btn>
                                  <v-btn outline dark class="flex-grow" color="primary">12-15</v-btn>
                                  <v-btn outline dark class="flex-grow" color="primary">16+</v-btn>
                                </v-btn-toggle>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </td>
                      </tr>
                    </table>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid align-end pa-0>
                <v-layout>
                  <v-flex xs2 offset-xs8 offset-md8>
                    <v-btn color="primary" flat v-on:click.stop="filterDialog = false">Close</v-btn>
                  </v-flex>
                </v-layout>
                </v-container>
            </v-card>
          </v-dialog>
        </v-flex>

        <v-flex xs12 order-sm6 order-xs4>
          <v-data-table v-bind:headers="headers" v-bind:items="filteredRides" item-key="when"
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
                    v-bind:class="speedAndExpiredClasses(rides.item)"
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
                <td class="speed0" align="left">Women only</td>
              </tr>
              <tr>
                <td/>
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

          <v-flex xs12 order-sm9 order-xs9 hidden-sm-and-down>
            <img src="static/gears_web_logo.png"/>
          </v-flex>

          <v-flex xs12 order-sm9 order-xs9 hidden-md-and-up>
            <img src="static/gears_web_logo_sm.jpg"/>
          </v-flex>

        </v-layout>
        <div id="copyright" class="text-xs-left">
          <a href="https://github.com/b-jazz">&copy;b-jazz</a>
        </div>

        <div id="bug-link" class="text-xs-left">
          <a href="https://github.com/eugenegears/calendar/issues/new">Submit bug report or feature request.</a>
        </div>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>
var dateFormat = require("dateformat")
var _ = require("lodash")
import { storageAvailable, getZeroBasedArrayFromStorage, setArrayToStorage, populateStorage } from "./storage"
import { filterRides } from "./filters"
import { warn } from "./debug"

export default {
    mounted: function () {
        var storage = window.localStorage
        // if it exists and is empty (OK) or if it exists and has value (i.e. "truthy")
        if (!(storage.getItem("speeds") === "" || storage.getItem("speeds"))) {
            populateStorage()
        }
        this.showSpeeds = getZeroBasedArrayFromStorage("localStorage", "speeds", 3)
        this.showDays = getZeroBasedArrayFromStorage("localStorage", "days", 7)
        this.showExpireds = getZeroBasedArrayFromStorage("localStorage", "expired", 2)
        warn("showDays: " + this.showDays)
        warn("showSpeeds: " + this.showSpeeds)
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
            
            title: 'July 2018',
            
            // showSpeeds and showDays will be filled in from localStorage
            showSpeeds: [],
            showDays: [],
            showExpireds: [],
            
            toggleDays: function() {
                warn("locally store this for days: " + this.showDays)
                setArrayToStorage("localStorage", "days", this.showDays)
            },
            
            toggleSpeeds: function() {
                warn('locally store this for speeds: ' + this.showSpeeds)
                setArrayToStorage("localStorage", "speeds", this.showSpeeds)
            },
            
            toggleExpired: function() {
                setArrayToStorage("localStorage", "expired", this.showExpireds)
            },
            
            speedAndExpiredClasses: function (ride) {
                var speedClass = /10/.test(ride["pace"]) ? "speed1" : /16/.test(ride["pace"]) ? "speed3" : "speed2"
                var now = new Date()
                var ridedate = Date.parse(ride["when"])
                var expiredClass = ""
                
                if (/women.only.ride/i.test(ride["ridedesc"])) {
                    speedClass = "speed0"
                }
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
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/302e-Cue-Sheet-Sheet1.pdf",
                    "food": "FS",
                    "leader": "Mel Huey",
                    "mapurl": "http://www.gmap-pedometer.com/?r=5834240",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-345-3181",
                    "rating": "C",
                    "ridedesc": "Veneta via Bolton Hill Rd",
                    "ridelength": "49 Miles",
                    "ridenum": "302e",
                    "thumbnail": "static/302e.png",
                    "when": "Sun Jul 01 2018 09:00:01 GMT-0800 (PST)"
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
                    "when": "Tue Jul 03 2018 08:30:02 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/06/617-CueSheet-Sheet1.pdf",
                    "food": "BF",
                    "leader": "Garry Swanson",
                    "mapurl": "http://www.gmap-pedometer.com/?r=2920827",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-726-3997",
                    "rating": "A",
                    "ridedesc": "Annual 4th of July Ride to Harrisburg Parade",
                    "ridelength": "46 miles",
                    "ridenum": "617",
                    "thumbnail": "static/617.png",
                    "when": "Wed Jul 04 2018 09:00:03 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/209c-Cue-Sheet-Sheet1.pdf",
                    "food": "FR",
                    "leader": "Steve Hecker",
                    "mapurl": "https://ridewithgps.com/routes/27059047",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-954-1161",
                    "rating": "A",
                    "ridedesc": "Alvadore via Meadowview",
                    "ridelength": "35 Miles",
                    "ridenum": "209c",
                    "thumbnail": "static/209c.png",
                    "when": "Thu Jul 05 2018 08:30:04 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Paula Erickson",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-953-2894",
                    "rating": "A",
                    "ridedesc": "Women Only Ride Route announced at ride",
                    "ridelength": "20-26 Miles",
                    "ridenum": "##",
                    "when": "Thu Jul 05 2018 18:00:05 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/405b-Pleasant-Hill-and-Clearwater.pdf",
                    "food": "FS",
                    "leader": "Larry Diffie",
                    "mapurl": "https://ridewithgps.com/routes/17387512",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-729-7923",
                    "rating": "B",
                    "ridedesc": "Pleasant Hill to Clearwater Trail",
                    "ridelength": "40 Miles",
                    "ridenum": "405b",
                    "thumbnail": "static/405b.png",
                    "when": "Sat Jul 07 2018 08:30:06 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/405b-Pleasant-Hill-and-Clearwater.pdf",
                    "food": "FS",
                    "leader": "Ray Linneman",
                    "mapurl": "https://ridewithgps.com/routes/17387512",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "458-205-1497",
                    "rating": "B",
                    "ridedesc": "Pleasant Hill to Clearwater Trail",
                    "ridelength": "40 Miles",
                    "ridenum": "405b",
                    "thumbnail": "static/405b.png",
                    "when": "Sat Jul 07 2018 08:30:07 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/1125c-McKenzie-Clearwater.pdf",
                    "food": "FS",
                    "leader": "Mike Cantrell",
                    "mapurl": "http://www.gmap-pedometer.com/?r=6534478",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-342-7649",
                    "rating": "B",
                    "ridedesc": "McKenzie View, Sunderman Clearwater Trail",
                    "ridelength": "39 Miles",
                    "ridenum": "125c",
                    "thumbnail": "static/125c.png",
                    "when": "Sun Jul 08 2018 08:30:08 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/905a_-_Mohawk_150K_Route_.pdf",
                    "food": "FS",
                    "leader": "Kristin Yarris",
                    "mapurl": "https://ridewithgps.com/routes/26858803",
                    "meet": "Armitage Park",
                    "pace": "16+ mph",
                    "phone": "213-448-5645",
                    "rating": "C",
                    "ridedesc": "Brownsville to Sodaville return via Gap Rd",
                    "ridelength": "94 Miles",
                    "ridenum": "905a",
                    "thumbnail": "static/905a.png",
                    "when": "Sun Jul 08 2018 08:00:09 GMT-0800 (PST)"
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
                    "when": "Tue Jul 10 2018 08:30:10 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/114b-Cue-Sheet-Sheet1.pdf",
                    "food": "FS",
                    "leader": "Garry Swanson",
                    "mapurl": "http://www.gmap-pedometer.com/?r=5809459",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-726-3997",
                    "rating": "B",
                    "ridedesc": "McKenzie View & Sunderman Rd",
                    "ridelength": "35 Miles",
                    "ridenum": "114b",
                    "thumbnail": "static/114b.png",
                    "when": "Thu Jul 12 2018 08:30:11 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Paula Erickson",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-953-2894",
                    "rating": "A",
                    "ridedesc": "Women Only Ride Route announced at ride",
                    "ridelength": "20-26 Miles",
                    "ridenum": "##",
                    "when": "Thu Jul 12 2018 18:00:12 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2014/01/211a-Cue-Sheet.pdf",
                    "food": "FS",
                    "leader": "Ted Conover",
                    "mapurl": "http://www.gmap-pedometer.com/?r=2830362",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-344-4994",
                    "rating": "C",
                    "ridedesc": "Lawrence and Short Butler",
                    "ridelength": "40 Miles",
                    "ridenum": "211a",
                    "thumbnail": "static/211a.png",
                    "when": "Sat Jul 14 2018 08:30:13 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/10/319b-Cue-Sheet1.pdf",
                    "food": "BF",
                    "leader": "Mike Cantrell",
                    "mapurl": "http://www.gmap-pedometer.com/?r=6169490",
                    "meet": "Alton Baker Park",
                    "pace": "12-15 mph",
                    "phone": "541-342-7649",
                    "rating": "C",
                    "ridedesc": "Petzold, Out and Back",
                    "ridelength": "35 Miles",
                    "ridenum": "319b",
                    "thumbnail": "static/319b.png",
                    "when": "Sun Jul 15 2018 08:30:14 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2009/07/301c_Cue_Sheet.pdf",
                    "food": "BF",
                    "leader": "Jeff Sprague",
                    "mapurl": "http://www.gmap-pedometer.com/?r=6220814",
                    "meet": "Alton Baker Park",
                    "pace": "16+ mph",
                    "phone": "541-484-4434",
                    "rating": "C",
                    "ridedesc": "bRamble Crow Loop",
                    "ridelength": "43 Miles",
                    "ridenum": "301c",
                    "thumbnail": "static/301c.png",
                    "when": "Sun Jul 15 2018 08:30:15 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Larry Diffie",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-729-7923",
                    "rating": "C",
                    "ridedesc": "Hills for the 'dis-in-climbed'",
                    "ridelength": "20-40 Miles",
                    "ridenum": "##",
                    "when": "Mon Jul 16 2018 09:00:16 GMT-0800 (PST)"
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
                    "when": "Tue Jul 17 2018 08:30:17 GMT-0800 (PST)"
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
                    "ridedesc": "Clearwater Trail & Scenic Springfield",
                    "ridelength": "25 Miles",
                    "ridenum": "125a",
                    "thumbnail": "static/125a.png",
                    "when": "Thu Jul 19 2018 08:30:18 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Paula Erickson",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-953-2894",
                    "rating": "A",
                    "ridedesc": "Women Only Ride Route announced at ride",
                    "ridelength": "20-26 Miles",
                    "ridenum": "##",
                    "when": "Thu Jul 19 2018 18:00:19 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Robin Forster",
                    "meet": "Noble Urban Winery",
                    "pace": "10-12 mph",
                    "phone": "541-953-3166",
                    "rating": "A",
                    "ridedesc": "This is a leisurely 5 mile one way  (10 mile round trip)  and relaxing Friday evening  ride. We leave at exactly 6:00 pm from Noble Urban Winery at 560 Commercial. Make sure you have your helmet, and a light.",
                    "ridelength": "10 Miles",
                    "ridenum": "##",
                    "when": "Fri Jul 20 2018 18:00:20 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/227c-Cue-Sheet-Sheet1.pdf",
                    "food": "FS",
                    "leader": "Garry Swanson",
                    "mapurl": "http://www.gmap-pedometer.com/?r=5834280",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-726-3997",
                    "rating": "B",
                    "ridedesc": "Applegate Trail Rd CCW",
                    "ridelength": "49 Miles",
                    "ridenum": "227c",
                    "thumbnail": "static/227c.png",
                    "when": "Sat Jul 21 2018 08:30:21 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Jackie Murdoff",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-345-3941",
                    "rating": "C",
                    "ridedesc": "Carpool to White's Park in Sweet Home for a ride up Quartz Creek Rd to Yellowbottom Campground, Out & Back. 2740 Elev. Gain. RSVP to Jackie at 541-345-3941.",
                    "ridelength": "61 Miles",
                    "ridenum": "##",
                    "when": "Sat Jul 21 2018 07:00:22 GMT-0800 (PST)"
                },
                {
                    "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/210a-Cue-Sheet.pdf",
                    "food": "FS",
                    "leader": "Kristin Yarris",
                    "mapurl": "http://www.gmap-pedometer.com/?r=5809639",
                    "meet": "Alton Baker Park",
                    "pace": "16+ mph",
                    "phone": "213-448-5645",
                    "rating": "C",
                    "ridedesc": "Poodle Creek Metric Century",
                    "ridelength": "62 Miles",
                    "ridenum": "210a",
                    "thumbnail": "static/210a.png",
                    "when": "Sun Jul 22 2018 08:30:23 GMT-0800 (PST)"
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
                    "when": "Tue Jul 24 2018 08:30:24 GMT-0800 (PST)"
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
                    "ridedesc": "McKenzie View & Sunderman Rd",
                    "ridelength": "35 Miles",
                    "ridenum": "114b",
                    "thumbnail": "static/114b.png",
                    "when": "Thu Jul 26 2018 08:30:25 GMT-0800 (PST)"
                },
                {
                    "food": "BF",
                    "leader": "Paula Erickson",
                    "meet": "Alton Baker Park",
                    "pace": "10-12 mph",
                    "phone": "541-953-2894",
                    "rating": "A",
                    "ridedesc": "Women Only Ride Route announced at ride",
                    "ridelength": "20-26 Miles",
                    "ridenum": "##",
                    "when": "Thu Jul 26 2018 18:00:26 GMT-0800 (PST)"
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
                    "when": "Tue Jul 31 2018 08:30:27 GMT-0800 (PST)"
                }
            ]
        }
    },
    computed: {
        filteredRides: function () {
            let speedsConfig = this.showSpeeds
            let expiredsConfig = this.showExpireds
            let daysConfig = this.showDays
            return _.filter(this.rides, function(r) { return filterRides(r, speedsConfig, expiredsConfig, daysConfig) })
        },
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
.speed0 {
    background-color: #E0E0D3;
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
.flex-grow {
    flex-grow: 1;
}
</style>
