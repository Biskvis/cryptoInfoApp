import { useState, useEffect } from 'react'
import Axios from 'axios';
import './App.css'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': import.meta.env.VITE_API_KEY
  }
};


function App() {

  const [currencies, setCurrencies] = useState<object[]>([])
  const [search, setSearch] = useState<string>('')
  
  useEffect(() => {
    Axios.get('https://openapiv1.coinstats.app/coins?limit=100', options)
    .then(response => setCurrencies(response.data.result))
    .catch(error => console.error(error));

  }, [])

  const filtered = currencies.filter((item: any) => item.name.toLowerCase().includes(search))

  const display = filtered.map((item: any, index: number) => 
    <li key={index} className='grid grid-cols-7  p-2 '>
      <p className='font-bold'>
        
        {item.rank}</p>
      <p className='flex w-12'><img src={item.icon} className='-ml-16 mr-2' />{item.name}</p>
      <p>{item.symbol}</p>
      <p className='-ml-8'><b>$</b>{item.marketCap.toFixed(2)}</p>
      <p><b>$</b>{item.price.toFixed(2)}</p>
      <p>{item.totalSupply}</p>
      <p>{item.volume.toFixed(2)}</p>
    </li>
  )
  


  return (
    <>
      <h1 className='text-center text-4xl text-green-600 font-bold mt-20'>All Cryptocurrencies</h1>
      <div className='flex justify-center items-center p-8'>

        <input 
          placeholder='Search...'
          className='p-2 rounded-lg w-96 text-center border' 
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className='flex justify-center items-center '>
        <ol className='max-w-screen-xl'>
            <li className='flex justify-between bg-black text-white p-2'>
            <p>Rank</p>
            <p>Name</p>
            <p>Symbol</p>
            <p>Market Cap</p>
            <p>Price</p>
            <p>Available supply</p>
            <p>Volume (24hrs)</p>
            </li>
            {display}
        </ol>
      </div>
    </>
  )
}

export default App
