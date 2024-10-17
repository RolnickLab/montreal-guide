import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Card } from './components/Card/Card'
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
      <main>
        <Routes>
          <Route path="/" Component={Tips} />
          <Route path="/submit" Component={Submit} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

const Tips = () => {
  const { tips } = useTips()
  const { categories } = useCategories()
  const [category, setCategory] = useState<string | undefined>(
    'show-everything',
  )

  if (!tips || !categories) {
    return null
  }

  const filteredTips = tips.filter((tip) => {
    if (!category || category === 'show-everything') {
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
              { label: 'Show everything', value: 'show-everything' },
              ...categories.map((category) => ({
                label: category.label as string,
                value: `${category.id}`,
              })),
            ]}
            placeholder="Pick a category..."
            value={category}
            onValueChange={setCategory}
          />
        </div>
      </div>
      <div className="tips">
        <div className="content">
          <div className="cards">
            {filteredTips.map((tip) => (
              <Card key={tip.id} tip={tip} categories={categories} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const Submit = () => {
  return (
    <div className="intro">
      <div className="content">
        <h1 className="text-lg font-normal">Coming soon!</h1>
      </div>
    </div>
  )
}

export default App
