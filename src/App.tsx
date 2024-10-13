import './App.css'
import { Menu } from './components/Menu/Menu'
import { Spacer } from './components/Spacer/Spacer'

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
            <h1 className="text-xl">Bienvenue!</h1>
            <Spacer size={32} />
            <h2 className="text-lg">The Rolnick Lab Guide to Montréal</h2>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
