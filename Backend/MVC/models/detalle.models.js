const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db.conexion')

const Detalle = sequelize.define('detalles', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
 
  producto: {
      type: DataTypes.STRING(250),
      allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
},{
  timestamps: false,
  createAt: false,
  updateAt: false
})

module.exports = Detalle;