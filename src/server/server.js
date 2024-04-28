const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const request = require('request');
const WebSocket = require('ws'); // Import WebSocket library
const app = express();
const fs = require('fs');

// app.use(cors()); // Enable CORS


app.use(cors({
  origin: '*', // Replace '*' with the allowed origin, or specify multiple origins as an array
}));
// Route to fetch data from Rediff Money and populate the array
app.get('/api', function(req, res) {
  var url = 'https://money.rediff.com/gainers/nse/daily/groupall';
  request(url, function(error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);
        var company = [],
            pClose = [],
            currentPrice = [],
            change = [];
        var json = [];
        var companyCodes = {}; // New array to hold company names and codes
        var tbody = $('tbody').first();
        var total = Math.min(tbody.find('tr').length, 20); // Limiting to 20 records
        console.log('loop started');
        var counter = 0; // Initialize counter
        tbody.find('tr').each(function(i, elem) {
            if (counter < 20) { // Only process if counter is less than 20
                company[i] = $(this).find('td a').eq(0).text().trim();
                pClose[i] = $(this).find('td').eq(1).text().trim();
                currentPrice[i] = $(this).find('td').eq(2).text().trim();
                change[i] = $(this).find('td font').eq(0).text().trim();

                console.log('Company:', company[i]); // Log the company data

                json.push({
                    company: company[i],
                    pClose: pClose[i],
                    currentPrice: currentPrice[i],
                    change: change[i]
                });

                // Add company name to companyCodes array with empty string as initial value
                companyCodes[company[i]] = '';

                counter++; // Increment counter
            }
        });
        console.log('loop completed');

        res.setHeader('Content-Type', 'application/json');

        console.log('done');

        // Fetch company codes for each company from the API
        fetchCompanyCodes(companyCodes, res);
    }
  });
});

