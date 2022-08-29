import './App.css';
import useForm from './useForm';

function App() {
  const {formValue,formErors,formValid,saveUser,handleSubmit,onInputChange,setSubmit} = useForm()
  return (
    <div className="formValues">
  
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

        {saveUser.map(user => {
          const {firstName,lastName,age,id} = user;
          return(
            <p key={id}>{<span className='infoColor'>სახელი:</span>} {firstName}{<span className='infoColor'> გვარი:</span>}
            {lastName} {<span className='infoColor'>ასაკი:</span>} {age} </p>
          )
        })}
        
    </div> 
  )
}

export default App;
