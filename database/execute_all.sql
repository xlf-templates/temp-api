-- =====================================================
-- 仓库管理ERP系统 - 主执行脚本
-- 说明：按顺序执行所有SQL脚本文件
-- 使用方法：mysql -u root -p < execute_all.sql
-- =====================================================

-- 显示执行进度
SELECT '========================================' AS '';
SELECT '开始创建仓库管理ERP系统数据库...' AS '';
SELECT '========================================' AS '';

-- 1. 初始化数据库
SELECT '正在执行: 00_init.sql - 初始化数据库...' AS '';
SOURCE 00_init.sql;
SELECT '✓ 完成: 数据库初始化' AS '';

-- 2. 创建基础系统表
SELECT '正在执行: 01_base_system.sql - 创建基础管理系统表...' AS '';
SOURCE 01_base_system.sql;
SELECT '✓ 完成: 基础管理系统表创建完成' AS '';

-- 3. 创建商品管理表
SELECT '正在执行: 02_product_management.sql - 创建商品管理表...' AS '';
SOURCE 02_product_management.sql;
SELECT '✓ 完成: 商品管理表创建完成' AS '';

-- 4. 创建仓库管理表
SELECT '正在执行: 03_warehouse_management.sql - 创建仓库管理表...' AS '';
SOURCE 03_warehouse_management.sql;
SELECT '✓ 完成: 仓库管理表创建完成' AS '';

-- 5. 创建销售系统表
SELECT '正在执行: 04_sales_system.sql - 创建销售系统表...' AS '';
SOURCE 04_sales_system.sql;
SELECT '✓ 完成: 销售系统表创建完成' AS '';

-- 6. 创建采购系统表
SELECT '正在执行: 05_purchase_system.sql - 创建采购系统表...' AS '';
SOURCE 05_purchase_system.sql;
SELECT '✓ 完成: 采购系统表创建完成' AS '';

-- 7. 创建配送车辆管理表
SELECT '正在执行: 06_delivery_vehicle.sql - 创建配送车辆管理表...' AS '';
SOURCE 06_delivery_vehicle.sql;
SELECT '✓ 完成: 配送车辆管理表创建完成' AS '';

-- 8. 创建会计核算表
SELECT '正在执行: 07_accounting.sql - 创建会计核算表...' AS '';
SOURCE 07_accounting.sql;
SELECT '✓ 完成: 会计核算表创建完成' AS '';

-- 9. 导入示例数据（可选）
SELECT '正在执行: 99_sample_data.sql - 导入示例数据...' AS '';
SOURCE 99_sample_data.sql;
SELECT '✓ 完成: 示例数据导入完成' AS '';

-- 显示统计信息
USE warehouse_erp;
SELECT '========================================' AS '';
SELECT '数据库创建完成！' AS '';
SELECT '========================================' AS '';
SELECT CONCAT('数据库名称: ', DATABASE()) AS '';
SELECT CONCAT('表总数: ', COUNT(*), '张') AS '' FROM information_schema.tables WHERE table_schema = 'warehouse_erp';
SELECT '========================================' AS '';
SELECT '表清单:' AS '';
SELECT table_name AS '表名', table_comment AS '说明' 
FROM information_schema.tables 
WHERE table_schema = 'warehouse_erp' 
ORDER BY table_name;
SELECT '========================================' AS '';

