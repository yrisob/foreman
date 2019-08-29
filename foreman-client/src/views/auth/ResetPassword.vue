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
                Задать новый пароль
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-subtitle>
        <v-divider></v-divider>

        <div class="offset-md-1 pa-1 lighttheme-text">
          Для окончания сброса пароля задайте новый пароль
        </div>

        <form-component
          :fieldsList="repairFields"
          :buttonsList="repairButtons"
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
  props: ['repairToken'],
  data () {
    return {
      repairFields: [{
        type: 'password',
        value: '',
        title: 'пароль',
        counter: 0,
        rule: [
          v => !!v || 'Требуется пароль',
          v => v.length > 6 || 'пароль должен быть более 6 символов'
        ]
      },
      {
        type: 'password',
        value: '',
        title: 'повторите пароль',
        counter: 0,
        rule: [
          v => !!v || 'Требуется повторение пароля',
          v => v.length > 6 || 'пароль должен быть более 6 символов'
        ]
      }],
      repairButtons: [{
        name: 'задать пароль',
        class: 'col-md-4 col-xs-10  offset-md-1 offset-xs-1 caption v-btn--outlined',
        exec: () => { this.setPassword() }
      },
      {
        name: 'На главную',
        class: 'col-md-3 offset-md-3  col-xs-10 offset-xs-1 caption v-btn--flat v-btn--text',
        exec: () => { this.goToMainPage() }
      }]
    }
  },
  methods: {
    setPassword () {
      console.log('set password, send new password and repairToken for checking access for this action ....')
    },
    resetPassword () {
      this.$router.push({ path: '/' })
    }
  }

}
</script>
