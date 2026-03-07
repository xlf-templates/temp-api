import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface WarehouseAttributes {
  id: number
  warehouseCode: string
  name: string
  warehouseType?: number | null
  state?: number | null
  city?: number | null
  district?: string | null
  address?: string | null
  contactPerson?: string | null
  contactPhone?: string | null
  area?: number | null
  managerId?: number | null
  sort?: number
  status?: number
  isDeleted?: number
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number | null
  updatedBy?: number | null
  remark?: string | null
}

export interface WarehouseCreationAttributes extends Optional<
  WarehouseAttributes,
  | 'id'
  | 'warehouseType'
  | 'state'
  | 'city'
  | 'district'
  | 'address'
  | 'contactPerson'
  | 'contactPhone'
  | 'area'
  | 'managerId'
  | 'sort'
  | 'status'
  | 'isDeleted'
  | 'createdAt'
  | 'updatedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'remark'
> {}

export class Warehouse
  extends Model<WarehouseAttributes, WarehouseCreationAttributes>
  implements WarehouseAttributes
{
  public id!: number
  public warehouseCode!: string
  public name!: string
  public warehouseType?: number | null
  public state?: number | null
  public city?: number | null
  public district?: string | null
  public address?: string | null
  public contactPerson?: string | null
  public contactPhone?: string | null
  public area?: number | null
  public managerId?: number | null
  public sort?: number
  public status?: number
  public isDeleted?: number
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: number | null
  public updatedBy?: number | null
  public remark?: string | null
}

Warehouse.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    warehouseCode: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { notEmpty: true },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    warehouseType: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: '仓库类型',
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'area',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      comment: '州',
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'area',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      comment: '市',
    },
    district: { type: DataTypes.STRING(50), allowNull: true, comment: '区县' },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '详细地址',
    },
    contactPerson: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '联系人',
    },
    contactPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '联系电话',
    },
    area: { type: DataTypes.DECIMAL(10, 2), allowNull: true, comment: '面积' },
    managerId: { type: DataTypes.BIGINT, allowNull: true, comment: '负责人' },
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
      comment: '状态',
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否删除',
    },
    createdBy: { type: DataTypes.BIGINT, allowNull: true, comment: '创建人' },
    updatedBy: { type: DataTypes.BIGINT, allowNull: true, comment: '更新人' },
    remark: { type: DataTypes.TEXT, allowNull: true, comment: '备注' },
  },
  {
    sequelize,
    tableName: 'warehouse',
    indexes: [
      { name: 'idx_warehouse_code', fields: ['warehouse_code'] },
      { name: 'idx_status', fields: ['status'] },
    ],
  },
)

export default Warehouse
