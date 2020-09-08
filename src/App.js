import React, { Component } from 'react';
import './App.css';

class App extends Component {

  onChangeHandler = event => {
    console.log(event.target.files[0])
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" onChange={this.onChange}/>
                <button type="button" className='btn btn-success btn-lg btn-block'>Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
