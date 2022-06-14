import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
//import res from 'express/lib/response'
function Login() {

    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

 

 async function login(){
         
    
        const user={
            email,
            password
        }
        try {
            const result=(await axios.post('api/users/login',user)).data
            localStorage.setItem("currentUser", JSON.stringify(result))

            Swal.fire("Congrats", "Logged In successfully.", "success").then(
                (result) => {
                    window.location.href='/profile'
                }
              );
            }


        catch (error) {
            console.log(error);
            Swal.fire("Oops", "Something went wrong.", "error");
        }
 
 }





  return (
   <div>
       
   <div className='row justify-content-center mt-5'>

        <div className="col-md-5">
            <div className='bs'>
                <h1>Login</h1>
             
                <input type='text' className='form-control' placeholder='email'
                 value={email}  onChange={(e)=>{setemail(e.target.value)}}/>
                <input type='password' className='form-control' placeholder='password'
                 value={password}  onChange={(e)=>{setpassword(e.target.value)}}/>
              
                <div className='row justify-content-center'>
                 <button className='btn btn-primary mt-3' onClick={login}>Login</button>
                 </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login