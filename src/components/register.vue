<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registration</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field readonly v-if="error" label="Regular" color=red value="errortext"></v-text-field>
                  <v-text-field label="Username" name="register" prepend-icon="person" v-model="username" type="text"></v-text-field>
                  <v-text-field id="Password" label="Password" name="password" prepend-icon="lock" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined @click="goback()">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register()">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      menu: false,
      data: [],
      registeruser: {},
      username: "",
      password: "",
      error: false,
      errortext: "Username or Password wrong!"
    }),
    methods: {
      register() {
        let self = this;
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4) {
            
            if(xhr.status == 200) {
              let user = JSON.parse(xhr.responseText)
              self.$router.push({name: 'calendar', params: {calendarId: user.calendar.id}})
            } else {
              let error = JSON.parse(xhr.responseText)
              alert(error.message)
            }
          }
        }
        xhr.open("POST", "http://localhost:8085/users", true)
        xhr.setRequestHeader("Content-Type", "Application/json")
        xhr.send(JSON.stringify({"username":this.username, "password":this.password}))
      },
      goback(){
        window.history.go(-1)
      }
    }
  }
</script>
