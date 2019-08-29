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
                Восстановить пароль
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-subtitle>
        <v-divider></v-divider>

        <div class="offset-md-1 pa-1 lighttheme-text">
          Для востановления пароля вам на указанный email будет отправлена
          инструкция
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
  props: ['email'],
  data () {
    return {
      repairFields: [{
        type: 'email',
        value: '',
        title: 'email',
        counter: 0,
        rule: [
          v => !!v || 'Требуется ввод email',
          v => /.+@.+/.test(v) || 'Email должен соответсвенновть почтовым адресам'
        ]
      }],
      repairButtons: [{
        name: 'Сбросить пароль',
        class: 'col-md-4 col-xs-10  offset-md-1 offset-xs-1 caption v-btn--outlined',
        exec: () => { this.sendRepairMail() }
      },
      {
        name: 'На главную',
        class: 'col-md-3 offset-md-3  col-xs-10 offset-xs-1 caption v-btn--flat v-btn--text',
        exec: () => { this.goToMainPage() }
      }]
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.email) {
        this.repairFields[0].value = this.email
      }
    })
  },
  methods: {
    sendRepairMail () {
      console.log('send mail with repair instruction ....')
    },
    resetPassword () {
      this.$router.push({ path: '/' })
    }
  }

}
</script>
