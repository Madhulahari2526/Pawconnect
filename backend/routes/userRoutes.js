const router = require('express').Router(); const c = require('../controllers/userController'); const { protect } = require('../middleware/auth');
router.use(protect); router.get('/favorites', c.favorites); router.post('/favorites/:petId', c.toggleFavorite);
module.exports = router;
