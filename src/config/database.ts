import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_NAME = 'kb_wms',
  DB_USER = 'root',
  DB_PASSWORD = '',
  NODE_ENV = 'development',
} = process.env

// 创建 Sequelize 实例
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
  timezone: '+08:00', // 设置时区为东八区
})

// 测试数据库连接
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log('✅ 数据库连接成功')
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    process.exit(1)
  }
}

// 同步数据库
export const syncDatabase = async (
  options: { force?: boolean; alter?: boolean } = {}
): Promise<void> => {
  const { force = false, alter = false } = options
  try {
    await sequelize.sync({ force, alter })
    console.log('✅ 数据库同步成功')
  } catch (error) {
    console.error('❌ 数据库同步失败:', error)
    throw error
  }
}

// 保障 goods 的包装/重量单位外键为 SET NULL（并确保列允许 NULL）
export const ensureGoodsUnitFksSetNull = async (): Promise<void> => {
  try {
    // 修改列为可空
    await sequelize.query(
      'ALTER TABLE `goods` MODIFY `packaging_unit` INT NULL;',
    )
    await sequelize.query('ALTER TABLE `goods` MODIFY `weight_unit` INT NULL;')

    // 尝试删除已有外键（若存在不同名字，忽略错误）
    try {
      await sequelize.query(
        'ALTER TABLE `goods` DROP FOREIGN KEY `fk_goods_packaging_unit`;',
      )
    } catch {}
    try {
      await sequelize.query(
        'ALTER TABLE `goods` DROP FOREIGN KEY `fk_goods_weight_unit`;',
      )
    } catch {}

    // 添加 SET NULL 外键
    await sequelize.query(
      'ALTER TABLE `goods` ADD CONSTRAINT `fk_goods_packaging_unit` FOREIGN KEY (`packaging_unit`) REFERENCES `packaging_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;',
    )
    await sequelize.query(
      'ALTER TABLE `goods` ADD CONSTRAINT `fk_goods_weight_unit` FOREIGN KEY (`weight_unit`) REFERENCES `weight_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;',
    )
    console.log('✅ goods 外键已设置为 SET NULL 并允许 NULL')
  } catch (error) {
    console.error('❌ 设置 goods 外键为 SET NULL 失败:', error)
    throw error
  }
}

export default sequelize
