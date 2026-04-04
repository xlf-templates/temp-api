import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface PurchaseOrderDetailAttributes {
  id: number
  orderId: number // 关联采购订单ID
  goodsId: number // 关联商品ID
  supplierId: number // 关联供应商ID
  quantity: number // 采购数量
  unitPrice: number // 采购单价
  amount: number // 总价 (quantity * unitPrice)
  receivedQty: number // 已收货数量
  taxRate: number // 税率
  status: number // 状态：0-未收货 1-部分收货 2-已全部收货
  remark?: string | null // 备注
  createdAt?: Date
  updatedAt?: Date
}

export interface PurchaseOrderDetailCreationAttributes extends Optional<
  PurchaseOrderDetailAttributes,
  | 'id'
  | 'amount'
  | 'supplierId'
  | 'receivedQty'
  | 'status'
  | 'taxRate'
  | 'remark'
  | 'createdAt'
  | 'updatedAt'
> {}

export class PurchaseOrderDetail
  extends Model<
    PurchaseOrderDetailAttributes,
    PurchaseOrderDetailCreationAttributes
  >
  implements PurchaseOrderDetailAttributes
{
  public id!: number
  public orderId!: number
  public goodsId!: number
  public supplierId!: number
  public quantity!: number
  public unitPrice!: number
  public amount!: number
  public taxRate!: number
  public receivedQty!: number
  public status!: number
  public remark?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PurchaseOrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID',
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '关联采购订单ID',
    },
    goodsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '关联商品ID',
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '关联供应商ID',
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const v = (this as any).getDataValue('quantity')
        return v == null ? null : Number(v)
      },
      comment: '采购数量',
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const v = (this as any).getDataValue('unitPrice')
        return v == null ? null : Number(v)
      },
      comment: '采购单价',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('amount')
        return v == null ? null : Number(v)
      },
      comment: '总价',
    },
    taxRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('taxRate')
        return v == null ? null : Number(v)
      },
      comment: '税率',
    },
    receivedQty: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('receivedQty')
        return v == null ? null : Number(v)
      },
      comment: '已收货数量',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '状态：0-未收货 1-部分收货 2-已全部收货',
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '备注',
    },
  },
  {
    sequelize,
    tableName: 'purchase_order_detail',
    indexes: [
      { name: 'idx_pod_order_id', fields: ['order_id'] },
      { name: 'idx_pod_goods_id', fields: ['goods_id'] },
      { name: 'idx_pod_supplier_id', fields: ['supplier_id'] },
    ],
    hooks: {
      beforeValidate: (instance: any) => {
        // 自动计算总价
        if (instance.quantity != null && instance.unitPrice != null) {
          instance.amount = Number(
            (Number(instance.quantity) * Number(instance.unitPrice)).toFixed(2),
          )
        }
      },
    },
  },
)

export default PurchaseOrderDetail
