import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faCircle, faEdit, faHeart, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState ,useEffect, useContext} from 'react'
import { BankContext, deleteCustomer, getCustomer, getCustomers } from '../cerveau/Cerveau';
import './Customer.css'
import { getAdapter } from 'axios';
 
function Customer()
{
    const navigate =useNavigate();
    const [query ,setQuery]=useState('');
    const [state ,setState]=useContext(BankContext);
    useEffect(()=>{ handleGetCustomers(state.keyword,state.currentPage,state.pageSize);},[]);
    

    //creation de la fontion pour recuperer les customer 

  const  handleGetCustomers=(keyword,page,size)=>
  {
        getCustomers(keyword,page,size).then((resp)=>{
            //pour faire la pagination il faut recuperer le nombre total de customer
            const totalElement=resp.headers['x-total-count'];
            let totalPages=Math.floor(totalElement/size);
            if (totalElement%size!==0) ++totalPages;

            setState({...state,customers:resp.data,
                keyword:keyword,
                currentPage:page,
                pageSize:size,
                })
        }).catch((err)=>{
            console.log('erreur lors du chargement ', err);
        });
        
    }
        const handleDeleteCustomer=(customer)=>
        {
           //fonction de suppression des utilisateur
           deleteCustomer(customer).then((resp)=>{
            alert("Utilisateur "+customer.firstName+" "+customer.lastName +" a été supprimé");
        // handleGetCustomers();
            const newCustomers=state.customers.filter(c=>c.id!==customer.id);
            setState({...state,customers:newCustomers});
           })
        }

        const goToPage=(page)=>{
            handleGetCustomers(state.keyword,page,state.pageSize);

        };

        const handleSearch=(event)=>
        { event.preventDefault();
            handleGetCustomers(query,1,state.pageSize);
           
        }
const   handleCheckCustomer=(customer)=>
 {
     
 }
        return (
            
            <div className='p-1 m-1'>
            <div className='row'>
            <div className='col-md-6'>
                <div className='card'>
                <form onSubmit={handleSearch}>
                <div className='row g-2'>
                    <div className='col-auto'>
                        < input value={query} onChange={(e)=>setQuery(e.target.value)} className='form-control'></input>
                    </div>
                    <div className='col-auto'>
                        <button className='btn btn-success'>Search</button>
                    </div>
                </div>
               
            </form>
                </div>
            <div className='card'> 
            
                <div className='card-body'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                       
                    </tr>
                    </thead>
                   <tbody>
                    {
                       state.customers.map((customer)=>(
                            
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>
                                    <button onClick={()=>handleCheckCustomer(customer)} className='btn btn-outline-success'>
                                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                    </button>
                                </td>
                                <td >
                                    <button onClick={()=>handleDeleteCustomer(customer)} className='btn btn-danger'>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>  
                                    </button>
                                </td>
                              <td>
                                <button onClick={() => navigate('/editProduits/'+customer.id)}  className='btn btn-outline-success'>
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button></td>  
                            </tr>
                        ))
                    }
                   </tbody>
                </table>
                <ul  className='nav nav-pills'>
                    {
                        new Array(state.totalPages).fill(0).map((v,index)=>(
                            <li key={index}>
                                <button onClick={()=>goToPage(index+1)} className='btn btn-info m-2'>{index +1}</button>
                            </li>
                        ))   
                    }  
                    </ul> 
                </div>
                </div>
            </div>
            </div>
               
            </div>
        )
                }
    
export default Customer