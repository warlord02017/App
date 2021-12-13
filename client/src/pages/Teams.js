import React from 'react';
import {
  Table,
  Select
} from 'antd'
import 'antd/dist/antd.css'
import '../stylesheets/Teams.css';

import NavBar from '../components/NavBar';
import {getLeaderboard,getTeamByIdAndYear} from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;



class Teams extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      leaderboardResults: [],
      playersInTeamResults: [],
      year: 2014
    }

    this.yearOnChange = this.yearOnChange.bind(this)
  }

  formatDate(d) {
    let months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    let m = months[(d.getMonth())];
    let day = d.getDate().toString();
    let y = d.getFullYear().toString();
    let res = m + "-" + day + "-" + y;
    return res;
  }

   showTeamMembers(value) {
    getTeamByIdAndYear(value,this.state.year).then(res => {
      res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
      this.setState({ playersInTeamResults: res.result })
    })
  }

  yearOnChange(value) {
    this.state.year = value
    getLeaderboard(value).then(res => {
      this.setState({ leaderboardResults: res.result})
      this.setState({playersInTeamResults: []})
    })
  }

  componentDidMount() {
    getLeaderboard(2014).then(res => {
      this.setState({ leaderboardResults: res.result })
    })
  }


  render() {

    return (
      <div>
        <NavBar />
        <div className="selection">
        <h3 style={{fontSize: '30px'}}>Teams Leaderboard</h3>
          <Select defaultValue="2011" style={{ marginLeft: '2%', width: 120 }} onChange={this.yearOnChange}>
             <Option value="2011">2011</Option>
             <Option value="2012">2012</Option>
             <Option value="2013">2013</Option>
             <Option value="2014">2014</Option>
             <Option value="2015">2015</Option>
          </Select>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.showTeamMembers(record.TeamId)}, 
    };
  }}dataSource={this.state.leaderboardResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5}}>
          {/* <Column title="TeamId" dataIndex="TeamId" key="TeamId"/> */}
          <Column title="TeamName" dataIndex="TeamName" key="TeamName"/>
          <ColumnGroup title="Wins">
              <Column title="HomeWins" dataIndex="HomeWins" key="HomeWins" sorter= {(a, b) => a.HomeWins - b.HomeWins}/>
              <Column title="AwayWins" dataIndex="AwayWins" key="AwayWins" sorter= {(a, b) => a.AwayWins - b.AwayWins}/>
              <Column title="TotalWins" dataIndex="TotalWins" key="TotalWins" sorter= {(a, b) => a.TotalWins - b.TotalWins}/>
          </ColumnGroup>

          <ColumnGroup title="Loss">
              <Column title="HomeLoss" dataIndex="HomeLoss" key="HomeLoss" sorter= {(a, b) => a.HomeLoss - b.HomeLoss}/>
              <Column title="AwayLoss" dataIndex="AwayLoss" key="AwayLoss" sorter= {(a, b) => a.AwayLoss - b.AwayLoss}/>
              <Column title="TotalLosses" dataIndex="TotalLosses" key="TotalLosses" sorter= {(a, b) => a.TotalLosses - b.TotalLosses}/>
          </ColumnGroup>
             <Column title="TotalGames" dataIndex="TotalGames" key="TotalGames"/>
          </Table>

        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Players in the Team</h3>
          <Table dataSource={this.state.playersInTeamResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5,showQuickJumper:true}}>
          <Column title="FirstName" dataIndex="FirstName" key="FirstName"/>
          <Column title="LastName" dataIndex="LastName" key="LastName"/>
          <Column title="BirthCountry" dataIndex="BirthCountry" key="BirthCountry"/>
          <Column title="DebutDate" dataIndex="DebutDate" key="DebutDate"/>
          </Table>
        </div>

      </div>
    )
  }

}

export default Teams;

