import { useState } from 'react'
import './account.css'
import { getAccount } from '../cerveau/Cerveau';
function Account ()
{ const [accountId,setAccountId]=useState('');
const [balance, setBalance] = useState(0);
const [searchText,setSearchText]=useState('');
const [details,setDetails]=useState({detail:'',data1:'',data2:''});


const handleSearchAccount=(accountId)=>{
    setDetails({data1:'D1',data2:'d2'});
    setSearchText(accountId);
   
    
}



return (
<div className="flex-container">
   <div className='half'>
 
   <form >
  <input type="text" name="search" placeholder="Identifiant du compte" value={searchText}
   onChange={(e)=>setSearchText(e.target.value)}>
    </input>
    <button onClick={()=>handleSearchAccount(searchText)}>Recherche</button>

</form>
{
    searchText && (
        <table>
            <thead>
                <tr>
                    <th>ID Compte</th>
                    <th>operationDate</th>
                    <th>amount</th>
                    <th>type</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{accountId}</td>
                    <td>{balance}</td>
                    <td>{details.data1}</td>
                    <td>{details.data2}</td>
                    
                </tr>
            </tbody>
        </table>
    )
}
   </div>

    <div className='half'>
         <form action="/action_page.php">
    <label htmlFor="fname">Amount</label>
    <input type="text" id="fname" name="firstname" placeholder="Mettez le montant"></input>

    <label htmlFor="lname">Description</label>
    <input type="text" id="lname" name="lastname" placeholder="les details de la transaction"></input>

    <label className="custom-checkbox">
        <input type="checkbox"></input>
        <span className="checkmark">Debit</span>

        <input type="checkbox"></input>
        <span className="checkmark">Credit</span>

        <input type="checkbox"></input>
        <span className="checkmark">Transfert</span>

        
        
    </label>
  
    <input type="submit" value="Submit" className='submit'></input>
  </form></div>
 
</div>

)
}
export default Account
