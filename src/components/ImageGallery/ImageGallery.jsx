import PropTypes from "prop-types";
// import { ImageGalleryItem } from './ImageGalleryItem'

export const ImageGallery = ({ contacts, removeContact }) => (
  <ul>
    {contacts.map((contact) => (
      <li>
        {/* <ImageGalleryItem key={contact.id} */}
          contact={contact}
          removeContact={removeContact} />
      </li>
      
    ))}
  </ul>
);

// ImageGallery.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.objectOf(PropTypes.string).isRequired
//   ).isRequired,
// };