import React,{useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
function Registerscreen() {
    const[name,setname]=useState('')
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[cpassword,setcpassword]=useState('')
 

 async function register(){
         
    if(password===cpassword){
        const user={
            name,
            email,
            password,
            cpassword

        }
        try {
            const result=await (await axios.post('api/users/register',user)).data
            Swal.fire("Congrats", "User registered successfully.", "success").then(
                (result) => {
                    window.location.reload();
                })
        } catch (error) {
            console.log(error);
            Swal.fire("Oops", "Something went wrong.", "error");
        }
    }
    else{
        alert('password not matched.')
    }

 }





  return (
   <div>
   <div className='row justify-content-center mt-5'>
        <div className="col-md-5">
            <div className='bs'>
                <h1>Registration</h1>
                <input type='text' className='form-control' placeholder='name'
                 value={name}  onChange={(e)=>{setname(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='email'
                 value={email}  onChange={(e)=>{setemail(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='password'
                 value={password}  onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type='text' className='form-control' placeholder='confirm'
                 value={cpassword}  onChange={(e)=>{setcpassword(e.target.value)}}/>
                <div className='row'> 
                <div className="col-md-13">
                 <button className='btn btn-primary mt-3' style={{ float: "right" }} onClick={register}>Register</button>
                 
                 <Link to={`/login`}>
                 <button className='btn btn-primary mt-3' >Login</button>
            </Link>
                 
                 </div>
                 </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Registerscreen