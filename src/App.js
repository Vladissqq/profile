import React, { Component } from 'react';
import Form from './components/form';
import History from './components/history';
import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from './config/config';
import './App.css';




class App extends Component {

  constructor(props) {
    super(props);
    this.addHistory = this.addHistory.bind(this);
    this.removeHistory = this.removeHistory.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('history');

    // We're going to setup the React state of our component
    this.state = {
      history: [],
    }
  };

  componentWillMount() {
    const previousHistory = this.state.history;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousHistory.push({
        id: snap.key,
        data: snap.val().data,
        historyContent: snap.val().historyContent,
      })

      this.setState({
        history: previousHistory
      })
    });

    this.database.on('child_removed', snap => {
      for (var i = 0; i < previousHistory.length; i++) {
        if (previousHistory[i].id === snap.key) {
          previousHistory.splice(i, 1);
        }
      }

      this.setState({
        history: previousHistory
      })
    })
  };

  addHistory = (h) => {
    let d = new Date();
  
    this.database.push().set({ historyContent: h, data: (d.toLocaleDateString()+'/'+d.toLocaleTimeString())  });
  }

  removeHistory = (historyId) => {
    console.log("from the parent: " + historyId);
    this.database.child(historyId).remove();
  }



  render() {
    return (
      <div className='container '>
        <div className='container-fluid sticky-top row jumbotron jumbotron-fluid'>
          <Form addHistory={this.addHistory} />
        </div>
        <div className='container row jumbotron jumbotron-fluid'>
          {
            this.state.history.map((h) => {
              return (
                <History 
                  historyContent={h.historyContent}
                  data={h.data}
                  historyId={h.id}
                  key={h.id}
                  removeHistory={this.removeHistory}
                />
              );
            }).reverse()
          }
        </div>
      </div>
    );
  }
}

export default App;