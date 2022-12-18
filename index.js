//exchange rate
const apiKey = "3SIEqKoXoPbSNJMRA1KGwRd51UEZ4wqW"
var myHeaders = new Headers();
myHeaders.append("apikey", apiKey)

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
async function fetchData(originalCurrency, convertToCurrency, amount){

}
//server

const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
var options = {
  root: path.join(__dirname)
};

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res) => {
  res.sendFile('home.html', options, (err) => {if(err) next(err)})
})
app.post('/results', async (req, res, next)=> {
  const apiKey = "3SIEqKoXoPbSNJMRA1KGwRd51UEZ4wqW"
  var myHeaders = new Headers();
  myHeaders.append("apikey", apiKey)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  const body = req.body
  var string = `https://api.apilayer.com/exchangerates_data/convert?to=${body.changedCurrency}&from=${body.currentCurrency}&amount=${body.amount}`
  var myObj;
  string = string.toString()
  await fetch(string, requestOptions)
          .then(response => response.text())
          .then(result => myObj = JSON.parse(result))
          .catch(error => console.log('error', error));
  console.log(myObj)
  res.render('page', {
    result: myObj
  })
})
app.listen(port, (err) =>{
  console.log("server is listening on port 3000");
  console.error(err)
})