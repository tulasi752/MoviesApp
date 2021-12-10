import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import MovieDetails from './components/MovieDetails'
import Popular from './components/Popular'
import SearchHome from './components/SearchHome'
import Home from './components/Home'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular/:page" component={Popular} />
      <ProtectedRoute exact path="/movie/:id" component={MovieDetails} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute path="/home/search" component={SearchHome} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
