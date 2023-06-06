import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
  }

  componentDidMount() {
    
  }

  changeImageName = (newName) => {
    this.setState({ imageName: newName });
  }

  async getData() {
    const config = {
      params: {
        key: `35543828-6c73cc5fdea5a14873063547d`,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };
    const URL = `https://pixabay.com/api/`;

    const response = await axios.get(URL, config);
    this.incrementPage();
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
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