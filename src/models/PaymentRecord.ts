import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface PaymentRecordAttributes {
  id: number
  paymentNo: string // 付款流水号
  orderId: number // 关联采购订单ID
  supplierId: number // 供应商ID
  amount: number // 付款金额
  paymentMethod: number // 付款方式：1-银行转账 2-微信 3-支付宝 4-现金 5-其他
  paymentDate: Date // 付款日期
  status: number // 状态：0-待确认 1-已确认 2-已驳回
  remark?: string | null // 备注
  voucherUrl?: string | null // 凭证图片URL
  createdBy?: number | null // 记录人
  createdAt?: Date
  updatedAt?: Date
}

export interface PaymentRecordCreationAttributes extends Optional<
  PaymentRecordAttributes,
  | 'id'
  | 'status'
  | 'remark'
  | 'voucherUrl'
  | 'createdBy'
  | 'createdAt'
  | 'updatedAt'
> {}

export class PaymentRecord
  extends Model<PaymentRecordAttributes, PaymentRecordCreationAttributes>
  implements PaymentRecordAttributes
{
  public id!: number
  public paymentNo!: string
  public orderId!: number
  public supplierId!: number
  public amount!: number
  public paymentMethod!: number
  public paymentDate!: Date
  public status!: number
  public remark?: string | null
  public voucherUrl?: string | null
  public createdBy?: number | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PaymentRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    paymentNo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      comment: '付款流水号',
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '关联采购订单ID',
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '供应商ID',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const v = (this as any).getDataValue('amount')
        return v == null ? null : Number(v)
      },
      comment: '付款金额',
    },
    paymentMethod: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: '付款方式：1-银行转账 2-微信 3-支付宝 4-现金 5-其他',
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '付款日期',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态：0-待确认 1-已确认 2-已驳回',
    },
    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: '备注',
    },
    voucherUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '凭证图片URL',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '记录人',
    },
  },
  {
    sequelize,
    tableName: 'payment_record',
    indexes: [
      { name: 'idx_pay_order_id', fields: ['order_id'] },
      { name: 'idx_pay_supplier_id', fields: ['supplier_id'] },
      { name: 'idx_pay_payment_date', fields: ['payment_date'] },
    ],
  },
)

export default PaymentRecord
