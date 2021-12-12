import React from 'react';
import {
  Table,
  Select,
  Input,
  DatePicker,
  Space
} from 'antd'
import 'antd/dist/antd.css'
import '../stylesheets/Teams.css';
import moment from 'moment';



import NavBar from '../components/NavBar';
import {getBatterStats, getPitcherStats, searchPlayers} from '../fetcher'
const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;


class Players extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      playerResults: [],
      playerStatsResults: [],
      playerPitchResults: [],
      debutBefore: '',
      debutAfter: '1980-01-01',
      country: '',
      bats: '',
      throws: '',
    }

    this.batHandOnChange = this.batHandOnChange.bind(this);
    this.pitchHandOnChange = this.pitchHandOnChange.bind(this);
    this.countryOnChange = this.countryOnChange.bind(this);
    this.debutOnChange = this.debutOnChange.bind(this);
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

  disabledDate(current) {
    return current < moment("19800101", "YYYYMMDD");
  }

   showPlayerStats(value) {
       getBatterStats(value, "2011-01-01", "2016-01-01").then((res) => {
        res.result.BattingAvg = res.result.BattingAvg.toFixed(3);
        this.setState({ playerStatsResults: [res.result] })
       });
       getPitcherStats(value, "2011-01-01", "2016-01-01").then((res) => {
        res.result.StrikeoutRate = res.result.StrikeoutRate.toFixed(3);
           this.setState( {playerPitchResults: [res.result]})
       })
  }

  batHandOnChange(value) {
    this.state.bats = value
    searchPlayers(value, this.state.throws, this.state.country, this.state.debutBefore, this.state.debutAfter).then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
    })
  }

  pitchHandOnChange(value) {
    this.state.throws = value
    searchPlayers(this.state.bats, value, this.state.country, this.state.debutBefore, this.state.debutAfter).then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
    })
  }

  countryOnChange(e) {
      this.state.country = e.target.value;
      searchPlayers(this.state.bats, this.state.throws, e.target.value, this.state.debutBefore, this.state.debutAfter).then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
    })
  }

  debutOnChange(e) {
    if (e === null) {
      searchPlayers(this.state.bats, this.state.throws, this.state.country, '', '1980-01-01').then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
        return;
    })
    }
    const after = moment(new Date(e[0]._d)).format("YYYY-MM-DD");
    const before = moment(new Date(e[1]._d)).format("YYYY-MM-DD");
    this.state.debutAfter = after;
    this.state.debutBefore = before;
    searchPlayers(this.state.bats, this.state.throws, this.state.country, before, after).then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
    })
  }

  componentDidMount() {
    searchPlayers(this.state.bats, this.state.throws, this.state.country, this.state.debutBefore, this.state.debutAfter).then((res) => {
        res.result.map((e) => {e.DebutDate = this.formatDate(new Date(e.DebutDate))});
        this.setState({ playerResults: res.result });
    })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="selection">
        <h3 style={{fontSize: '30px'}}>Players Leaderboard</h3>
            <RangePicker onChange={this.debutOnChange} style={{ marginLeft: '2%', width: 200 }} disabledDate={this.disabledDate} />
          <Input placeholder="country" style={{ marginLeft: '2%', width: 120 }} onChange={this.countryOnChange} ></Input>
          <Select defaultValue="Bats" style={{ marginLeft: '2%', width: 120 }} onChange={this.batHandOnChange}>
            <Option value="B">Both</Option>
             <Option value="L">Left</Option>
             <Option value="R">Right</Option>
          </Select>
          <Select defaultValue="Throws" style={{ marginLeft: '2%', width: 120 }} onChange={this.pitchHandOnChange}>
             <Option value="L">Left</Option>
             <Option value="R">Right</Option>
          </Select>
        </div>
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
          
          <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.showPlayerStats(record.ID)}, 
    };
  }}dataSource={this.state.playerResults} pagination={{ pageSizeOptions:[5, 10, 25, 50], defaultPageSize: 5}}>
          <Column title="PlayerId" dataIndex="ID" key="PlayerId" />
          <Column title="First Name" dataIndex="FirstName" key="FirstName" />
          <Column title="Last Name" dataIndex="LastName" key="LastName" />
          <Column title="Birth Country" dataIndex="BirthCountry" key="BirthCountry" />
          <Column title="Debut Date" dataIndex="DebutDate" key="DebuteDate" />
          <Column title="Bats" dataIndex="Bats" key="Bats" />
          <Column title="Throws" dataIndex="Throws" key="Throws" />
          <Column title="Height" dataIndex="Height" key="Height" sorter= {(a, b) => a.Height - b.Height} />
          <Column title="Weight" dataIndex="Weight" key="Weight" sorter= {(a, b) => a.Weight - b.Weight} />
          </Table>

        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
          <h3>Batting Stats</h3>
          <Table dataSource={this.state.playerStatsResults}>
          <Column title="Homeruns" dataIndex="Homeruns" key="Homeruns"/>
          <Column title="Singles" dataIndex="Singles" key="Homeruns"/>
          <Column title="Doubles" dataIndex="Doubles" key="Homeruns"/>
          <Column title="Triples" dataIndex="Triples" key="Homeruns"/>
          <Column title="Walks" dataIndex="Walks" key="Homeruns"/>
          <Column title="Batting Avg." dataIndex="BattingAvg" key="Batting Avg."/>
          </Table>
          <h3>Pitching Stats</h3>
          <Table dataSource={this.state.playerPitchResults}>
          <Column title="Strikeouts" dataIndex="Strikeouts" key="Strikeouts"/>
          <Column title="Homeruns Allowed" dataIndex="HomerunsAllowed" key="HomerunsAllowed"/>
          <Column title="Walks Allowed" dataIndex="WalksAllowed" key="WalksAllowed"/>
          <Column title="Strikeout Rate" dataIndex="StrikeoutRate" key="StrikeoutRate"/>
          </Table>
        </div>
      </div>
    )
  }

}

export default Players;
