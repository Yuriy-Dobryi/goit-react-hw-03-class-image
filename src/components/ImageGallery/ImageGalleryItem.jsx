import styles from './ImageGallery.module.css'

export const ImageGalleryItem = ({ contact: { id, name, number }, removeContact }) => (
  <>
    <p className={styles.info}>
      {name}: {number}
    </p>
    <button className={styles.btn} onClick={() => removeContact(id, name)}>Delete</button>
  </>
);