import React, { Component } from 'react';
import axios from 'axios';

export default class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.enableUpdateUser = this.enableUpdateUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      users: [],
      ufirstName: "",
      ulastName: "",
      uemail: "",
      umobile: "",
      u_id: "",
      shouldShowUpdate: false
    }

  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user),
          });
          console.log(this.state.users);
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value.trim()
    })
  }
  onChangeLastname(e) {
    this.setState({
      lastName: e.target.value.trim()
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value.trim()
    })
  }
  onChangeMobile(e) {
    this.setState({
      mobile: e.target.value.trim()
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      mobile: this.state.mobile
    }
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.mobile) {

      axios.post('http://localhost:5000/users/add', user)
        .then(res => {
          console.log(res.data);
          window.location.reload(false);
        });
    }
    else {
      console.log(this.state);
      alert("All the fields are required to be filled up");
    }
  }
  deleteUser(id) {
    console.log(id);
    axios.delete('http://localhost:5000/users/delete/' + id)
      .then(response => {
        console.log(response.data);
        window.location.reload(false);
      });

  }
  enableUpdateUser(user) {
    console.log(user);
    this.setState({
      shouldShowUpdate: true,
      ufirstName: user.firstName,
      ulastName: user.lastName,
      uemail: user.email,
      umobile: user.mobile,
      u_id: user._id
    });

  }
  updateUser(e) {
    e.preventDefault();
    const user = {
      firstName: this.state.ufirstName,
      lastName: this.state.ulastName,
      email: this.state.uemail,
      mobile: this.state.umobile
    }
    if (this.state.ufirstName && this.state.ulastName && this.state.uemail && this.state.umobile) {

      axios.put('http://localhost:5000/users/update/' + this.state.u_id, user)
        .then(res => {
          console.log(res.data);
          window.location.reload(false);
        });
    }
    else {
      console.log(this.state);
      alert("All the fields are required to be filled up");
    }
  }


  render() {
    return (
      <div>
        <div>
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>First Name: </label>
              <input type="text"
                required
                className="form-control"
                onChange={this.onChangeFirstname}
              />
            </div>
            <div className="form-group">
              <label>Last Name: </label>
              <input type="text"
                required
                className="form-control"
                onChange={this.onChangeLastname}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input type="text"
                required
                className="form-control"
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label>Mobile: </label>
              <input type="text"
                required
                className="form-control"
                onChange={this.onChangeMobile}
              />
            </div>
            <br></br>
            <div className="form-group">
              <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <br></br>
        <div>
          <h3>Existing Users</h3>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.users.map(user =>
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td><button onClick={this.deleteUser.bind(this, user._id)} className="btn-dark">Delete</button></td>
                    <td><button onClick={this.enableUpdateUser.bind(this, user)} className="btn-secondary">Update</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <br></br>
        {this.state.shouldShowUpdate &&
          <div>
            <h3>
              Update User
            </h3>
            <form onSubmit={this.updateUser}>
              <div className="form-group">
                <label>First Name: </label>
                <input type="text"
                  required
                  className="form-control"
                  value={this.state.ufirstName}
                  onChange={(event) => {
                    this.setState({ ufirstName: event.target.value.trim() });
                  }
                  } />
              </div>
              <div className="form-group">
                <label>Last Name: </label>
                <input type="text"
                  required
                  className="form-control"
                  value={this.state.ulastName}
                  onChange={(event) => {
                    this.setState({ ulastName: event.target.value.trim() });
                  }
                  } />
              </div>
              <div className="form-group">
                <label>Email: </label>
                <input type="text"
                  required
                  className="form-control"
                  value={this.state.uemail}
                  onChange={(event) => {
                    this.setState({ uemail: event.target.value.trim() });
                  }
                  } />
              </div>
              <div className="form-group">
                <label>Mobile: </label>
                <input type="text"
                  required
                  className="form-control"
                  value={this.state.umobile}
                  onChange={(event) => {
                    this.setState({ umobile: event.target.value.trim() });
                  }
                  } />
              </div>
              <br></br>
              <div className="form-group">
                <input type="submit" value="Update User" className="btn btn-primary" />
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}