"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StartSteps, TitleText, TypingText } from "../components";
import { fadeIn, planetVariants, staggerContainer, zoomIn } from "../utils/motion";
import { Input } from "@nextui-org/input";
import { DatePicker, getKeyValue } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { report } from './report';
import './Grid.css';
import { startingFeatures } from "../constants";

interface ReportData {
  name: String;
  dob: any;
  sunSign: any;
  mulank: number;
  bhagyank: number;
  luckyDates: any;
  luckyYears: any;
  nameNumber: number;
  lifeGrid: Array<any>;
  traits: any
}


const Explore = () => {

  const [name, setName] = useState("");
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [table, setTable] = useState<ReportData | null>(null);

  const Grid = () => {
    return (
      <div className="grid-container">
        {table && table.lifeGrid.map((x: any, index: number) => (
          <div key={index} className="grid-item">
            <h2 className="text-center">{x === "" ? 'X' : x}</h2>
          </div>
        ))}
      </div>
    );
  };


  const generateReport = () => {
    setTable(null);
    if (!name || (!date && !year && !month)) {
      setError("Add Proper inputs to generate your report!");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      let data = report({ name, date, month, year });
      setTable(data);
      setIsLoading(false);
    }, 2000);

  }

  return (
    <>
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
              label="Enter Your Full Name"
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
            style={{ marginTop: '15px' }}
            isLoading={isLoading}
            color="secondary"
            onPress={(e) => generateReport()}
          >
            Submit
          </Button>
        </motion.div>
      </section>
      {error && <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[16px] text-center text-secondary-white">
        <span className="font-extrabold text-danger">{error}</span>
      </motion.p>
      }
      {table && <>
        <section className="paddings relative z-10">
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex flex-col"
            style={{ marginBottom: '15px' }}
          >
            <TypingText title="| Your Insights" textStyles="text-center" />
          </motion.div>
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex lg:flex-row flex-col gap-6"
          >
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="relative flex-1 flexCenter"
            >
              <Image
                src={"/" + table.sunSign + ".png"}
                width={500}
                height={500}
                priority={true}
                alt="planet-09"
                style={{ overflow: "visible" }}
                className="w-full lg:w-[610px] lg:h-[610px] h-auto min-h-[210px] object-cover rounded-[40px]"
              />
            </motion.div>
          </motion.div>
        </section>

        <section className="paddings relative z-10">
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex lg:flex-row flex-col gap-8"
          >
            <motion.div
              variants={planetVariants("left")}
              className="flex-1 flexCenter"
            >
              <Image
                src={"/" + table.traits.element + ".png"}
                width={1000}
                height={1000}
                alt="get-started"
                priority={true}
                className="w-[90%] h-[90%] object-contain"
              />
            </motion.div>
            <motion.div
              variants={fadeIn("left", "tween", 0.2, 1)}
              className="flex-[0.75] flex justify-center flex-col"
            >
              <TypingText title="| Common Personality Traits" />
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                “{table.traits.meaning}”
              </p>
              <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
                {table.traits.traits.map((x: any, index: number) => (
                  <StartSteps key={x} number={index + 1} text={x} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="paddings">
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex flex-col"
            style={{ marginBottom: '15px' }}
          >
            <TypingText title="| Life Path Grid" textStyles="text-center" />
          </motion.div>
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex flex-col"
          >
            <Grid />
          </motion.div>
        </section>

        {/* <section className="paddings relative z-10">
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex flex-col"
            style={{ marginBottom: '15px' }}
          >
            <TypingText title="| Your Insights" textStyles="text-center" />
          </motion.div>
          <motion.div
            variants={staggerContainer(0.25, 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="innerWidth mx-auto flex lg:flex-row flex-col gap-6"
          >
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
            <motion.div
              variants={fadeIn("right", "tween", 0.2, 1)}
              className="flex-[0.5] lg:max-w-[370px] flex justify-end flex-col gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6A6A6A] relative"
            >
              <div className="feedback-gradient" />
              <div>
                <h4 className="font-bold sm:text-[32px] text-[26px] sm:leading-[40px] leading-[36px] text-white">
                  {table?.name}
                </h4>
                <p className="mt-[8px] font-normal sm:text-[18px] text-[12px] sm:leading-[22px] leading-[16px] text-white">
                  {table.dob}
                </p>
              </div>
              <p className="mt-[24px] font-normal sm:text-[24px] text-[18px] sm:leading-[45px] leading-[39px] text-white">
                Sun Sign: {table.sunSign}<br />
                Mulank: {table.mulank}<br />
                Bhagyank: {table.bhagyank}<br />
                Name Number: {table.nameNumber}<br />
                Lucky Dates: {table.luckyDates}<br />
                Lucky Years: {table.luckyYears}
              </p>
            </motion.div>
          </motion.div>
        </section> */}
      </>
      }
    </>
  );
};

export default Explore;
