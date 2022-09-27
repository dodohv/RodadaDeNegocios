import { useState } from 'react'
import './App.css'
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Configurador from './components/Configurador'
import GeradorEtiquetas from './components/GeradorEtiquetas'
import ApresentacaoGrupo from './components/ApresentacaoGrupo'
import Home from './components/Home'
import NaoEncontrado from './components/NaoEncontrado'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Book from './components/Book'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
<Container fluid>
      <Navbar />
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
          <Route path="/book">
          <Book />
          </Route>
          <Route path="/novogrupo">
          <ApresentacaoGrupo />
          </Route>
          <Route path="*">
          <NaoEncontrado />
          </Route>
        </Switch>
        </Container>
    </Router>    
  )
}

export default App
