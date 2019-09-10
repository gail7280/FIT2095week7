let mongoose=require('mongoose');

let tasksSchema = mongoose.Schema({
    name: String,
    assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tasks'
    },
    duedate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    taskdesc: String
});

let tasksModel = mongoose.model('tasks', tasksSchema, 'tasks');
module.exports = tasksModel;