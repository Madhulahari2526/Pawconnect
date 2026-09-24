const router = require('express').Router(); const c = require('../controllers/petController'); const { protect, authorize } = require('../middleware/auth'); const upload = require('../middleware/upload');
router.get('/', c.list); router.get('/:id', c.get); router.post('/', protect, authorize('admin', 'user'), upload.single('image'), c.create); router.patch('/:id', protect, authorize('admin'), upload.single('image'), c.update); router.delete('/:id', protect, authorize('admin'), c.remove);
module.exports = router;
