<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerForgotReset"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">
            Request to reset password
          </p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Email address required.',
                isValidEmail
              ]"
              hint="Enter a valid email address"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="email = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-btn
              label="Send Reset Request"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
            <q-btn
              label="Back to login"
              color="primary"
              class="full-width text-capitalize"
              flat
              :to="{ name: 'login' }"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ForgotPasswordPage',
  setup () {
    const { sendPasswordResetEmail } = useAuthUser()
    const email = ref('')
    const { notifyError, notifySuccess } = useNotify()

    const handlerForgotReset = async () => {
      try {
        await sendPasswordResetEmail(email.value)
        notifySuccess(`Password recovery email sent to ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    function isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email format'
    }

    return { email, handlerForgotReset, isValidEmail }
  }
})
</script>

<style lang="scss"></style>
