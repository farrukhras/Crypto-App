import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CoinChartHistory from './CoinHistoryChart';
import Spinner from './Spinner';

function CoinDetails() {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchCoinData = async () => {
      try{
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`);
        setCoinDetails(res.data);
      } catch(error) {
        alert("error")
      } finally {
        setLoading(false);
      }
    }
    fetchCoinData();
  }, [id])

  function RenderOutput() {
    return (
      <div className='single-coin-container'>
        <div className='coin-info'>
          <div className='coin-img-title'>
            <img src={coinDetails.image.small} alt={id}/>
            <h3 style={{margin: "1vh 1vw"}}>{coinDetails.name}</h3>
          </div>
          <p dangerouslySetInnerHTML={{ __html: coinDetails.description.en }}></p>
          <CoinChartHistory />
        </div>
      </div>
    )
  }

  return (
    <>
      {
        loading ?
        <Spinner />
        :
        <RenderOutput />
      }
    </>
  );
}

export default CoinDetails;