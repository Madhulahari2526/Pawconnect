const router = require('express').Router(); const c = require('../controllers/adoptionController'); const { protect, authorize } = require('../middleware/auth');
router.use(protect); router.post('/', c.create); router.get('/mine', c.mine); router.get('/', authorize('admin'), c.list); router.patch('/:id/decision', authorize('admin'), c.decide);
module.exports = router;
