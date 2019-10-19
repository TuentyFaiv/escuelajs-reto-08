require("dotenv").config();
const express = require("express"),
  path = require("path"),
  app = express(),
  port = process.env.PORT || 3001,
  ProductMocks = require("./mocks/products");

app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.status(200).send(`UserInfo: ${userInfo}`);
});

app.get('/receipts', (req, res) => {
  let file = path.join(__dirname, "assets/receipt.pdf");
  res.status(200).sendFile(file);
});

app.get('/products', (req, res) => {
  let storeProducts = ProductMocks;
  res.status(200).json({
    data: storeProducts,
    message: 'store listed'
  });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = await Promise.resolve(ProductMocks[id]);

  res.status(200).json({
    data: product,
    message: 'product listed'
  });
});

app.post('/products/:id', async (req, res) => {
  const { id } = req.params;

  const newProduct = await Promise.resolve(ProductMocks[id].id);

  res.status(201).json({
    data: newProduct,
    message: 'new product'
  });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;

  const updatedProduct = await Promise.resolve(ProductMocks[id].id);

  res.status(200).json({
    data: updatedProduct,
    message: 'product updated'
  });
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Promise.resolve(ProductMocks[id].id);

  res.status(200).json({
    data: deletedProduct,
    message: 'product deleted'
  });
});

app.listen(port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${port}`);
});