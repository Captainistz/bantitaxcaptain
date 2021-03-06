import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const moment = require('moment')
require('moment-precise-range-plugin')

const Home: NextPage = () => {
  const [duration, setDuration] = useState('')
  const [toAniversary, setToAniversary] = useState('')
  const [apart, setApart] = useState('')

  const momentToString = (mm: any) => {
    return (
      (mm.years / 10 < 1 ? '0' : '') +
      mm.years +
      ':' +
      (mm.months / 10 < 1 ? '0' : '') +
      mm.months +
      ':' +
      (mm.days / 10 < 1 ? '0' : '') +
      mm.days +
      ':' +
      (mm.hours / 10 < 1 ? '0' : '') +
      mm.hours +
      ':' +
      (mm.minutes / 10 < 1 ? '0' : '') +
      mm.minutes +
      ':' +
      (mm.seconds / 10 < 1 ? '0' : '') +
      mm.seconds
    )
  }

  useEffect(() => {
    var starts = moment('2019-10-27 01:59:00')
    var apart = moment('2022-02-17 20:48:34')
    var nextAniversary = moment(`${moment().year()}-10-27 01:59:00`)

    const interval = setInterval(() => {
      var now = moment()
      const duration = moment.preciseDiff(starts, now, true)
      const duration_string = momentToString(duration)
      setDuration(duration_string)

      var toAni = moment.preciseDiff(now, nextAniversary.add(1, 'y'), true)
      if (now.isBefore(nextAniversary)) {
        toAni = moment.preciseDiff(now, nextAniversary.subtract(1, 'y'), true)
      }

      setToAniversary(momentToString(toAni))

      const fromLatest = moment.preciseDiff(apart, now, true)
      setApart(momentToString(fromLatest))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className='py-0 px-8'>
      <Head>
        <title>iuqxcpt</title>
        <meta name='description' content='relationship tracker' />
        <link rel='icon' href='/assets/icon.png' />
      </Head>

      <main className='min-h-screen px-0 py-16 flex flex-col justify-center items-center'>
        <h1 className='my-8 mx-4 text-3xl sm:text-5xl'>
          <a href='https://www.instagram.com/the_iuq/'>Bantita</a> ????{' '}
          <a href='https://www.instagram.com/captainistz/'>Captain</a>
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-3  '>
          <a className={styles.card}>
            <h2>Aniversary &rarr;</h2>
            <p className='text-center'>27/10/62 - 01:59</p>
          </a>

          <a className={styles.card}>
            <h2>Duration &rarr;</h2>
            <p className='text-center'>{duration == '' ? 'Loading...' : duration}</p>
          </a>

          <a className={styles.card}>
            <h2>Next Aniversary &rarr;</h2>
            <p className='text-center'>{toAniversary == '' ? 'Loading...' : toAniversary}</p>
          </a>

          <a className={styles.card}>
            <h2>Apart For &rarr;</h2>
            <p className='text-center'>{apart == '' ? 'Loading...' : apart}</p>
          </a>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default Home
