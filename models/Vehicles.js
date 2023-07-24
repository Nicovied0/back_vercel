const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now,
  },
  descripcion: {
    type: String,
    default: "No se Ingresó Descripción",
  },
  userUpdate:{
    type: String
  }
});

const VehiclesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  movilNumber: {
    type: Number,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://img.icons8.com/color/720/fire-truck.png",
  },
  patent: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    default: 0,
  },
  tankSize: {
    type: Number,
    default: 0,
  },
  amountOfFuel: {
    type: Number,
    default: 0,
  },
  lastRecharge: [MaintenanceSchema],
  lastMaintenance: [MaintenanceSchema],
  lastServiceProgramed: [MaintenanceSchema],
  lastBatteryChange: [MaintenanceSchema],
  waterCapacity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  actived: {
    type: Boolean,
    default: true,
  },
});

const Vehicles = mongoose.model("Vehicle", VehiclesSchema);

module.exports = Vehicles;
