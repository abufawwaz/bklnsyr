import React, { Component } from "react";
import Axios from "axios";
import { AppContext } from "./Context";
class EditHarga extends Component {
  static contextType = AppContext;

  state = {
    users: []
  };

  fetchUsers = () => {
    fetch("https://www.bakulansayur.com/apicart/editharga.php")
      .then((response) => {
        response.json().then(
          function (data) {
            if (data.success === 1) {
              this.setState({
                users: data.users.reverse()
              });
            } else {
              this.context.post_show(false);
            }
          }.bind(this)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchUsers();
  }
  

  handleUpdate = (product_id) => {
    Axios.post("https://www.bakulansayur.com/apicart/updateharga.php", {
      product_id: product_id,
      model: this.model.value,
      price: this.price.value
    })
      .then(({ data }) => {
        if (data.success === 1) {
          let users = this.state.users.map((user) => {
            if (user.product_id === product_id) {
              user.model = this.model.value;
              user.price = this.price.value;
              user.isEditing = false;
              return user;
            }
            return user;
          });
          this.setState({
            users
          });
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editMode = (product_id) => {
    let users = this.state.users.map((user) => {
      if (user.product_id === product_id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });

    this.setState({
      users
    });
  };

  cancleEdit = (product_id) => {
    let users = this.state.users.map((user) => {
      if (user.product_id === product_id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    this.setState({
      users
    });
  };

  handleDelete = (product_id) => {
    let deleteUser = this.state.users.filter((user) => {
      return user.product_id !== product_id;
    });

    Axios.post("https://www.bakulansayur.com/apijs/delete-user.php", {
      product_id: product_id
    })
      .then(({ data }) => {
        if (data.success === 1) {
          this.setState({
            users: deleteUser
          });
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate() {
    let newUser = this.context.new_user;
    if (newUser) {
      this.setState({
        users: [newUser, ...this.state.users]
      });
      this.context.new_user = false;
    }
  }

  render() {
    let allUsers = this.state.users.map(
      ({ product_id, model, price, isEditing }, index) => {
        return isEditing === true ? (
          <tr key={product_id}>
            <td>
              <input
                className="form-control"
                type="text"
                ref={(item) => (this.model = item)}
                defaultValue={model}
              />
            </td>
            <td>
              <input
                className="form-control"
                type="number"
                ref={(item) => (this.price = item)}
                defaultValue={parseInt(price, 10)}
              />
            </td>
            <td>
              <button
                className="btn btn-success mr-2"
                onClick={() => this.handleUpdate(product_id)}
              >
                Save
              </button>
              <button
                onClick={() => this.cancleEdit(product_id)}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        ) : (
          <tr key={product_id}>
            <td>{model}</td>
            <td>{parseInt(price, 10)}</td>
            <td>
              <button
                className="btn btn-dark mr-2"
                onClick={() => this.editMode(product_id)}
              >
                Edit
              </button>
             
            </td>
          </tr>
        );
      }
    );

    return <>{allUsers}</>;
  }
}

export default EditHarga;
