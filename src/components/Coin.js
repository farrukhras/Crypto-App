import React from 'react';
import { useNavigate } from 'react-router-dom';

function Coin({idx, coinId, name, image, price, volume, symbol, marketcap, priceChange}) {
  const navigate = useNavigate();

  function handleRowClick() {
    navigate(`/coin/${coinId}`);
  }  

  return (
    <tr onClick={()=> handleRowClick()} className="table-row">
      <th scope="row">
        <p className='align-table-items'>
          {idx}
        </p>
      </th>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src={image} alt={name} style={{height: "30px", width: "30px"}}/>
          {/* <Link to={`/coin/${coinId}`} style={{textDecoration: "none"}} target="_blank"> */}
          <h1 style={{fontSize:"16px", margin: "1vh 1vw"}}>{name}</h1>
          {/* </Link> */}
        </div>
      </td>
      <td><p className='align-table-items'>{symbol.toUpperCase()}</p></td>
      <td><p className='align-table-items'>${price.toLocaleString()}</p></td>
      <td><p className='align-table-items'>${volume.toLocaleString()}</p></td>
      <td>
        { 
          priceChange < 0 ? 
          (
            <p style={{color: "red", margin: "1vh 0 1vw 0"}} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" style={{width: "30px", height: "30px", paddingRight:"5px"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
              </svg>
              {priceChange.toFixed(2)}%
            </p>
          ) :
          (
            <p style={{color: "lightgreen", margin: "1vh 0 1vw 0"}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="lightgreen" style={{width: "30px", height: "30px", paddingRight:"5px"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              {priceChange.toFixed(2)}%
            </p>
          )
        }
      </td>
      <td>
        <p className='align-table-items'>
          ${marketcap.toLocaleString()}
        </p>
      </td>
    </tr>
  );
}

export default Coin;