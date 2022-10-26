import { useQuasar } from 'quasar'

export default function useDialog () {
  const $q = useQuasar()

  /** Uses the destructor in dialogShow to control
   * the title and message values that will be displayed.
   */

  function dialogShow ({ title, message }) {
    return $q.dialog({
      title: title || 'Confirmation',
      message: message || 'A Message',
      cancel: true,
      persistent: true
    })
  }

  return {
    dialogShow
  }
}
