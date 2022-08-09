import './App.css';
import React from 'react';

function App() {
  return (
      <Wrapper >

        <Child />
      
      </Wrapper>
  );
}

export default App;

const users = [
  {
    name: "Woody",
    lastName: " Harrelson ",
    age: 20,
    id: 1
  },
  {
    name: "Ryan",
    lastName: " Reynolds ",
    age: 24,
    id: 2
  },
  {
    name: "Blake",
    lastName: " Lively ",
    age: 26,
    id: 3
  },
];

const Parent = () => {
  return (
    <React.Fragment>
      <div className='usersArray'>
      {users.map(user => {
          const {name, lastName, age, id} = user;
          return(
            <React.Fragment key={id}>
              <p>{name}{lastName}<br></br> age: {age}</p>
            </React.Fragment>
          )
        })
      }
      </div>
    </React.Fragment>
  )
};

const Child = (isUserLoggedIn) => {
  isUserLoggedIn = true
    return(
      <div className='ifLoggedIn'>
        {isUserLoggedIn ? <Parent /> : "You are not authorized to see user list"}
        {users.length === 0 && "no users in the system."} 
      </div>
    )
};

const Wrapper = (prop) => {
  return (
    <div className='wrapper' style={{color: "dodgerblue", backgroundColor: "black", fontSize:"25px", height: "100vh"}}>
      <Navbar />
      {prop.children}
      <Footer />
    </div>
  )
};

const Navbar = () => {
  return (
    <div className='navBar' style={{color: "red"}}>
      <p>Navbar</p>
    </div>
  )
};


const Footer = () => {
  return (
    <div className='footer' style={{color: "red"}}>
      <p>Footer</p>
    </div>
  )
};


/*

2) შექმენით Wrapper,Navbar და Footer კომპონენტები. Navbar-ში და Footer-ში შეგიძლია უბრალოდ ტექსტიც გამოიტანოთ. Wrapper კომპონენტმა უნდა დაარენდეროს Navbar და Footer კომპონენტები, 
ხოლო მათ შორის ყველა children,რომელსაც Wrapper-ი მიიღებს. გამოიყენეთ Wrapper კომპონენტი ისე,რომ აპლიკაციაში ნებისმიერ ადგილას დამატებული კომპონენტი მოქცეული იყოს 
navbar-სა და footer-ს შორის.

1) შექმენით ორი კომპონენტი Parent და Child(სახელები შეგიძლიათ შეცვალოთ):
Parent კომპონენტმა უნდა ჩააწოდოს Child კომპონენტს იუზერების მასივი( ობიექტების მასივი, სადაც თითოეული ობიექტი შეიცავს იუზერის სახელს,ასაკს,გვარს და აიდის), 
თუმცა მასივი შეიძლება ცარიელი იყოს.ასევე Child კომპონენტმა უნდა მიიღოს მეორე boolean prop-ი: isUserLoggedIn.
თუ იუზერი დალოგინებულია(isUserLoggedIn=true) Child კომპონენტმა უნდა დაარენდეროს იუზერების შესახებ ინფორმაცია(სახელი,გვარი ასაკი) თუ იუზერი არ არის დალოგინებული 
Child კომპონენტმა უნდა გამოიტანოს ტექსტი:you are not authorized to see user list.
ხოლო თუ იუზერების მასივი ცარიელია უნდა გამოიტანოს ტექსტი: no users in the system.
 */

