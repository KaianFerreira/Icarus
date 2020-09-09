<template>
  <v-app id="signon" key="signon">
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
                <v-toolbar-title>Cadastro</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Login"
                          name="login"
                          type="text"
                          v-model="login"
                          :readonly="loading"
                          :error-messages="errors.indexOf('login') > - 1 ?
                            ['Insira um login'] : errors.indexOf('exists') > - 1 ? ['Usuário existente'] : []"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          id="password"
                          label="Senha"
                          name="password"
                          type="password"
                          v-model="password"
                          :readonly="loading"
                          :error-messages="errors.indexOf('password') > - 1 ? ['Insira uma senha'] : []"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Nome"
                          name="name"
                          type="text"
                          v-model="name"
                          :readonly="loading"
                          :error-messages="errors.indexOf('name') > - 1 ? 
                            ['Insira um nome'] : []"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Sobrenome"
                          name="fullname"
                          type="text"
                          v-model="fullname"
                          :readonly="loading"
                          :error-messages="errors.indexOf('fullName') > - 1 ? 
                            ['Insira um sobrenome'] : []"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="CPF"
                          name="login"
                          type="text"
                          v-mask="'###.###.###-##'"
                          v-model="registerNumber"
                          :readonly="loading"
                          :error-messages="errors.indexOf('registerNumber') > - 1 ? 
                            ['CPF inválido'] : []"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="Data de nascimento"
                          name="birthDate"
                          type="date"
                          v-model="birthDate"
                          :readonly="loading"
                          :error-messages="errors.indexOf('birthDate') > 1 ? 
                            ['Data de nascimento inválida'] : []"
                        ></v-text-field>
                      </v-col>
                    </v-row>                    
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="loading" outlined color="secondary" @click="$router.push('/signin')">Cancelar</v-btn>
                <v-btn :loading="loading" @click="save" color="primary">Cadastrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>
    import { signOn } from  '../api/auth'
  export default {
    data () {
      return {
        login: null,
        password: null,
        name: null,
        fullname: null,
        registerNumber: null,
        birthDate: null,
        loading: false,
        errors: []
      }
    },
    methods: {
      async save () {
        this.loading = true
        try {
          await signOn (
            this.login,
            this.password,
            this.name,
            this.fullname,
            this.registerNumber,
            this.birthDate,
            this.loading
          )
          this.$router.push('/signin')
        } catch (error) {
          const data = error.response ? error.response.data : {}
          console.error(error)
          if (data.error === 'Validation error') {
            this.errors = data.fields
          }
          if (data.error === 'User already exists') this.errors = ['exists']
        }
        this.loading = false
      }
    }
  }
</script>