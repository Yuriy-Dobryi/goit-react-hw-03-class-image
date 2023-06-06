import styles from './ImageGallery.module.css';

export const ImageGalleryItem = ({ previewImg, largeImg, tags }) => (
  <li className={styles.item}>
    <img className={styles.image}
      src={previewImg}
      alt={tags} />
  </li>
);