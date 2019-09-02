<template>
  <v-form>
    <v-container>
      <v-row v-for="(fieldItem, index) in fieldsList" :key="index">
        <v-col cols="12" class="col-md-10 offset-md-1">
          <v-text-field
            v-if="fieldItem.type === 'text' || fieldItem.type === 'email'"
            v-model="fieldItem.value"
            :rules="fieldItem.rule"
            :counter="fieldItem.counter ? fieldItem.counter : 0"
            :label="fieldItem.title"
            type="text"
          ></v-text-field>
          <v-text-field
            v-if="fieldItem.type === 'password'"
            v-model="fieldItem.value"
            :rules="fieldItem.rule"
            :counter="fieldItem.counter ? fieldItem.counter : 0"
            :label="fieldItem.title"
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            @click:append="show = !show"
          ></v-text-field>
        </v-col>
        <v-col class="col-md-10 offset-md-1" v-if="fieldItem.linkedLink">
          <a
            class="primary--text caption uppercase"
            @click="fieldItem.linkedLink.exec"
          >
            {{ fieldItem.linkedLink.title }}
          </a>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <template v-for="(button, index) in buttonsList">
            <div
              :key="index + 'divPa'"
              class="pa-1"
              v-show="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
            ></div>
            <v-btn
              :key="index + 'btn'"
              :class="button.class"
              @click="button.exec"
              :disabled="button.disabled"
            >
              {{ button.name }}
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ['fieldsList', 'buttonsList'],
  data: () => ({
    show: false
  })
}
</script>
