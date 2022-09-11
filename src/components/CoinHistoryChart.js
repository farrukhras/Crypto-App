import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function CoinChartHistory() {
  const { id } = useParams();
  const [coinChartData, setCoinChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchCoinChartData = async () => {
      try{
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
        setCoinChartData(res.data);
      } catch(error) {
        alert("error")
      } finally {
        setLoading(false);
      }
    }
    fetchCoinChartData();
  }, [id])


  let chartData = [];
  let data = {};

  if (!loading) {
    chartData = coinChartData.prices.map(value => ({
      x: value[0],
      y: value[1].toFixed(2)
    }));

    data = {
      labels: chartData.map(value => moment(value.x).format('MMM DD')),

      datasets: [
        {
          fill: true,
          data: chartData.map(value => value.y),
          label: id,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        
      ] 
    }
  }

  const options = {
    responsive: true,
    plugins: {
    title: {
      display: true,
      text: 'Price Fluctualtion Chart',
    },
  },
  }

  return (
    <>
      {
        loading ?
        <Spinner />
        :
        <Line options={options} data={data} />
      }
    </>
  );
}

export default CoinChartHistory;