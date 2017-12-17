<template>
  <v-app>
    <v-content>
      <v-container grid-list-md text-md-center>
        <v-layout row wrap>
          <v-flex xs12>
            <h2>GEARs December 2017 Rides</h2>
          </v-flex>
          <v-flex xs6>
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
          <v-flex xs6>
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

          <v-flex xs6>
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

          <v-flex xs6>
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
            <v-data-table v-bind:headers="headers" v-bind:items="rides"
              hide-actions disable-initial-sort id="ridetable"
              >
              <template slot="headers" slot-scope="rides">
                <tr align="left" id="rideheader">
                  <th v-for="header in rides.headers" class="rideheadercell">
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" slot-scope="rides">
                <tr id="riderow"
                    v-show="showSpeedAndDay(rides.item.pace, rides.item.when)"
                    v-bind:class="/10/.test(rides.item.pace) ? 'speed1' : /16/.test(rides.item.pace) ? 'speed3' : 'speed2'"
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
          <v-flex xs2>
            <v-card>
              <strong>Color Key:</strong>
            </v-card>
          </v-flex>
          <v-flex xs4>
            <v-card>
              <div class="speed1 left ">10-12 mph leader pace</div>
              <div class="speed2 left ">12-15 mph leader pace</div>
              <div class="speed3 left ">16+ mph leader pace</div>
            </v-card>
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
        </v-layout>
      </v-container>

    </v-content>
  </v-app>
</template>

<script>
var dateFormat = require("dateformat")
var _ = require("lodash")
import { storageAvailable } from "./storage"

