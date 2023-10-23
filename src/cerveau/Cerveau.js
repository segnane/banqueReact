import axios from 'axios';
import { createContext ,useState } from 'react';
import Account from '../components/account';
// import { useHistory } from "react-router";
export const bankAPI=axios.create({
    baseURL:"http://localhost:8085"
}); //on met l adresse de l API a contacter pour nous l adresse est en local 

// fonction de recherche de compte 
export const getAccount=(accountId='',page=1,size=1)=>
{ return bankAPI.get('/account/'+accountId+'/pageOperation?page='+page+'&size='+size);

}
 export const getCustomers=(keyword='',page=1,size=1) => 
 {
    return  bankAPI.get('/customers?name_like='+keyword+'&_page='+page+'&_limit='+size);
 }

 export const deleteCustomer=(customer)=>
 {
    return   bankAPI.delete('/customers/'+ customer.id);
 }

 export const getCustomer=(id)=> 
 {
    return    bankAPI.get("/customers/"+ id );
 }
  export const saveCustomer=(customer)=>
  {
    //return     bankAPI.post(" /customers",{...customer}) ;
    return bankAPI.post("/customers",customer);
  }

  export const updateCustomer=(customer)=>
  {
    return bankAPI.put('/customers/'+customer.id,{name:customer.name,email:customer.email})
  }

  //le contexte permet de partager des donnees entre les differentes composants a travers l arbre des composants
  // sans avoir a passer manuellement des proprietes de parent a enfant a travers plusieurs niveaux de composants 

 export  const BankContext = createContext();
  //definir le context et l utiliser 
export const useCerveauContext=()=> {
const initialState={
    customers:[],
    currentPage:1,
    pageSize:1,
    keyword:'',
    totalPages:0
};
const cerveauState=useState(initialState);
return cerveauState;
}