// import React from 'react';
// import {
//   Table,
//   Select
// } from 'antd'

// import NavBar from '../components/NavBar';
// import {getLeaderboard} from '../fetcher'
// const { Column, ColumnGroup } = Table;
// const { Option } = Select;


// const leaderboardColumns = [
//   {
//     title: 'TeamName',
//     dataIndex: 'TeamName',
//     key: 'TeamName',
//     sorter: (a, b) => a.TeamName.localeCompare(b.NameTeamName),
//     /*render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>*/
//   },
//   {
//     title: 'HomeWins',
//     dataIndex: 'HomeWins',
//     key: 'HomeWins',
//     sorter: (a, b) => a.HomeWins - b.HomeWins
    
//   },



//   {
//     title: 'AwayWins',
//     dataIndex: 'AwayWins',
//     key: 'AwayWins',
//     sorter: (a, b) => a.AwayWins - b.AwayWins
    
//   },

//   {
//     title: 'TotalWins',
//     dataIndex: 'TotalWins',
//     key: 'TotalWins',
//     sorter: (a, b) => a.TotalWins - b.TotalWins
    
//   },

//   {
//     title: 'HomeLoss',
//     dataIndex: 'HomeLoss',
//     key: 'HomeLoss',
//     sorter: (a, b) => a.HomeLoss - b.HomeLoss
    
//   },

//   {
//     title: 'AwayLoss',
//     dataIndex: 'AwayLoss',
//     key: 'AwayLoss',
//     sorter: (a, b) => a.AwayLoss - b.AwayLoss
    
//   },

//   {
//     title: 'TotalLosses',
//     dataIndex: 'TotalLosses',
//     key: 'TotalLosses',
//     sorter: (a, b) => a.TotalLosses - b.TotalLosses
    
//   },
 
//   {
//     title: 'TotalGames',
//     dataIndex: 'TotalGames',
//     key: 'TotalGames',
//     sorter: (a, b) => a.TotalGames - b.TotalGames
    
//   }
// ];

// class Teams extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//     //   matchesResults: [],
//     //   matchesPageNumber: 1,
//     //   matchesPageSize: 10,
//       leaderboardResults: [],
//     //   pagination: null  
//     }

//     this.yearOnChange = this.yearOnChange.bind(this)
//   }


// //   goToMatch(matchId) {
// //     window.location = `/matches?id=${matchId}`
// //   }

//   yearOnChange(value) {
//     getLeaderboard(value).then(res => {
//       this.setState({ leaderboardResults: res.results })
//     })
//   }

//   componentDidMount() {

//     getLeaderboard().then(res => {
//       console.log(res.results)
//       this.setState({ leaderboardResults: res.results })
//     })

 
//   }


//   render() {

//     return (
//       <div>
//         <NavBar />
//         <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
//           <h3>Players</h3>
//           <Select defaultValue="2014" style={{ width: 120 }} onChange={this.yearOnChange}>
//              <Option value="2011">2011</Option>
//              <Option value="2012">2012</Option>
//              <Option value="2013">2013</Option>
//              <Option value="2014">2014</Option>
//              <Option value="2015">2015</Option>
//           </Select>
//           <Table dataSource={this.state.leaderboardResults} columns={leaderboardColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
//         </div>
//       </div>
//     )
//   }

// }

// export default Teams

