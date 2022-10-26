import { ref } from 'vue'
import useSupabase from '../boot/supabase'

/**
 * The user is defined outside the useAuthUser function so that
 * it acts as a global state and always refers to a single user.
 */
const user = ref(null)

export default function useAuthUser() {
  const { supabase } = useSupabase()

  /**
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return user
  }

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async provider => {
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) throw error
    return user
  }

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value
  }

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        // arbitrary meta data is passed as the second argument under a data key
        // to the Supabase signUp method
        data: meta,
        // the to redirect to after the user confirms their email
        // window.location wouldn't be available if we were rendering server side
        // but since we're all on the client it will work fine
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    )
    if (error) throw error
    return user
  }

  /**
   * Update user email, password, or meta data
   */
  const update = async data => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  /**
   * Update user password

  const updatePassword = async (newPassword) => {
    const { user, error } = await supabase.auth.update({
      password: newPassword
    })
    if (error) throw error
    return user
  }

   /**
   * Update user password
   * */
  const updatePassword = async newPassword => {
    // Note that in V2 update (password) is not supported?!
    const { user, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if (error) throw error
    return user
  }

  /**
   * Update user email, password, or meta data
   */
  const sendPasswordResetEmail = async email => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  /**
   * Reset user password with user email and access token
   */
  const resetPassword = async (accessToken, newPassword) => {
    if (isLoggedIn) {
      console.log('User is logged in so update the password directly!')
      // try {
      updatePassword(newPassword)
      // } catch (error) {
      //  throw error
      // }
      return
    }
    console.log('reset password with token: ' + accessToken)
    if (!accessToken) {
      alert('Access token not supplied.')
      throw new Error('Access token not supplied')
    }
    const { user, error } = await supabase.auth.updateUser(accessToken, {
      password: newPassword
    })
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword
  }
}
