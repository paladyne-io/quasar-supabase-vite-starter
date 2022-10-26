<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Quasar Inventory</q-toolbar-title>
        <q-space />
        <div>
          <q-toggle
            v-model="darkModeStatus"
            label="Dark mode"
            @click="toggled"
          />
        </div>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="changePassword">
              <q-item-section>
                <q-item-label>Change Password...</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handlerLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'
import UseAuthUser from '../composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import useDialog from 'src/composables/UseDialog'
import { useQuasar } from 'quasar'

const mdiIcon = name => {
  return 'mdi-' + name
}

const linksList = [
  {
    title: 'Initial Setup',
    caption: 'Main (home) page',
    icon: mdiIcon('home'),
    routeName: 'me'
  },
  {
    title: 'Categories',
    caption: 'Registered categories',
    icon: mdiIcon('shape-outline'),
    routeName: 'category'
  },
  {
    title: 'Products',
    caption: 'Registered products',
    icon: mdiIcon('basket-outline'),
    routeName: 'product'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const { logout } = UseAuthUser()
    const { notifyError, notifySuccess } = useNotify()
    const { dialogShow } = useDialog()

    const $q = useQuasar()
    const darkModeStatus = ref($q.dark.isActive)

    function toggled () {
      // console.log(darkModeStatus.value)
      $q.dark.toggle()
    }

    const changePassword = async () => {
      router.push('reset-password')
    }

    const handlerLogout = async () => {
      dialogShow({
        tittle: 'Are your sure?',
        message: 'Are your sure you want to log out of the application?'
        // tittle: 'Sair',
        // message: 'Deseja realmente sair da aplicação?'
      })
        .onOk(async () => {
          try {
            await logout()
            await router
              .replace({
                name: 'login'
              })
              .then(notifySuccess('Bye bye! 😁'))
          } catch (error) {
            notifyError(error.message)
          }
          /** replace eliminates route history, unlike
           * push, which adds to history stack
           *
           * o replace elimina o histórico de rotas, diferente
           * do push, que adicionar na pilha de histórico
           */
        })
        .onCancel(async () => {
          notifySuccess('Glad you changed your mind! 😁') // Ops, ia mas voltou!
        })
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      handlerLogout,
      changePassword,
      darkModeStatus,
      toggled
    }
  }
})
</script>
