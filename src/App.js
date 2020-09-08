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
    let files = event.target.files
    if(this.maxSelectFile(event) && this.checkMimeType(event)) {
      this.setState({
        selectedFile: files
      })
    }
  }

  //sends request to server
  onClickHandler = () => {
    const data = new FormData()
    //loops through attached files
    for (let i = 0; i < this.state.selectedFile.length; i++) {
      data.append('file', this.state.selectedFile[i])
    }

    axios.post('http://localhost:8080/upload', data, {
    }).then(res => console.log(res.statusText))
  }

  //seting max number of files that can be uploaded at a time(3)
  maxSelectFile = event => {
    let files = event.target.files
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time!'
      event.target.value = null
      console.log(msg)
      return false;
    }
    return true;
  }

  //validation for file format
  checkMimeType = event => {
    let files = event.target.files
    let err = ''
    const types = ['image/png', 'image/jpeg', 'image/gif']
    for(let i = 0; i < files.length; i++) {
      if (types.every(type => files[i].type !== type)) {
        err += files[i].type + ' is not a supported file type\n'
      }
    }
    if ( err !== '') {
      event.target.value =  null
      console.log(err)
      return false;
    }
    return true;
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" multiple onChange={this.onChangeHandler} />
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
