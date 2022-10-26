<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form class="row justify-center" @submit.prevent="handlerRegister">
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Register</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input outlined bottom-slots v-model="form.name" label="Nome" counter maxlength="50" :rules="[
              val => (val && val.length > 0) || 'A name is required.',
              isNameBiggerThan50
            ]" hint="Please type your name.">
              <template v-slot:prepend>
                <q-icon name="account_circle" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="form.name = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input outlined bottom-slots v-model="form.email" label="Email" type="email" lazy-rules :rules="[
              val => (val && val.length > 0) || 'An email address required.',
              isValidEmail
            ]" hint="Enter a valid email address!">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="form.email = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input outlined bottom-slots v-model="form.password" label="New Passsword" :type="visibility" lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'A password is required.',
                isValidPassword
              ]">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="form.password = ''" class="cursor-pointer" />
              </template>
              <template v-slot:hint> Enter a stronger password. </template>

              <template v-slot:after>
                <q-btn v-if="visibility === 'password'" round dense flat icon="visibility" @click="changeTypeEdit()">
                </q-btn>
                <q-btn v-else round dense flat icon="visibility_off" @click="changeTypeEdit()"></q-btn>
              </template>
            </q-input>
            <q-btn label="Register" color="primary" class="full-width" type="submit"></q-btn>
            <q-btn label="Return to login" color="primary" class="full-width text-capitalize" flat
              :to="{ name: 'login' }"></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const visibility = ref('password')

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handlerRegister = async () => {
      try {
        await register(form.value)
        await router.replace({
          name: 'email-confirmation',
          query: { email: form.value.email, name: form.value.name }
        })
        notifySuccess('Confirmation email sent! 😁')
      } catch (error) {
        notifyError(error.message)
      }
    }

    function changeTypeEdit() {
      if (visibility.value === 'password') {
        visibility.value = 'text'
      } else {
        visibility.value = 'password'
      }
    }

    function isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z\d@._%+-]{6,254}$)[a-zA-Z\d._%+-]{1,64}@(?:[a-zA-Z\d-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email format!'
    }

    function isValidPassword(val) {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*\d)(?=.*[a-z]).{6,30}$/ // regex de senha segurar email
      return (passwordPattern.test(val) && val.length >= 6) || 'Weak password!'
    }

    function isNameBiggerThan50(val) {
      return !(val.length === 50) || 'Name cannot be longer than 50 characters.'
    }

    return {
      form,
      handlerRegister,
      changeTypeEdit,
      visibility,
      isValidEmail,
      isValidPassword,
      isNameBiggerThan50
    }
  }
})
</script>

<style lang="scss">
.q-card {
  margin: 0.8rem !important;
}
</style>
