<template>
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerLogin"
      ref="myform"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="col-12 text-h6 text-left">Login</p>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
              outlined
              bottom-slots
              v-model="form.email"
              label="Email"
              type="email"
              lazy-rules
              :rules="[
                val =>
                  (val && val.length > 0) || 'An email address is required.',
                isValidEmail
              ]"
              hint="Please enter a valid email address."
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.email = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint v-if="!form.email">
                Type your email address
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.password"
              label="New Password"
              counter
              lazy-rules
              :type="visibility"
              :rules="[
                val => (val && val.length > 0) || 'A password is required.'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.password = ''"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:hint v-if="!form.password">
                Type your password!
              </template>

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
              label="Login"
              color="primary"
              class="full-width"
              type="submit"
            ></q-btn>

            <div class="text-grey-8 text-subtitle2 text-center">With</div>

            <div class="social-login">
              <q-btn
                flat
                label="Google"
                color="red-5"
                icon="mdi-google"
                class="btn-fixed-width"
                @click="handlerSocialLogin('google')"
              ></q-btn>
              <q-btn
                flat
                label="Github"
                color="grey-9"
                icon="mdi-github"
                class="btn-fixed-width"
                @click="handlerSocialLogin('github')"
              ></q-btn>
            </div>
            <q-separator />
            <div class="more-options">
              <q-btn
                label="Register"
                color="primary"
                class="btn-fixed-width text-capitalize"
                flat
                :to="{ name: 'register' }"
              ></q-btn>
              <q-btn
                label="Forgot your password?"
                color="primary"
                class="btn-fixed-width text-capitalize"
                flat
                :to="{ name: 'forgot-password' }"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const router = useRouter()
    const { login, loginWithSocialProvider, isLoggedIn } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const visibility = ref('password')

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handlerLogin = async () => {
      try {
        await login(form.value)
        await router.replace({ name: 'me' }).then(notifySuccess('Welcome 😁'))
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handlerSocialLogin = async provider => {
      try {
        await loginWithSocialProvider(provider)
        await router.push({ name: 'me' })
        notifySuccess(`Welcome with ${provider}! 😁`)
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

    function isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z\d@._%+-]{6,254}$)[a-zA-Z\d._%+-]{1,64}@(?:[a-zA-Z\d-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email format!'
    }

    return {
      form,
      handlerLogin,
      handlerSocialLogin,
      changeTypeEdit,
      isValidEmail,
      visibility
    }
  }
})
</script>

<style lang="scss">
.social-login {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.more-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.btn-fixed-width {
  width: calc(100% / 2.06);
}
</style>
