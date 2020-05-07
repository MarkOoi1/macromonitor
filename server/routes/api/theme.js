const express = require('express');
const router = express.Router();

// Market Model
const Theme = require('../../models/Theme');

// @route   GET api/theme
// @desc    Get All Themes
// @access  Public
router.get('/', (req,res) => {
  Theme.find()
        .then(themes => {
          if(themes.length == 0) return res.status(400).json( {msg: 'No themes found.'});
          res.json(themes);
        })
});

// @route   POST api/theme
// @desc    Add New Theme
// @access  Public
router.post('/', (req,res) => {
  const { name, description, start_date, timeframe, user, markets } = req.body;

  if(!name && !description && !timeframe && !markets) {
    return res.status(400).json({ msg: 'Please enter all fields'});
  } 
  
  Theme.findOne({ name })
  .then(theme => {
    if(theme) return res.status(400).json( {msg: 'Theme already exists'});
  })
  .catch(err => {
    return res.status(400).json( {msg: 'Error searching for theme'})
  });

  const newTheme = new Theme({
    name,
    description,
    timeframe,
    start_date,
    author: user,
    markets
  });

  newTheme.save()
    .then(user => {
      res.json({
        _id,
        name
      });
    })
    .catch(err => res.status(400).json( {msg: err}));

});

module.exports = router;