import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseLocationAttributes {
  id: number
  warehouseId: number
  areaTypeId?: number
  locationCode: string
  name: string
  shelfNo?: string | null
  layerNo?: string | null
  positionNo?: string | null
  locationType?: number
  maxWeight?: number | null
  maxVolume?: number | null
  sort?: number
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
  | 'sort'
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
  public areaTypeId?: number
  public locationCode!: string
  public name!: string
  public shelfNo?: string | null
  public layerNo?: string | null
  public positionNo?: string | null
  public locationType?: number
  public maxWeight?: number | null
  public maxVolume?: number | null
  public sort?: number
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
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '仓库ID',
    },
    areaTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:1,
      comment: '仓区类型',
    },
    locationCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '位置编码',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '位置名称',
    },
    shelfNo: { type: DataTypes.STRING(50), allowNull: true, comment: '货架号' },
    layerNo: { type: DataTypes.STRING(20), allowNull: true, comment: '层号' },
    positionNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '位置号',
    },
    locationType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '位置类型',
    },
    maxWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '最大重量',
    },
    maxVolume: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: true,
      comment: '最大体积',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '排序',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '状态',
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否删除',
    },
    createdBy: { type: DataTypes.BIGINT, allowNull: true, comment: '创建人' },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true, comment: '更新人' },
    remark: { type: DataTypes.TEXT, allowNull: true, comment: '备注' },
    
  },
  {
    sequelize,
    tableName: 'warehouse_location',
    indexes: [
      { name: 'idx_warehouse_id', fields: ['warehouse_id'] },
      {
        name: 'uk_location_code',
        unique: true,
        fields: ['warehouse_id', 'location_code'],
      },
    ],
  },
)

export default WarehouseLocation
