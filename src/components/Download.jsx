import React from "react";
import DownloadAds from "./DownloadAds";

function Download() {
  return (
    <div className="flex flex-col items-center justify-start px-[5rem] bg-[#020917] h-[48rem] pt-[18rem] mt-[-10rem] relative z-[0] rounded-b-[5rem]" >
      {/* tild icon or path icon */}
      <img src={require("../img/Path 318.png")} alt="" className="w-[5rem]" id="about"/>
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem]" >
        <span>Choose The Best Hotel</span>
        <span>
          <b>Book Now!</b>
        </span>
        <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[1rem]">
        Looking for hassle free bus ticket bookings but ended up in long queues. Are you a travelling enthusiast but find difficulty in getting affordable flight tickets? Are you finding trouble in movie tickets and missing out on wonderful hotel bookings across Pakistan? Plus being a cricket lover is it hard for you to get tickets easily? This is where MANAWER steps in with online ticket booking in Pakistan and eliminates the need to stand in never-ending queues and chase travel agents that make travel a stressful thing. Bookme has the e-ticketing solution to all your ticketing problems. Now buy your tickets online at a discounted price and fix your spot. Moreover, we enable you to get cheap e-tickets with our in-app bundles.
        </span>
      </div>
      {/* dowload ads */}
      <div className="mt-14">
        <DownloadAds />
      </div>
    </div>
  );
}

export default Download;
