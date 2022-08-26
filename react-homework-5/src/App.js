import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Validations/>
    </div>
  );
}

export default App;


function Validations () {
  const initialValues = {firstName:"", lastName:"", email:"", age:"",  sex:""};
  const [formValues,setFormValues] = useState(initialValues)
  const [formErors,setFormErors] = useState({})
  const [userList,setUsers] = useState([])
  const [isSubmit,setSubmit] = useState(false)
  const [formValid, isFormValid] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value})
  }

  useEffect(()=> {
    setFormErors(validate(formValues));
  },[formValues])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isSubmit){
      await axios.put(`http://localhost:3001/users/${formValues.id}`,formValues);
    }else{
    await axios.post("http://localhost:3001/users/",formValues);
    };
    const {data} = await axios.get("http://localhost:3001/users/");
    setUsers(data.data)

    setFormValues(initialValues);
    setSubmit(false);
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3001/users");
      setUsers(data.data)
    }
    getData()
  },[])

  console.log(userList,"topLvl LOG")

  useEffect(() => {
    const ValidResults = validate(formValues)
    setFormErors(ValidResults)
    if(
      formValues.firstName && 
      !ValidResults.firstName && 
      formValues.lastName && 
      !ValidResults.lastName &&
      formValues.age && 
      !ValidResults.age &&
      formValues.email && 
      !ValidResults.email
      ){
        isFormValid(true)
      }else{
        isFormValid(false)
      }
  },[formValues])

  const validate = (value) => {
    const errors = {};
    if(value.firstName && value.firstName.length < 4) errors.firstName = "სახელი უნდა შეიცავდეს მინუმუ 4 ასოს";
    if(value.lastName && value.lastName.length < 4) errors.lastName = "გვარი უნდა შეიცავდეს მინიმუ 4 ასოს";
    if(value.email && !(value.email.includes("@gmail.com"))) errors.email = "იმეილი უნდა მოიცავდეს @gmail.com";
    if(value.age && value.age < 19) errors.age = "ასაკი უნდა აღემატებოდეს 18 წელს ";
   /*  if(value.sex === "აირჩიეთ სქესი" && (value.sex !== "Female" || value.sex !== "Male")) errors.sex = "გთხოვთ მიუთითოთ სქესი"; */
    return errors
  } 


  const removeUser = async (id) =>{
    await axios.delete(`http://localhost:3001/users/${id}`);
    const {data} = await axios.get("http://localhost:3001/users")
    
    setUsers(data.data)
};

  const update = (userId) => {
    const user = userList.find((user) => user._id === userId)
    setFormValues({
      firstName:user.firstName,
      lastName:user.lastName ,
      email:user.email,
      age:user.age,
      sex:user.sex,
      id:userId
    })
  }

  return(
   <div className='registrationList'>
    <form onSubmit={handleSubmit}>
      <h1>დაამატე მომხარებელი</h1>

      <select onChange={handleChange} name={"sex"} defaultValue={"აირჩიეთ სქესი"}>
        <option value={"აირჩიეთ სქესი"}>აირჩიეთ სქესი</option>
        <option value={"Female"}>Female</option>
        <option value={"Male"}>Male</option>
     
      </select>
      {formErors.sex && <p className='errorColor' >{formErors.sex}</p>}
    
      <div>
        <label>Name</label>
        <input type={"text"} name={"firstName"} placeholder={"Username"} value={formValues.firstName}  onChange={handleChange}  />
        {formErors.firstName && <p className='errorColor' >{formErors.firstName}</p>}
      </div>
      
      <div>
        <label>Lastname</label>
        <input type={"text"} name={"lastName"} placeholder={"lastname"} value={formValues.lastName} onChange={handleChange}  />
        {formErors.lastName && <p className='errorColor' >{formErors.lastName}</p>}
      </div>

      <div>
        <label>mail</label>
        <input type={"text"} name={"email"} placeholder={"@gmail.com"} value={formValues.email} onChange={handleChange}  />
        {formErors.email && <p className='errorColor' >{formErors.email}</p>}
      </div>
      
      <div>
        <label>Age</label>
        <input type={"text"} name={"age"} placeholder={"age"} value={formValues.age} onChange={handleChange}  />
        {formErors.age && <p className='errorColor' >{formErors.age}</p>}
      </div>
      <button disabled={!formValid}>subbmit</button>
    </form>
    {userList.map(user => {
      const {firstName,lastName,email,age,_id} = user;
      return (
        <div key={_id}>
            <p>{<span className='infoColor'>სახელი:</span>} {firstName}{<span className='infoColor'> გვარი:</span>}
             {lastName} {<span className='infoColor'>ასაკი:</span>} {age} {<span className='infoColor'> იმეილი </span>} {email}</p>
            <button onClick={()=> {
            update(_id);
            setSubmit(true)
            }}>Update</button>
            <button onClick={()=> removeUser(_id) }>Delete</button>
        </div>
      )
    })}

   </div>
  )
}
