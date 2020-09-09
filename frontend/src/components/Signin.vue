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
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="login"
                    :readonly="loading"
                    :error="errors.indexOf('invalidCredentials') > 1"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :readonly="loading"
                    :error="errors.indexOf('invalidCredentials') > 1"
                  ></v-text-field>
                  <v-text-field
                    v-if="errors.length > 0"
                    name="error"
                    type="text"
                    :error="errors.indexOf('invalidCredentials') > 1 || errors.indexOf('internal error')"
                    :messages="errors.indexOf('invalidCredentials') > 1 ? 'Login ou senha inválido' : errors.indexOf('internal error') > 1 ? 'Ocorreu um erro' : ''"
                  ></v-text-field>
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
        errors: []
      }
    },
    methods: {
      async save () {
        this.loading = true
        try {
          const data = await signIn(this.login, this.password)
          this.$store.dispatch('signIn', data)
        } catch (error) {
          const data = error.response ? error.response.data : {}
          if (data.error === 'Validation error') {
            this.errors = ['invalidCredentials']
          }
          console.error(error)
        }
        this.loading = false
      }
    }
  }
</script>