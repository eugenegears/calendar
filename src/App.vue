<template>
<v-app>
  <v-content>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12 order-sm0 order-xs0>
          <h2>GEARs Auguest 2018 Rides</h2>
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
            
            title: 'August 2018',
            
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
        "food": "BF",
        "leader": "Angie Long",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "410-707-4620",
        "rating": "B",
        "ridedesc": "McKenzie View via I-5 Path",
        "ridelength": "25 miles",
        "ridenum": "113b",
        "thumbnail": "static/113b.png",
        "when": "Wed Aug 01 2018 18:00:01 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/1125c-McKenzie-Clearwater.pdf",
        "food": "BF",
        "leader": "Ted Conover",
        "mapurl": "http://www.gmap-pedometer.com/?r=6534478",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-344-4994",
        "rating": "B",
        "ridedesc": "Clearwater Trail & Scenic Springfiled",
        "ridelength": "25 miles",
        "ridenum": "125c",
        "thumbnail": "static/125c.png",
        "when": "Thu Aug 02 2018 08:30:02 GMT-0800 (PST)"
    },
    {
        "food": "FR",
        "leader": "Garry Swanson",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-726-3997",
        "rating": "B",
        "ridedesc": "Howe Lane to Butte Rd, Stop @ Creswell Bakery",
        "ridelength": "37 Miles",
        "ridenum": "320f",
        "thumbnail": "static/320f.png",
        "when": "Sat Aug 04 2018 08:30:03 GMT-0800 (PST)"
    },
    {
        "food": "BF",
        "leader": "Jackie Murdoff",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-345-3941",
        "rating": "C",
        "ridedesc": "Remote start from Oakridge,  riding out and back on Hills Creek rd to Indigo Springs, 60 miles with 2700 ft elevation gain.  We will meet ABP before 0700 to carpool, then caravan to Oakridge Water's Park.  RSVP to Jackie.",
        "ridelength": "60 Miles",
        "ridenum": "##",
        "when": "Tue Aug 07 2018 07:00:04 GMT-0800 (PST)"
    },
    {
        "food": "BF",
        "leader": "Angie Long",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "410-707-4620",
        "rating": "B",
        "ridedesc": "McKenzie View via I-5 Path",
        "ridelength": "25 miles",
        "ridenum": "113b",
        "thumbnail": "static/113b.png",
        "when": "Wed Aug 08 2018 18:00:05 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/12/209c-Cue-Sheet-Sheet1.pdf",
        "food": "FR",
        "leader": "Larry Diffie",
        "mapurl": "https://ridewithgps.com/routes/27059047",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-729-7923",
        "rating": "A",
        "ridedesc": "Alvadore via Meadowview",
        "ridelength": "35 Miles",
        "ridenum": "209c",
        "thumbnail": "static/209c.png",
        "when": "Thu Aug 09 2018 08:30:06 GMT-0800 (PST)"
    },
    {
        "food": "FS",
        "leader": "Robin Forster",
        "meet": "Noble Urban Winery",
        "pace": "10-12 mph",
        "phone": "541-953-3166",
        "rating": "A",
        "ridedesc": "Relaxing Friday evening  ride. We leave at exactly 6:00 pm from Noble Urban Winery at 560 Commercial. Make sure you have your helmet, and a light.",
        "ridelength": "10 Miles",
        "ridenum": "##",
        "when": "Fri Aug 10 2018 18:00:07 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/207a-Cue-Sheet.pdf",
        "food": "FS",
        "leader": "Larry Diffie",
        "mapurl": "http://www.gmap-pedometer.com/?r=5810033",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-729-7923",
        "rating": "B",
        "ridedesc": "Franklin Firehouse",
        "ridelength": "37 Miles",
        "ridenum": "207a",
        "thumbnail": "static/207a.png",
        "when": "Sat Aug 11 2018 08:30:08 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/207a-Cue-Sheet.pdf",
        "food": "FS",
        "leader": "Ray Linneman",
        "mapurl": "http://www.gmap-pedometer.com/?r=5810033",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "458-205-1497",
        "rating": "B",
        "ridedesc": "Franklin Firehouse",
        "ridelength": "37 Miles",
        "ridenum": "207a",
        "thumbnail": "static/207a.png",
        "when": "Sat Aug 11 2018 08:30:09 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/03/207a-Cue-Sheet.pdf",
        "food": "FS",
        "leader": "Kristin Yarris",
        "mapurl": "http://www.gmap-pedometer.com/?r=5810033",
        "meet": "Alton Baker Park",
        "pace": "16+ mph",
        "phone": "213-448-5645",
        "rating": "C",
        "ridedesc": "Franklin Firehouse (Flex: Add Butler Rd)",
        "ridelength": "37+ Miles",
        "ridenum": "207a",
        "thumbnail": "static/207a.png",
        "when": "Sat Aug 11 2018 08:30:10 GMT-0800 (PST)"
    },
    {
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "ridedesc": "Fox Hollow, Briggs and Pine Grove",
        "ridelength": "43 Miles",
        "ridenum": "307e",
        "when": "Sun Aug 12 2018 08:30:11 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/307e-Cue-Sheet.pdf",
        "food": "BF",
        "leader": "Jeff Sprague",
        "mapurl": "https://ridewithgps.com/routes/26775345",
        "meet": "Alton Baker Park",
        "pace": "16+ mph",
        "phone": "541-484-4434",
        "rating": "C",
        "ridedesc": "Fox Hollow, Briggs and Pine Grove",
        "ridelength": "43 Miles",
        "ridenum": "307e",
        "thumbnail": "static/307e.png",
        "when": "Sun Aug 12 2018 08:30:12 GMT-0800 (PST)"
    },
    {},
    {
        "food": "BF",
        "leader": "Angie Long",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "410-707-4620",
        "rating": "B",
        "ridedesc": "McKenzie View via I-5 Path",
        "ridelength": "25 miles",
        "ridenum": "113b",
        "thumbnail": "static/113b.png",
        "when": "Wed Aug 15 2018 18:00:13 GMT-0800 (PST)"
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
        "ridedesc": "McKenzie View & Sunderman Rd",
        "ridelength": "35 Miles",
        "ridenum": "114b",
        "thumbnail": "static/114b.png",
        "when": "Thu Aug 16 2018 08:30:14 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/2013/02/103e-Cue-Sheet-Sheet1.pdf",
        "food": "FS",
        "leader": "Paula Erickson",
        "mapurl": "http://www.gmap-pedometer.com/?r=5809154",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-953-2894",
        "rating": "A",
        "ridedesc": "Bowers Rd via Coburg Bottom Loop",
        "ridelength": "39 Miles",
        "ridenum": "103e",
        "thumbnail": "static/103e.png",
        "when": "Sat Aug 18 2018 08:30:15 GMT-0800 (PST)"
    },
    {
        "food": "FS",
        "leader": "Jackie Murdoff",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-345-3941",
        "rating": "A",
        "ridedesc": "Ingram Island Loop via Coburg, Rtn via Purkerson",
        "ridelength": "66 Miles",
        "ridenum": "205b",
        "thumbnail": "static/205b.png",
        "when": "Sat Aug 18 2018 08:30:16 GMT-0800 (PST)"
    },
    {
        "food": "FS",
        "leader": "Mel Huey",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-915-0788",
        "rating": "C",
        "ridedesc": "Carpool to Drain (town) to do Boswell Rd to Yoncalla. 1400 feet elevation gain. RSVP to Mel Huey.",
        "ridelength": "30 Miles",
        "ridenum": "##",
        "when": "Sun Aug 19 2018 08:30:17 GMT-0800 (PST)"
    },
    {
        "food": "BF",
        "leader": "Jackie Murdoff",
        "meet": "Alton",
        "pace": "12-15 mph",
        "phone": "541-345-3941",
        "rating": "C",
        "ridedesc": "## Riding some hills - Route will be determined at start",
        "ridelength": "25-50 Miles",
        "ridenum": "Baker Park",
        "thumbnail": "static/Baker Park.png",
        "when": "Tue Aug 21 2018 07:30:18 GMT-0800 (PST)"
    },
    {
        "food": "BF",
        "leader": "Angie Long",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "410-707-4620",
        "rating": "B",
        "ridedesc": "McKenzie View via I-5 Path",
        "ridelength": "25 miles",
        "ridenum": "113b",
        "thumbnail": "static/113b.png",
        "when": "Wed Aug 22 2018 18:00:19 GMT-0800 (PST)"
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
        "when": "Thu Aug 23 2018 08:30:20 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/406a-Cue-Sheet.pdf",
        "food": "FS",
        "leader": "Paula Erickson",
        "mapurl": "https://ridewithgps.com/routes/22561777",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-953-2894",
        "rating": "B",
        "ridedesc": "Weyerauser Rd to Pleasant Hill, Out & Back",
        "ridelength": "39 Miles",
        "ridenum": "406a",
        "thumbnail": "static/406a.png",
        "when": "Sat Aug 25 2018 08:30:21 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/406a-Cue-Sheet.pdf",
        "food": "FS",
        "leader": "Garry Swanson",
        "mapurl": "https://ridewithgps.com/routes/22561777",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-726-3997",
        "rating": "B",
        "ridedesc": "Weyerauser Rd to Pleasant Hill, Out & Back",
        "ridelength": "39 Miles",
        "ridenum": "406a",
        "thumbnail": "static/406a.png",
        "when": "Sat Aug 25 2018 08:30:22 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://www.eugenegears.org/ridesheets/329a.pdf",
        "food": "FS",
        "leader": "Sue Wolling",
        "mapurl": "http://www.gmap-pedometer.com/?r=2914175",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "541-448-5645",
        "rating": "D",
        "ridedesc": "6 Hills and a Funeral",
        "ridelength": "61 Miles",
        "ridenum": "329a",
        "thumbnail": "static/329a.png",
        "when": "Sun Aug 26 2018 08:30:23 GMT-0800 (PST)"
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
        "when": "Mon Aug 27 2018 09:00:24 GMT-0800 (PST)"
    },
    {
        "cuesheet": "http://eugenegears.org/wp-content/uploads/125b-Cue-Sheet.pdf",
        "food": "BF",
        "leader": "Paula Erickson",
        "mapurl": "https://ridewithgps.com/routes/17387599",
        "meet": "Alton Baker Park",
        "pace": "10-12 mph",
        "phone": "541-953-2894",
        "rating": "B",
        "ridedesc": "Clearwater Trail to McKenzie View",
        "ridelength": "29 Miles",
        "ridenum": "125b",
        "thumbnail": "static/125b.png",
        "when": "Tue Aug 28 2018 08:30:25 GMT-0800 (PST)"
    },
    {
        "food": "BF",
        "leader": "Angie Long",
        "meet": "Alton Baker Park",
        "pace": "12-15 mph",
        "phone": "410-707-4620",
        "rating": "B",
        "ridedesc": "McKenzie View via I-5 Path",
        "ridelength": "25 miles",
        "ridenum": "113b",
        "thumbnail": "static/113b.png",
        "when": "Wed Aug 29 2018 18:00:26 GMT-0800 (PST)"
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
        "ridedesc": "Clearwater Trail & Scenic Springfiled",
        "ridelength": "25 miles",
        "ridenum": "125c",
        "thumbnail": "static/125c.png",
        "when": "Thu Aug 30 2018 08:30:27 GMT-0800 (PST)"
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
