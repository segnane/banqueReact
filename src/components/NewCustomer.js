import React, { useState } from 'react';
 import { saveCustomer } from '../cerveau/Cerveau';
 import { useNavigate} from 'react-router-dom';
import './newCustomer.css'
function NewCustomer()
 {
    const navigate= useNavigate();
    const [id,setId]=useState(0);
    const[name,setName] = useState("");
    const[email ,setEmail ]=useState("") ;

     //function de sauvegarde de nouveau client

    const handleSaveCustomer=(event)=>
    { 
        event.preventDefault();
        let customer={name,email};
        saveCustomer(customer).then((resp)=>{
            alert(JSON.stringify(resp.data));
        });
navigate('/customers')
    };
return (
    <div>
        <form onSubmit={handleSaveCustomer}>
        <div>
        <label className='form-label'>Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} className='form-control'></input>
        </div>

          <div>
          <label className='form-label'>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control'></input>

          </div>
          <button className='btn btn-success'>Save</button>
        </form>
     </div>
    ) 
    }

 export default NewCustomer