"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./BackgroundChanger.module.css"

const backgrounds = [
  "https://www.sampurna-group.com/assets/img/logo-pt-alam-sampurna-makmur.jpg",
  "https://sampurna-group.com/assets/img/dumptruck-di-pool-rumpin-nca.jpg",
  "https://www.sampurna-group.com/assets/img/logo-pt-sampurna-makmur-sejahtera.jpg",
  "https://sampurna-group.com/assets/img/dumptruck-di-pool-rumpin-pt-niaga-citra-abadi.jpg",
]

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

const BackgroundChanger = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % backgrounds.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {backgrounds.map((bg, index) =>
        index === activeIndex ? (
          <motion.div
            key={index}
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${bg})` }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 3 }}
          />
        ) : null
      )}
    </AnimatePresence>
  )
}

export default BackgroundChanger
