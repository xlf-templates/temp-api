import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface ZoneAttributes {
  id: number
  name: string
  enName: string | null
  sort: number
  status: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface ZoneCreationAttributes extends Optional<
  ZoneAttributes,
  | 'id'
  | 'name'
  | 'enName'
  | 'sort'
  | 'status'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class Zone
  extends Model<ZoneAttributes, ZoneCreationAttributes>
  implements ZoneAttributes
{
  public id!: number
  public name!: string
  public enName!: string | null
  public sort!: number
  public status!: number
  public remark?: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Zone.init(
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
    enName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '库区类型英文名称',
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
    tableName: 'zone',
  },
)

export default Zone
