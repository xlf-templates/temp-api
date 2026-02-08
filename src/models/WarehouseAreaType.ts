import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseAreaTypeAttributes {
  id: number
  name: string
  sort: number
  status: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface WarehouseAreaTypeCreationAttributes extends Optional<
  WarehouseAreaTypeAttributes,
  'id' | 'name' | 'sort' | 'status' | 'remark' | 'createdAt' | 'updatedAt'
> {}

export class WarehouseAreaType
  extends Model<
    WarehouseAreaTypeAttributes,
    WarehouseAreaTypeCreationAttributes
  >
  implements WarehouseAreaTypeAttributes
{
  public id!: number
  public name!: string
  public sort!: number
  public status!: number
  public remark?: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

WarehouseAreaType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '库区类型ID',
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '库区类型名称',
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
      comment: '状态：0-停用,1-启用',
    },

    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '备注',
    },
  },
  {
    sequelize,
    tableName: 'warehouse_area_type',
  },
)

export default WarehouseAreaType
