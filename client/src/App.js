import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Head2HeadTeams from './pages/Head2HeadTeams';
import Head2HeadTeamsStats from './pages/Head2HeadTeamsStats';
import Head2HeadPlayers from './pages/Head2HeadPlayers';
import Main from './pages/Main';
import Teams from './pages/Teams';

function App() {

  // const styleLink = document.createElement("link");
  // styleLink.rel = "stylesheet";
  // styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
  // document.head.appendChild(styleLink);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main />}></Route>
        <Route path="/Head2Head/Teams" element={<Head2HeadTeams />}></Route>   
        <Route path="/Head2Head/Players" element={<Head2HeadPlayers />}></Route>
        <Route path="/Teams" element={<Teams />}></Route>
        <Route path="/Head2Head/Teams/:team1/:team2" element={<Head2HeadTeamsStats />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
