import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@/config/database'
import { Op } from 'sequelize'

export interface GoodsImageAttributes {
  id: number
  goodsId: number
  url: string
  isMain: number
  sort?: number
  remark?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface GoodsImageCreationAttributes extends Optional<
  GoodsImageAttributes,
  'id' | 'sort' | 'remark' | 'createdAt' | 'updatedAt'
> {}

export class GoodsImage
  extends Model<GoodsImageAttributes, GoodsImageCreationAttributes>
  implements GoodsImageAttributes
{
  public id!: number
  public goodsId!: number
  public url!: string
  public isMain!: number
  public sort?: number
  public remark?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

GoodsImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    goodsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    isMain: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]],
      },
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    remark: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'goods_image',
    indexes: [{ name: 'idx_goods_image_goods', fields: ['goods_id'] }],
    hooks: {
      async beforeCreate(instance: GoodsImage) {
        if (instance.isMain === 1) {
          await GoodsImage.update(
            { isMain: 0 },
            { where: { goodsId: instance.goodsId } },
          )
        }
      },
      async beforeUpdate(instance: GoodsImage) {
        if (instance.changed('isMain') && instance.isMain === 1) {
          await GoodsImage.update(
            { isMain: 0 },
            {
              where: {
                goodsId: instance.goodsId,
                id: { [Op.ne]: instance.id },
              },
            },
          )
        }
      },
    },
  },
)

export default GoodsImage
