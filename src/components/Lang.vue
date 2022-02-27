<template>
  <div class="language-wrapper">
    <div class="language-item" :class="lang" @click="changeLang('Russian','ru')">
      Русский
    </div>
    <div class="language-item" :class="lang" @click="changeLang('Ukraine','uk')">
      Українська
    </div>
  </div>
</template>

<script>
export default {
  props: ["language"],
  computed: {
    lang() {
      if (this.language === "Russian") {
        return {
          "lang-russ": this.language === "Russian",
        };
      } else {
        return {
          "lang-uk": this.language === "Ukraine",
        };
      }
    },
  },
  methods: {
    changeLang(lang, locale) {
      this.$emit("changeLang", lang);
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style scoped lang="scss">
.language-wrapper {
  margin-left: auto;
  width: 200px;
  display: flex;
  height: 40px;
}
.language-item {
  flex: 0 0 50%;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 15px;
  &:first-child {
    &.lang-russ {
      background-color: rgb(185, 185, 185);
    }
  }
  &:last-child {
    &.lang-uk {
      background-color: rgb(185, 185, 185);
    }
  }
}
</style>
