import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      recent: [],
      allTime: [],
      current: [],
      r_arrow: '',
      all_arrow: ''
    }

    this.getRecent = this.getRecent.bind(this);
    this.getAllTime = this.getAllTime.bind(this);
    this.handleRecent = this.handleRecent.bind(this);
    this.handleAllTime = this.handleAllTime.bind(this);
  }

  componentDidMount() {
    this.getRecent();
    this.getAllTime();
  }

  getRecent() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(res => res.json())
      .then(data => this.setState({
        recent: data,
        current: data,
        r_arrow: '▾'
      }))
  }

  getAllTime() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(res => res.json())
      .then(data => this.setState({
        allTime: data
      }))
  }

  handleRecent() {
    this.setState({
      current: this.state.recent,
      all_arrow: '',
      r_arrow: '▾'
    })
  }

  handleAllTime() {
    this.setState({
      current: this.state.allTime,
      r_arrow: '',
      all_arrow: '▾'
    })
  }
  
  render() {
    const users = this.state.current.map((user, index) => (
      <tr key={user.username}>
        <td>{index + 1}</td>
        <td><img src={user.img} alt='' /></td>
        <td><a target="_blank" rel="noopener noreferrer" href={`https://www.freecodecamp.org/${user.username}`}>{user.username}</a></td>
        <td>{user.recent}</td>
        <td>{user.alltime}</td>
      </tr>
    ));
    return (
      <main>
        <div>
          <table>
            <tbody>
            <tr>
              <th>No</th>
              <th>Img</th>
              <th>Username</th>
              <th onClick={this.handleRecent}>Recent {this.state.r_arrow}</th>
              <th onClick={this.handleAllTime}>All Time {this.state.all_arrow}</th>
            </tr>
            {users}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default Table;