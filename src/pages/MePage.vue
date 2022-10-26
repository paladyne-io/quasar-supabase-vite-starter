<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>
        Hello
        <span v-if="user.user_metadata.name">
          <strong>{{ user.user_metadata.name }}</strong></span
        >
        <span v-else>
          <strong>{{ user.email }}</strong></span
        >
      </p>
      <!--
      <form class="form-widget" @submit.prevent="updateProfile">
        <AvatarComponent
          v-model:path="avatarUrl"
          @upload="updateProfile"
          size="10"
        />
      </form>
      -->
      <div class="full-width text-center">
        <q-toggle v-model="darkModeStatus" label="Dark mode" @click="toggled" />
      </div>
    </div>
    <div v-else>
      <q-img src="~assets/howdy.gif" width="120" class="q-my-lg"> </q-img>
      <p><strong> Howdy stranger</strong>.</p>
      <p>
        It seems like you're not from around these parts.
        <br />
        D'ya wanna settle your horse in over yonder?
      </p>
      <q-btn
        class="q-mt-lg"
        color="primary"
        size="md"
        style="width: 10rem"
        :to="{ name: 'login' }"
        label="Go to Login page"
      />
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import UseAuthUser from '../composables/UseAuthUser'
// import AvatarComponent from '../components/AvatarComponent.vue'
import useSupabase from '../boot/supabase'
// import { useQuasar } from 'quasar'

const { supabase } = useSupabase()

export default defineComponent({
  name: 'IndexPage',

  // components: { AvatarComponent },
  setup () {
    const { user } = UseAuthUser()
    const userVal = user.value
    const avatarUrl = ref('')
    const loading = ref(false)

    /**
    const $q = useQuasar()
    const darkModeStatus = ref($q.dark.isActive)
  */

    onMounted(() => {
      loading.value = true
      // const { user } = session.value
      // AvatarComponent.downloadImage()
    })

    /**
    function toggled () {
      // console.log(darkModeStatus.value)
      $q.dark.toggle()
    }
    */

    console.log(JSON.stringify(user.value))
    console.log('Email:' + userVal.email)
    async function updateProfile () {
      try {
        loading.value = true
        // const { user } = session.value

        const updates = {
          id: user.id,
          // username: username.value,
          // website: website.value,
          avatar_url: avatarUrl.value
          // updated_at: new Date(),
        }
        console.log('updates: ' + updates)

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      user,
      avatarUrl,
      darkModeStatus,
      toggled,
      updateProfile
    }
  }
})
</script>
