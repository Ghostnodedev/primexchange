/* eslint-disable react-hooks/rules-of-hooks */
import {useState, useEffect} from 'react'

const fetchapi = () => {
    const [data, setData] = useState()

    const fetchapi = async () => {
      const response = await fetch('https://api.example.com/data')
      const result = await response.json()
      setData(result)
    }

  return (
    <div>
      
    </div>
  )
}

export default fetchapi
