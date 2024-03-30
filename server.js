const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let products = [];

// จุดสิ้นสุดการให้บริการ (Endpoint) สำหรับเพิ่มสินค้าใหม่
app.post('/products', (req, res) => {
  const { name, category, price, stock } = req.body;

  // ตรวจสอบค่าว่างเปล่า
  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'กรุณาระบุค่าทุกฟิลด์ที่จำเป็น' });
  }

  // ตรวจสอบประเภทของค่า
  const invalidFields = [];
  if (typeof name !== 'string') invalidFields.push('name');
  if (typeof category !== 'string') invalidFields.push('category');
  if (typeof price !== 'number') invalidFields.push('price');
  if (typeof stock !== 'number') invalidFields.push('stock');

  if (invalidFields.length > 0) {
    return res.status(400).json({ message: `ประเภทของค่าไม่ถูกต้องสำหรับฟิลด์: ${invalidFields.join(', ')}` });
  }

  // ตรวจสอบเงื่อนไขอื่นๆ
  if (price <= 0 || stock <= 0) {
    return res.status(400).json({ message: 'ราคาและจำนวนสินค้าคงคลังต้องมากกว่า 0' });
  }

  const newProduct = { id: products.length + 1, name, category, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// จุดสิ้นสุดการให้บริการ (Endpoint) สำหรับเพิ่มสินค้าด้วยรหัสสินค้าที่กำหนด
app.post('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, price, stock } = req.body;

  // ตรวจสอบค่าว่างเปล่า
  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'กรุณาระบุค่าทุกฟิลด์ที่จำเป็น' });
  }

  // ตรวจสอบประเภทของค่า
  const invalidFields = [];
  if (typeof name !== 'string') invalidFields.push('name');
  if (typeof category !== 'string') invalidFields.push('category');
  if (typeof price !== 'number') invalidFields.push('price');
  if (typeof stock !== 'number') invalidFields.push('stock');

  if (invalidFields.length > 0) {
    return res.status(400).json({ message: `ประเภทของค่าไม่ถูกต้องสำหรับฟิลด์: ${invalidFields.join(', ')}` });
  }

  // ตรวจสอบเงื่อนไขอื่นๆ
  if (price <= 0 || stock <= 0) {
    return res.status(400).json({ message: 'ราคาและจำนวนสินค้าคงคลังต้องมากกว่า 0' });
  }

  // ตรวจสอบว่ามีรหัสสินค้านี้อยู่แล้วหรือไม่
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    return res.status(409).json({ message: 'มีสินค้าที่มีรหัสนี้อยู่แล้ว' });
  }

  const newProduct = { id, name, category, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// จุดสิ้นสุดการให้บริการ (Endpoint) สำหรับดูรายการสินค้าทั้งหมด
app.get('/products', (req, res) => {
  res.json(products);
});

// จุดสิ้นสุดการให้บริการ (Endpoint) สำหรับแก้ไขสินค้า
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, price, stock } = req.body;

  // ตรวจสอบค่าว่างเปล่า
  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: 'กรุณาระบุค่าทุกฟิลด์ที่จำเป็น' });
  }

  // ตรวจสอบประเภทของค่า
  const invalidFields = [];
  if (typeof name !== 'string') invalidFields.push('name');
  if (typeof category !== 'string') invalidFields.push('category');
  if (typeof price !== 'number') invalidFields.push('price');
  if (typeof stock !== 'number') invalidFields.push('stock');

  if (invalidFields.length > 0) {
    return res.status(400).json({ message: `ประเภทของค่าไม่ถูกต้องสำหรับฟิลด์: ${invalidFields.join(', ')}` });
  }

  // ตรวจสอบเงื่อนไขอื่นๆ
  if (price <= 0 || stock <= 0) {
    return res.status(400).json({ message: 'ราคาและจำนวนสินค้าคงคลังต้องมากกว่า 0' });
  }

  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { id, name, category, price, stock };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการ' });
  }
});

// จุดสิ้นสุดการให้บริการ (Endpoint) สำหรับลบสินค้า
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json(deletedProduct);
  } else {
    res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการ' });
  }
});

app.listen(port, () => {
  console.log(`เซิร์ฟเวอร์กำลังรันที่ พอร์ต ${port}`);
});