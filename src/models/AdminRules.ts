import { DataTypes, Model } from 'sequelize'
import sequelize from '@/config/database'
export interface AdminRulesAttributes {
  id: number
  parentId: number | null
  code: string
  title?: string
  name: string
  enName: string
  path: string
  icon?: string
  menuType: string
  component?: string
  remark?: string
  sort: number
  show: number
  status: number
  redirect?: string
  createdAt?: Date
  updatedAt?: Date
}

export type AdminRulesCreationAttributes = Partial<AdminRulesAttributes>

// 定义模型
export class AdminRules
  extends Model<AdminRulesAttributes, AdminRulesCreationAttributes>
  implements AdminRulesAttributes
{
  public id!: number
  public parentId!: number | null
  public code!: string
  public title?: string
  public name!: string
  public enName!: string
  public path!: string
  public icon?: string
  public menuType!: string
  public component?: string
  public remark!: string
  public sort!: number
  public show!: number
  public status!: number
  public redirect?: string

  // 时间戳
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

// 定义模型
AdminRules.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '父ID',
      references: {
        model: 'admin_rules', // 自关联
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '编码',
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '标题',
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: '',
      comment: '名称',
    },
    enName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '英文名称',
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '路由路径',
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comment: '图标',
    },
    menuType: {
      type: DataTypes.ENUM('1', '2', '3'),
      allowNull: false,
      comment: '菜单类型 类型:1目录,2菜单对应页面，3按钮',
    },

    component: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comment: '组件路径',
    },

    remark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comment: '备注',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '权重',
    },
    show: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '是否显示 0=否,1=是',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '状态 0=禁用,1=启用',
    },
    redirect: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '重定向路径',
    },
  },
  {
    sequelize,
    tableName: 'admin_rules',
  },
)
export default AdminRules
