import { useEffect, useState } from 'react';

const useForm = () => {
    const initialValues = {firstName:"", lastName:"", age:""};
    const [formValue, setFormValue] = useState(initialValues);
    const [formErors,setFormErors] = useState({});
    const [formValid, isFormValid] = useState(false);
    const [saveUser,setSaveUsers] = useState([])
    const [isSubmit,setSubmit] = useState(false);
  
    const onInputChange = (e) => {
      const {name,value} = e.target;
      setFormValue({...formValue,[name]:value})
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(isSubmit){
        console.log("shemovida", formValid)
        const randomId = new Date().valueOf()
        setSaveUsers(prevUsers => {
          return [...prevUsers, {...formValue, id:randomId}]
        })
      }
      setFormValue(initialValues)
      setSubmit(false)
    }
  
    useEffect(() => {
      const timer = setTimeout(() => {
        console.log("in timer")
        setFormValue(formValue)
      }, 5000);
      return () => clearTimeout(timer);
    }, [formValue]);
  
    const validations = (value) => {
      const errors = {};
      if(value.firstName && value.firstName.length < 4) errors.firstName = "სახელი უნდა შეიცავდეს მინუმუ 4 ასოს";
      if(value.lastName && value.lastName.length < 4) errors.lastName = "გვარი უნდა შეიცავდეს მინიმუ 4 ასოს";
      if(value.age && value.age <= 18) errors.age = "ასაკი უნდა აღემატებოდეს 18 წელს ";
      return errors;
    }
  
    useEffect(()=>{
      setFormErors(validations(formValue))
    },[formValue])
  
    useEffect(() => {
      const ValidResults = validations(formValue)
      setFormErors(ValidResults)
      if(
        formValue.firstName && 
        !ValidResults.firstName && 
        formValue.lastName && 
        !ValidResults.lastName &&
        formValue.age && 
        !ValidResults.age
        ){
          isFormValid(true)
        }else{
          isFormValid(false)
        }
    },[formValue])
  
    return (
      {formValue,formErors,formValid,saveUser,handleSubmit,onInputChange,setSubmit}
    );
}

export default useForm

  {/* <div className="formValues">
  
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label> 
            <input type={"text"} name="firstName" placeholder='Enter your Name' value={formValue.firstName} onChange={onInputChange} />
            {formErors.firstName && <p className='errorColor' >{formErors.firstName}</p>}
          </div>
  
          <div>
            <label>lastname</label>
            <input type="text" name="lastName" placeholder='Eneter your Lastname' value={formValue.lastName} onChange={onInputChange} />
            {formErors.lastName && <p className='errorColor'>{formErors.lastName}</p>}
          </div>
  
          <div>
            <label>age</label>
            <input type={"number"} name={"age"} placeholder={"Enter your Age"} value={formValue.age} onChange={onInputChange}  />
            {formErors.age && <p className='errorColor' >{formErors.age}</p>}
          </div>
          <button onClick={() => setSubmit(true)} disabled={!formValid}>subbmit</button>
        </form>
      </div> */}