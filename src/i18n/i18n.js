import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
   en: {
      message: {
         hello: 'hello world'
      }
   },
   ru: {
      message: {
         hello: 'Привет мир'
      }
   }
}

export const i18n = new VueI18n({
   locale: 'ru', 
   messages
})