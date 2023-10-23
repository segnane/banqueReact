import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import NewCustomer from './components/NewCustomer';
import Account from './components/account';
import { BankContext,useCerveauContext } from './cerveau/Cerveau';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
function App() {
  //creation des routes 
  const [currentRoute,setCurrentRoute]=useState();
  useEffect(()=>{
    const path=window.location.pathname.toLocaleLowerCase();
    setCurrentRoute(path.slice(1,path.length))
  },[])
  return (
    <BankContext.Provider value={useCerveauContext()}>
      <BrowserRouter>
      <div className='col m-4'>
        
      <nav className='navapp'>

<ul className="horizontal">
<li>
<Link onClick={()=>setCurrentRoute("home")} 
className={currentRoute === "home" ? 'active' :''}  to="/home">
  Home</Link>
</li>

  <li>
  <Link onClick={()=>setCurrentRoute("customers")} 
className={currentRoute==="customers" ? 'active' :''} to={"/customers"}>
Customers</Link></li>


<li>
<Link onClick={()=>setCurrentRoute("newCustomer")} 
className={currentRoute==="newCustomer" ? 'active' :''} to={"/newCustomer"}>
  New Customers</Link>
</li>
<li>
<Link onClick={()=>setCurrentRoute("account")} 
className={currentRoute==="accounts" ? 'active' :''} to={"/account"}>
  Account</Link>
</li>
</ul>
</nav>
      </div>

<Routes>
  <Route path="/customers" element={<Customer/>}></Route>
  <Route path="/Home" element={<Customer/>}></Route>
  <Route path="/newCustomer" element={<NewCustomer/>}></Route>
  <Route path="/account" element={<Account/>}></Route>
  <Route path="" element={<Customer/>}></Route>
</Routes>
      </BrowserRouter>
    </BankContext.Provider>
     
   
  );
}

export default App;
