<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerPasswordReset"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Reset your password</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="password"
              label="New Password"
              :type="visibility"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Password required.',
                isValidPassword
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="password = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint> Enter a strong password! </template>

              <template v-slot:after>
                <q-btn
                  v-if="visibility === 'password'"
                  round
                  dense
                  flat
                  icon="visibility"
                  @click="changeTypeEdit()"
                >
                </q-btn>
                <q-btn
                  v-else
                  round
                  dense
                  flat
                  icon="visibility_off"
                  @click="changeTypeEdit()"
                ></q-btn>
              </template>
            </q-input>
            <q-btn
              label="Reset Password"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>
            <div class="row full-width">
              <q-space />
              <q-btn label="Cancel" to="/" color="secondary"></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ResetPasswordPage',
  setup () {
    const { resetPassword } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const route = useRoute() // rota atual

    const password = ref('')
    const visibility = ref('password')
    const token = route.query.token

    const router = useRouter() // Router functions (push, replace, etc...)

    const handlerPasswordReset = async () => {
      try {
        const user = await resetPassword(token, password.value)
        if (user) {
          await router.push({ name: 'login' })
          notifySuccess('Updated password! 👌')
        }
      } catch (error) {
        notifyError(error.message)
      }
    }

    function changeTypeEdit () {
      if (visibility.value === 'password') {
        visibility.value = 'text'
      } else {
        visibility.value = 'password'
      }
    }

    function isValidPassword (val) {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[!#@$%&() ])(?=.*\d)(?=.*[a-z]).{6,30}$/
      return (passwordPattern.test(val) && val.length >= 6) || 'Weak password!'
    }

    return {
      password,
      handlerPasswordReset,
      changeTypeEdit,
      isValidPassword,
      visibility
    }
  }
})
</script>

<style lang="scss"></style>
