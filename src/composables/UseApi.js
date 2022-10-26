import useSupabase from 'src/boot/supabase'
import UseAuthUser from 'src/composables/UseAuthUser'
import { v4 as uuidv4 } from 'uuid'

export default function useApi() {
  const { supabase } = useSupabase()
  const { user } = UseAuthUser()

  /**
   * Retorna todos dos dados disponiveis na tabela passada como parâmetro.
   */
  const list = async table => {
    const { data, error } = await supabase.from(table).select('*')
    if (error) throw error
    return data
  }

  /**
   * Retorna uma tupla da tabela passada como parâmetro
   * de acordo com o id, também passado como parêmtro.
   */
  const getById = async (table, id) => {
    console.log('Get by ID: ' + id + ' from table: ' + table)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single() // necessary or use data[0]
    console.log('error: ' + JSON.stringify(error))
    if (error) throw error
    console.log('data: ' + JSON.stringify(data))
    return data
    /**
     * como a busca é por id, caso encontre, basta se retorne o primeiro elemento.
     */
  }

  /**
   * Adiciona uma tupla populada na tabela passada como parâmetro
   * usando os dados do formulário passado como parâmetro.
   */
  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form, // todos os parâmetros do form
        user_id: user.value.id
      }
    ])
    // console.log('Post - user_id: ' + user.value.id)
    if (error) throw error
    return data
    // return data[0]
  }

  /**
   * Atualiza uma tupla na tabela passada como parâmetro
   * usando os dados do formulário passado como parâmetro.
   */
  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form
      })
      .match({ id: form.id }) // same as "where t.id = form.id"
    if (error) throw error
    // return data[0]
    return data
  }

  /**
   * Remove/Deleta uma tupla na tabela passada como parâmetro
   * usando o id passado como parâmetro.
   */
  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  /**
   *
   */

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4()
    /*
    const { error } = supabase.storage.from(storage).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
    */

    const { error } = supabase.storage.from(storage).upload(fileName, file)

    console.log('upload error: ' + JSON.stringify(error))
    console.log('uploaded file: ' + JSON.stringify(file))
    console.log('uploaded: ' + file.name + ' to ' + storage)

    const publicUrl = await getUrlPublic(fileName, storage)
    // console.log('get publicUrl (image) for file: ' + fileName + '...')
    if (error) throw error
    // console.log('publicUrl (image): ' + publicUrl)
    return publicUrl
  }

  /**
   *
   */

  const getUrlPublic = async (filePath, storage) => {
    console.log('Geting UrlPublic for: ' + filePath)
    const { data, error } = supabase.storage
      .from(storage)
      .getPublicUrl(filePath)
    if (error) throw error
    return data.publicUrl
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg
  }
}
