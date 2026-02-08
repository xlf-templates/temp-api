import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface AreaAttributes {
  id: number
  name: string
  enName: string
  code: string
  parentId: number | null
  sort: number
  status: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface AreaCreationAttributes extends Optional<
  AreaAttributes,
  | 'id'
  | 'name'
  | 'enName'
  | 'code'
  | 'parentId'
  | 'sort'
  | 'status'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class Area
  extends Model<AreaAttributes, AreaCreationAttributes>
  implements AreaAttributes
{
  public id!: number
  public name!: string
  public enName!: string
  public code!: string
  public parentId!: number | null
  public sort!: number
  public status!: number
  public remark?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Area.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '地区ID',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '名称',
    },
    enName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '英文名称',
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '编码',
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '父级ID；NULL为省，非NULL为城市',
      references: {
        model: 'area',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    tableName: 'area',
    indexes: [
      {
        name: 'idx_area_parent',
        fields: ['parent_id'],
      },
    ],
  },
)

export default Area
