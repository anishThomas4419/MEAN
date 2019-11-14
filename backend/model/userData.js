const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
    title: { type: String, required: true},
    keywords: { type: Array, default: [], required: true},
    module: { type: String, required: true},
    publishedDate: { type: Date, default: Date.now, required: true},
    acceptedDate: { type: Date, default: Date.now, required: true},
    grade: { type: Number, required: true},
    teacher: { type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('DocumentMetaData', userDataSchema);