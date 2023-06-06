import { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import '../index.css';

const loaderStyles = {
  width: "100",
  height: "120",
  radius: "9",
  color: "#4fa94d",
  ariaLabel: "three-dots-loading",
  wrapperStyle: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }
}
export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    status: 'idle',
  }

  async componentDidUpdate(_, prevState) {
    const { imageName: prevImageName, page: prevPage } = prevState;
    const { imageName, page, images } = this.state;

    const isImageNameChanged = prevImageName !== imageName;
    const isPageChanged = prevPage !== page;

    if (isImageNameChanged || isPageChanged) {
      this.setState({ status: 'pending' });

      try {
        let updatedImages = [];
        if (isImageNameChanged) {
          updatedImages = await this.getImages();
        } else {
          const { hits } = await this.getImages();
          updatedImages.hits = [...images, ...hits];
        }

        if (updatedImages.totalHits === 0) {
          throw Error(
            'Sorry, there are no images matching your search query.'
          );
        }

        toast.success(`Hooray! We found ${updatedImages.totalHits} images.`);
        this.setState({ images: updatedImages.hits, status: 'resolved' });

      } catch (error) {
        this.setState({ status: 'rejected' });
        toast.error(error.message);
      }
    }
  }

  changeImageName = (newName) => {
    const { imageName } = this.state;
    if (imageName === newName) {
      toast.info("The same query, enter different.")
      return;
    }
    this.setState({ imageName: newName });
  }

  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  async getImages() {
    const { imageName, page } = this.state;
    const URL = `https://pixabay.com/api/`;
    const config = {
      params: {
        key: `35543828-6c73cc5fdea5a14873063547d`,
        q: imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    };

    const response = await axios.get(URL, config);
    return response.data;
  }
  
  render() {
    const { images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.changeImageName} />
        
        {status === 'pending' &&
          <ThreeDots {...loaderStyles} />}
        
        {status === 'rejected' &&
          <p>Error</p>}
        
        {status === 'resolved' &&
          <>
            <ImageGallery images={images} />
            <LoadMoreBtn handleClick={this.incrementPage}/>
          </>}

        <ToastContainer />
      </div>
    )
  }
}