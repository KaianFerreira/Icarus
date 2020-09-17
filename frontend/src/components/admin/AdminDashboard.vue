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
              :color="card.signed ? 'blue' : 'teal'"
              dark
              @click="selectedCard = card"
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
            <v-overlay v-if="selectedCard" :value="selectedCard" class="grow">
              <v-row class="card modal">
                <v-col>
                  <v-card
                    :color="selectedCard.signed ? 'blue' : 'teal'"
                    dark
                  >
                    <v-card-title class="headline">
                      {{ selectedCard.title }}
                    </v-card-title>

                    <v-card-subtitle>
                      {{ selectedCard.subtitle }}
                    </v-card-subtitle>
                    
                    <v-card-text>
                      {{ selectedCard.text }}
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <div class="d-flex justify-space-between" style="width: 100%">
                        <v-list-item class="grow">
                          <v-list-item-avatar color="grey darken-">
                            <v-img
                              :src="selectedCard.userPhoto ? selectedCard.userPhoto : 'https://randomuser.me/api/portraits/men/85.jpg'"
                            ></v-img>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ selectedCard.user }}</v-list-item-title>
                          </v-list-item-content>
                          <v-btn 
                            text
                            @click="remove(selectedCard.id)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item>
                      </div>
                    </v-card-actions>
                  </v-card>
                  <div style="width: 100%" class="d-flex justify-end">
                    <v-btn 
                      style="margin-top: 10px"
                      text
                      @click="selectedCard = null"
                    >
                      Voltar
                    </v-btn>
                    <v-btn 
                      style="margin-top: 10px"
                      color="teal"
                      :loading="selectedCardLoading"
                      @click="selectedCard.signed ? assign (selectedCard.id, false) : assign(selectedCard.id, true)"
                    >
                      {{ selectedCard.signed ? 'Desfazer' : 'Assinar'}}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-overlay>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script>
  import { getAll, remove, assignCard } from '../../api/note'
  export default {
    computed: {
      filteredItems () {
        return this.cards.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
      }
    },
    data () {
      return {
        search: '',
        cards: [],
        selectedCard: null,
        selectedCardLoading: false
      }
    },
    async mounted () {
      this.cards = await getAll()
    },
    methods: {
      async remove (id) {
        this.selectedCardLoading = true
        await remove(id)
        this.cards = this.cards.filter(x => x.id !== id)
        this.selectedCardLoading = false
        this.selectedCard = null
      },
      async assign (id, assing) {
        this.selectedCardLoading = true
        await assignCard(id, assing)
        const index = this.cards.map(x => x.id).indexOf(id)
        const data = this.cards[index]
        data.signed = assing
        this.$set(this.cards, index, data)
        this.selectedCardLoading = false
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
  .card {
    .modal {
      padding-left: 56px;
      width: 90vw;
    }
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