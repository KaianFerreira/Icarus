<template>
  <v-app id="app">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        teste: 'iuo',
        password: 'oi'
      }
    },
    methods: {
      save () {

      }
    }
  }
</script>
