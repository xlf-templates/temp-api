import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'
import Area from './Area'

export interface SupplierAttributes {
  id: number
  code: string
  name: string
  enName: string
  contact?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  provinceId?: number | null
  cityId?: number | null
  status: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface SupplierCreationAttributes extends Optional<
  SupplierAttributes,
  | 'id'
  | 'name'
  | 'enName'
  | 'code'
  | 'contact'
  | 'phone'
  | 'email'
  | 'address'
  | 'provinceId'
  | 'cityId'
  | 'status'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes
{
  public id!: number
  public code!: string
  public name!: string
  public enName!: string
  public contact?: string | null
  public phone?: string | null
  public email?: string | null
  public address?: string | null
  public provinceId?: number | null
  public cityId?: number | null
  public status!: number
  public remark?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '供应商ID',
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
      comment: '供应商编码',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
      comment: '供应商名称',
    },
    enName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
      comment: '供应商英文名称',
    },
    contact: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '联系人',
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '联系电话',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '邮箱',
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '地址',
    },
    provinceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '省ID（Area.id，parentId为NULL）',
      references: {
        model: 'area',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '市ID（Area.id，parentId非NULL）',
      references: {
        model: 'area',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    tableName: 'supplier',
    indexes: [
      { name: 'idx_supplier_code', fields: ['code'] },
      { name: 'idx_supplier_province', fields: ['province_id'] },
      { name: 'idx_supplier_city', fields: ['city_id'] },
    ],
    hooks: {
      async beforeValidate(instance: Supplier) {
        if (typeof instance.code === 'string')
          instance.code = instance.code.trim()
        if (typeof instance.name === 'string')
          instance.name = instance.name.trim()
      },
      async beforeCreate(instance: Supplier) {
        await validateAreaLevels(instance)
      },
      async beforeUpdate(instance: Supplier) {
        await validateAreaLevels(instance)
      },
    },
  },
)

const validateAreaLevels = async (supplier: Supplier) => {
  // 校验省份：必须是 parentId 为 NULL
  if (supplier.provinceId) {
    const province = await Area.findByPk(supplier.provinceId)
    if (!province || province.parentId !== null) {
      throw new Error('省份无效：应引用 parentId 为 NULL 的 Area')
    }
  }

  // 校验城市：必须是 parentId 非 NULL，且若有省份则城市.parentId 等于省份ID
  if (supplier.cityId) {
    const city = await Area.findByPk(supplier.cityId)
    if (!city || city.parentId === null) {
      throw new Error('城市无效：应引用 parentId 非 NULL 的 Area')
    }
    if (supplier.provinceId && city.parentId !== supplier.provinceId) {
      throw new Error('城市与省份不匹配：城市的 parentId 必须等于省份ID')
    }
  }
}

export default Supplier
