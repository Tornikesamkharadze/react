import React, { useEffect, useState } from "react";
import axios from "axios";

const Validation = () => {
  const initialValues = {
    username: "",
    lastname: "",
    email: "",
    age: "",
    gender: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isUserUpdating, setUserUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmit){
        await axios.put(`http://localhost:3001/users/${formValues.id}`,formValues);
      }else{
      await axios.post("http://localhost:3001/users",formValues);
      };
      await axios.get("http://localhost:3001/users");
  
    setFormValues({
      username: "",
      lastname: "",
      email: "",
      age: "",
      gender: "",
    });
    setUserUpdating(false);
  };

  console.log("userlist", userList);

  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get("http://localhost:3001/users/");
      setUserList(data.user)
   /*    console.log(users,"users") */
    }
    getData()
  },[])


  const update = (id) => {
    const user = userList.find((user) => user.id === id);
    setFormValues({
      username: user.username,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      gender: user.gender,
      id: id,
    });
  };

  const removeUser = (id) => {
    setUserList((prev) => {
      const newFilteredArr = prev.filter((user) => user.id !== id);
      return newFilteredArr;
    });
  };

  const validate = (values) => {
    const errors = {};

    if (values.username && values.username.length < 4) {
      errors.username = "username should have at least 4 charachters";
    }
    if (values.lastname && values.lastname.length < 4) {
      errors.lastname = "lastname should have at least 4 charachters";
    }
    if (values.email && !values.email.includes("@")) {
      errors.email = "email should include @ ";
    }
    if (values.age && values.age < 18) {
      errors.age = "age must be minimum 18";
    }

    if (values.password && values.password.length < 6) {
      errors.password = "password should have at least 6 charachters ";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <select
            onChange={handleChange}
            name="gender"
            defaultValue={"Chose gender"}
          >
            <option name={"gender"} value={"Female"}>
              Female
            </option>
            <option name={"gender"} value={"Male"}>
              Male
            </option>
          </select>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          {formErrors.username && <p>{formErrors.username}</p>}

          <div className="field">
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={formValues.lastname}
              onChange={handleChange}
            />
          </div>
          {formErrors.lastname && <p>{formErrors.lastname}</p>}
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {formErrors.email && <p>{formErrors.email}</p>}
          <div className="field">
            <label>Age</label>
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formValues.age}
              onChange={handleChange}
            />
          </div>
          {formErrors.age && <p>{formErrors.age}</p>}

          <div className="field">
            <label>Password</label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {formErrors.password && <p>{formErrors.password}</p>}
          <button className="fluid ui button blue">Add</button>
          <p>
            {formValues.username} {formValues.lastname} {formValues.email}{" "}
            {formValues.age}
          </p>
        </div>
      </form>

      {userList.map((user) => {
        return (
          <React.Fragment key={user.id}>
            <h1>{user.username}</h1>
            <p>{user.age}</p>
            <button
              onClick={() => {
                update(user.id);
                setUserUpdating(true);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                removeUser(user.id);
              }}
            >
              Delete
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Validation;