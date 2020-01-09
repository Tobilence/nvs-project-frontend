<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Username" type="text" v-model="name"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined @click="goback()">Back</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { send } from 'q'
  export default {
    data: () => ({
      drawer: null,
      name: "",
      password: ""
    }),
    methods:{
      login(){
        let router = this.$router

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4 && xhr.status == 200) {
            let user = JSON.parse(xhr.responseText)
            router.push({name: 'calendar', params: {calendarId: user.calendar.id}})
          }
        }
        xhr.open("POST", "http://localhost:8085/authentication", true)
        xhr.setRequestHeader("Content-Type", "Application/json")
        xhr.send(JSON.stringify({"username":this.name, "password":this.password}))
      },
      goback(){
        window.history.go(-1)
      }
  }
}
</script>