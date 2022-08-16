import React, { useEffect, useState } from 'react'
import './App.css';

function  TaskTwo () {
    const [user, setState] = useState([])
    useEffect(()=> {
        setState(user)
    },[user])

    const addUser = () => {
        const name = [...user,randomName()]
        setState(name)
    }

    const randomName = () => {
        const usersArray = [" თორნიკე "," სალომე "," ვახო "," ირაკლი "," ანი "," ბექა" ," გიორგი "," საბა "," მაგდა "," ოთო ","ნინი"]
             const randomIndex = Math.floor(Math.random() * usersArray.length);
             const randomeName = usersArray.filter((_, index)=> index === randomIndex);
             const generateRandomAge = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
             const randomId = new Date().valueOf()
           return( 
           <ul key={randomId}>
            <li> {randomeName} არის {generateRandomAge} წლის.. {<button>Update</button>}  {<button onClick={()=>{}}>delete</button>} { console.log(randomeName,randomId, user)  } </li>
           </ul>
           )
       }; 
      
  return (
    <div className='main'>
        <div>{user}</div>
        <button onClick={addUser}> add </button>
    </div>
  )
}

export default TaskTwo

/* ბოლომდე ვერ დავასრულე */