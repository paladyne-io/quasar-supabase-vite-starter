<template>
  <!-- TO-DO: Adicionar essa funcionalidade a um dialog -->
  <q-page class="bg-green-1 row justify-center items-center">
    <q-form
      class="square-card row justify-center"
      @submit.prevent="handlerSubmit()"
    >
      <q-card square bordered class="q-pa-sm shadow-1">
        <q-card-section>
          <p class="login col-12 text-h6 text-left">Add product</p>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <div class="row">
              <div class="q-pr-md">
                <q-img width="64px" fit="contain" :src="form.img_url" />
              </div>
              <!-- Max file size = 3MB -->
              <div>
                <q-file
                  label="Choose image"
                  max-file-size="3000000"
                  stack-label
                  v-model="img"
                  accept="image/*"
                  @update:model-value="updateFile()"
                />
              </div>
              <!--
              <q-space />
              <div v-show="imgUrl" class="col-3 q-pt-xs text-center">
                New Image
                <q-img width="42px" fit="contain" :src="imgUrl" />
              </div>
             -->
            </div>
            <q-input
              outlined
              bottom-slots
              v-model="form.name"
              label="Product name"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'A name is required!']"
              hint="Enter the name of the new product."
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.name = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.inventory"
              label="Inventory"
              lazy-rules
              :rules="[val => !!val || 'Initial stock is required!']"
              hint="Enter the quantity of stock."
              type="number"
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.inventory = '0'"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              outlined
              bottom-slots
              v-model="form.price"
              label="Price"
              lazy-rules
              :rules="[val => !!val || 'Price is mandatory!']"
              prefix="$"
              hint="Set the price."
            >
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="form.price = '0'"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <!--- "categoria_id" -->
            <q-select
              v-model="form.category_id"
              :options="optionsCategory"
              label="Category"
              option-value="id"
              option-label="name"
              map-options
              emit-value
              :rules="[val => !!val || 'Category is mandatory!']"
            />

            <q-editor v-model="form.description" min-height="5rem" />
            <q-btn
              :label="isUpdate ? 'Update' : 'Add'"
              color="primary"
              class="full-width"
              type="submit"
            >
            </q-btn>
            <q-btn
              label="Cancel"
              color="primary"
              class="full-width"
              flat
              :to="{ name: 'product' }"
            ></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'FormProductPage',

  setup () {
    const table = 'produto'

    const router = useRouter()
    const route = useRoute()
    const isUpdate = computed(() => route.params.id)

    const optionsCategory = ref([])
    let product = {}
    const img = ref(null)
    const imgUrl = ref()

    const { post, getById, update, list, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: 'Sample',
      description: '',
      inventory: '10',
      price: '1.00',
      category_id: 'Example',
      img_url: ''
    })

    /*
    const form = ref({
      nome: '',
      descricao: '',
      estoque: '0',
      preco: '0.0',
      categoria_id: '',
      img_url: ''
    })
    */

    const handlerSubmit = async () => {
      console.log('img.value: ' + JSON.stringify(img.value))

      try {
        if (img.value) {
          // .length  > 0
          // const imageUrl = URL.createObjectURL(img.value)
          // console.log('Upload imageUrl: ' + JSON.stringify(imageUrl))

          const imgUrl = await uploadImg(img.value, 'products')
          // form.value.img_url = imgUrl
          form.value.img_url = URL.createObjectURL(img.value)
          console.log('img URL: ' + imgUrl)
        }
        if (isUpdate.value) {
          await update(table, form.value)
          notifySuccess('Product updated!') // Produto atualizado!
        } else {
          await post(table, form.value)
          notifySuccess('Product added!') // Produto cadastrado
        }
        await router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handlerGetProduct = async id => {
      console.log('handlerGetProduct (product -> getById)... ')
      try {
        product = await getById(table, id)
        form.value = product
        // console.log('handlerGetProduct: ' + JSON.stringify(product))
        // console.log('Image URL: ' + form.value.img_url)
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handlerListCategories()
      if (isUpdate.value) handlerGetProduct(isUpdate.value)
    })

    const handlerListCategories = async () => {
      optionsCategory.value = await list('categoria')
    }

    return {
      handlerSubmit,
      handlerGetProduct,
      handlerListCategories,
      form,
      isUpdate,
      optionsCategory,
      img,
      imgUrl,
      updateFile () {
        // console.log('updateFile...')
        // imgUrl.value = URL.createObjectURL(img.value)
        form.value.img_url = URL.createObjectURL(img.value)
        // console.log('updateFile: ' + imgUrl.value)
      }
    }
  }
})
</script>

<style lang="scss">
.q-card {
  margin: 0.8rem !important;
}

@media (max-width: 600px) {
  .q-card {
    margin: 0.8rem !important;
    min-width: 300px;
  }
}
</style>
