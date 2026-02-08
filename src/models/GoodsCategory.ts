import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface GoodsCategoryAttributes {
  id: number
  parentId: number | null
  code: string
  name: string
  enName?: string | null
  sort: number
  icon?: string | null
  status: number
  storageFeeRate?: string | null
  purchaseOrderHorizon?: number | null
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface GoodsCategoryCreationAttributes extends Optional<
  GoodsCategoryAttributes,
  | 'id'
  | 'parentId'
  | 'name'
  | 'enName'
  | 'sort'
  | 'icon'
  | 'status'
  | 'storageFeeRate'
  | 'purchaseOrderHorizon'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class GoodsCategory
  extends Model<GoodsCategoryAttributes, GoodsCategoryCreationAttributes>
  implements GoodsCategoryAttributes
{
  public id!: number
  public parentId!: number | null
  public code!: string
  public name!: string
  public enName?: string | null
  public sort!: number
  public icon?: string | null
  public status!: number
  public storageFeeRate?: string | null
  public purchaseOrderHorizon?: number
  public remark?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

GoodsCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '分类ID',
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '父分类ID，null表示顶级分类',
      references: {
        model: 'goods_category', // 自关联
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '分类编码',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '分类名称',
    },
    enName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '英文名称',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '排序',
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '分类图标',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '状态：0-停用,1-启用',
    },
    storageFeeRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: '囤货费率',
    },
    purchaseOrderHorizon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: 'PO展望期',
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '备注',
    },
  },
  {
    sequelize,
    tableName: 'goods_category',
  },
)

export default GoodsCategory
