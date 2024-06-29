"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TitleText, ExploreCard, TypingText } from "../components";
import { staggerContainer } from "../utils/motion";
import { exploreWorlds } from "../constants";
import { Input } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const Explore = () => {

  const [name, setName] = useState("");
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="paddings" id="explore">
      <motion.div
        variants={staggerContainer(0.25, 0.25)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="innerWidth mx-auto flex flex-col"
      >
        <TypingText title="| Enter Your World" textStyles="text-center" />
        <TitleText
          title={
            <>
              Explore your world of self-reflection and guidance
            </>
          }
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70wh] gap-5">
          <Input
            key={"secondary"}
            type="text"
            color={"secondary"}
            label="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          // className="max-w-[220px]"
          />
          <DatePicker
            color={"secondary"}
            label="Birth Date"
            variant="flat"
            showMonthAndYearPickers
            onChange={(e) => {
              setDate(e.day)
              setMonth(e.month)
              setYear(e.year)
            }}
          />
        </div>
          <Button
            style={{marginTop: '15px'}}
            isLoading={isLoading} 
            color="secondary"
            onPress={(e)=>setIsLoading(!isLoading)}
            // spinner={
            //   <svg
            //     className="animate-spin h-5 w-5 text-current"
            //     fill="none"
            //     viewBox="0 0 24 24"
            //     xmlns="http://www.w3.org/2000/svg"
            //   >
            //     <circle
            //       className="opacity-25"
            //       cx="12"
            //       cy="12"
            //       r="10"
            //       stroke="currentColor"
            //       strokeWidth="4"
            //     />
            //     <path
            //       className="opacity-75"
            //       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            //       fill="currentColor"
            //     />
            //   </svg>
            // }
          >
            Submit
          </Button>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70wh] gap-5">
        </div>
        {/* <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70wh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
            key={world.title}
            {...world}
            active={active}
            index={index}
            handleClick={setActive}
            />
          ))}
        </div> */}
      </motion.div>
    </section>
  );
};

export default Explore;
