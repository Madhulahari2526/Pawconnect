const Pet = require('../models/Pet');
const cloudinary = require('../config/cloudinary');
const asyncHandler = require('../utils/asyncHandler');
const uploadImage = (buffer) => new Promise((resolve, reject) => cloudinary.uploader.upload_stream({ folder: 'pett/pets' }, (e, r) => e ? reject(e) : resolve(r)).end(buffer));
exports.list = asyncHandler(async (req, res) => {
  const { search, species, status = 'available', gender, size, location, page = 1, limit = 12 } = req.query;
  const filter = {}; if (search) filter.$text = { $search: search }; if (species) filter.species = species; if (status !== 'all') filter.status = status;
  if (gender) filter.gender = gender; if (size) filter.size = size; if (location) filter.location = new RegExp(location, 'i');
  const skip = (Math.max(1, +page) - 1) * Math.min(50, +limit);
  const [pets, total] = await Promise.all([
    Pet.find(filter).sort('-createdAt').skip(skip).limit(Math.min(50, +limit)).populate('createdBy', 'name phone'),
    Pet.countDocuments(filter)
  ]);
  res.json({ pets, total, page: +page, pages: Math.ceil(total / Math.min(50, +limit)) });
});
exports.get = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id).populate('createdBy', 'name phone');
  if (!pet) return res.status(404).json({ message: 'Pet not found' });
  res.json(pet);
});
exports.create = asyncHandler(async (req, res) => {
  const data = { ...req.body, createdBy: req.user._id };
  if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
    const r = await uploadImage(req.file.buffer);
    data.image = r.secure_url;
    data.imagePublicId = r.public_id;
  }
  const newPet = await Pet.create(data);
  const populated = await Pet.findById(newPet._id).populate('createdBy', 'name phone');
  res.status(201).json(populated);
});
exports.update = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) return res.status(404).json({ message: 'Pet not found' });
  Object.assign(pet, req.body);
  if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
    const result = await uploadImage(req.file.buffer);
    pet.image = result.secure_url;
    pet.imagePublicId = result.public_id;
  }
  await pet.save();
  res.json(pet);
});
exports.remove = asyncHandler(async (req, res) => { if (!await Pet.findByIdAndDelete(req.params.id)) return res.status(404).json({ message: 'Pet not found' }); res.status(204).send(); });
