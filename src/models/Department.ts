import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface DepartmentAttributes {
  id: number
  name: string
  enName: string
  parentId: number | null
  leaderId: number | null
  sort: number
  status: number
  remark: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface DepartmentCreationAttributes extends Optional<
  DepartmentAttributes,
  | 'id'
  | 'parentId'
  | 'leaderId'
  | 'sort'
  | 'status'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class Department
  extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes
{
  public id!: number
  public name!: string
  public enName!: string
  public parentId!: number | null
  public leaderId!: number | null
  public sort!: number
  public status!: number
  public remark!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '部门ID',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '部门名称',
    },
    enName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '部门英文名称',
    },

    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '父级部门ID',
    },
    leaderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '部门负责人ID',
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
      comment: '状态：0-禁用，1-启用',
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '备注',
    },
  },
  {
    sequelize,
    tableName: 'department',
    indexes: [{ name: 'idx_dept_parent_id', fields: ['parent_id'] }],
  },
)

export default Department
