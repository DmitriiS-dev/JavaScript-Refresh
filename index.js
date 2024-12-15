const https = require('https');
const inputArray = ["6447344", "6447344", "3052068", "3052068", "3052068"];
const url = "https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json";


function fetchData(url,callback){
    console.log("Fetch Data called!")
    https.get(url, (res) => {
        let data= '';

        res.on('data', chunk =>{
            data +=chunk
        })
        res.on('end', (chunk)=> {
            try{
                const jsonData = JSON.parse(data);
                callback(null, jsonData)
            }catch(error){
                console.log("An error occured at the end of the ")
            }
        })

        res.on('error', err =>{
            console.error('Error', err)
        })
    })
}

function processProducts(inputArray, productData){
    const productMap = {};

    inputArray.forEach(uid =>{
        console.log(uid)
    })
}

fetchData(url, (error,productData) =>{
    if (error){
        console.log("Error!", error)
    } 
    else{
        console.log("Processed corectly")
        console.log(productData)
    }
})