import React, { useState, useEffect } from 'react';
import './main.scss';


function App() {
  const nunberFraction = new Intl.NumberFormat();
  const [query, setQuery] = useState('')
  const [dataArray, setData] = useState([])

  function onSearch(event) { 
    
    setQuery(event.target.value)
    setData(dataArray.filter(data => { 
      return data.name.toLowerCase().includes(query.toLowerCase())
    }))
    
  }

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&names=${query}`)
    .then(res => res.json())
    .then(result => {
      setData(result)
    })
  }, [])
  

  return (
    <div className="app">

      <div className="search-box">
        <input 
          type="text" 
          placeholder='search...'
          className='search'
          onChange={onSearch}
          value={query}
        />
      </div>

      <div className="table">
        <table>
          <tbody>
            {
              dataArray.map(data => (
              <tr className='tr' key={data.id}>
                <td  className='td-td'> <img src={data.image} alt="" /> {data.name}</td>
                <td>₦{nunberFraction.format(data.current_price)}</td>
                <td className={ 
                  data.price_change_percentage_24h < 1 ? 'red' : 'green'} 
                >{data.price_change_percentage_24h.toFixed(2)}%</td>
                <td className='center-text'>Mkt Cap: <br /> ₦{nunberFraction.format(data.market_cap)}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