// Function to fetch company codes from the API
async function fetchCompanyCodes(companyCodes, res) {
  try {
    const apiUrl = 'https://groww.in/v1/api/search/v1/entity?app=false&page=0&size=10&q=';
    for (const companyName in companyCodes) {
      if (companyCodes.hasOwnProperty(companyName)) {
        const response = await axios.get(apiUrl + companyName);
        const responseData = response.data;
        if (responseData.content && responseData.content.length > 0) {
          const firstContent = responseData.content[0];
          const nseScripCode = firstContent.nse_scrip_code || '';
          const bseScripCode = firstContent.bse_scrip_code || '';
          const code = nseScripCode || bseScripCode;
          companyCodes[companyName] = code.replace(/'/g, '');
        }
      }
    }
    console.log('Company Codess:', companyCodes);
    
  } catch (error) {
    console.error('Error fetching company codes:', error.message);
  }
  fetchLiveData(companyCodes,res);
}

async function fetchLiveData(companyCodess, res) {
  try {
    const apiUrll = 'https://groww.in/v1/api/stocks_data/v1/accord_points/exchange/NSE/segment/CASH/latest_prices_ohlc/';
    for (let companyCode in companyCodess) {
      console.log('Live dataaaa: ', companyCode);
        console.log('code1 -', companyCodess[companyCode]);
        let vv = apiUrll+companyCodess[companyCode]; 
        console.log('vv', vv);
        const response = await axios.get(apiUrll + companyCodess[companyCode]);
        console.log(apiUrll + companyCodess[companyCode]);
        const responseData = response.data;
        console.log('responseData: ', responseData);
        companyCodess[companyCode] = responseData;
      // }
      console.log('Live dataa: ', companyCodess);
    }
    console.log('Live data: ', companyCodess);
    res.send(companyCodess);
    console.log('Live data: ', companyCodess);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
  }
}

//--------------------- Fetch price of dividends -------------------------------------------

// Endpoint to receive array of dividends
app.get('/sendDividends', (req, res) => {
  debugger
  const dividends = req.query.dividends; // Assuming dividends are sent as query parameters
  const symbolsArray = dividends.split(',');
  console.log('Received dividends:', symbolsArray);
  
  // Process the received dividends if needed
  
  // Sending back a response (for demonstration purposes)
  
  const responseData = { message: 'Dividends received successfully' };
  fetchLiveDatafromMoneyControl(symbolsArray,res)
  // res.json(responseData);
});
async function fetchLiveDatafromMoneyControl(companyCodess, res) {
  try {
    const apiFirstPartSearch = 'https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query='
    const apiLastPartSearch  = '&type=1&format=json&callback=suggest1';
    for (let i = 0; i < companyCodess.length; i++) {
      console.log('Live dataaaa: ', i);
      console.log('code1 -', companyCodess[i]);
      let SearchUrl = apiFirstPartSearch + companyCodess[i] + apiLastPartSearch; 
      console.log('SearchUrl', SearchUrl);
      try {
        const response = await axios.get(SearchUrl);
        const response_sc_Id= JSON.parse(response.data.split('(')[1].split(')')[0])[0].sc_id;
        console.log('responseId - ',response_sc_Id);

        //Second phase of URL - fetch data of SC_ID 
        const apiFirstPart='https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/';
           // Check if the response_sc_Id is a string
        if (typeof response_sc_Id === 'string') {
          let searchApi= apiFirstPart+response_sc_Id;
          console.log('searchApi - ',searchApi);
          try{
            const responseSearch = await axios.get(searchApi);
            const response_of_stock= responseSearch.data.data;
            if(responseSearch.data.data.AVGP !== '-'){
              response_of_stock.symbol=companyCodess[i];
              console.log('response_of_stock - ',response_of_stock);
              companyCodess[i] = response_of_stock;
            }
            else
            {
              const apiBSE ='https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/';
              const bseURL = apiBSE + response_sc_Id;
              const responseSearchfromURLBSE = await axios.get(bseURL);
              const responseSearchfromBSE= responseSearchfromURLBSE.data.data;
              responseSearchfromBSE.symbol=companyCodess[i];
              console.log('response_of_stock - ',responseSearchfromBSE);
              companyCodess[i] = responseSearchfromBSE;
            }
            }
          catch (error) {
            console.error('Error fetching data for BSE:', error);
            }        
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    let i = 0;
    for(let stock of companyCodess){
      // Read the data from data.js file
      const stockData = require('./data');
      if(typeof stock === 'string'  && stockData[stock])
      {
        const stockCode = stockData[stock];
        let searchApiBSE= apiFirstPartSearch + stockCode + apiLastPartSearch;
        console.log('searchApiBSE - ',searchApiBSE);
        try{
          const responseSearchBSE = await axios.get(searchApiBSE);
          const jsonString= responseSearchBSE.data;
          const response_BSE_sc_Id=JSON.parse(jsonString.substring(jsonString.indexOf('['), jsonString.lastIndexOf(']') + 1))[0].sc_id;
          if (typeof response_BSE_sc_Id === 'string') {
            try{
                const apiSecondBSE ='https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/';
                const bse_URL = apiSecondBSE + response_BSE_sc_Id;
                const responseSearchfromURL_BSE = await axios.get(bse_URL);
                const responseSearchfrom_BSE= responseSearchfromURL_BSE.data.data;
                responseSearchfrom_BSE.symbol=companyCodess[i];
                console.log('response_of_stock - ',responseSearchfrom_BSE);
                companyCodess[i] = responseSearchfrom_BSE;
              }
            catch (error) {
              console.error('Error fetching data for BSE:', error);
              }        
            }
          const response_of_stock_BSE= responseSearchBSE.data.data;;
          response_of_stock_BSE.symbol=companyCodess[i];
          console.log('response_of_stock_BSE - ',responseSearchBSE);
          companyCodess[i] = response_of_stock_BSE;
          }
        catch (error) {
          console.error('Error fetching data for BSE:', error);
          }     

      }
      i++;
    }
    console.log('Live data: ', companyCodess);
    res.send(companyCodess);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
  }
}

async function fetchLiveDataaa(companyCodess, res) {
  try {
    const apiUrll = 'https://groww.in/v1/api/stocks_data/v1/accord_points/exchange/NSE/segment/CASH/latest_prices_ohlc/';
    for (let i = 0; i < companyCodess.length; i++) {
      console.log('Live dataaaa: ', i);
      console.log('code1 -', companyCodess[i]);
      let vv = apiUrll + companyCodess[i]; 
      console.log('vv', vv);
      try {
        const response = await axios.get(apiUrll + companyCodess[i]);
        console.log(apiUrll + companyCodess[i]);
        const responseData = response.data;
        console.log('responseData: ', responseData);
        companyCodess[i] = responseData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const apiFirstPart='https://groww.in/v1/api/search/v3/query/global/st_p_query?page=0&query=';
    const apiLastPart='&size=10&web=true';
    for (const item of companyCodess) {
      // Check if the item is a string
      if (typeof item === 'string') {
        let searchApi= apiFirstPart+item+apiLastPart;
        console.log('searchApi - ',searchApi);
        try{
        const responseSearch = await axios.get(searchApi);
        }
        catch (error) {
          console.error('Error fetching data for BSE:', error);
        }
        // const responseId= response.data.content[0].bse_scrip_code;
        const responseId= responseSearch.data;
        console.log('responseId - ',responseId);
      }
    }
    console.log('Live data: ', companyCodess);
    res.send(companyCodess);
    console.log('Live data: ', companyCodess);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
  }
}

async function fetchLiveDatafromNSE(companyCodess, res) {
  try {
    const axios = require('axios'); // Import axios if you haven't already

    const apiFirstPart = 'https://www.nseindia.com/api/quote-equity?symbol=';
  

    for (let i = 0; i < companyCodess.length; i++) {
      console.log('Live dataaaa: ', i);
      console.log('code1 -', companyCodess[i]);

      let searchApi = apiFirstPart + companyCodess[i];
      console.log('searchApi - ', searchApi);

      const axios = require('axios');

        // Define the cookies
        const cookies = '_ga=GA1.1.819004912.1707208398; defaultLang=en; _abck=C21FE91100C05595E6A7333451AB59F2~0~YAAQNSozaluQ4xSPAQAA0hd5GAua8IAxcP+grjSXYQCaF3UP/ucfO8Ligv0tDTopOp691Jfs/zEa6hk/FcAeEUG/DVR8ZxFs28Buwd7zNlIlFcSGnzGTtqExwOCUg5x7bZjnTk/VXI2x+AVLnXuARBQGJaBY9CYVSLF+n22cmSLmgDz3WcgZR/tUSB8qOE0dZ9G7ZOuQsppRDwHdE77/3/YPxv5+3Vjy8Gb29heRf43cT32I9Dder+nbCwrmn89xqVaMTW/oorMOswaRqMjkcir19hRA6kaen5LLJBw9x9GAUrqsXvHfO+Amh3TobKRJntZKcUC0AB6lOhJPqW2ToHdxOoNgxEptkhjtnuokoUFjfTB7q2Hr0n6pNGJx4Vl56wkW+JOeMDTRyZFQY0pzbLFQtldgTO4He9o=~-1~||-1||~-1; _ga_QJZ4447QD3=GS1.1.1714103171.8.0.1714104974.0.0.0; nseQuoteSymbols=[{"symbol":"LT","identifier":null,"type":"equity"},{"symbol":"ASTERDM","identifier":null,"type":"equity"},{"symbol":"&#x3D; ak_bmsc=212FA63754D088D7A9587615B75C5407~000000000000000000000000000000~YAAQDyozalwO4QWPAQAAV8fmGBe4X6qerLWVWrpTYg1gPzNr2oo5SFUR1bagKUcwCH0e/eYFgnoZfW09HNfKxVeo612/1fQvs3Mi3XFyYkywGGjDAV8oZMjoTtV1yPTJRYJTDfXmWKJloDsnhNdXmGC9v63aRshVMgv6PQhTkxi998U4u3o9VnAbz2a5vCyhawLMPdAh1fkB1Ft9tK32MNeVz5UrF5HOsZJ/C4XVu+0u7LyB5lt5YMWuh4WpFmtLPRpRuCLFn6omaJO992ha2CIKrE7sajs965wYYOxQOGMLIWUEjwRhPH4PJAKDW45DL3kJW+T9ylkNeZOb3mer8/N8c/+mVxV2tfUNHGvcpXesco7IRlAo0HlOovOKPyTaj9+zfZ/d7b6ykA==; RT="z=1&dm=nseindia.com&si=6c87418b-7816-4688-b4b8-9328e60ed2b4&ss=lvg4s292&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d49.akstat.io%2F&ul=3fk9w&hd=3fkas"; _ga_87M7PJ3R97=GS1.1.1714110015.12.0.1714110015.0.0.0; AKA_A2=A; bm_sv=65AC7DB55225C461BFF11AA80934B997~YAAQNSozalLx8hSPAQAAL4Y4GRfiUcuwRCB+bFMUnwEz8EfbcZYCqOZw0fSZ5ZBpWzrgTRtqsRF1uWImVunnqtWfASvwpzmhM8bvUo5xNMEhfyJ3CFXpF4Y+8ZZszejfwZpGr3xJYkt4SAg3h5RfMo0k8/6sk6KlKduS3jvLM+y0Bz/Q+gPdeS4p355RAsNzPLUjplm+oYdADNgf/2O/TNmKQR1CkuI9aFQf2vz21nWAxgBwdsRTLaF3ilLYF3zkRfIk~1; bm_sz=09C8A92186569E5049198F62CBB75E76~YAAQNSozalPx8hSPAQAAL4Y4GRcMtYw5uLieZR+HD9gruykrmyeirHXBCZMyfLeaknWHOK9AB0Zj2YIIxHJEa4oryksXlk4/6YaM4bLEikUuCgHA+NwEBU+NfBYf8GsNv3cq6Hdrcahbei+W54TS4wroWGy/t1wWP9DsG4322x8rZCHsaeBRAtKIKG4c2miyHA/2mO7zZKTNU4F9OQFMGy7xqMhtsu+UYJpjqNN1SdBTY2HhXfP10ItbqZbH+g1ktLu7E7/K+ahPudF0ehnXPYyzoYzSMXn/LIfbMHOel/RZYgCH2wA7R8vQ1+84tls/V8KShfYh6PNwy4DHzFYEEflb3wnaub7NhoF+hbZNMg+HlrJJF38tYNkA92iQaOJu4bElNpAjNvr1vqaAVzRo6sD3rWt92HeNkkQs2MunuqQv8khW5HmswdIR6brAsHsBCqBQHdGjoNRD/fqKB8MJulIsdna4QIEORYO9dF8BwWXafTdwKj0+aDtW3Yx26FWSYVZdSUO2V/k5IUhN0ZO8NojAZ5CoRiRnWycHLHt18Kxu7X8HlYQ=~4272966~4274483';
        // Replace `ASTERDM` with `xyz` in the cookie string
        cookies = cookies.replace(/ASTERDM/g, companyCodess[i]);
        // Make the GET request using Axios
        axios.get(searchApi, {
          headers: {
            'Cookie': cookies,
            'Accept': 'application/json',
            'Content-Type': 'application/json'  // Adjust as per API requirements
            // Add any other headers if required
          },
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }
    console.log('Live data: ', companyCodess);
    res.send(companyCodess);
    console.log('Live data: ', companyCodess);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
  }
}


async function fetchLiveDatafromZerodha(companyCodess, res) {
  try {
    const axios = require('axios'); // Import axios if you haven't already

    const apiFirstPart = 'https://api.tickertape.in/search?text=';
    const apiLastPart = '&types=stock,brands,index,etf';

    for (let i = 0; i < companyCodess.length; i++) {
      console.log('Live dataaaa: ', i);
      console.log('code1 -', companyCodess[i]);

      let searchApi = apiFirstPart + companyCodess[i] + apiLastPart;
      console.log('searchApi - ', searchApi);

      try {
        const response = await axios.get(searchApi);
        const responseData = response.data.data.stocks[0].quote.sid;
        console.log('responseData: ', responseData);

        const apiStocksData = 'https://www.nseindia.com/get-quotes/equity?symbol';
        let fetchStockData = apiStocksData + responseData;

        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: fetchStockData,
          headers: { 
            'accept-version': '8.9.0'
          }
        };

        const responseStocks = await axios.request(config);
        const responseDataofStocks = responseStocks.data.data[0];
        responseDataofStocks.symbol = companyCodess[i];
        companyCodess[i] = responseDataofStocks;

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    console.log('Live data: ', companyCodess);
    res.send(companyCodess);
    console.log('Live data: ', companyCodess);
  } catch (error) {
    console.error('Error fetching live data:', error.message);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
