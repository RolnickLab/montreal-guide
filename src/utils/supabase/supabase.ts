import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from './constants'
import { Database, Tables, TablesInsert } from './types'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLIC_KEY)

export const useTips = () => {
  const [data, setData] = useState<Tables<'tips'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    supabase
      .from('tips')
      .select('*')
      .then(({ data }) => {
        const sortedData = data?.sort((a, b) => {
          if (a.title < b.title) {
            return -1
          }
          if (a.title > b.title) {
            return 1
          }
          return 0
        })
        setData(sortedData ?? [])
        setIsLoading(false)
      })
  }, [])

  return { tips: data, isLoading }
}

export const insertTip = async (params: TablesInsert<'tips'>) =>
  await supabase.from('tips').insert([params]).select()

export const useCategories = () => {
  const [data, setData] = useState<Tables<'categories'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    supabase
      .from('categories')
      .select('*')
      .then(({ data }) => {
        const sortedData = data?.sort((a, b) => {
          if (a.label < b.label) {
            return -1
          }
          if (a.label > b.label) {
            return 1
          }
          return 0
        })
        setData(sortedData ?? [])
        setIsLoading(false)
      })
  }, [])

  return { categories: data, isLoading }
}
