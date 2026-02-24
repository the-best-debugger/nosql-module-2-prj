const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const users = [];

router.get('/', (req, res, next) => {
  try {
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
});

router.get('/:id', (req, res, next) => {
  try {
    const u = users.find(x => x.id === req.params.id);
    if (!u) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: u });
  } catch (err) { next(err); }
});

router.post('/', (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || typeof name !== 'string' || !email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Validation error: name and email required' });
    }
    const newUser = { id: uuidv4(), name: name.trim(), email: email.trim() };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
  } catch (err) { next(err); }
});

router.put('/:id', (req, res, next) => {
  try {
    const { name, email } = req.body;
    const idx = users.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });
    if (name) users[idx].name = name.trim();
    if (email) users[idx].email = email.trim();
    res.json({ success: true, data: users[idx] });
  } catch (err) { next(err); }
});

router.delete('/:id', (req, res, next) => {
  try {
    const idx = users.findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'User not found' });
    const removed = users.splice(idx, 1)[0];
    res.json({ success: true, data: removed });
  } catch (err) { next(err); }
});

module.exports = router;
