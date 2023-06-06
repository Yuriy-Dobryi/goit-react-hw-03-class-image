import { React, Component } from "react";
import { nanoid } from "nanoid";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from "./Searchbar/Searchbar";
// import { Filter } from "./Filter/Filter";
// import { ContactList } from "./ContactList/ContactList";
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
        <ToastContainer />
      </div>
    )
  }
}