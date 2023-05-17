import React from 'react'
import { useBreakpoint, useTheme } from 'common'
import { motion } from 'framer-motion'

import styles from './hero.module.css'
import { useWindowSize } from 'react-use'

const HeroGrid = () => {
  const { isDarkMode } = useTheme()
  const { width } = useWindowSize()
  const isSm = useBreakpoint(640)

  const svgGridOptions = {
    color: isDarkMode ? '#00c6d4' : '#01876c',
    boxWidth: width ? width * 7 : 7500,
    boxHeight: width ? width * 5 : 6000,
    xLines: isSm ? 20 : 49,
    yLines: isSm ? 65 : 130,
    strokeWidth: 1,
  }

  const pulseAnimation = {
    x2: [svgGridOptions.boxWidth / 2, 0, svgGridOptions.boxWidth / 2],
    x1: [svgGridOptions.boxWidth / 2, 0, svgGridOptions.boxWidth / 2],
    y1: [svgGridOptions.boxHeight, svgGridOptions.boxHeight / 3, 0],
    y2: [svgGridOptions.boxHeight, svgGridOptions.boxHeight / 2, 0],
  }

  const GridSVG = () => (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      viewBox={`0 0 ${svgGridOptions.boxWidth} ${svgGridOptions.boxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...new Array(svgGridOptions.xLines)].map((_: any, i: number) => {
        const x = (svgGridOptions.boxHeight * i) / svgGridOptions.xLines

        const AnimatedLine = ({ name }: { name: string }) => (
          <line
            x1={x}
            y1={svgGridOptions.boxWidth}
            x2={x}
            y2="0"
            stroke={`url(#${name})`}
            strokeLinecap="round"
            strokeWidth={isSm ? 3 : 6}
            shapeRendering="crispEdges"
          />
        )

        const getMobileLines: () => string = () => {
          switch (i) {
            case 9:
              return 'electric-pulse'
            case 14:
              return 'electric-pulse-2'
            case 17:
              return 'electric-pulse-3'
            case 12:
              return 'electric-pulse-4'
            default:
              return ''
          }
        }
        const getDesktopLines: () => string = () => {
          switch (i) {
            case 25:
              return 'electric-pulse'
            case 33:
              return 'electric-pulse-2'
            case 22:
              return 'electric-pulse-3'
            case 30:
              return 'electric-pulse-4'
            case 36:
              return 'electric-pulse-5'
            default:
              return ''
          }
        }

        return <AnimatedLine name={isSm ? getMobileLines() : getDesktopLines()} />
      })}
      <defs>
        <MotionLinearGradient name="electric-pulse" delay={0} />
        <MotionLinearGradient name="electric-pulse-2" delay={2} />
        <MotionLinearGradient name="electric-pulse-3" delay={4} />
        <MotionLinearGradient name="electric-pulse-4" delay={5} />
        <MotionLinearGradient name="electric-pulse-5" delay={6} />
      </defs>
    </svg>
  )

  const MotionLinearGradient = ({ name, delay }: { name: string; delay: number }) => (
    <motion.linearGradient
      animate={pulseAnimation}
      transition={{
        duration: isSm ? 4 : 5,
        repeat: Infinity,
        ease: 'linear',
        delay: delay,
      }}
      id={name}
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor={svgGridOptions.color} stopOpacity="0" />
      <stop stopColor={svgGridOptions.color} stopOpacity="1" />
      <stop offset="1" stopColor="#3E9BCF" stopOpacity="0" />
    </motion.linearGradient>
  )

  return (
    <div
      className={[
        'relative -z-10 ![perspective:800px] sm:![perspective:800px] md:![perspective:800px] lg:![perspective:800px]',
      ].join(' ')}
    >
      <div
        style={{
          transform: 'rotateX(85deg)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div className={[styles['hero-grid-lines']].join(' ')}>
          <GridSVG />
        </div>
      </div>
    </div>
  )
}

export default HeroGrid
