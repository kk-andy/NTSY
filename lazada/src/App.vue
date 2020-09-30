<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'App',
    created() {
        if (sessionStorage['Admin-Token']) {
            this.$store.commit("user/SET_NAME", sessionStorage.getItem("name"));
            this.$store.commit("user/SET_AVATAR", sessionStorage.getItem("avatar"));
            let list = JSON.parse(sessionStorage.getItem("list"))
            let munuIdList = JSON.parse(sessionStorage.getItem("munuIdList"))
            this.$store.commit("permission/SET_ROUTES", list);
            this.$store.commit("permission/SET_MENU_ID", munuIdList);
      }
    }
}
</script>
