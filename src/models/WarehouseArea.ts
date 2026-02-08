import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseAreaAttributes {
  id: number
  warehouseId: number
  areaCode: string
  areaName: string
  areaType?: number | null
  sortOrder?: number
  status?: number
  isDeleted?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number | null
  updatedBy?: number | null
  remark?: string | null
}

export interface WarehouseAreaCreationAttributes
  extends Optional<
    WarehouseAreaAttributes,
    | 'id'
    | 'areaType'
    | 'sortOrder'
    | 'status'
    | 'isDeleted'
    | 'createdAt'
    | 'updatedAt'
    | 'createdBy'
    | 'updatedBy'
    | 'remark'
  > {}

export class WarehouseArea
  extends Model<WarehouseAreaAttributes, WarehouseAreaCreationAttributes>
  implements WarehouseAreaAttributes
{
  public id!: number
  public warehouseId!: number
  public areaCode!: string
  public areaName!: string
  public areaType?: number | null
  public sortOrder?: number
  public status?: number
  public isDeleted?: number
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: number | null
  public updatedBy?: number | null
  public remark?: string | null
}

WarehouseArea.init(
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    warehouseId: { type: DataTypes.BIGINT, allowNull: false },
    areaCode: { type: DataTypes.STRING(50), allowNull: false },
    areaName: { type: DataTypes.STRING(100), allowNull: false },
    areaType: { type: DataTypes.TINYINT, allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    createdBy: { type: DataTypes.BIGINT, allowNull: true },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'warehouse_area',
    indexes: [
      { name: 'idx_warehouse_id', fields: ['warehouse_id'] },
      { name: 'uk_warehouse_area', unique: true, fields: ['warehouse_id', 'area_code'] },
    ],
  },
)

export default WarehouseArea
