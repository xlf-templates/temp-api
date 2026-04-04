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
import WarehouseLocation from './WarehouseLocation'
import WarehouseLocationType from './WarehouseLocationType'
import WarehouseType from './WarehouseType'
import Zone from './Zone'
import PurchaseOrder from './PurchaseOrder'
import PurchaseOrderDetail from './PurchaseOrderDetail'
import PaymentRecord from './PaymentRecord'
import Department from './Department'

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
  WarehouseLocation,
  WarehouseLocationType,
  WarehouseType,
  Zone,
  PurchaseOrder,
  PurchaseOrderDetail,
  PaymentRecord,
  Department,
}

export const defineAssociations = () => {
  Admin.hasMany(AdminLog, { foreignKey: 'uid', as: 'logs' })
  AdminLog.belongsTo(Admin, { foreignKey: 'uid', as: 'admin' })

  Admin.belongsTo(AdminGroup, { foreignKey: 'groupId', as: 'group' })
  AdminGroup.hasMany(Admin, { foreignKey: 'groupId', as: 'admins' })

  Admin.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' })
  Department.hasMany(Admin, { foreignKey: 'departmentId', as: 'admins' })

  Department.hasMany(Department, { foreignKey: 'parentId', as: 'children' })
  Department.belongsTo(Department, { foreignKey: 'parentId', as: 'parent' })

  Department.belongsTo(Admin, { foreignKey: 'leaderId', as: 'leader' })
  // Admin.hasMany(Department, { foreignKey: 'leaderId', as: 'ledDepartments' })

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

  Goods.belongsTo(Warehouse, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
  })
  Warehouse.hasMany(Goods, {
    foreignKey: 'warehouseId',
    as: 'goods',
  })

  Goods.belongsTo(Zone, {
    foreignKey: 'warehouseZoneId',
    as: 'warehouseZone',
  })
  Zone.hasMany(Goods, {
    foreignKey: 'warehouseZoneId',
    as: 'goods',
  })

  // Goods.belongsTo(WarehouseLocation, {
  //   foreignKey: 'warehouseLocationId',
  //   as: 'warehouseLocation',
  // })
  // WarehouseLocation.hasMany(Goods, {
  //   foreignKey: 'warehouseLocationId',
  //   as: 'goods',
  // })

  Warehouse.hasMany(WarehouseLocation, {
    foreignKey: 'warehouseId',
    as: 'locations',
  })
  WarehouseLocation.belongsTo(Warehouse, {
    foreignKey: 'warehouseId',
    as: 'warehouse',
  })

  WarehouseLocation.belongsTo(WarehouseLocationType, {
    foreignKey: 'locationType',
    as: 'type',
  })
  WarehouseLocationType.hasMany(WarehouseLocation, {
    foreignKey: 'locationType',
    as: 'locations',
  })

  WarehouseLocation.belongsTo(Zone, {
    foreignKey: 'zoneId',
    as: 'zone',
  })
  Zone.hasMany(WarehouseLocation, {
    foreignKey: 'zoneId',
    as: 'locations',
  })

  Warehouse.belongsTo(Area, { foreignKey: 'state', as: 'stateInfo' })
  Warehouse.belongsTo(Area, { foreignKey: 'city', as: 'cityInfo' })

  Area.hasMany(Area, { foreignKey: 'parentId', as: 'children' })
  Area.belongsTo(Area, { foreignKey: 'parentId', as: 'parent' })

  Supplier.belongsTo(Area, { foreignKey: 'provinceId', as: 'province' })
  Supplier.belongsTo(Area, { foreignKey: 'cityId', as: 'city' })
  Area.hasMany(Supplier, {
    foreignKey: 'provinceId',
    as: 'suppliersInProvince',
  })
  Area.hasMany(Supplier, { foreignKey: 'cityId', as: 'suppliersInCity' })

  PurchaseOrder.belongsTo(Admin, { foreignKey: 'buyerId', as: 'buyer' })
  Admin.hasMany(PurchaseOrder, { foreignKey: 'buyerId', as: 'purchaseOrders' })

  PurchaseOrder.hasMany(PurchaseOrderDetail, {
    foreignKey: 'orderId',
    as: 'details',
  })
  PurchaseOrderDetail.belongsTo(PurchaseOrder, {
    foreignKey: 'orderId',
    as: 'order',
  })

  PurchaseOrderDetail.belongsTo(Goods, { foreignKey: 'goodsId', as: 'goods' })
  Goods.hasMany(PurchaseOrderDetail, {
    foreignKey: 'goodsId',
    as: 'purchaseOrderDetails',
  })

  PurchaseOrderDetail.belongsTo(Supplier, {
    foreignKey: 'supplierId',
    as: 'supplier',
  })
  Supplier.hasMany(PurchaseOrderDetail, {
    foreignKey: 'supplierId',
    as: 'purchaseOrderDetails',
  })

  PaymentRecord.belongsTo(PurchaseOrder, { foreignKey: 'orderId', as: 'order' })
  PurchaseOrder.hasMany(PaymentRecord, {
    foreignKey: 'orderId',
    as: 'payments',
  })

  PaymentRecord.belongsTo(Supplier, {
    foreignKey: 'supplierId',
    as: 'supplier',
  })
  Supplier.hasMany(PaymentRecord, { foreignKey: 'supplierId', as: 'payments' })
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
    WarehouseLocation,
    WarehouseType,
    Zone,
    PurchaseOrder,
    PurchaseOrderDetail,
    PaymentRecord,
    Department,
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
  WarehouseLocation,
  Zone,
  Department,
  initModels,
  defineAssociations,
}
