import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseAreaAttributes {
  id: number
  warehouseId: number
  areaCode: string
  areaName: string
  areaType?: number | null
  sort?: number
  status?: number
  isDeleted?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number | null
  updatedBy?: number | null
  remark?: string | null
}

export interface WarehouseAreaCreationAttributes extends Optional<
  WarehouseAreaAttributes,
  | 'id'
  | 'areaType'
  | 'sort'
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
  public sort?: number
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
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    warehouseId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '仓库ID',
    },
    areaCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '区域编码',
    },
    areaName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '区域名称',
    },
    areaType: { type: DataTypes.TINYINT, allowNull: true, comment: '区域类型' },
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
      comment: '状态：0-停用,1-启用',
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否删除：0-未删除,1-已删除',
    },
    createdBy: { type: DataTypes.BIGINT, allowNull: true, comment: '创建人ID' },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true, comment: '更新人ID' },
    remark: { type: DataTypes.TEXT, allowNull: true, comment: '备注' },
  },
  {
    sequelize,
    tableName: 'warehouse_area',
    indexes: [
      { name: 'idx_warehouse_id', fields: ['warehouse_id'] },
      {
        name: 'uk_warehouse_area',
        unique: true,
        fields: ['warehouse_id', 'area_code'],
      },
    ],
  },
)

export default WarehouseArea
