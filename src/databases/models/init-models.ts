import type { Sequelize } from "sequelize";
import { maintenance as _maintenance } from "./maintenance";
import type { maintenanceAttributes, maintenanceCreationAttributes } from "./maintenance";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _maintenance as maintenance,
  _user as user,
};

export type {
  maintenanceAttributes,
  maintenanceCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const maintenance = _maintenance.initModel(sequelize);
  const user = _user.initModel(sequelize);


  return {
    maintenance: maintenance,
    user: user,
  };
}
