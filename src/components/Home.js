import React, {useEffect, useState} from 'react';
import axios from 'axios';

import '../App.css'

// Import Components
import Coin from './Coin';

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error => {
      alert("An error");
      console.log(error);
    })
  }, [])

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const coinsFilter = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{textAlign: "center"}}>
      <div className='search-coin-container'>
        <h1 className='title-coin'>Search Coin</h1>
        <form>
          <input 
            type="text"
            placeholder='Search'
            className='search-coin'
            onChange={handleSearch}
          />
        </form>
      </div>

      <div 
        style={{
          width:"70%",
          textAlign: "right", 
          display: "inline-block"
        }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ textAlign: "left"}}>Coin</th>
              <th scope="col">Symbol</th>
              <th scope="col">Price</th>
              <th scope="col">Volume</th>
              <th scope="col">Price Change</th>
              <th scope="col">Mkt Cap</th>
            </tr>
          </thead>
          <tbody>
            {
              coinsFilter.map((coin, idx) => {
                return (
                    <Coin 
                      idx={idx+1}
                      key={coin.id}
                      coinId={coin.id}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      price={coin.current_price}
                      volume={coin.total_volume}
                      priceChange={coin.price_change_percentage_24h}
                      marketcap={coin.market_cap}
                    />
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
