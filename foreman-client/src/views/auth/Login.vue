<template>
  <v-row>
    <v-col
      class="col-md-6 offset-md-3 col-xs-10 offset-xs-1 col-xs-10 offset-sm-1 "
    >
      <v-card class="ma-8" outlined elevation="10">
        <v-list-item-subtitle>
          <v-list-item-content>
            <v-list-item-title class="headline">
              <span class="offset-md-1 pa-1 uppercase lighttheme-text ">
                Войти в систему
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-subtitle>
        <v-divider></v-divider>
        <form-component
          :fieldsList="loginFields"
          :buttonsList="loginButtons"
        ></form-component>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FormComponent from '../../components/FormComponent'

export default {
  components: {
    FormComponent
  },
  data () {
    return {
      loginFields: [{
        type: 'email',
        value: '',
        title: 'email',
        counter: 0,
        rule: [
          v => !!v || 'Требуется ввод email',
          v => /.+@.+/.test(v) || 'Email должен соответсвенновть почтовым адресам'
        ]
      },
      {
        type: 'password',
        value: '',
        title: 'пароль',
        counter: 0,
        rule: [
          v => !!v || 'Требуется пароль',
          v => v.length > 6 || 'пароль должен быть более 6 символов'
        ],
        linkedLink: {
          title: 'восстановить пароль',
          exec: () => { this.resetPassword() }
        }
      }],
      loginButtons: [{
        name: 'Войти',
        class: 'col-md-2 col-xs-10  offset-md-1 offset-xs-1 caption small v-btn--outlined',
        disabled: true,
        exec: () => { this.login() }
      },
      {
        name: 'Зарегистироваться',
        class: 'col-md-4 offset-md-4  col-xs-10 offset-xs-1 caption v-btn--flat small v-btn--text',
        exec: () => { this.registrate() }
      }]
    }
  },
  watch: {
    loginFields: {
      handler: function (newValue) {
        this.loginButtons[0].disabled = !newValue[0].value || !newValue[1].value
      },
      deep: true
    }
  },
  methods: {
    registrate () {
      const queryParmas = this.loginFields[0].value ? `?email=${this.loginFields[0].value}` : ''
      this.$router.push(`/registration${queryParmas}`)
    },
    async login () {
      console.log('component loging in..')
      const success = await this.$store.dispatch('LOGIN', { email: this.loginFields[0].value, password: this.loginFields[1].value })
      if (success) {
        console.log(this.$store.getters.GET_USER)
      }
    },
    resetPassword () {
      const queryParmas = this.loginFields[0].value ? `?email=${this.loginFields[0].value}` : ''
      this.$router.push(`/repairpassword${queryParmas}`)
    }
  }

}
</script>
