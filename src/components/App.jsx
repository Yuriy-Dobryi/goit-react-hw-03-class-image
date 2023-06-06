import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    imageName: '',
  }

  componentDidMount() {
    
  }

  changeImageName = (newName) => {
    this.setState({ imageName: newName });
  }
  
  render() {
    

    return (
      <div className="App">
        <Searchbar onSubmit={this.changeImageName} />
        <ImageGallery />
        <ToastContainer />
      </div>
    )
  }
}