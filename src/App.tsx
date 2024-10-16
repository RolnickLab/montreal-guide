import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Card } from './components/Card/Card'
import { Menu } from './components/Menu/Menu'
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

  return (
    <>
      <div className="intro">
        <div className="content">
          <h1 className="text-xl font-heavy">Bienvenue!</h1>
          <Spacer size={32} />
          <h2 className="text-lg font-normal">
            The Rolnick Lab Guide to Montréal
          </h2>
        </div>
      </div>
      <div className="tips">
        <div className="content">
          <div className="cards">
            {tips.map((tip) => (
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
