import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()

  const notifySuccess = message => {
    $q.notify({
      type: 'positive',
      message: message || 'Success ✅',
      timeout: 2000,
      actions: [
        {
          label: 'Ok',
          color: 'white'
        }
      ]
    })
  }

  const notifyError = message => {
    $q.notify({
      type: 'negative',
      message: message || 'Failed 😢',
      timeout: 2000,
      actions: [
        {
          label: 'Ok',
          color: 'white'
        }
      ]
    })
  }

  const notifyWarning = message => {
    $q.notify({
      type: 'warning',
      message: message || 'Attention ⚠️',
      textColor: 'white',
      timeout: 2000,
      actions: [
        {
          label: 'Ok',
          color: 'white'
        }
      ]
    })
  }

  /** receive:
    * onMessage -> Message that will be shown in the wait toast...
    * message -> Message that will be displayed after the wait toast
    * type -> Type of the toast after the wait ("negative", "positive", "warning")
    according to the quasar api.
    *
    Ex.: notifyOngoing(null, error.message, "negative") where:
    null -> nothing (default message will be displayed)
    error.message -> The error caught by a try/catch case (string)
    "negative" -> red toast according to quasar api for notify plugin.
  */

  const notifyOngoing = (onMessage, message, type) => {
    const notify = $q.notify({
      type: 'ongoing',
      textColor: 'white',
      message: onMessage || 'Hang on a sec... ⏱️'
    })

    setTimeout(() => {
      notify({
        type, // :type
        message: message || 'Return from setTimeout',
        timeout: 2000,
        actions: [
          {
            label: 'Ok',
            color: 'white'
          }
        ]
      })
    }, 3000)
  }

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyOngoing
  }
}
