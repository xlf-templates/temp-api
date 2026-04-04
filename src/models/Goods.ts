import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'

export interface GoodsAttributes {
  id: number
  categoryId: number
  code: string
  name: string
  enName: string | null
  manufacturer?: string | null //制造厂商
  warehouseId?: number | null //仓库ID
  warehouseZoneId?: number | null //库区ID
  // warehouseLocationId?: number | null //库位ID
  supplierIds?: string | null //供应商
  packagingUnit?: number | null //包装单位
  packagingNumber?: number | null //包装数量
  packagingSpec?: string | null //包装规格
  specName?: string | null //规格名称
  inner_unit?: number | null //内包装单位
  length?: number | null //长度
  width?: number | null //宽度
  height?: number | null //高度
  weightUnit?: number | null //重量单位
  minStock: number //最小库存
  maxStock: number //最大库存
  safetyStock: number //安全库存
  palletSpec?: number //栈板规格
  netWeight?: number //净重
  grossWeight?: number //毛重
  shelfLife?: number //保质期
  warehouseDateWarning?: number //库龄预警
  status?: number //状态
  netPrice: number //来货净价
  extraFee?: number //运费杂费
  surcharge?: number //附加费
  cost: number //到库成本价
  lowestPrice: number //最低售价
  referencePrice?: number //参考进价
  firstPrice?: number //一等售价
  secondPrice?: number
  thirdPrice?: number
  fourthPrice?: number
  fifthPrice?: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface GoodsCreationAttributes extends Optional<
  GoodsAttributes,
  | 'id'
  | 'categoryId'
  | 'code'
  | 'name'
  | 'enName'
  | 'manufacturer' //制造厂商
  | 'warehouseId' //仓库ID
  // | 'warehouseLocationId' //库位ID
  | 'warehouseZoneId' //库区ID
  | 'supplierIds'
  | 'packagingUnit' //包装单位
  | 'inner_unit' //内包装单位
  | 'length' //长度
  | 'width' //宽度
  | 'height' //高度
  | 'packagingSpec' //包装规格
  | 'specName' //规格名称
  | 'weightUnit' //重量单位
  | 'minStock' //最小库存
  | 'maxStock' //最大库存
  | 'safetyStock' //安全库存
  | 'palletSpec' //保质期
  | 'netWeight' //净重
  | 'grossWeight' //毛重
  | 'shelfLife' //栈板规格
  | 'warehouseDateWarning' //库龄预警
  | 'packagingNumber' //包装数量
  | 'netPrice' //来货净价
  | 'extraFee' //运费杂费
  | 'surcharge' //附加费
  | 'cost' //到库成本价
  | 'lowestPrice' //最低售价
  | 'referencePrice' //参考进价
  | 'firstPrice' //一等售价
  | 'secondPrice'
  | 'thirdPrice'
  | 'fourthPrice'
  | 'fifthPrice'
  | 'remark'
  | 'status' //状态
  | 'createdAt'
  | 'updatedAt'
> {}

export class Goods
  extends Model<GoodsAttributes, GoodsCreationAttributes>
  implements GoodsAttributes
{
  public id!: number
  public categoryId!: number
  public code!: string
  public name!: string
  public enName!: string | null
  public manufacturer?: string | null //制造厂商
  public warehouseId?: number | null //仓库ID
  // public warehouseLocationId?: number | null //库位ID
  public warehouseZoneId?: number | null //库区ID
  public supplierIds?: string | null //供应商
  public packagingUnit?: number | null //包装单位
  public inner_unit?: number | null //内包装单位
  public length?: number | null //长度
  public width?: number | null //宽度
  public height?: number | null //高度
  public packagingSpec?: string | null //包装规格
  public specName?: string | null //规格名称
  public weightUnit?: number | null //重量单位
  public minStock!: number //最小库存
  public maxStock!: number //最大库存
  public safetyStock!: number //安全库存
  public palletSpec?: number //保质期
  public netWeight?: number //净重
  public grossWeight?: number //毛重
  public shelfLife?: number //栈板规格
  public warehouseDateWarning?: number //库龄预警
  public packagingNumber?: number //包装数量
  public netPrice!: number //来货净价
  public extraFee?: number //运费杂费
  public surcharge?: number //附加费
  public cost!: number //到库成本价
  public lowestPrice!: number //最低售价
  public referencePrice?: number //参考进价
  public firstPrice?: number //一等售价
  public secondPrice?: number
  public thirdPrice?: number
  public fourthPrice?: number
  public fifthPrice?: number
  public remark?: string | null
  public status?: number //状态

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Goods.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '商品ID',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '商品分类ID',
      references: {
        model: 'goods_category',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
      comment: '商品编码',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
      comment: '商品名称',
    },
    enName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '英文名称',
    },
    manufacturer: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '制造厂商',
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '仓库ID',
    },
    warehouseZoneId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '库区ID',
    },
    // warehouseLocationId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   defaultValue: null,
    //   comment: '库位ID',
    // },
    supplierIds: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      field: 'supplier_ids',
      get() {
        const raw = (this as any).getDataValue('supplierIds')
        return raw ? raw.split(',').map(Number) : []
      },
      set(val: any) {
        if (Array.isArray(val)) {
          (this as any).setDataValue('supplierIds', val.join(','))
        } else if (typeof val === 'string') {
          (this as any).setDataValue('supplierIds', val)
        } else {
          (this as any).setDataValue('supplierIds', '')
        }
      },
      comment: '供应商',
    },
    packagingUnit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '包装单位',
    },
    inner_unit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '内包装单位',
    },
    length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
      comment: '长度',
    },
    width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
      comment: '宽度',
    },
    height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null,
      comment: '高度',
    },
    packagingSpec: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '包装规格',
    },
    specName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '规格名称',
    },
    weightUnit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: '重量单位',
    },
    minStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最小库存',
    },
    maxStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最大库存',
    },
    safetyStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '安全库存',
    },
    palletSpec: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '栈板规格',
    },
    shelfLife: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '保质期',
    },
    warehouseDateWarning: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '库龄预警',
    },
    packagingNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '包装数量',
    },
    netWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('netWeight')
        return v == null ? null : Number(v)
      },
      comment: '净重',
    },
    grossWeight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('grossWeight')
        return v == null ? null : Number(v)
      },
      comment: '毛重',
    },
    netPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('netPrice')
        return v == null ? null : Number(v)
      },
      comment: '来货净价',
    },
    extraFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('extraFee')
        return v == null ? null : Number(v)
      },
      comment: '运费杂费',
    },
    surcharge: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('surcharge')
        return v == null ? null : Number(v)
      },
      comment: '附加费',
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('cost')
        return v == null ? null : Number(v)
      },
      comment: '到库成本价',
    },
    lowestPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        const v = (this as any).getDataValue('lowestPrice')
        return v == null ? null : Number(v)
      },
      comment: '最低售价',
    },
    referencePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('referencePrice')
        return v == null ? null : Number(v)
      },
      comment: '参考进价',
    },
    firstPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('firstPrice')
        return v == null ? null : Number(v)
      },
      comment: '一等售价',
    },
    secondPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('secondPrice')
        return v == null ? null : Number(v)
      },
    },
    thirdPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('thirdPrice')
        return v == null ? null : Number(v)
      },
    },
    fourthPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('fourthPrice')
        return v == null ? null : Number(v)
      },
    },
    fifthPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      get() {
        const v = (this as any).getDataValue('fifthPrice')
        return v == null ? null : Number(v)
      },
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '备注',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: '状态',
    },
  },
  {
    sequelize,
    tableName: 'goods',
    indexes: [
      {
        name: 'idx_categoryId',
        fields: ['category_id'],
      },
      {
        unique: true,
        name: 'uniq_category_code',
        fields: ['category_id', 'code'],
      },
    ],
    hooks: {
      beforeValidate(instance: any) {
        if (typeof instance.code === 'string')
          instance.code = instance.code.trim()
        if (typeof instance.name === 'string')
          instance.name = instance.name.trim()
      },
    },
  },
)

export default Goods
