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
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" class="col-md-10 offset-md-1">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :counter="10"
                  label="email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="col-md-10 offset-md-1">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :counter="10"
                  label="пароль"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="col-md-10 offset-md-1">
                <a class="primary--text caption uppercase"
                  >восстановить пароль</a
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="pa-1"></div>
                <v-btn
                  class="col-md-2 col-xs-10  offset-md-1 offset-xs-1 caption"
                  outlined
                  >Войти</v-btn
                >
                <div
                  class="pa-1"
                  v-show="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
                />
                <v-btn
                  class="col-md-4 offset-md-4  col-xs-10 offset-xs-1 caption"
                  outlined
                  >Зарегистрироваться</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'Требуется ввод email',
      v => /.+@.+/.test(v) || 'Email должен соответсвенновть почтовым адресам'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Требуется пароль'
    ]
  })

}
</script>
