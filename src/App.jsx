import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Configurador from './components/Configurador'
import GeradorEtiquetas from './components/GeradorEtiquetas'
import ApresentacaoGrupo from './components/ApresentacaoGrupo'
import Home from './components/Home'
import NaoEncontrado from './components/NaoEncontrado'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (

      <Router>
    <div className="App">
        <div style={{
          position:'fixed',
          width: 'auto',
          top:'10px',
          left:"12%"
          }}>
            <Navbar />
        </div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/configurador">
          <Configurador />
          </Route>
          <Route path="/gerador">
          <GeradorEtiquetas />
          </Route>
          <Route path="/gerador/:id">
          <GeradorEtiquetas />
          </Route>
          <Route path="/novogrupo">
          <ApresentacaoGrupo />
          </Route>
          <Route path="*">
          <NaoEncontrado />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>

  )
}

export default App
