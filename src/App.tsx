import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Card } from './components/Card/Card'
import { Form } from './components/Form/Form'
import { Menu } from './components/Menu/Menu'
import { Select } from './components/Select/Select'
import { Spacer } from './components/Spacer/Spacer'
import { useCategories, useTips } from './utils/supabase/supabase'

const App = () => {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="content">
          <Menu />
        </div>
      </header>
      <Routes>
        <Route path="/" Component={Tips} />
        <Route path="/submit" Component={Submit} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

const Tips = () => {
  const { tips } = useTips()
  const { categories } = useCategories()
  const [category, setCategory] = useState<string | undefined>('show-all')

  const filteredTips = tips.filter((tip) => {
    if (!category || category === 'show-all') {
      return true
    }

    return `${tip.category}` === category
  })

  return (
    <>
      <div className="intro">
        <div className="content">
          <h1 className="text-xl font-heavy">Bienvenue!</h1>
          <Spacer size={32} />
          <h2 className="text-lg font-normal">
            The Rolnick Lab Guide to Montréal
          </h2>
          <Spacer size={64} />
          <Select
            items={[
              { label: 'Show all', value: 'show-all' },
              ...categories.map((category) => ({
                label: category.label,
                value: `${category.id}`,
              })),
            ]}
            value={category}
            onValueChange={setCategory}
          />
        </div>
      </div>
      <main className="main">
        <div className="content">
          <div className="cards">
            {filteredTips.map((tip) => (
              <Card key={tip.id} tip={tip} categories={categories} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

const Submit = () => {
  const { categories, isLoading } = useCategories()

  if (isLoading) {
    return null
  }

  return (
    <>
      <div className="intro">
        <div className="content">
          <h1 className="text-lg">Share your best Montréal tips!</h1>
          <Spacer size={32} />
          <p className="text-md">
            All content will be published in a second! If you want any content
            to be updated or removed, just send us a{' '}
            <a href="mailto:anna.viklund@mila.quebec" className="font-bold">
              mail
            </a>
            .
          </p>
        </div>
      </div>
      <main className="main">
        <div className="content">
          <Form categories={categories} />
        </div>
      </main>
    </>
  )
}

export default App
