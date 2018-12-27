const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { Schema } = mongoose;

const EmployesSchema = new Schema ({
    name: { type:String, required:true },
    position: { type:String, required:true },
    office: { type:String, required:true },
    salary: { type: Number, required: true },
    departamento: { type:String }
});

module.exports = mongoose.model('Employes', EmployesSchema);