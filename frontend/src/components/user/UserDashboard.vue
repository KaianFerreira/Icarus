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
      ></v-text-field>
      <div class="cards">
        <v-row class="card"
          v-for="(card, i) in filteredItems" :key="i"
        >
          <v-col>
            <v-card
              color="#385F73"
              dark
            >
              <v-card-title class="headline">{{card.title}}</v-card-title>

              <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
              
              <v-card-text>{{ card.text }}</v-card-text>

              <v-card-actions>
                <v-btn text disabled>{{ card.user }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      filteredItems () {
        return this.cards.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
      }
    },
    data () {
      return {
        search: '',
        cards: [
          {
            title: 'Teste',
            subtitle: 'Outro teste',
            text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            user: 'Kaian Ferreira'
          }
        ]
      }
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