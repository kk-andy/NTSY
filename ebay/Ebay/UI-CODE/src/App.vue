<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    if (sessionStorage.token) {
      this.$store.commit("user/SET_NAME", sessionStorage.getItem("name"));
      this.$store.commit("user/SET_AVATAR", sessionStorage.getItem("avatar"));
      let list = JSON.parse(sessionStorage.getItem("list"))
      let munuIdList = JSON.parse(sessionStorage.getItem("munuIdList"))
      let data = {
        list,
        munuIdList
      }
      this.$store.commit(
        "permission/SET_ROUTES",
        data
      );
    }
  },
  methods: {}
};
</script>