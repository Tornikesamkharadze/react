import './App.css';
import { useEffect, useState } from 'react';

function App() {
const [user, setState] = useState()

useEffect(() => {
    setState(generateUsers(usersArray))
},[usersArray.length])

const removeName = () => {
  setState(removeRandomName(usersArray))
  console.log(user)
}  

return (
    <div className="App">
      {/* <h1 className='title'>დარჩენილია {usersArray.length} იუზერი</h1> */}
      <title>დარჩენილია {usersArray.length} იუზერი</title>
      <div>{user}</div>
      <button className='remove' onClick={removeName}>Remove user</button>
    </div>
  );
}
export default App;

const usersArray = [
 {name:"თორნიკე",id: 1,},
 {name: "სალომე",id: 2,},
 {name:"ვახო",id: 3,},
 {name:"ირაკლი",id: 4,},
 {name:"ანი",id: 5,},
 {name:"ბექა",id: 6,},
 {name: "გიორგი",id: 7,},
 {name: "საბა",id: 8,},
 {name:"მაგდა",id: 9,},
 {name:"ოთო",id: 10,}
]

const generateUsers = (array) => {
  return array.map(users =>{
    const {name,id} = users
    return (<p key={id}>{name}</p>)
  })
} 

const removeRandomName = (array) => {
   if(array.length > 0){
      const random = Math.floor(Math.random() * array.length);
      array.splice(random, 1);
   }
};