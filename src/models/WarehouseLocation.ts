import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseLocationAttributes {
  id: number
  warehouseId: number
  zoneId?: number
  locationCode: string
  name: string
  shelfNo?: number | null
  layerNo?: number | null
  positionNo?: number | null
  locationType?: number
  maxWeight?: number | null
  maxVolume?: number | null
  length?: number | null
  width?: number | null
  height?: number | null
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
  | 'length'
  | 'width'
  | 'height'
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
  public zoneId?: number
  public locationCode!: string
  public name!: string
  public shelfNo?: number | null
  public layerNo?: number | null
  public positionNo?: number | null
  public locationType?: number
  public maxWeight?: number | null
  public maxVolume?: number | null
  public length?: number | null
  public width?: number | null
  public height?: number | null
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
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '仓库ID',
    },
    zoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
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
    shelfNo: { type: DataTypes.INTEGER, allowNull: true, comment: '货架号' },
    layerNo: { type: DataTypes.INTEGER, allowNull: true, comment: '层号' },
    positionNo: {
      type: DataTypes.INTEGER,
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
    length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '长度',
    },
    width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '宽度',
    },
    height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '高度',
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
    createdBy: { type: DataTypes.INTEGER, allowNull: true, comment: '创建人' },
    updatedBy: { type: DataTypes.INTEGER, allowNull: true, comment: '更新人' },
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
