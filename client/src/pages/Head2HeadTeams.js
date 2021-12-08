import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Head2HeadTeams.css';

const lib = require('../fetcher.js');

function Head2HeadTeams() {
    const navigate = useNavigate();
    const [team1, setTeam1] = useState('');
    const[team2, setTeam2] = useState('');
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        lib.getTeams().then((res) => setTeams(res.data))
    }, []);

    function handleChangeT1(e) {
        if (e.target.value !== 'Select a Team') {
            setTeam1(e.target.value);
        } else {
            setTeam1('');
        }
    }
    
    function handleChangeT2(e) {
        if (e.target.value !== 'Select a Team') {
            setTeam2(e.target.value);
        } else {
            setTeam2('');
        }
    }

    function search() {
        navigate(`/Head2Head/teams/${team1.split(' ').join('-')}/${team2.split(' ').join('-')}`);
    };

    return (
        <div>
          <NavBar />
          <div className="selection">
              <div className="selectors">
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team1} onChange={handleChangeT1}>
                    <option selected>Select a Team</option>
                    {teams.map((t)=> (
                        <option value={t[1]}>{t[1]}</option>
                    ))}
                </select>
                <div className="versus">Versus</div>
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example" value={team2} onChange={handleChangeT2}>
                    <option selected>Select a Team</option>
                    {teams.map((t) => (
                        <option value={t[1]}>{t[1]}</option>
                    ))}
                </select>
                <button onClick={search} class="h2h-go">Search<span class="fa fa-caret-right"></span></button>
              </div>
          </div>
        </div>
    )
}

export default Head2HeadTeams;