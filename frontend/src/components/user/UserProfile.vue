<template>
  <section class="container d-flex justify-center">
    <div class="content">
      <v-row>
        <v-col>
          <v-card >
            <v-card-text>
              <v-form class="d-flex justify-center">
                <div>
                  <v-row>
                    <v-col class="d-flex align-center">
                      <div @click="changeImage" class="image-upload teal">
                        <img v-if="photo" :src="photo"/>
                        <input ref="fileUpload" type="file" accept="image/jpeg" @change="uploadImage($event.target.files[0])">
                      </div>
                    </v-col>
                    <v-col class="d-flex align-end flex-column">
                      <v-text-field
                        label="Email"
                        name="login"
                        type="text"
                        v-model="login"
                        :readonly="loading"
                        :error-messages="errors.indexOf('login') > - 1 ?
                          ['Insira um login'] : errors.indexOf('exists') > - 1 ? ['Usuário existente'] : []"
                      ></v-text-field>
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
                        v-model="fullName"
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
              <v-btn :disabled="loading" outlined color="secondary" @click="cancel">Cancelar</v-btn>
              <v-btn :loading="loading" @click="save" color="primary">Alterar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { uploadImage } from '../../tools'
  import { get, update } from '../../api/user'
  export default {
    data () {
      return {
        login: null,
        password: null,
        name: null,
        fullName: null,
        registerNumber: null,
        birthDate: null,
        loading: true,
        photo: null,
        imageFile: null,
        errors: []
      }
    },
    computed: {
      ...mapState(['user'])
    },
    async mounted () {
      await this.getData()
    },
    methods: {
      async getData () {
        this.loading = true
        const data = await get(this.user.user)
        this.login = data.userLogin
        this.name = data.name
        this.fullName = data.fullName
        this.photo = data.photo
        this.registerNumber = data.registerNumber
        this.birthDate = new Date(data.birthDate).toISOString().split('T')[0]
        this.loading = false
      },
      async save () {
        this.loading = true
        await update(
          this.user.id,
          this.name,
          this.fullName,
          this.registerNumber,
          this.birthDate,
          'user',
          this.imageFile,
          true,
          this.login,
          this.password
        )
        this.loading = false
        this.$forceUpdate()
      },
      async cancel () {
        await this.getData()
      },
      changeImage () {
        console.log('here')
        this.$refs.fileUpload.click()
      },
      uploadImage (file) {
        uploadImage(
          file,
          (image) => { this.photo = image },
          (imageFile) => { this.imageFile = imageFile },
          500,
          500
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
  .image-upload {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;

    &.edit {
      .image-edit {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 100%;
      }
    }

    .image-edit {
      display: none;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      svg {
        color: rgba(255, 255, 255, 0.8);
        width: 80px;
        height: 80px;
      }
    }
    img {
      background-color: #fff;
      border-radius: 50%;
      object-fit: cover;
      width: 90px;
      height: 90px;
      margin: 5px;
    }

    path {
      transform: scale(0.5);
      transform-origin: center center;
    }
    input {
      display: none;
    }
  }
</style>