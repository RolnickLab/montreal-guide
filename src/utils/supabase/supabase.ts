import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from './constants'
import { Database, Tables } from './types'

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
        setData(data ?? [])
        setIsLoading(false)
      })
  }, [])

  return { tips: data, isLoading }
}

export const useCategories = () => {
  const [data, setData] = useState<Tables<'categories'>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    supabase
      .from('categories')
      .select('*')
      .then(({ data }) => {
        setData(data ?? [])
        setIsLoading(false)
      })
  }, [])

  return { categories: data, isLoading }
}
