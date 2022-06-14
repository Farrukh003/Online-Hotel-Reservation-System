import React from "react";
import Feature from "./Feature";

function Experience() {
  return (
    <div className="experience flex flex-col items-center justify-start px-[5rem] bg-[#020917] h-[60rem] pt-[18rem] mt-[-10rem] relative z-[2] rounded-b-[5rem]">
      {/* titld icon */}
      <img src={require("../img/Path 318.png")} alt="" className="w-[5rem]" />
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem]">
        <span>An Amazing Application Can Change Your Daily Life Travels and Journies</span>
        <span>
          <b>Online Experience</b>
        </span>
      </div>
      {/* features  */}
      <div className="feature flex items-center justify-around mt-[6rem] w-[100%]">
        <Feature icon="Hotel@3x-8" title="Hotels" content="MANAWER offers an extensive range of Hotels and resorts available to fit for any occasion and budget. The procedure for booking online hotels from Bookme is as simple as having a piece of cake."/>
        <Feature icon="Payment@3x-8" title="Easy Payment" content="However, you may be contemplating whether it is authentic or not. MANAWER provides reliability to its customers by ensuring quality service of booking hotels online."/>
        <Feature icon="Quality@3x-8" title="Quality" content="While you are planning your trip, booking a hotel online is a rigorous task to do. But MANAWER makes it easy for you because we have a pool of options to book your hotel online."/>
      </div>
    </div>
  );
}

export default Experience;
