import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Head2HeadTeams from './pages/Head2HeadTeams';
import Head2HeadTeamsStats from './pages/Head2HeadTeamsStats';
import Main from './pages/Main';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main />}></Route>
        <Route path="/Head2Head/Teams" element={<Head2HeadTeams />}></Route>   
        <Route path="/Teams" element={<Teams />}></Route>
        <Route path="/Head2Head/Teams/:team1/:team2" element={<Head2HeadTeamsStats />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
