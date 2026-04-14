const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const DB_FILE = './data.json';

const readDB = () => {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.get('/inventory', (req, res) => {
  res.json(readDB());
});

app.get('/inventory/:id', (req, res) => {
  const item = readDB().find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Product is not found" });
  res.json(item);
});

app.post('/register', upload.single('photo'), (req, res) => {
  const items = readDB();

  const newItem = {
    id: Date.now().toString(),
    name: req.body.name,
    sku: req.body.sku,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    description: req.body.description,
    photo: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : ''
  };

  items.push(newItem);
  writeDB(items);

  res.status(201).json({ success: true, item: newItem });
});

app.put('/inventory/:id', (req, res) => {
  const items = readDB();
  const index = items.findIndex(i => i.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items[index] = {
    ...items[index],
    name: req.body.name,
    sku: req.body.sku,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    description: req.body.description
  };

  writeDB(items);

  res.json({ success: true, item: items[index] });
});

app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const items = readDB();
  const index = items.findIndex(i => i.id === req.params.id);

  if (index === -1 || !req.file) {
    return res.status(400).json({ message: "Error uploading photo" });
  }

  items[index].photo = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  writeDB(items);

  res.json({ success: true });
});

app.delete('/inventory/:id', (req, res) => {
  const items = readDB().filter(item => item.id !== req.params.id);
  writeDB(items);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});