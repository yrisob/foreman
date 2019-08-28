<template>
  <v-app>
    <v-container>
      <tool-bar></tool-bar>
      <v-content>
        <router-view />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import './assets/main.css'
import ToolBar from './components/ToolBar'

export default {
  name: 'App',
  components: {
    ToolBar
  },
  data: () => ({
    //
  }),
  methods: {

  }
}
</script>
