import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseLocationAttributes {
  id: number
  warehouseId: number
  locationCode: string
  name: string
  shelfNo?: string | null
  layerNo?: string | null
  positionNo?: string | null
  locationType?: number
  maxWeight?: number | null
  maxVolume?: number | null
  sortOrder?: number
  status?: number
  isDeleted?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number | null
  updatedBy?: number | null
  remark?: string | null
}

export interface WarehouseLocationCreationAttributes extends Optional<
  WarehouseLocationAttributes,
  | 'id'
  | 'shelfNo'
  | 'layerNo'
  | 'positionNo'
  | 'locationType'
  | 'maxWeight'
  | 'maxVolume'
  | 'sortOrder'
  | 'status'
  | 'isDeleted'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'remark'
> {}

export class WarehouseLocation
  extends Model<
    WarehouseLocationAttributes,
    WarehouseLocationCreationAttributes
  >
  implements WarehouseLocationAttributes
{
  public id!: number
  public warehouseId!: number
  public locationCode!: string
  public name!: string
  public shelfNo?: string | null
  public layerNo?: string | null
  public positionNo?: string | null
  public locationType?: number
  public maxWeight?: number | null
  public maxVolume?: number | null
  public sortOrder?: number
  public status?: number
  public isDeleted?: number
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: number | null
  public updatedBy?: number | null
  public remark?: string | null
}

WarehouseLocation.init(
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    warehouseId: { type: DataTypes.BIGINT, allowNull: false },
    locationCode: { type: DataTypes.STRING(50), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    shelfNo: { type: DataTypes.STRING(50), allowNull: true },
    layerNo: { type: DataTypes.STRING(20), allowNull: true },
    positionNo: { type: DataTypes.STRING(20), allowNull: true },
    locationType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    maxWeight: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    maxVolume: { type: DataTypes.DECIMAL(10, 3), allowNull: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    isDeleted: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    createdBy: { type: DataTypes.BIGINT, allowNull: true },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true },
    remark: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'warehouse_location',
    indexes: [
      { name: 'idx_warehouse_id', fields: ['warehouse_id'] },
      { name: 'idx_area_id', fields: ['area_id'] },
      {
        name: 'uk_location_code',
        unique: true,
        fields: ['warehouse_id', 'location_code'],
      },
    ],
  },
)

export default WarehouseLocation
