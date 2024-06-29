"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypingText } from "../components";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className="paddings relative z-10">
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer(0.25, 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="innerWidth mx-auto flexCenter flex-col"
    >
      <TypingText title="| About House of Numbers" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        The <span className="font-extrabold text-white">House of Numbers</span> is based on numerology and insights provided in this app are 
        based on the Vedic science of numbers, planets, and their characteristics. It will provide you insights into 
        your life, including aspects of your future life, career, relationships, and more. While we strive to offer 
        accurate and insightful information, it is important to keep an&nbsp;<span className="font-extrabold text-white">open mind</span> and not to worry if certain aspects 
        do not align with your personal characteristics. <br/>
        Numerology is a tool for self-reflection and guidance, &nbsp;<span className="font-extrabold text-white">not a definitive predictor of your future or personality</span>.&nbsp;
      </motion.p>
      <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
        <Link href="#explore">
          <Image
            src="/arrow-down.svg"
            width={18}
            height={28}
            alt="arrow down"
            className="object-contain mt-[28px]"
          />
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default About;
