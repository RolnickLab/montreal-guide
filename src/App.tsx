import './App.css'
import { Card } from './components/Card/Card'
import { Menu } from './components/Menu/Menu'
import { Spacer } from './components/Spacer/Spacer'
import { useCategories, useTips } from './utils/supabase/supabase'

const App = () => {
  return (
    <>
      <header className="header">
        <div className="content">
          <Menu />
        </div>
      </header>
      <main>
        <div className="intro">
          <div className="content">
            <h1 className="text-xl font-heavy">Bienvenue!</h1>
            <Spacer size={32} />
            <h2 className="text-lg font-normal">
              The Rolnick Lab Guide to Montréal
            </h2>
          </div>
        </div>
        <Tips />
      </main>
    </>
  )
}

const Tips = () => {
  const { tips } = useTips()
  const { categories } = useCategories()

  return (
    <div className="tips">
      <div className="content">
        <div className="cards">
          {tips.map((tip) => (
            <Card key={tip.id} tip={tip} categories={categories} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
