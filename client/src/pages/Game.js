/**
 * Overall design:
 *
 * Path: /game/{id}
 *
 * ---
 * Home Team v/s Away Team
 * Scores
 * Strikes
 * Outs
 * ...
 * ---
 *
 * Play-by-play for the game
 *
 */

import React from 'react';
import { getGame, getPlay } from '../fetcher'

import Navbar from '../components/NavBar';
import { Card, Col, Row } from 'react-bootstrap';
import { CardBody, CardTitle } from "shards-react";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.gameId = props.match.params.gameId;
        this.state = {
            Park: "",
            City: "",
            HomeTeam: "",
            AwayTeam: "",
            Date: "",
            Attendance: 0,
            Duration: 0,
            Innings: 0,
            Outs: 0,
            HomeScore: 0,
            AwayScore: 0,
            HomeHits: 0,
            AwayHits: 0,
            HomeErr: 0,
            AwayErr: 0,
            HomeLob: 0,
            AwayLob: 0,
            Winner: "", // One of ["H", "A", "N"]
            Play: [],
        };
    }

    componentDidMount() {
        // Called right after the component is ready.
        getGame(this.gameId).then(res => {
            var results = res.results;
            var Winner = "N"
            if (results.HomeScore > results.AwayScore) {
                Winner = "H"
            } else if (results.HomeScore < results.AwayScore) {
                Winner = "A"
            }
            this.setState({
                Park: results.Park,
                City: results.City,
                HomeTeam: results.HomeTeam,
                AwayTeam: results.AwayTeam,
                Date: results.Date,
                Attendance: results.Attendance,
                Duration: results.Duration,
                Innings: results.Innings,
                Outs: results.Outs,
                HomeScore: results.HomeScore,
                AwayScore: results.AwayScore,
                HomeHits: results.HomeHits,
                AwayHits: results.AwayHits,
                HomeErr: results.HomeErr,
                AwayErr: results.AwayErr,
                HomeLob: results.HomeLob,
                AwayLob: results.AwayLob,
                Winner: Winner,
            });
        });

        getPlay(this.gameId).then(res => {
            this.setState({
                Play: res.results,
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>
                                        {this.state.HomeTeam} v/s {this.state.AwayTeam}
                                    </CardTitle>
                                </Col>
                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    At {this.state.Park} on {this.state.Date}
                                </Col>
                            </Row>
                            {/* TODO: Add more rows */}
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Game
