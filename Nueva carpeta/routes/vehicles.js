const express = require("express");
const router = express.Router();
const Vehicles = require("../models/Vehicles");

// Obtener todos los vehículos
router.get("/", async (req, res) => {
  try {
    const todos = await Vehicles.find();
    console.log("Se llamó a la ruta /vehicles");
    res.json(todos);
  } catch (error) {
    console.error("Error al obtener los vehículos", error);
    res.status(500).json({ error: "Error al obtener los vehículos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicles.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    console.log(`Se llamó a la ruta /vehicles/${req.params.id}`);
    res.json(vehicle);
  } catch (error) {
    console.error("Error al obtener el vehículo", error);
    res.status(500).json({ error: "Error al obtener el vehículo" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      type,
      brand,
      model,
      year,
      color,
      image,
      patent,
      fuelType,
      mileage,
      tankSize,
      amountOfFuel,
      lastRecharge,
      lastMaintenance,
      lastServiceProgramed,
      waterCapacity,
    } = req.body;

    const newVehicle = new Vehicles({
      type,
      brand,
      model,
      year,
      color,
      image,
      patent,
      fuelType,
      mileage,
      tankSize,
      amountOfFuel,
      lastRecharge,
      lastMaintenance,
      lastServiceProgramed,
      waterCapacity,
    });

    const savedVehicle = await newVehicle.save();
    console.log("Se llamó a la ruta POST /vehicles");
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error("Error al crear el vehículo", error);
    res.status(500).json({ error: "Error al crear el vehículo" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      type,
      brand,
      model,
      year,
      color,
      image,
      patent,
      fuelType,
      mileage,
      tankSize,
      amountOfFuel,
      lastRecharge,
      lastMaintenance,
      lastServiceProgramed,
      waterCapacity,
    } = req.body;

    const updatedVehicle = await Vehicles.findByIdAndUpdate(
      req.params.id,
      {
        type,
        brand,
        model,
        year,
        color,
        image,
        patent,
        fuelType,
        mileage,
        tankSize,
        amountOfFuel,
        lastRecharge,
        lastMaintenance,
        lastServiceProgramed,
        waterCapacity,
      },
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    console.log(`Se llamó a la ruta PUT /vehicles/${req.params.id}`);
    res.json(updatedVehicle);
  } catch (error) {
    console.error("Error al modificar el vehículo", error);
    res.status(500).json({ error: "Error al modificar el vehículo" });
  }
});

/// Ruta para agregar un nuevo mantenimiento a un vehículo específico
router.post("/:id/maintenance", async (req, res) => {
  try {
    const { fecha, descripcion } = req.body;
    const maintenance = { fecha, descripcion, userUpdate: req.body.userUpdate }; // Agregamos el nombre de usuario

    const vehicle = await Vehicles.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    vehicle.lastMaintenance.push(maintenance);
    const updatedVehicle = await vehicle.save();

    console.log(`Se llamó a la ruta POST /vehicles/${req.params.id}/maintenance`);
    res.status(201).json(updatedVehicle);
  } catch (error) {
    console.error("Error al agregar el mantenimiento", error);
    res.status(500).json({ error: "Error al agregar el mantenimiento" });
  }
});

// Ruta para agregar un nuevo mantenimiento de cambio de batería a un vehículo específico
router.post("/:id/battery-change", async (req, res) => {
  try {
    const { fecha, descripcion } = req.body;
    const batteryChange = { fecha, descripcion, userUpdate: req.body.userUpdate }; // Agregamos el nombre de usuario

    const vehicle = await Vehicles.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    vehicle.lastBatteryChange.push(batteryChange);
    const updatedVehicle = await vehicle.save();

    console.log(`Se llamó a la ruta POST /vehicles/${req.params.id}/battery-change`);
    res.status(201).json(updatedVehicle);
  } catch (error) {
    console.error("Error al agregar el cambio de batería", error);
    res.status(500).json({ error: "Error al agregar el cambio de batería" });
  }
});

// Ruta para agregar un nuevo mantenimiento de recarga a un vehículo específico
router.post("/:id/recharge", async (req, res) => {
  try {
    const { fecha, descripcion } = req.body;
    const recharge = { fecha, descripcion, userUpdate: req.body.userUpdate }; // Agregamos el nombre de usuario

    const vehicle = await Vehicles.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    vehicle.lastRecharge.push(recharge);
    const updatedVehicle = await vehicle.save();

    console.log(`Se llamó a la ruta POST /vehicles/${req.params.id}/recharge`);
    res.status(201).json(updatedVehicle);
  } catch (error) {
    console.error("Error al agregar la recarga", error);
    res.status(500).json({ error: "Error al agregar la recarga" });
  }
});

// Ruta para agregar un nuevo mantenimiento programado a un vehículo específico
router.post("/:id/service-programed", async (req, res) => {
  try {
    const { fecha, descripcion } = req.body;
    const serviceProgramed = { fecha, descripcion, userUpdate: req.body.userUpdate }; // Agregamos el nombre de usuario

    const vehicle = await Vehicles.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    vehicle.lastServiceProgramed.push(serviceProgramed);
    const updatedVehicle = await vehicle.save();

    console.log(`Se llamó a la ruta POST /vehicles/${req.params.id}/service-programed`);
    res.status(201).json(updatedVehicle);
  } catch (error) {
    console.error("Error al agregar el mantenimiento programado", error);
    res.status(500).json({ error: "Error al agregar el mantenimiento programado" });
  }
});

module.exports = router;
