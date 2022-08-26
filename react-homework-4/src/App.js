import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Validations/>
    </div>
  );
}

export default App;


function Validations () {
  const randomId = new Date().valueOf()
  const initialValues = {username:"", lastname:"", email:"", age:"",  gender:"", id:randomId,};
  const [formValues,setFormValues] = useState(initialValues)
  const [formErors,setFormErors] = useState({})
  const [isSubmit,setSubmit] = useState(false)
  console.log(formValues,"formValue")
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value})
    console.log([name],"name")
    console.log(value,"value")
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErors(validate(formValues))
    setSubmit(true);

    if(formValues.email.includes("@gmail.com") &&
    (formValues.username.length >= 4) && 
    (formValues.lastname.length >= 4) && 
    (formValues.age >= 18) ) setFormValues(initialValues);
  }

  const validate = (value) => {
    const errors = {};
    if(value.username.length < 4) errors.username = "სახელი უნდა შეიცავდეს მინუმუ 4 ასოს";
    if((value.lastname.length < 4)) errors.lastname = "გვარი უნდა შეიცავდეს მინიმუ 4 ასოს";
    if((value.email) && !(value.email.includes("@gmail.com"))) errors.email = "იმეილი უნდა მოიცავდეს @gmail.com";
    if((value.age < 18)) errors.age = "სავალდებულო ასაკი 18 წელი ";

    /* if((value.gender !== "Female" || value.gender !== "Male")) errors.gender = "გთხოვთ მიუთითოთ სქესი"; */
    return errors
  } 
 
  return(
   <div className='registrationList'>
    <form onSubmit={handleSubmit}>
      <h1>დაამატე მომხარებელი</h1>

      <select onChange={handleChange} defaultValue={"Chose Gender"}>
        <option value={"Chose Gender"}>აირჩიეთ სქესი</option>
        <option name={"gender"} value={"Female"}>Female</option>
        <option name={"gender"} value={"Male"}>Male</option>
      </select>


      <div>
        <label>Name</label>
        <input type={"text"} name={"username"} placeholder={"Username"} value={formValues.username}  onChange={handleChange}  />
        {formErors.username && <p>{formErors.username}</p>}
      </div>
      
      <div>
        <label>Lastname</label>
        <input type={"text"} name={"lastname"} placeholder={"lastname"} value={formValues.lastname} onChange={handleChange}  />
        {formErors.lastname && <p>{formErors.lastname}</p>}
      </div>

      <div>
        <label>email</label>
        <input type={"text"} name={"email"} placeholder={"gmail.com"} value={formValues.email} onChange={handleChange}  />
        {formErors.email && <p>{formErors.email}</p>}
      </div>
      
      <div>
        <label>Age</label>
        <input type={"text"} name={"age"} placeholder={"age"} value={formValues.age} onChange={handleChange}  />
        {formErors.age && <p>{formErors.age}</p>}
      </div>
      {/* {new Map(Object.entries(formValues))} */}
      <button>subbmit</button>
      <p>{formValues.username} {formValues.lastname} {formValues.age} {formValues.email}</p>
    </form>
   </div>
  )
}

/* ვერ დავასრულე ბოლომდე */