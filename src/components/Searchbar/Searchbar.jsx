import { Component } from "react";
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  }
  
  saveInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const search = this.state.search.trim();

    if (search === '') {
      toast.warning('There should not be an empty line', {
        autoClose: 3000,
        theme: "dark"
      })
      return;
    }

    this.props.onSubmit(search);
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.btn}>
            <span className={styles.label}>Search</span>
          </button>

          <input
            className={styles.input}
            name="search"
            type="text"
            value={search}
            onChange={this.saveInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};