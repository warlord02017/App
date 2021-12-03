import React from 'react';
import {
  Table,
  Select
} from 'antd'
import 'antd/dist/antd.css'

import NavBar from '../components/NavBar';
import {getLeaderboard} from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;



class Teams extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      leaderboardResults: [],
    }

    this.yearOnChange = this.yearOnChange.bind(this)
  }


//   goToMatch(matchId) {
//     window.location = `/matches?id=${matchId}`
//   }

  yearOnChange(value) {
    getLeaderboard(value).then(res => {
        console.log("Year is changed");
      this.setState({ leaderboardResults: res.result })
    })
  }

  componentDidMount() {
    getLeaderboard(2014).then(res => {
      console.log(res)
      this.setState({ leaderboardResults: res.result })
    })

 
  }


  render() {

    return (
      <div>
        <NavBar />

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          <h3>Teams</h3>
          <Select defaultValue="2011" style={{ width: 120 }} onChange={this.yearOnChange}>
             <Option value="2011">2011</Option>
             <Option value="2012">2012</Option>
             <Option value="2013">2013</Option>
             <Option value="2014">2014</Option>
             <Option value="2015">2015</Option>
          </Select>
          
          <Table dataSource={this.state.leaderboardResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5}}>
          <Column title="TeamName" dataIndex="TeamName" key="TeamName"/>
          <ColumnGroup title="Wins">
              <Column title="HomeWins" dataIndex="HomeWins" key="HomeWins" sorter= {(a, b) => a.HomeWins.localeCompare(b.HomeWins)}/>
              <Column title="AwayWins" dataIndex="AwayWins" key="AwayWins" sorter= {(a, b) => a.AwayWins.localeCompare(b.AwayWins)}/>
              <Column title="TotalWins" dataIndex="TotalWins" key="TotalWins" sorter= {(a, b) => a.TotalWins.localeCompare(b.TotalWins)}/>
          </ColumnGroup>

          <ColumnGroup title="Loss">
              <Column title="HomeLoss" dataIndex="HomeLoss" key="HomeLoss" sorter= {(a, b) => a.HomeLoss.localeCompare(b.HomeLoss)}/>
              <Column title="AwayLoss" dataIndex="AwayLoss" key="AwayLoss" sorter= {(a, b) => a.AwayLoss.localeCompare(b.AwayLoss)}/>
              <Column title="TotalLosses" dataIndex="TotalLosses" key="TotalLosses" sorter= {(a, b) => a.TotalLosses.localeCompare(b.TotalLosses)}/>
          </ColumnGroup>
             <Column title="TotalGames" dataIndex="TotalGames" key="TotalGames"/>
          </Table>

        </div>


      </div>
    )
  }

}

export default Teams;

