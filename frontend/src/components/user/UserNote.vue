<template>
  <section class="container d-flex justify-center">
    <div class="content">
      <v-row class="card d-flex flex-column">
        <v-col>
          <v-card
            color="#385F73"
            dark
          >
            <v-card-title class="headline">
              <v-text-field
                outlined
                :readonly="loading"
                label="Titulo"
                v-model="title"
                :error-messages="errors.indexOf('title') > - 1 ? 
                  ['Insira um titulo'] : []"
              >
              </v-text-field>
            </v-card-title>

            <v-card-subtitle>
              <v-text-field
                outlined
                dense
                :readonly="loading"
                v-model="subtitle"
                label="Subtitulo"
                :error-messages="errors.indexOf('subtitle') > - 1 ? 
                  ['Insira um subtitulo'] : []"                
              ></v-text-field>
            </v-card-subtitle>
            
            <v-card-text>
              <v-textarea
                solo
                :readonly="loading"
                label="Escreva seu texto aqui"
                v-model="text"
                :error-messages="errors.indexOf('text') > - 1 ? 
                  ['Insira um texto'] : []"                
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <div class="d-flex justify-space-between" style="width: 100%">
                <v-btn text disabled>
                  {{ user.name }}
                </v-btn>
                <v-btn 
                  text
                  @click="remove"
                  v-if="id !== 'new'"
                >
                  Remover
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <div class="d-flex justify-end" style="padding: 10px">
          <div>
            <v-btn
              large
              color="secondary"
              outlined
              dark
              style="margin-right: 10px"
              @click="$router.push('/user/note')"
              :disabled="loading"
            >
              Cancelar
            </v-btn>
            <v-btn
              large
              color="teal"
              dark
              :loading="loading"
              @click="save"
            >
              Salvar
            </v-btn>
          </div>
        </div>
      </v-row>
    </div>
  </section>
</template>

<script>
  import { get, create, update, remove } from '../../api/note'
  import { mapState } from 'vuex'
  export default {
    props: ['id'],
    computed: {
      ...mapState(['user'])
    },
    data () {
      return {
        errors: [],
        title: null,
        subtitle: null,
        text: null,
        loading: false,
        signed: null
      }
    },
    async mounted () {
      if (this.id !== 'new') {
        const card = await get(this.id)
        this.title = card.title
        this.subtitle = card.subtitle
        this.text = card.text
      }
    }, 
    methods: {
      async save () {
        this.loading = true
        try {
          if (this.id === 'new') {
            await create({
              title: this.title,
              subtitle: this.subtitle,
              text: this.text,
            })
          } else {
            await update(this.id, {
              title: this.title,
              subtitle: this.subtitle,
              text: this.text,
            })
          }
          this.$router.push(`/user/note`)
        } catch (error) {
          const data = error.response ? error.response.data : {}
          console.error(error)
          if (data.error === 'Validation error') {
            this.errors = data.fields
          }
        }
        this.loading = false
      },
      async remove () {
        this.loading = true
        await remove (this.id)
        this.$router.push('/user/note')
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