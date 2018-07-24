import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  ComponentDidMount() {
    const self = this;
    $.get("/get", function( data ) {
      //console.log('this ', this);
      //console.log('data', data);
      var newArr = [];
      newArr = newArr.concat(data;)
      console.log(newArr);
      self.setState({
        repos: newArr
      });
    });
  }


  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repo",
      data: {username : term},
      contentType: "application/json",
      success: function(data) {
        console.log('data posted successfully!');
        self.refresh();
      },
      failure: function(err) {
        console.log('there is an error', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <button onClick={this.refresh.bind(this)}>Refresh</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;


