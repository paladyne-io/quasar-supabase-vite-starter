// import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  alert('Configuration error. Please add a .env file with URL and key. Contact the author for assistance.')
}

const supabase = createClient(supabaseUrl, supabaseKey)
console.log('Loaded supabase.')

// moved to supabase- monitor
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()
  user.value = session?.user || null
})

export default function useSupabase() {
  return { supabase }
}
// moved to supabase- monitor
/*
export default boot ({ app, router, redirect }) => {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    // const { user } = useAuthUser()
    // user.value = session?.user || null

    console.log('Router: ' + router)

    if (event === 'PASSWORD_RECOVERY') {
      // better tio send to a password reset page
      // redirect({ path: 'reset-password' })

    }
  })
  */
// app.config.globalProperties.$supabase = supabaseClient
// return supabaseClient
// }

// console.log('Init Supabase: ', supabase);
/**
export default function useSupabase () {
  return { supabase }
}
*/
