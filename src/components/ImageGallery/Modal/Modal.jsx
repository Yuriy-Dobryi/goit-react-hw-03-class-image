import { Component } from "react";
import PropTypes from "prop-types";
import styles from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = ({ key }) => {
    if (key === "Escape") {
      this.props.closeModal();
    }
  }

  onOverlayClick = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  }

  render() {
    const { largeImg, tags } = this.props;

    return (
      <div onClick={this.onOverlayClick} className={styles.overlay}>
        <div className={styles.modal}>
          <img src={largeImg} alt={tags} />
        </div>
      </div>
    );
  }
}