export default {
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

      title: 'December 2017',

      // showSpeeds and showDays will be filled in from localStorage
      showSpeeds: [1],
      showDays: [0, 1, 3, 6],

      toggleDays: function() {
        console.log(this.showDays)
      },

      toggleSpeeds: function() {
        console.log('about to toggle speed')
        if (storageAvailable('localStorage')) {
          console.log('storage IS available')
        } else {
          console.log('problem with storage')
        }
        console.log(this.showSpeeds)
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
      showSpeedAndDay: function (s, d) {
        var ss = this.showSpeed(s)
        // console.log("showSpeed(" + s + "): " + ss)
         var sd = this.showDay(d)
        // console.log("showDay(" + d + "): " + sd)
        return ss && sd
        // return this.showSpeed(s) && this.showDay(d)
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
          "when": "Sat Dec 02 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "319b",
          "ridedesc": "Petzold, Out and Back",
          "pace": "10-12 mph",
          "ridelength": "35 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Larry Diffie",
          "phone": "541-729-7923",
        },
        {
          "when": "Sat Dec 02 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "318d",
          "ridedesc": "Swing Log Bridge via Lorane Hwy",
          "pace": "12-15 mph",
          "ridelength": "41 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Jackie Murdoff",
          "phone": "541-345-3941",
        },
        {
          "when": "Sun Dec 03 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "300a",
          "ridedesc": "Crow (Town)",
          "pace": "10-12 mph",
          "ridelength": "40 miles",
          "food": "FS",
          "rating": "C",
          "leader": "Ray Linneman",
          "phone": "458-205-1497",
        },
        {
          "when": "Sun Dec 03 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Killer 'B's - Bailey, Briggs, Bolton and Butler Hills",
          "pace": "12-15 mph",
          "ridelength": "60 miles",
          "food": "FS",
          "rating": "C",
          "leader": "John Reidy",
          "phone": "805-807-5657",
        },
        {
          "when": "Mon Dec 04 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Conquer the Hill with Jackie",
          "pace": "10-12 mph",
          "ridelength": "20 - 40 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Jackie Murdoff",
          "phone": "541-345-3941",
        },
        {
          "when": "Tue Dec 05 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "pace": "12-15 mph",
          "ridelength": "25 - 50 miles",
          "food": "BF",
          "rating": "C",
          "leader": "John Reidy",
          "phone": "805-807-5657",
        },
        {
          "when": "Thu Dec 07 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "209c",
          "ridedesc": "Alvadore via Meadowview",
          "pace": "12-15 mph",
          "ridelength": "35 miles",
          "food": "FR",
          "rating": "A",
          "leader": "Steve Hecker",
          "phone": "541-954-1161",
        },
        {
          "when": "Sat Dec 09 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "405b",
          "ridedesc": "Pleasant Hill to Clearwater Trail",
          "pace": "10-12 mph",
          "ridelength": "40 miles",
          "food": "FR",
          "rating": "B",
          "leader": "Steve Hecker",
          "phone": "541-954-1161",
        },
        {
          "when": "Sat Dec 09 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "405b",
          "ridedesc": "Pleasant Hill to Clearwater Trail",
          "pace": "12-15 mph",
          "ridelength": "40 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Garry Swanson",
          "phone": "541-726-3997",
        },
        {
          "when": "Sun Dec 10 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "125b",
          "ridedesc": "Clearewater Trail to McKenzie View",
          "pace": "12-15 mph",
          "ridelength": "29 miles",
          "food": "BF",
          "rating": "B",
          "leader": "Mike Cantrell",
          "phone": "541-342-7649",
        },
        {
          "when": "Mon Dec 11 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Conquer the Hill with Jackie",
          "pace": "10-12 mph",
          "ridelength": "20 - 40 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Jackie Murdoff",
          "phone": "541-345-3941",
        },
        {
          "when": "Tue Dec 12 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "pace": "12-15 mph",
          "ridelength": "25 - 50 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Dave Zumbrunnen",
          "phone": "541-972-9746",
        },
        {
          "when": "Thu Dec 14 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "114b",
          "ridedesc": "McKenzie View & Sunderman",
          "pace": "12-15 mph",
          "ridelength": "35 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Ted Conover",
          "phone": "541-344-4994",
        },
        {
          "when": "Sat Dec 16 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "418a",
          "ridedesc": "Camp Creek Rd to Thurston Rd",
          "pace": "10-12 mph",
          "ridelength": "37 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Larry Diffie",
          "phone": "541-729-7923",
        },
        {
          "when": "Sat Dec 16 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "418a",
          "ridedesc": "Camp Creek Rd to Thurston Rd",
          "pace": "12-15 mph",
          "ridelength": "37 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Garry Swanson",
          "phone": "541-726-3997",
        },
        {
          "when": "Sun Dec 17 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "320b",
          "ridedesc": "Howe Lane via Dillard",
          "pace": "12-15 mph",
          "ridelength": "41 miles",
          "food": "FS",
          "rating": "C",
          "leader": "Tyler Stewart",
          "phone": "541-954-2009",
        },
        {
          "when": "Mon Dec 18 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Conquer the Hill with Jackie",
          "pace": "10-12 mph",
          "ridelength": "20 - 40 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Jackie Murdoff",
          "phone": "541-345-3941",
        },
        {
          "when": "Tue Dec 19 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "##",
          "ridedesc": "Riding some hills - Route will be determined at start",
          "pace": "12-15 mph",
          "ridelength": "25 miles",
          "food": "BF",
          "rating": "C",
          "leader": "Jackie Murdoff",
          "phone": "541-345-3941",
        },
        {
          "when": "Thu Dec 21 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "125b",
          "ridedesc": "Clearwater Trail & Scenic Springfield",
          "pace": "12-15 mph",
          "ridelength": "25 miles",
          "food": "BF",
          "rating": "B",
          "leader": "Mike Cantrell",
          "phone": "541-342-7649",
        },
        {
          "when": "Sat Dec 23 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "211a",
          "ridedesc": "Lawrence and Short Butler",
          "pace": "12-15 mph",
          "ridelength": "40 miles",
          "food": "FS",
          "rating": "C",
          "leader": "Ted Conover",
          "phone": "541-344-4994",
        },
        {
          "when": "Sat Dec 23 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "211a",
          "ridedesc": "Lawrence and Short Butler",
          "pace": "16+ mph",
          "ridelength": "40 miles",
          "food": "FS",
          "rating": "C",
          "leader": "Dave Zumbrunnen",
          "phone": "541-972-9746",
        },
        {
          "when": "Sun Dec 24 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "207a",
          "ridedesc": "Franklin Firehouse",
          "pace": "12-15 mph",
          "ridelength": "39 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Mike Cantrell",
          "phone": "541-342-7649",
        },
        {
          "when": "Thu Dec 28 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "114b",
          "ridedesc": "McKenzie View & Sunderman",
          "pace": "12-15 mph",
          "ridelength": "35 miles",
          "food": "FS",
          "rating": "B",
          "leader": "Ted Conover",
          "phone": "541-344-4994",
        },
        {
          "when": "Sat Dec 30 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "103e",
          "ridedesc": "Coburg Btm Loop to Bowers Rd",
          "pace": "12-15 mph",
          "ridelength": "39 miles",
          "food": "FS",
          "rating": "A",
          "leader": "Jeff Sprague",
          "phone": "541-484-4434",
        },
        {
          "when": "Sun Dec 31 2017 09:30:00 GMT-0800 (PST)",
          "meet": "Alton Baker Park",
          "ridenum": "31c",
          "ridedesc": "Doane and Briggs Hills via Lorane Hwy",
          "pace": "12-15 mph",
          "ridelength": "41 miles",
          "food": "BF",
          "rating": "C",
          "leader": "John Reidy",
          "phone": "805-807-5657",
        },
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
