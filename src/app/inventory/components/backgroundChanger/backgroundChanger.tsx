"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./BackgroundChanger.module.css"

const backgrounds = [
  "https://sampurna-group.com/assets/img/pasir-abu-sampurna-group.jpg",
  "https://sampurna-group.com/assets/img/kantor-pusat-sampurna-group-kadu-sirung-tangerang.jpg",
  "https://sampurna-group.com/assets/img/wingbox-sampurna-group.jpg",
  // Tambahkan path gambar lainnya
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
