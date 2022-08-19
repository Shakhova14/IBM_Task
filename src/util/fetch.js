const api_key = 'cbsbo32ad3idk2bn7oo0';

export async function fetchCompany(symbol) {
  let data = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${api_key}`
  );
  data = await data.json();
  if (data.name === undefined) {
    alert ('Wrong request');
    return data;
}
  else {
    alert ("Good!!!")
    return data;
  }
  
}

export async function fetchHistorical(symbol, { from, to }) {
  let data = await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${api_key}`
  );
  data = await data.json();
  return data;
}
