import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  //stores file in state and uploads when Upload button 
  //is clicked
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    }
  }
  //pass file to state
  onChangeHandler = event => {
    this.setState({selectedFile: event.target.files[0],
      loaded: 0,})
  }
  
  //sends request to server
  onClickHandler = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post('http://localhost:8000/upload', data, {   
    }).then(res => console.log(res.statusText))
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" onChange={this.onChangeHandler}/>
                <button type="button" className='btn btn-success btn-lg btn-block' onClick={this.onClickHandler}>Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
