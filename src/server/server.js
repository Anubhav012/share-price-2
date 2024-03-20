const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const request = require('request');
const WebSocket = require('ws'); // Import WebSocket library
const app = express();

app.use(cors()); // Enable CORS


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
    debugger;
    for (let companyCode in companyCodess) {
      debugger;
      console.log('Live dataaaa: ', companyCode);
        console.log('code1 -', companyCodess[companyCode]);
        let vv = apiUrll+companyCodess[companyCode]; 
        debugger;
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
