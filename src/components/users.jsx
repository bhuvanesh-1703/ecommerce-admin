import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GiCancel } from "react-icons/gi";

const Users = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    role: "",
    status: "",
    password: ""
  });

  const [userShow, setUserShow] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editUserId, setEditUserId] = useState(false);

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      try {
        await axios.put(`http://localhost:5100/admin/users/${editUserId}`, user);
        getUsers();
        setIsLogin(true);
        setIsEdit(false);
        setUser({
          username: "",
          email: "",
          phonenumber: "",
          role: "",
          status: "",
          password: ""
        });
        alert("Updated Successfully")
      } catch (err) {
        console.log("Error updating user:", err);
      }
    } else {
      try {
        if (!user.username || !user.email || !user.phonenumber || !user.role || !user.password) {
          return alert("All fields are required");
        }
        await axios.post("http://localhost:5100/admin/users", user);
        getUsers();
        setIsLogin(true);
        setUser({
          username: "",
          email: "",
          phonenumber: "",
          role: "",
          status: "",
          password: ""
        });
      } catch (err) {
        console.error("Error creating user:", err);
      }
    }
  };

  const handleEdit = (user) => {
    setIsEdit(true);
    setEditUserId(user._id);
    setIsLogin(false);
    setUser({
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      status: user.status,
      password: user.password || ""
    });
  };

  
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5100/admin/users");
      setUserShow(response.data);
    } catch (err) {
      console.log("Fetching failed");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUsers = async (id) => {
    const conf = window.confirm("Do you want to delete this user?");
    if (conf) {
      await axios.delete(`http://localhost:5100/admin/users/${id}`);
      getUsers();
      console.log("User deleted successfully");
    } else {
      console.log("Delete cancelled");
    }
  };

  return (
    <>
      <div className="users-container">
        <input type="search" placeholder="Search..." />
        <button
          className="btn-users"
          style={{ backgroundColor: "#218332" }}
          onClick={() => {
            setIsLogin(false);
            setIsEdit(false);
            setUser({
              username: "",
              email: "",
              phonenumber: "",
              role: "",
              status: "",
              password: ""
            });
          }}
        >
          {isEdit ? "Edit User" : "Add User"}
        </button>
      </div>

      {isLogin ? (
        <div style={{ marginLeft: "20%", marginTop: "30px" }}>
          <table border={2}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>S.No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Status</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userShow.map((user, index) => (
                <tr key={user._id || index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.role}</td>
                  <td>{user.status.toUpperCase().slice(0, 1) + user.status.slice(1)}</td>
                  <td>
                    <button
                      style={{ backgroundColor: "#218332" }}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      style={{ backgroundColor: "#fa1837ff" }}
                      onClick={() => deleteUsers(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="add-users">
          <GiCancel
            onClick={() => {
              setIsLogin(true);
              setIsEdit(false);
            }}
            style={{ justifyContent: "flex-end", marginLeft: "98%", cursor: "pointer" }}
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="username"
              value={user.username}
              onChange={handleUser}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleUser}
            />
            <input
              type="number"
              placeholder="Phone Number"
              name="phonenumber"
              value={user.phonenumber}
              onChange={handleUser}
            />
            <input
              type="text"
              name="status"
              value={user.status}
              placeholder="Status"
              onChange={handleUser}
            />
            <select
              name="role"
              value={user.role}
              onChange={handleUser}
              style={{ width: "100%", padding: "10px", marginTop: "20px", borderRadius: "5px", border: "none" }}
            >
              <option value="">Select user</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleUser}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Users;
