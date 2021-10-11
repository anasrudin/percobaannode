<template>
  <b-navbar toggleable="lg" class="navbar">
    <b-navbar-brand to="/">
      <b-img
        class="d-inline-block align-top"
        src="https://www.sahaware.co.id/_nuxt/img/logo-sahaware.0d1f0f9.svg"
        alt="Logo"
        width="160"
        height="28"
      />
      
    </b-navbar-brand>
    <h5>Assessment</h5>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(item, index) in menu" :key="index" :href="item.to">
          {{ item.label }}
        </b-nav-item>
      </b-navbar-nav>
              <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item type="info" class="loginlink" href="#">Login</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

 
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { to: "/", label: "Home" },
        { to: "articles", label: "Article" },
        { to: "create", label: "Create" }
      ]
    };
  }
};
</script>

<style >
.loginlink{
    color: info;
    
}
.navbar{
  width: 100%;
  height: 80px;
  padding-left: 80px;
  padding-right: 104px;
}

.b-navbar-nav > b-nav-item{
  padding-left:30px;
  padding-right:300px;
}
</style>