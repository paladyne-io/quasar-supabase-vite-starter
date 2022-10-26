const formatCurrency = (currency) => {
  /*
  const formatted = currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
  */

  const formatted = currency.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD'
  })

  return formatted
}

export {
  formatCurrency
}
