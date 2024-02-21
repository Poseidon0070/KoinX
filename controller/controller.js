const Crypto = require('../model/model')

exports.updateCryptoCurrencies = async() => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        
        if (!response.ok) {
            return res.status(500).json({
                message: "Internal Server Error. Cannot fetch data at the moment"
            });
        }

        const data = await response.json();

        let cnt = 0

        for (const crypto of data) {
            const newCrypto = new Crypto({
                name: crypto.name,
                id: crypto.id,
            });
            await newCrypto.save();
            
            // saving only few records to avoid database overload
            cnt = cnt + 1
            if(cnt === 5) break
        }

        console.log("Cryptocurrencies saved successfully.")

    } catch (error) {
        console.error("Error:", error);
    }

}