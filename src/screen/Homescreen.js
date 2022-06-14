import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../Components/Room";
//import Error from "../Components/Error";
import moment from "moment";
import "antd/dist/antd.css";



// import { format } from 'date-fns'
// import { enGB } from 'date-fns/locale'
// import { DateRangePicker, START_DATE } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
//...


//import DatePicker from "react-datepicker";

// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import DatePicker from "react-modern-calendar-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import { DatePicker} from "antd";
const {RangePicker}=DatePicker


// import { DatePicker } from "react-date-range";






function Homescreen() {


  const [startDate, setStartDate] = useState()
  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  // const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [dulpicaterooms, setdulpicaterooms] = useState([]);

  console.log(rooms);
  useEffect(() => {
   filterByDate()
  }, [fromdate, todate])
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const { data } = await axios.get("/api/rooms/getallrooms");
        setrooms(data);
        setdulpicaterooms(data);
        setloading(false);
      } catch (error) {
        //seterror(true);
        console.log(error);
        setloading(false);
      }
    }

    fetchData();
  }, []);

  function filterByDate() {
    var temprooms = [];
    var availability = false;
    for (const room of dulpicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(fromdate, 'DD-MM-YYYY').isBetween(
              booking.fromdate,
              booking.todate
            )  &&
            !moment(todate, 'DD-MM-YYYY').isBetween(
              booking.fromdate,
              booking.todate
            ) 
          ) {
            if (
             fromdate !== booking.fromdate &&
              fromdate !== booking.todate &&
              todate !== booking.fromdate &&
              todate !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  }

  function filterBySearch() {
    const temprooms = dulpicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(temprooms);
  }

  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const temprooms = dulpicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(dulpicaterooms);
    }
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment().endOf('day').subtract(1, 'day');
  };

  const disabledEndDate = (current) => {
    // Can not select days before today and today
    return current && current <= moment(fromdate, 'DD-MM-YYYY').endOf('day').subtract(1, 'day');
  };

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
        {/* <DatePicker  showTime /> */}
         {/* <RangePicker format="DD-MM-YYYY" onChange={filterByDate} /> */}
        
         {/* <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      /> */}

<DatePicker
placeholder="Start date"
      format="DD-MM-YYYY"
      disabledDate={disabledDate}
      onChange={(dt) => {
        setfromdate(dt.format("DD-MM-YYYY"))
      }}
    />
<DatePicker
placeholder="End date"
      format="DD-MM-YYYY"
      disabledDate={disabledEndDate}
      onChange={(dt) => {
        settodate(dt.format("DD-MM-YYYY"))
      }}
    />

       

         </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux </option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading ..!</h1>
        ) : (
          rooms.map((room) => {
            console.log(room);
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
