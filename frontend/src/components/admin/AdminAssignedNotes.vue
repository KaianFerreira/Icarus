<template>
  <section class="container d-flex justify-center">
    <div class="content">
      <v-text-field
        class="mx-4 search-input"
        flat
        hide-details
        label="Search"
        solo-inverted
        v-model="search"
        append-outer-icon="mdi-plus"
        @click:append-outer="$router.push('/user/note/new')"
      ></v-text-field>
      <div class="cards">
        <v-row class="card"
          v-for="(card, i) in filteredItems" :key="i"
          link
          @click="$router.push(`/user/note/${card.id}`)"
        >
          <v-col>
            <v-card
              color="#385F73"
              dark
            >
              <v-card-title class="headline">{{card.title}}</v-card-title>

              <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
              
              <v-card-text>{{ card.text }}</v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-">
                    <v-img
                      :src="card.userPhoto ? card.userPhoto : 'https://randomuser.me/api/portraits/men/85.jpg'"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ card.user }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
  import { getAllAssigned } from '../../api/note'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['user']),
      filteredItems () {
        return this.cards.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
      }
    },
    data () {
      return {
        search: '',
        cards: []
      }
    },
    async mounted () {
      this.cards = await getAllAssigned()
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    width: 100%;
  }
  .search-input {
    margin: 12px 0px !important;
    margin-bottom: 12px;
  }
  @media screen and (min-width: 768px) {
    .content {
      width: 80vw !important;
    }
    .cards {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .card {
      width: 90%;
    }
  }
</style>