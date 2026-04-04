import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface PurchaseOrderAttributes {
  id: number
  orderNo: string // 采购单号，通常自动生成
  buyerId: number //采购员id
  totalAmount: number // 订单总金额
  paidAmount: number // 已付金额
  status: number // 状态：1待审批 2已批准 3已驳回 4部分收货 5已完成 6已取消
  paymentStatus: number // 付款状态：0-未付款 1-部分付款 2-已结清
  expectedDate?: Date | null // 预计交货日期
  remark?: string | null // 备注
  createdBy?: number | null // 创建人
  updatedBy?: number | null // 更新人
  createdAt?: Date
  updatedAt?: Date
}

export interface PurchaseOrderCreationAttributes extends Optional<
  PurchaseOrderAttributes,
  | 'id'
  | 'buyerId'
  | 'totalAmount'
  | 'paidAmount'
  | 'status'
  | 'paymentStatus'
  | 'expectedDate'
  | 'remark'
  | 'createdBy'
  | 'updatedBy'
  | 'createdAt'
  | 'updatedAt'
> {}

export class PurchaseOrder
  extends Model<PurchaseOrderAttributes, PurchaseOrderCreationAttributes>
  implements PurchaseOrderAttributes
{
  public id!: number
  public orderNo!: string
  public buyerId!: number
  public totalAmount!: number
  public paidAmount!: number
  public status!: number
  public paymentStatus!: number
  public expectedDate?: Date | null
  public remark?: string | null
  public createdBy?: number | null
  public updatedBy?: number | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PurchaseOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    orderNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '采购单号',
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '采购员ID',
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('totalAmount')
        return v == null ? null : Number(v)
      },
      comment: '订单总金额',
    },
    paidAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('paidAmount')
        return v == null ? null : Number(v)
      },
      comment: '已付金额',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态：1待审批 2已批准 3已驳回 4部分收货 5已完成 6已取消',
    },
    paymentStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '付款状态：0-未付款 1-部分付款 2-已结清',
    },
    expectedDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '预计交货日期',
    },
    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: '备注',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '创建人',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '更新人',
    },
  },
  {
    sequelize,
    tableName: 'purchase_order',
    indexes: [
      { name: 'idx_po_buyer_id', fields: ['buyer_id'] },
      { name: 'idx_po_status', fields: ['status'] },
      { name: 'idx_po_payment_status', fields: ['payment_status'] },
    ],
  },
)

export default PurchaseOrder
