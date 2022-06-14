import React from 'react'

function Adminscreen() {

const [bookings,setbookings]=useState([]);
const [loading, setloading] = useState(true);

useEffect(() => {
    if(!localStorage.getItem('currentUser')){
        window.location.href='/login'
     }
     async function fetchData() {
       try {
         setloading(true);
         const { data } = await axios.post("/api/bookings/getallbookings");
         
         setbookings(data);
         setloading(false);
       } catch (error) {
         console.log(error);
         setloading(false);
       }
     }
 
     fetchData();
}, [])


  return (
    <div>
        <h1>All bookings</h1>
        <div>
                <b>
                <p>
                    id :
                  </p>
                  <p>
                    Name :
                  </p>
                  <p>From Date :{fd}</p>
                  <p>To Date :{td}</p>
                  <p>Max Count :{room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Ammount</h1>
                <hr />
                <b>
                  <p>Total Days :{totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total amount :: {totalamount}</p>
                </b>
              </div></div>
    
  )
}

export default Adminscreen

export function Rooms() {

const [rooms,setrooms]=useState([]);
const [loading, setloading] = useState(true);

useEffect(() => {
    if(!localStorage.getItem('currentUser')){
        window.location.href='/login'
     }
     async function fetchData() {
       try {
         setloading(true);
         const { data } = await axios.post("/api/rooms/getallrooms");
         
         setrooms(data);
         setloading(false);
       } catch (error) {
         console.log(error);
         setloading(false);
       }
     }
 
     fetchData();
}, []);
    return (
      <div>
       <h1>My Rooms</h1>

      </div>
    );
  }
  
  



