const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
exports.favorites = asyncHandler(async (req, res) => { const user = await User.findById(req.user._id).populate('favorites'); res.json(user.favorites); });
exports.toggleFavorite = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); const id = req.params.petId; const i = user.favorites.findIndex(x => x.toString() === id);
  if (i >= 0) user.favorites.splice(i, 1); else user.favorites.push(id); await user.save(); res.json({ favorited: i < 0, favorites: user.favorites });
});
