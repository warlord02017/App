import React from 'react';
import NavBar from '../components/NavBar';
import '../stylesheets/Head2HeadTeams.css';

function Head2HeadTeams() {
    return (
        <div>
          <NavBar />
          <div className="selection">
              <div className="selectors">
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example">
                    <option selected>Select a Team</option>
                    <option value="Boston Red Sox">Boston Red Sox</option>
                    <option value="New York Yankees">New York Yankees</option>
                    <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                </select>
                <div className="versus">Versus</div>
                <select style={{width:'35%'}}class="form-select" aria-label="Default select example">
                    <option selected>Select a Team</option>
                    <option value="Boston Red Sox">Boston Red Sox</option>
                    <option value="New York Yankees">New York Yankees</option>
                    <option value="Philadelphia Phillies">Philadelphia Phillies</option>
                </select>
                <a href="#/" class="h2h-go">Search<span class="fa fa-caret-right"></span></a>
              </div>
          </div>
        </div>
    )
}

export default Head2HeadTeams;