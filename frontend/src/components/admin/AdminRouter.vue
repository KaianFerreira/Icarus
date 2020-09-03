<template>
  <section class="d-flex" style="height: 100%">
    <v-navigation-drawer
      class="menu" :class="{ 'open' : mini }"
      @click="mini = !mini"
      v-model="drawer"
      fixed
      mini-variant-width="56px"
      permanent
      color="blue"
      dark
      stateless
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append style="width: 100%">
        <div class="d-flex justify-space-between">
          <v-list-item class="btn-open px-2" :class="{'button-close' : mini}">
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item>
          <v-btn class="align-self-center"
            icon
            @click.stop="$store.dispatch('signOut')"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <router-view></router-view>
  </section>
</template>
<script>
  export default {
    data: () => ({
      drawer: null,
      mini: false,
      items: [
        { 
          title: 'Home',
          path: '/admin',
          icon: 'mdi-home'
        },
        {
          title: 'Notas assinadas',
          path: '/admin/note',
          icon: 'mdi-note'
        }
      ],
    })
  }
</script>

<style lang="scss" scoped>
  .btn-open {
    width: 52px;
  }
  .button-close {
    button {
      transform: rotate(180deg);
    }
  }
  .menu {
    width: 56px !important;
  }
  .open {
    width: 100% !important;
  }
  @media screen and (min-width: 768px) {
    .open {
      width: 250px !important;
    }
  }
</style>