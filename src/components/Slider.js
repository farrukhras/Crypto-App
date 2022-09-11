import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slider = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");
          setData(response.data.coins);
        } catch (error) {
          console.error(error);
        } 
      }
  
      fetchData();
    }, []);
  
    return (
      <div>
        {
          data ? (
            <div className='slider'>
              <div>
                <span className='trending'>Trending Coins:   </span>
                {
                  data.map((coin, index) => {
                    return (
                      <span  className='slider-market-raw' key={index}>
                        <img style={{backgroundColor: "white"}}  src={coin.item.thumb} alt={coin.item.name}/>
                        <span  className='slider-name'>{ coin.item.name }</span>
                        <span className="slider-price">{coin.item.price_btc}</span>
                      </span>
                    )
                  })
                }
              </div>
            </div>
          )
          : (
            <div>Loading...</div>
          )
        }
      </div>
    )
}

export default Slider;