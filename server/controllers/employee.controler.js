const employesCtrl = {};
const Emp = require('../models/employes.model');

employesCtrl.getEmpleado = async (req, res) => {
   //res.json({
    // status: 'Api works'
    //});
    const empleados = await Emp.find();//Busca los datos en el modelo de bd que se conecta a mongodb
    res.json(empleados);
}

employesCtrl.CreateEmpleado = async (req, res) => {
    console.log(req.body);
    const Empleado = new Emp ({
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary,
      depatamento: req.body.depatamento
    });
    await Empleado.save();
    res.json({
        'status': 'Empleado guardado'
    });
}

employesCtrl.obtenerEmpleado = async (req, res) => {
    console.log(req.params.id);
    //res.json('recived');
    const emple = await Emp.findById(req.params.id);
    res.json(emple);
}

employesCtrl.BorrarEmpleado = async (req, res) => {
    //const { id } = req.params.id;//Otra forma de colocar en una variable
    await Emp.findByIdAndRemove(req.params.id);
    res.json({status: 'Empleado borrado'});
}

employesCtrl.EditarEmpleado = async (req, res) => {
    const { id } = req.params.id;//Otra forma de colocar en una variable
    const employes = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        depatamento: req.body.depatamento
    };
    await Emp.update({_id: req.params.id}, {$set: employes });
    res.json({status: 'Empleado actualizado'});
}


module.exports = employesCtrl;