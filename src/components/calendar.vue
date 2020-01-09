<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">

          <!-- Basic Infos and Buttons -->
          <v-btn outlined color="primary" class="mr-4" dark @click="dialog=true">
            New Event
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Country Code Combo Box -->
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                color="grey darken-2"
                v-on="on"
                class="mr-4"
              >
                <span>{{ countryCodeToName[countryCode] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="countryCodeChanged('AT')">
                <v-list-item-title>Austria</v-list-item-title>
              </v-list-item>
              <v-list-item @click="countryCodeChanged('AU')">
                <v-list-item-title>Australia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="countryCodeChanged('US')">
                <v-list-item-title>USA</v-list-item-title>
              </v-list-item>
              <v-list-item @click="countryCodeChanged('JP')">
                <v-list-item-title>Japan</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- Calendar View Combo Box -->
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                color="grey darken-2"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <!-- Add Event Dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="Name"/>
              <v-text-field v-model="details" type="text" label="Details"/>
              <v-text-field v-model="start" type="date" label="Date"/>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog=false">
                Create Event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <!-- Calendar -->
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{selectedEvent.name}}
              </form>
              <form v-else>
                <textarea
                  v-model="selectedEvent.name"
                  type="text"
                  style="width: 100%"
                  :max-height="50"
                  placeholder="add note"
                >
                </textarea>
              </form>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <form v-if="currentlyEditing !== selectedEvent.id">
                {{selectedEvent.details}}
              </form>
              <form v-else>
                <textarea
                  v-model="selectedEvent.details"
                  type="text"
                  style="width: 100%"
                  :min-height="100"
                  placeholder="add note"
                >
                </textarea>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Close
              </v-btn>
              <v-btn
                text
                v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Edit
              </v-btn>
              <v-btn
                text
                v-else
                @click.prevent="updateEvent(selectedEvent)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

export default {
  props: ['calendarId'],
  data: () => ({
    today: new Date().toISOString().substring(0,10),
    focus: new Date().toISOString().substring(0,10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day:"Day",
      "4day": "4 Days"
    },
    countryCode: "AT",
    countryCodeToName: {
      "AT":"Austria",
      "US":"USA",
      "AU":"Australia",
      "JP":"Japan"
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false
  }),
  mounted() {
    this.getEvents()
    if(this.calendarId == null) {
      alert("You are not logged in! Please log in or register to access this site!")
      this.$router.push('/')
    }
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    getEvents() {
       let tempEvents = loadEventsAndHolidays(this.calendarId, this.countryCode)
       this.events = tempEvents
    },
    getEventColor(event){
        return event.color
    },
    setToday() {
        this.focus = this.today
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    viewDay({date}) {
      this.focus = date
      this.type = "day"
    },
    countryCodeChanged(countryCode) {
      this.countryCode = countryCode
      this.events = loadEventsAndHolidays(this.calendarId, this.countryCode)
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => (this.selectedOpen = true), 10)
      }

      if(this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({start, end}) {
      this.start = start
      this.end = end
    },
    editEvent(ev){
      this.currentlyEditing = ev.id
    },
    updateEvent(ev){
      
      ev.calendar = {id: this.calendarId}

      let xhr = new XMLHttpRequest()
      xhr.open("POST", "http://localhost:8085/events", true)
      xhr.setRequestHeader("Content-Type", "Application/Json")
      xhr.send(JSON.stringify(ev))

      this.selectedOpen = false
      this.currentlyEditing = null
    },
    addEvent() {
      let self = this
      if(this.name && this.start) {
        //POST Request to insert event into the db  
        let ev = {}
        ev.name = this.name
        ev.details = this.details
        ev.start = this.start
        ev.calendar = {id: this.calendarId}

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200) {
            self.getEvents()
        }
      }
        xhr.open("POST", "http://localhost:8085/events", true)
        xhr.setRequestHeader("Content-Type", "Application/Json")
        xhr.send(JSON.stringify(ev))

        this.name = ""
        this.details = ""
        this.start = ""
      } else {
        alert("Name and Date are mandatory fields!")
      }
    },
    deleteEvent(evId){
      let xhr = new XMLHttpRequest()
      let self = this
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200) {
            self.selectedOpen = false
            self.getEvents()
        }
      }
      xhr.open("DELETE", "http://localhost:8085/events/" + evId, true)
      xhr.send()
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}

function loadEventsAndHolidays(calendarId, countryCode) {
  let tempEvents = []
  //http request to load all custom events
       let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200) {
                let snapshot = JSON.parse(xhr.responseText)
                snapshot.forEach(ev => {
                  ev.color = "#3519bf"
                  ev.type = "scheduled"
                  tempEvents.push(ev)
                })
            }
        }
        xhr.open("GET", "http://localhost:8085/events?calendarId=" + calendarId, true)
        xhr.send()

        //http request to load all holidays
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = function() {
          if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
              let snapshot = JSON.parse(xmlHttp.responseText)
              snapshot.forEach(ev => {
                ev.color = "#eb6e2a"
                ev.type = "holiday"
                tempEvents.push(ev)
              })
          }
        }
        xmlHttp.open("GET", "http://localhost:8085/holidays/" + countryCode)
        xmlHttp.send()
    return tempEvents
}
</script>