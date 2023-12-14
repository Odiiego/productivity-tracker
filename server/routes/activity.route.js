const express = require('express');
const auth = require('../middleware/auth');

const {
  getActivities,
  addActivity,
} = require('../controllers/activity.controller');

const router = express.Router();

router.get('/activities', auth, getActivities);
auth, router.post('/activity', auth, addActivity);

module.exports = router;
