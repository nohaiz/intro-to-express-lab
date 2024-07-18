const ex = require('express');

const app = ex();

app.get('/greeting/:username',(req, res) => {
    res.send(`<h1>Hello there, ${req.params.username}!</h1>`);
})

app.get('/roll/:number', (req, res) => {

    const numberRegex = /^\d+$/;

    if (numberRegex.test(req.params.number)) {

        let maxNumber = parseInt(req.params.number);
        let random = Math.floor(Math.random() * maxNumber) + 1;

        res.send(`Random number between 1 and ${maxNumber} : ${random}`);

    } else {
        res.send('You must specify a number');
    }
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {

    if (parseInt(req.params.index) >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!');
    }
    else {
        let selectedCollectible = collectibles[parseInt(req.params.index)];
        res.send(`So, you want the ${selectedCollectible.name}? For ${selectedCollectible.price}, it can be yours!`);
    }
  })

  app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes',(req,res)=>{
    let shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];
    if(req.query.hasOwnProperty('min-price')){
        shoes = shoes.filter(shoe => shoe.price >= Number(req.query['min-price']));
    }
    if(req.query.hasOwnProperty('max-price')){
        shoes = shoes.filter(shoe => shoe.price <= Number(req.query['max-price']));
    }
    if(req.query.hasOwnProperty('type')){
        shoes = shoes.filter(shoe => shoe.type === req.query['type']);
    }
    res.send(shoes);
});


//This is a must.
app.listen(3000, ()=> {
    console.log('The port is 3000');
})
