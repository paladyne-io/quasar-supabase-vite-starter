import { formatCurrency } from 'src/utils/format'

const columnsProduct = [
  {
    name: 'img_url',
    align: 'left',
    label: 'Image',
    field: 'img_url'
  },
  {
    name: 'name',
    align: 'left',
    label: 'Product',
    field: 'name',
    sortable: true
  },
  {
    name: 'description',
    align: 'left',
    label: 'Description',
    field: 'description',
    sortable: true
  },
  {
    name: 'price',
    align: 'left',
    label: 'Price',
    field: 'price',
    format: (val) => formatCurrency(val),
    sortable: true
  },
  {
    name: 'stock',
    label: 'Inventory',
    field: 'inventory',
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    label: '',
    align: 'right',
    field: 'actions'
  }
]

export {
  columnsProduct
}
