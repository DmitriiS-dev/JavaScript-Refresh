const https = require('https');
require('dotenv').config();
const url = process.env.URL;
const inputArray = process.env.INPUT_ARRAY.split(',');

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

    let lines = [];
    let total = 0
    let total_item_count = 0

    inputArray.forEach(uid =>{
        const product = productData.find(item => item.product_uid === uid);
        if (product){
            if (!productMap[uid]){
                productMap[uid] = {
                    uid: uid,
                    quantity: 1,
                    subtotal:0
                }
            }
            else{
                productMap[uid].quantity += 1
                productMap[uid].subtotal = productMap[uid].quantity*product.retail_price.price
            }
        }
    })

    for (const uid in productMap){
        const product = productMap[uid]
        lines.push(product);
        total_item_count += product.quantity
        total += product.subtotal
    }
    return {"lines": lines,"total_item_count":total_item_count,"total": total};
}

fetchData(url, (error,productData) =>{
    if (error){
        console.log("Error!", error)
    } 
    else{
        console.log("Product Data loaded correctly")
        console.log(processProducts(inputArray, productData));
    }
})