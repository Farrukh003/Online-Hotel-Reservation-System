import React, { useState, useEffect } from "react";
import axios from "axios";
//import match from 'nodemon/lib/monitor/match';
import Room from "../Components/Room";
import { useParams } from "react-router-dom";
import Error from "../Components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from 'sweetalert2'

function Bookingscreen({ match }) {
  const [room, setroom] = useState();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const { roomid,fromdate: fd,todate: td } = useParams();
  console.log(roomid)

  //console.log(match)
  // const roomid = match.params.roomid;
  const fromdate = moment(fd, "DD-MM-YYYY");
  const todate = moment(td, "DD-MM-YYYY");

  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  console.log(roomid);

  console.log(room);
  useEffect(() => {

    if(!localStorage.getItem('currentUser')){
       window.location.href='/login'
    }
    async function fetchData() {
      try {
        setloading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", {
          roomid: roomid,
        });
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }

    fetchData();
  }, []);



async function onToken(token){
  console.log(token)
  const bookingDetails = {
    room,
    userid: JSON.parse(localStorage.getItem(`currentUser`))._id,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token
  };
  try {
    const result = (await axios.post("/api/bookings/bookroom", bookingDetails)).data;
    Swal.fire('Congratulations','Your room booked successfully.','success').then(result=>{
      window.location.href='/Mybookings'
    })
  } catch (error) {
    Swal.fire('OOps','Something went wrong.','error')
  }
}


  return (
    <div className="m-5">
      {loading ? (
        <h1>Loading...!</h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h2>{room.name}</h2>
              <img src={room?.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6" style={{ textAlign: "right" }}>
              <h3>Booking details</h3>
              <hr />
              <div>
                <b>
                  <p>
                    Name :{JSON.parse(localStorage.getItem("currentUser")).name}
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
              </div>
              <div style={{ float: "right" }}>
               
              </div>

              <StripeCheckout
                amount={totalamount * 100}
                token={onToken}
                currency= 'PKR'
                stripeKey="pk_test_51L485AIEUa9nLZpFMGIlwPrReT0qRQ303FSiZp03lWBsBSA3OAZ31m7qDz6Xwe9M3FV6V0jaBDS4eEMI5Rv1lgXT00VliGQJ4T"
              >
                <button className="btn btn-primary" >
                  Pay Now{" "}
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
