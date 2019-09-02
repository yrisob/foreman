<template>
  <v-app-bar app>
    <v-toolbar-title
      class="headline text-uppercase cursor_pointer"
      @click="goToMainPage()"
    >
      <span>{{ first_part }}</span>
      <span class="font-weight-light">{{ second_part }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="login">
      <span class="mr-2">{{ getUserData ? "выйти" : "войти" }}</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'tool-bar',
  data: () => ({
    first_part: 'Vuetify',
    second_part: 'MATERIAL DESIGN'
  }),
  computed: {
    getUserData () {
      const userInfo = this.$store.getters.GET_USER
      return !!userInfo
    }

  },
  methods: {
    goToMainPage () {
      this.$router.push('/', () => {})
    }
  }

}
</script>
