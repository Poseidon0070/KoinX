const Crypto = require('../model/model')

exports.getHoldingCompanies = async(req, res) => {
    try {
        const { currency } = req.body;
        
        // checking validity of currency
        if (!currency || !['bitcoin', 'ethereum'].includes(currency.toLowerCase())) {
            return res.status(400).json({
                message: 'Invalid currency parameter. Possible values are only bitcoin or ethereum.'
            });
        }
        
        // fetching currency data
        const response = await fetch(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
        const data = await response.json();
        
        // storing all companies name
        const companies = data.companies.map(company => company.name);
        
        return res.json({ companies });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    
}

exports.convertCurrency = async(req, res) => {
    try {
        // request data
        const fromCurrency = req.body.fromCurrency
        const toCurrency = req.body.toCurrency
        const date = req.body.date
        
        // fetching date for each currency
        const response1 = await fetch(`https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}`)
        const response2 = await fetch(`https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${date}`)
        
        const data1 = await response1.json()
        const data2 = await response2.json()
        
        // exchange rate in terms of USD 
        const value1 = data1.market_data.current_price.usd
        const value2 = data2.market_data.current_price.usd
        
        // final response data
        const ratio = value1/value2
        const finalResponse = `1 ${fromCurrency} equals ${ratio} ${toCurrency}`
        
        return res.status(200).json({
            Exchange_Rate : finalResponse
        })
        
    } catch (error) {
        console.error('Error:', error.message)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
} 


exports.updateCryptoCurrencies = async() => {
    try {
        // fetching currency data
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        
        if (!response.ok) {
            console.log(" Cannot fetch data at the moment")
            return ;
        }

        const data = await response.json();

        // finding currencies by their id and updating
        for (const crypto of data) {
            await Crypto.findOneAndUpdate({ id: crypto.id }, crypto, { upsert: true })
        }

        console.log("Cryptocurrencies updated successfully.")

    } catch (error) {
        console.error("Error:", error);
    }

}