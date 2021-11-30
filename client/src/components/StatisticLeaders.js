import '../stylesheets/StatisticLeaders.css';
import {Table} from 'react-bootstrap';

function StatisticLeaders() {
    return (
        <div>
            <h2>Top Batting Performers</h2>
            <hr></hr>
            <div className="leaders-outer">
                <div className="hr-leaders">
                    <h5>Most Homeruns</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Homeruns</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="hitting-leaders">
                    <h5>Best Batting Average</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Batting Avg.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div> 
                <div className="eye-leaders">
                    <h5>Best Eye</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Walks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>               
            </div>
            <h2>Top Pitching Performers</h2>
            <hr></hr>
            <div className="leaders-outer">
                <div className="hr-leaders">
                    <h5>Most Strikeouts</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Strikeouts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="hitting-leaders">
                    <h5>Strikeout Rate</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Strikeout Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div> 
                <div className="eye-leaders">
                    <h5>Least Hits Allowed</h5>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                            <th>Rank</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Hits Allowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style={{color: 'blue'}}>1</td>
                            <td style={{color: 'blue'}}>Mark</td>
                            <td style={{color: 'blue'}}>Otto</td>
                            <td style={{color: 'blue'}}>50</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>2</td>
                            <td style={{color: 'blue'}}>Jacob</td>
                            <td style={{color: 'blue'}}>Thornton</td>
                            <td style={{color: 'blue'}}>40</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>3</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'blue'}}>4</td>
                            <td style={{color: 'blue'}}>John</td>
                            <td style={{color: 'blue'}}>Ortiz</td>
                            <td style={{color: 'blue'}}>30</td>
                            </tr>
                            <tr>
                            <td style={{color: 'red'}}>5</td>
                            <td style={{color: 'red'}}>John</td>
                            <td style={{color: 'red'}}>Ortiz</td>
                            <td style={{color: 'red'}}>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>               
            </div>
        </div>
    )
};

export default StatisticLeaders;