const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

//middleware

app.use(bodyParser.urlencoded({ extended: false }))
// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-245991681306089-052017-1ad870d74fe5ea7a5494f5ac1d089bff-762495595'
  });

//rutas
app.post('/checkout', (req, res) => {
  // Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: req.body.title,
      unit_price: parseInt(req.body.price),
      quantity: 1,
    }
  ]
};
mercadopago.preferences.create(preference)
  .then(function(response){
    console.log(response.body);
    res.redirect(response.body.init_point);
    
  }).catch(function(error){
    console.log(error);
  });
})

  
  


//server

app.listen(3000, () => {
    console.log("server on port setup correctly port 3000");
})

/*{  VENDEDOR
    "id":762495595,
    "nickname":"TEST439F88CO",
    "password":"qatest6439",
    "site_status":"active",
    "email":"test_user_95157990@testuser.com"
}
{   COMPRADOR
    "id":762502400,
    "nickname":"TETE1965211",
    "password":"qatest1081",
    "site_status":"active",
    "email":"test_user_75642689@testuser.com"
}*/