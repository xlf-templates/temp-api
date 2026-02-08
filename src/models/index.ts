import sequelize from '@/config/database'
import Admin from './Admin'
import AdminRules from './AdminRules'
import AdminLog from './AdminLog'
import AdminGroup from './AdminGroup'
import GoodsCategory from './GoodsCategory'
import Goods from './Goods'
import PackagingUnit from './PackagingUnit'
import WeightUnit from './WeightUnit'
import Area from './Area'
import Supplier from './Supplier'
import GoodsImage from './GoodsImage'
import Warehouse from './Warehouse'
import WarehouseArea from './WarehouseArea'
import WarehouseAreaType from './WarehouseAreaType'
import WarehouseLocation from './WarehouseLocation'
import WarehouseLocationType from './WarehouseLocationType'
import WarehouseType from './WarehouseType'

export {
  Admin,
  AdminRules,
  AdminLog,
  AdminGroup,
  GoodsCategory,
  Goods,
  PackagingUnit,
  WeightUnit,
  Area,
  Supplier,
  GoodsImage,
  Warehouse,
  WarehouseArea,
  WarehouseLocation,
  WarehouseAreaType,
  WarehouseLocationType,
  WarehouseType,
}

export const defineAssociations = () => {
  Admin.hasMany(AdminLog, { foreignKey: 'uid', as: 'logs' })
  AdminLog.belongsTo(Admin, { foreignKey: 'uid', as: 'admin' })

  Admin.belongsTo(AdminGroup, { foreignKey: 'groupId', as: 'group' })
  AdminGroup.hasMany(Admin, { foreignKey: 'groupId', as: 'admins' })

  AdminRules.hasMany(AdminRules, { foreignKey: 'parentId', as: 'children' })
  AdminRules.belongsTo(AdminRules, { foreignKey: 'parentId', as: 'parent' })

  GoodsCategory.hasMany(GoodsCategory, {
    foreignKey: 'parentId',
    as: 'children',
  })
  GoodsCategory.belongsTo(GoodsCategory, {
    foreignKey: 'parentId',
    as: 'parent',
  })

  Goods.belongsTo(GoodsCategory, {
    foreignKey: 'categoryId',
    as: 'category',
  })
  GoodsCategory.hasMany(Goods, {
    foreignKey: 'categoryId',
    as: 'goods',
  })

  Goods.belongsTo(PackagingUnit, {
    foreignKey: { name: 'packagingUnit', allowNull: true },
    as: 'packagingUnitInfo',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    constraints: true,
  })
  PackagingUnit.hasMany(Goods, {
    foreignKey: 'packagingUnit',
    as: 'goodsWithPackagingUnit',
  })

  Goods.belongsTo(WeightUnit, {
    foreignKey: { name: 'weightUnit', allowNull: true },
    as: 'weightUnitInfo',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    constraints: true,
  })
  WeightUnit.hasMany(Goods, {
    foreignKey: 'weightUnit',
    as: 'goodsWithWeightUnit',
  })

  Goods.hasMany(GoodsImage, { foreignKey: 'goodsId', as: 'images' })
  GoodsImage.belongsTo(Goods, { foreignKey: 'goodsId', as: 'goods' })

  Warehouse.hasMany(WarehouseArea, { foreignKey: 'warehouseId', as: 'areas' })
  WarehouseArea.belongsTo(Warehouse, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
  })
  Warehouse.hasMany(WarehouseLocation, {
    foreignKey: 'warehouseId',
    as: 'locations',
  })
  WarehouseLocation.belongsTo(Warehouse, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
  })
  WarehouseArea.hasMany(WarehouseLocation, {
    foreignKey: 'areaId',
    as: 'locations',
  })
  WarehouseLocation.belongsTo(WarehouseArea, {
    foreignKey: 'areaId',
    as: 'area',
  })

  Area.hasMany(Area, { foreignKey: 'parentId', as: 'children' })
  Area.belongsTo(Area, { foreignKey: 'parentId', as: 'parent' })

  Supplier.belongsTo(Area, { foreignKey: 'provinceId', as: 'province' })
  Supplier.belongsTo(Area, { foreignKey: 'cityId', as: 'city' })
  Area.hasMany(Supplier, {
    foreignKey: 'provinceId',
    as: 'suppliersInProvince',
  })
  Area.hasMany(Supplier, { foreignKey: 'cityId', as: 'suppliersInCity' })
}

export const initModels = () => {
  defineAssociations()
  return {
    sequelize,
    Admin,
    AdminRules,
    AdminLog,
    AdminGroup,
    GoodsCategory,
    Goods,
    PackagingUnit,
    WeightUnit,
    Area,
    Supplier,
    GoodsImage,
    Warehouse,
    WarehouseArea,
    WarehouseLocation,
  }
}

export default {
  sequelize,
  Admin,
  AdminRules,
  AdminLog,
  AdminGroup,
  GoodsCategory,
  Goods,
  PackagingUnit,
  WeightUnit,
  Area,
  Supplier,
  GoodsImage,
  Warehouse,
  WarehouseArea,
  WarehouseLocation,
  initModels,
  defineAssociations,
}
