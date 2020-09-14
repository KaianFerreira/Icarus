<template>
  <v-app>
    <v-main>
      <div
        class="fill-height d-flex align-center"
        fluid
        style="padding:10px"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-5">
              <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Icarus</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    type="text"
                    prepend-icon="mdi-account"
                    v-model="login"
                    :readonly="loading"
                    :error="error === 'invalidCredentials'"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :readonly="loading"
                    :error="error === 'invalidCredentials'"
                  ></v-text-field>
                  <v-input
                    :error-messages="error === 'invalidCredentials' ? 
                      ['Login ou senha não conhecidem'] : error"
                  ></v-input>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="loading" outlined color="secondary" @click="$router.push('/signon')">Cadastro</v-btn>
                <v-btn :loading="loading" color="primary" @click="save">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import { signIn } from '../api/auth'
  export default {
    data () {
      return {
        login: null,
        password: null,
        loading: false,
        error: null
      }
    },
    methods: {
      async save () {
        this.error = []
        this.loading = true
        try {
          const data = await signIn(this.login, this.password)
          this.$store.dispatch('signIn', data)
        } catch (error) {
          const data = error.response ? error.response.data : {}
          if (data.error === 'Invalid login or password') {
            this.error = 'invalidCredentials'
          } else {
            this.error = 'Internal error'
          }
          console.error(error)
        }
        this.loading = false
      }
    }
  }
</script>