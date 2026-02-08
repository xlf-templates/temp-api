import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

// 用户属性接口
export interface AdminGroupAccessAttributes {
  uid: number
  groupId: number
  createdAt?: Date
  updatedAt?: Date
}

// 创建用户时的可选属性
export interface AdminGroupAccessCreationAttributes
  extends Optional<
    AdminGroupAccessAttributes,
    'uid' | 'groupId' | 'createdAt' | 'updatedAt'
  > {}

// 用户模型类
export class AdminGroupAccess
  extends Model<AdminGroupAccessAttributes, AdminGroupAccessCreationAttributes>
  implements AdminGroupAccessAttributes
{
  public uid!: number
  public groupId!: number

  // 时间戳
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// 定义模型
AdminGroupAccess.init(
  {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // 作为复合主键的一部分
      references: {
        model: 'admin', // 关联到 admin 表
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // 作为复合主键的一部分
      references: {
        model: 'admin_group', // 关联到 admin_group 表
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'admin_group_access',
    indexes: [
      {
        name: 'admin_group_access_uid_idx',
        fields: ['uid'],
      },
      {
        name: 'admin_group_access_group_id_idx',
        fields: ['group_id'],
      },
      // 复合索引 - 用于特定查询模式
      {
        name: 'admin_group_access_uid_group_id_idx',
        fields: ['uid', 'group_id'],
      },
    ],
  }
)

export default AdminGroupAccess
