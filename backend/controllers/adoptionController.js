const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');
const asyncHandler = require('../utils/asyncHandler');
exports.create = asyncHandler(async (req, res) => { const pet = await Pet.findById(req.body.pet); if (!pet || pet.status !== 'available') return res.status(400).json({ message: 'Pet is not available' }); const request = await AdoptionRequest.create({ pet: pet._id, applicant: req.user._id, message: req.body.message }); res.status(201).json(await request.populate('pet')); });
exports.mine = asyncHandler(async (req, res) => res.json(await AdoptionRequest.find({ applicant: req.user._id }).populate('pet').sort('-createdAt')));
exports.list = asyncHandler(async (req, res) => res.json(await AdoptionRequest.find().populate('pet applicant', 'name email species breed').sort('-createdAt')));
exports.decide = asyncHandler(async (req, res) => {
  const request = await AdoptionRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });
  if (request.status !== 'pending') return res.status(400).json({ message: 'Request already decided' });
  if (!['approved', 'rejected'].includes(req.body.status)) {
    return res.status(400).json({ message: 'Decision status must be approved or rejected' });
  }
  request.status = req.body.status;
  request.decisionNote = req.body.decisionNote;
  request.decidedBy = req.user._id;
  await request.save();
  if (request.status === 'approved') await Pet.findByIdAndUpdate(request.pet, { status: 'adopted' });
  res.json(request);
});
