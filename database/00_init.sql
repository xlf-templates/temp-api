-- =====================================================
-- 仓库管理系统 - 数据库初始化脚本
-- 数据库版本: MySQL 8.0+
-- 字符集: utf8mb4
-- 排序规则: utf8mb4_unicode_ci
-- =====================================================

-- 创建数据库
DROP DATABASE IF EXISTS warehouse_erp;
CREATE DATABASE warehouse_erp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE warehouse_erp;

-- 设置时区
SET time_zone = '+08:00';

-- 公共字段说明:
-- id: 主键，使用BIGINT自增
-- created_at: 创建时间
-- updated_at: 更新时间
-- created_by: 创建人ID
-- updated_by: 更新人ID
-- is_deleted: 逻辑删除标记 (0-未删除, 1-已删除)
-- remark: 备注

