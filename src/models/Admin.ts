import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'
import bcrypt from 'bcryptjs'

// 用户属性接口
export interface AdminAttributes {
  id: number
  username: string
  realName?: string | null
  password: string
  initPassword: string
  phone?: string | null
  email?: string | null
  isUpdatePassword: number
  groupId: number | null
  departmentId?: number | null // 新增部门ID关联
  avatar?: string
  sex?: number | null
  status: number
  lastLoginAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

// 创建用户时的可选属性
// 新增phone字段到创建属性接口
export interface AdminCreationAttributes extends Optional<
  AdminAttributes,
  | 'id'
  | 'avatar'
  | 'initPassword'
  | 'isUpdatePassword'
  | 'groupId'
  | 'departmentId'
  | 'status'
  | 'lastLoginAt'
  | 'createdAt'
  | 'updatedAt'
> {
  phone?: string | null
  email?: string | null
}

// 用户模型类
export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: number
  public username!: string
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public password!: string
  public realName?: string | null
  public sex?: number | null
  public phone?: string | null
  public email?: string | null
  public initPassword!: string
  public isUpdatePassword!: number
  public groupId!: number
  public departmentId?: number | null
  public avatar?: string
  public status!: number
  public lastLoginAt?: Date

  // 时间戳
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // 实例方法：验证密码
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  // 实例方法：更新最后登录时间
  public async updateLastLogin(): Promise<void> {
    this.lastLoginAt = new Date()
    await this.save()
  }

  // 实例方法：获取安全的用户信息（不包含密码）
  public toSafeJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = this.toJSON()
    return safeUser
  }
}

// 定义模型
Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '用户邮箱',
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 20],
        notEmpty: true,
      },
    },
    realName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '用户真实姓名',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255],
        notEmpty: true,
      },
    },

    initPassword: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isUpdatePassword: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '关联的部门ID',
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '用户性别,0:未知,1:男,2:女',
      validate: {
        isIn: [[0, 1, 2]],
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '用户手机号',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'admin',
    indexes: [
      {
        fields: ['username'],
      },
      {
        fields: ['status'],
      },
    ],
    hooks: {
      // 创建用户前加密密码
      beforeCreate: async (user: Admin) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      // 更新用户前加密密码
      beforeUpdate: async (user: Admin) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
    },
  },
)

export default Admin
