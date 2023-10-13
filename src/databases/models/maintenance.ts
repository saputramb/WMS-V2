import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface maintenanceAttributes {
  id: number;
  maintenance_date: Date;
  maintenance_status?: boolean;
  maintenance_remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type maintenancePk = "id";
export type maintenanceId = maintenance[maintenancePk];
export type maintenanceOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type maintenanceCreationAttributes = Optional<maintenanceAttributes, maintenanceOptionalAttributes>;

export class maintenance extends Model<maintenanceAttributes, maintenanceCreationAttributes> implements maintenanceAttributes {
  id!: number;
  maintenance_date!: Date;
  maintenance_status!: boolean;
  maintenance_remarks!: string;
  createdAt!: Date;
  updatedAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof maintenance {
    return sequelize.define('maintenance', {
    id: {
      autoIncrement: true,
      type: DataTypes.DECIMAL,
      allowNull: false,
      primaryKey: true
    },
    maintenance_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    maintenance_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    maintenance_remarks: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'maintenance',
    schema: 'public',
    timestamps: false,
    paranoid: true,
    indexes: [
      {
        name: "maintenance_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  }) as typeof maintenance;
  }
}
