import { Component } from "react";
import { Modal } from './Modal/Modal';
import styles from './ImageGallery.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalShow: false,
  }

  toggleModal = () => {
    this.setState(({ isModalShow }) => ({
      isModalShow: !isModalShow
    }));
  }

  render() {
    const { previewImg, largeImg, tags } = this.props;
    const { isModalShow } = this.state;

    return (
      <li className={styles.item}>
        <img className={styles.image}
          onClick={this.toggleModal}
          src={previewImg}
          loading={"lazy"}
          alt={tags} />
        
        {isModalShow &&
          <Modal
            closeModal={this.toggleModal}
            largeImg={largeImg}
            tags={tags} />}
      </li>
    );
  }
}