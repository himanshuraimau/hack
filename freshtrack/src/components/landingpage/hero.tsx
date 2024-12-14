"use client";
import Link from 'next/link'
import Image from 'next/image'
import {motion} from 'framer-motion'

export default function Hero() {
  return (
    <motion.div className="text-white"  initial={{ backgroundColor: "#0b1d35" }}
    animate={{ backgroundColor: "#0f6a92" }}
    transition={{ duration: 5 , repeat: Infinity}}>
      <div className="max-w-10xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
            
          <motion.div className=" mb-8 lg:mb-0 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}>
            <Image
              src="/supplyone.jpeg"
              alt="Supply Chain Management"
              width={900}
              height={600}
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div className=" lg:pl-32"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 2 }}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Revolutionize Your Supply Chain
            </h1>
            <p className="mt-6 text-xl max-w-3xl">
              Freshtrack provides real-time monitoring and tracking for your entire supply chain. Ensure product quality and optimize logistics with our cutting-edge technology.
            </p>
            <div className="mt-10">
              <Link href="/signup" className="bg-white text-blue-600 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-md text-lg font-medium">
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

