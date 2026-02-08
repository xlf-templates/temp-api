import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface AdminLogAttributes {
  id: number
  uid: number
  username: string
  url: string
  title: string
  action: string
  data: string
  ip: string
  userAgent: string
  createdAt?: Date
  updatedAt?: Date
}
export interface AdminLogCreationAttributes
  extends Optional<
    AdminLogAttributes,
    | 'id'
    | 'uid'
    | 'username'
    | 'url'
    | 'title'
    | 'action'
    | 'data'
    | 'ip'
    | 'userAgent'
    | 'createdAt'
    | 'updatedAt'
  > {}

// 用户模型类
export class AdminLog
  extends Model<AdminLogAttributes, AdminLogCreationAttributes>
  implements AdminLogAttributes
{
  public id!: number
  public uid!: number
  public username!: string
  public url!: string
  public title!: string
  public action!: string
  public data!: string
  public ip!: string
  public userAgent!: string

  // 时间戳
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// 定义模型
AdminLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admin', // 关联到 admin 表
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'admin_log',
    indexes: [
      {
        name: 'admin_log_uid_created_at_idx',
        fields: ['uid', { name: 'created_at', order: 'DESC' }],
      },

      // 2. action + 时间 复合索引 ⭐️⭐️⭐️⭐️
      {
        name: 'admin_log_action_created_at_idx',
        fields: ['action', { name: 'created_at', order: 'DESC' }],
      },

      // 3. 时间索引 ⭐️⭐️⭐️⭐️
      {
        name: 'admin_log_created_at_idx',
        fields: [{ name: 'created_at', order: 'DESC' }],
      },

      // 4. username + 时间 复合索引 ⭐️⭐️⭐️
      {
        name: 'admin_log_username_created_at_idx',
        fields: ['username', { name: 'created_at', order: 'DESC' }],
      },

      // 5. ip + 时间 复合索引 ⭐️⭐️
      {
        name: 'admin_log_ip_created_at_idx',
        fields: ['ip', { name: 'created_at', order: 'DESC' }],
      },
    ],
  }
)
export default AdminLog
