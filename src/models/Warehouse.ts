import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseAttributes {
  id: number
  warehouseCode: string
  name: string
  warehouseType?: number | null
  state?: string | null
  city?: string | null
  district?: string | null
  address?: string | null
  contactPerson?: string | null
  contactPhone?: string | null
  area?: number | null
  managerId?: number | null
  sortOrder?: number
  status?: number
  isDeleted?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number | null
  updatedBy?: number | null
  remark?: string | null
}

export interface WarehouseCreationAttributes extends Optional<
  WarehouseAttributes,
  | 'id'
  | 'warehouseType'
  | 'state'
  | 'city'
  | 'district'
  | 'address'
  | 'contactPerson'
  | 'contactPhone'
  | 'area'
  | 'managerId'
  | 'sortOrder'
  | 'status'
  | 'isDeleted'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'remark'
> {}

export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number
  public warehouseCode!: string
  public name!: string
  public warehouseType?: number | null
  public state?: string | null
  public city?: string | null
  public district?: string | null
  public address?: string | null
  public contactPerson?: string | null
  public contactPhone?: string | null
  public area?: number | null
  public managerId?: number | null
  public sortOrder?: number
  public status?: number
  public isDeleted?: number
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: number | null
  public updatedBy?: number | null
  public remark?: string | null
}

Warehouse.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouseCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { notEmpty: true },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    warehouseType: { type: DataTypes.TINYINT, allowNull: true },
    state: { type: DataTypes.STRING(50), allowNull: true },
    city: { type: DataTypes.STRING(50), allowNull: true },
    district: { type: DataTypes.STRING(50), allowNull: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
    contactPerson: { type: DataTypes.STRING(50), allowNull: true },
    contactPhone: { type: DataTypes.STRING(20), allowNull: true },
    area: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    managerId: { type: DataTypes.BIGINT, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    createdBy: { type: DataTypes.BIGINT, allowNull: true },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'warehouse',
    indexes: [
      { name: 'idx_warehouse_code', fields: ['warehouse_code'] },
      { name: 'idx_status', fields: ['status'] },
    ],
  },
)

export default Warehouse
