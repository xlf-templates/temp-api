import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

// 用户属性接口
export interface AdminGroupAttributes {
  id: number
  parentId: number
  code: string
  name: string
  rules: string
  status: number
  createdAt?: Date
  updatedAt?: Date
}

// 创建用户时的可选属性
export interface AdminGroupCreationAttributes extends Optional<
  AdminGroupAttributes,
  | 'id'
  | 'parentId'
  | 'code'
  | 'name'
  | 'rules'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
> {}

// 用户模型类
export class AdminGroup
  extends Model<AdminGroupAttributes, AdminGroupCreationAttributes>
  implements AdminGroupAttributes
{
  public id!: number
  public parentId!: number
  public code!: string
  public name!: string
  public rules!: string
  public status!: number

  // 时间戳
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// 定义模型
AdminGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        notEmpty: true,
      },
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        notEmpty: true,
      },
    },
    rules: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'admin_group',
    // indexes: [
    //   // 中优先级索引（根据实际查询频率决定）
    //   {
    //     name: 'admin_groups_status_idx',
    //     fields: ['status'],
    //   },

    //   // 低优先级索引（如果业务需要）
    //   // {
    //   //   name: 'admin_groups_name_search_idx',
    //   //   fields: ['name']
    //   // }
    // ],
  },
)

export default AdminGroup
