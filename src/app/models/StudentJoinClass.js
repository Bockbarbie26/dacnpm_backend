const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentJoinClass = mongoose.Schema({
    id: {type: ObjectId},
    idStudent: {type: Number},
    idClass: {type: Number},
    attendDate: {type: Date},
    listening: {type: Number},
    writing: {type: Number},
    speaking: {type: Number},
    reading: {type: Number},
    paidStatus: {type: Boolean},
    prize: {type: Number},
    prizeStatus: {type: Boolean},
    createdAt: {type: Date , default: Date.now},
    UpdatedAt: {type: Date , default: Date.now}
})
