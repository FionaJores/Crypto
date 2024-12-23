import React, { useContext, useState, useEffect } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      console.log('Fetching data for coinId:', coinId); 
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-1CMe8qqCKJbcT5btCHipDbND',
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched coin data:', data); 
      setCoinData(data);
    } catch (error) {
      console.error('Fetch error:', error); 
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-1CMe8qqCKJbcT5btCHipDbND'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  };
  

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          {coinData.image?.large ? (
            <img src={coinData.image.large} alt={coinData.name} />
          ) : (
            <p>No image available</p>
          )}
          <p>
            <b>
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
          
        </div>
      </div>
    );
  } else {
    console.log('Data not yet available. Rendering spinner.');
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
