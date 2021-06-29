import React, { Component } from "react";
import EditHarga from "./EditHarga";
import { Provider } from "./Context.js";

class cekharga extends Component {
  state = {
    post_found: true,
    new_user: false
  };
  addNewUser = (id, name, email) => {
    if (this.state.post_found) {
      this.setState({
        new_user: { id: id, user_name: name, user_email: email }
      });
    } else {
      this.setState({
        post_found: true
      });
    }
  };
  newOrder = () => {
    var urlprint = "https://www.bakulansayur.com/apicart/neworder.php?";
    window.open(urlprint, "blank");
  };
  postShow = (show) => {
    this.setState({
      post_found: show
    });
  };
  

  render() {
    const contextValue = {
      new_user: this.state.new_user,
      addNewUser: this.addNewUser,
      post_show: this.postShow
    };

    let showUsers;
    if (this.state.post_found) {
      showUsers = (

        <table className="table table-striped ">
        <thead>
          <tr>
            <th>Product</th>
            <th>Harga</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
        <EditHarga/>
        </tbody>
      </table>

        
      );
    } else {
      showUsers = (
        <div className="alert alert-light" role="alert">
          <h4 className="alert-heading">No User Found!</h4>
          <hr />
          <p>Error server.</p>
        </div>
      );
    }
    return (
      <Provider value={contextValue}>
        <div className="container-fluid bg-light">
            <div className="col-md-8">{showUsers}</div>
            </div>
      </Provider>
    );
  }
}
export default cekharga;
