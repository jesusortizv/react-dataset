import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import Dataset from './components/Dataset/Dataset';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataset: null,
    };
  }

  componentDidMount() {
    const spreadsheet = fetch('https://spreadsheets.google.com/feeds/list/1QSaL5sOlPDKQFyNUSt-ym3lgjZwsxF_Q-8r4aRKjaRM/1/public/values?alt=json')
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log('There was an error', error);
      })

    spreadsheet.then((data) => {
      const mapData = data.feed.entry.map((entry) => {
        return {
          title: entry.gsx$title.$t,
          description: entry.gsx$description.$t,
          image: entry.gsx$image.$t || null,
        };
      });

      this.setState({
        dataset: mapData,
      });
    });
  };

  render() {
    const dataset = this.state.dataset;

    return (
      <div className="App">
        <div className="App-header">
          <Logo/>
          <h2>Welcome to React</h2>
        </div>
        <div>
          <Dataset data={dataset}/>
        </div>
      </div>
    );
  };
}

export default App;
