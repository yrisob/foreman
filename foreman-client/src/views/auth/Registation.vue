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
                Зарегистрироваться
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item-subtitle>
        <v-divider></v-divider>
        <form-component
          :fieldsList="registrationFields"
          :buttonsList="registrationButtons"
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
      registrationFields: [{
        type: 'text',
        value: '',
        title: 'имя',
        counter: 0,
        rule: [
          v => !!v || 'Требуется ввод имени',
          v => v.length >= 2 || 'Имя должно содержать более двух символов'
        ]
      }, {
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
        type: 'text',
        value: '',
        title: 'телефон',
        counter: 0,
        rule: [
          v => !!v || 'Требуется ввод телофона',
          v => v.length === 12 || 'Телефон должен содержать 12 символов: +79011234567'
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
        ]
      },
      {
        type: 'password',
        value: '',
        title: 'проверка пароля',
        counter: 0,
        rule: [
          v => !!v || 'Требуется пароль',
          v => v.length > 6 || 'пароль должен быть более 6 символов',
          v => v === this.registrationFields[3].value || 'повторение пароля должно совпадать с паролем'
        ],
        linkedLink: {
          title: 'Регистрируясь я соглашаюсь с офертой',
          exec: () => { this.openOfferta() }
        }
      }],
      registrationButtons: [{
        name: 'Регистрация',
        class: 'col-md-3 col-xs-10  offset-md-1 offset-xs-1 caption v-btn--outlined',
        exec: () => { this.registrate() }
      },
      {
        name: 'На главную',
        class: 'col-md-3 offset-md-4  col-xs-10 offset-xs-1 caption v-btn--flat v-btn--text',
        exec: () => { this.goToMainPage() }
      }]
    }
  },
  mounted () {
    this.$nextTick(function () {
      if (this.email) {
        this.registrationFields[1].value = this.email
      }
    })
  },
  methods: {
    registrate () {
      console.log('call registrate api')
    },
    openOfferta () {
      console.log('октрытие оферты сервиса')
    },
    goToMainPage () {
      this.$router.push({ path: '/' })
    }
  }

}
</script>
