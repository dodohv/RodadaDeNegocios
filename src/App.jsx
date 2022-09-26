import { useState } from 'react'
import './App.css'
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Configurador from './components/Configurador'
import GeradorEtiquetas from './components/GeradorEtiquetas'
import ApresentacaoGrupo from './components/ApresentacaoGrupo'
import Home from './components/Home'
import AddEdit from './AddEdit'
import View from './View'
import TestFirebase from './components/TestFirebase'
import NaoEncontrado from './components/NaoEncontrado'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
          <Route path="/add">
          <AddEdit />
          </Route>
          <Route path="/update/:id">
          <TestFirebase />
          </Route>
          <Route path="/view/:id">
          <View />
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
