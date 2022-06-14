import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
//import Error from "../Components/Error";
import Swal from "sweetalert2";
import { Tag } from "antd";
const { TabPane } = Tabs;
function Profilescreen() {
  
  let user;
  try {
    user = JSON.parse(localStorage.getItem("currentUser"));
  } catch (error) {
    window.location.href = "/login";
  }

  if (!user) {
    console.log("User does not exist?")
    window.location.href = "/login";
  }
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
         <div className="bs-lite">
          <h1>My Profile</h1>
          <br />
          <h2>Name:{user.name}</h2>
          <h2>Email:{user.email}</h2>
          <h2>isAdmin:{user.isAdmin ? "Yes" : "No"}</h2>
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Mybookings />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Profilescreen;

export function Mybookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setbookings] = useState([]);



useEffect(() => {

   
    async function fetchData() {
      try {

        const {data} = (
                await axios.post("/api/bookings/getbookingsbyuserid/", {
                  userid: user._id,
                })
              );

        setbookings(data);
        console.log(data)
      } catch (error) {

        console.log(error);

      }
    }

    fetchData();
  }, []);





  async function cancelBooking(bookingid, roomid) {
    try {
      const result = await (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      Swal.fire("Congrats", "Your booking has been cancelled", "success").then(
        (result) => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong.", "error");
    }
  }




  return (
    <div>
      <div className="row">
        <div className="col-mmd-6">
          {bookings &&
            bookings.map((bookings) => {
              return (
                <div className="bs-lite">
                  <h1>{bookings.room}</h1>
                  <p>
                    <b>BookingId</b>:{bookings._id}
                  </p>
                  <p>
                    <b>CheckIn</b>:{bookings.fromdate}
                  </p>
                  <p>
                    <b>CheckOut</b>:{bookings.todate}
                  </p>
                  <p>
                    <b>Amount</b>:{bookings.totalamount}
                  </p>
                  <p>
                    <b>Status</b>:
                    {bookings.status == "cancelled" ? (
                      <Tag color="red">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>
                  {bookings.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(bookings._id, bookings.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

