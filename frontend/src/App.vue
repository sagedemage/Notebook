<script setup>
import { defineAsyncComponent } from "vue"
</script>

<script>
/* UI Components */
const NavbarUI = defineAsyncComponent(() => import("@/components/ui/NavbarUI.vue"));
const FooterUI = defineAsyncComponent(() => import("@/components/ui/FooterUI.vue"));

</script>
<template>
  <div id="body">
    <NavbarUI />
    <main>
      <router-view></router-view>
    </main>
    <FooterUI id="footer" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

</style>
