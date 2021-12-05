import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Head2HeadTeams from './pages/Head2HeadTeams';
import Main from './pages/Main';
import Game from './pages/Game'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Head2Head/Teams" element={<Head2HeadTeams />}>
        </Route>
        <Route path="/" element={<Main />}></Route>
        <Route path="/game/:id" render={() => (<Game />)}></Route>
      </Routes>
    </Router>
  );
}

export default App;
