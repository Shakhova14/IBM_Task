import React, { useState, useEffect } from 'react';
import './main.css';
import { fetchCompany, fetchHistorical } from './util/fetch';

export default function App() {
  const [text, setText] = useState('');
  const [company, setCompany] = useState({});
  const [history, setHistory] = useState({});
  const [date, setDate] = useState({ from: 1660694400, to: 1660780800 });

  const getCompany = async () => {
    setHistory({});
    if (text === '') return;
    const companyProfile = await fetchCompany(text);
    setCompany(companyProfile);
  };

  const getHistory = async (ticker) => {
    console.log('date', date);
    const history = await fetchHistorical(ticker, date);
    console.log(history);
    setHistory(history);
  };

  const handleDate = (e) => {
    const timestamp = new Date(e.target.value).valueOf() / 1000;
    setDate({ ...date, [e.target.name]: timestamp });
  };

  return (
    <div className='container'>
       <div className='form'>
      <h1>Finnhub</h1> 
      <p>Find company:</p>
      <input
        type="text" pattern="[a-zA-Z\s]{1,35}" required 
        onChange={(e) => setText(e.target.value)}
        value={text} 
      />
      <button onClick={getCompany}>Find</button>
      </div>
      {company.name && (
        <div className='info'>
          <p onClick={() => getHistory(company.ticker)}>Name: {company.name}</p>
          <img src={company.logo} />
          <p>Currency: {company.currency}</p>
          <p>Country: {company.country}</p>
          <a href={company.weburl}>{company.weburl}</a>
          <br /> 
          <p>Please, select stock value range</p>
          <input type="date" name="from" onChange={handleDate} />
          <input type="date" name="to" onChange={handleDate} />
        </div>
      )}
      {history.c && (
       
        <ul className='history'>
          {history.c.map((item) => (
            <li className='history__item'>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
