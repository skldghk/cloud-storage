const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 추가된 부분
    uploadDate: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
