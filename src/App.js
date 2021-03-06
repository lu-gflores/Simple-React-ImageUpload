import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

class App extends Component {
  //stores file in state and uploads when Upload button 
  //is clicked
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }
  }
  //pass file to state
  onChangeHandler = event => {
    let files = event.target.files
    if (this.maxSelectFile(event) && this.checkMimeType(event)) {
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
    toast('Uploading', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    axios.post('http://localhost:8080/upload', data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      }
    }).then(res => {
      toast.success('upload success')
    }).catch(err => {
      toast.error('upload failed...')
    })


  }

  //seting max number of files that can be uploaded at a time(3)
  maxSelectFile = event => {
    let files = event.target.files
    if (files.length > 3) {
      const msg = 'Only 3 images can be uploaded at a time!'
      event.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }

  //validation for file format
  checkMimeType = event => {
    let files = event.target.files
    let err = ''
    const types = ['image/png', 'image/jpeg', 'image/gif']
    for (let i = 0; i < files.length; i++) {
      if (types.every(type => files[i].type !== type)) {
        err += files[i].type + ' is not a supported file type\n'
      }
    }
    //looping through toast message
    for (let i = 0; i < err.length; i++) {
      event.target.value = null
      toast.error(err[i])
    }
    // if ( err !== '') {
    //   event.target.value =  null
    //   console.log(err)
    //   return false;
    // }
    return true;
  }

  //checks for file size
  checkFileSize = event => {
    let files = event.target.files
    let size = 15000
    let err = ''
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > size) {
        err += files[i].type + ' is too large, please choose a smaller file\n'
      }
    };
    for(let i = 0; i < err.length; i++) {
      toast.error(err[i])
      event.target.value = null
    }
    // if (err !== '') {
    //   event.target.value = null
    //   console.log(err)
    //   return false
    // }
    return true
  }
  //toast


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
              <div className='form-group'>
                <Progress max='100' color='success' value={this.state.loaded}>{Math.round(this.state.loaded, 2)} %</Progress>
              </div>
              <div className='form-group'>
                <ToastContainer />
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
