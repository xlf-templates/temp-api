/*
 Navicat Premium Dump SQL

 Source Server         : 11
 Source Server Type    : MySQL
 Source Server Version : 80039 (8.0.39)
 Source Host           : localhost:3306
 Source Schema         : kb_wms

 Target Server Type    : MySQL
 Target Server Version : 80039 (8.0.39)
 File Encoding         : 65001

 Date: 08/02/2026 11:28:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT 1,
  `last_login_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `init_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `is_update_password` int NOT NULL DEFAULT 0,
  `group_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_2`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_3`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_4`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_5`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_6`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_7`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_8`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_9`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_10`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_11`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_12`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_13`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_14`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_15`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_16`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_17`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_18`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_19`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_20`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_21`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_22`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_23`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_24`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_25`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_26`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_27`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_28`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_29`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_30`(`username` ASC) USING BTREE,
  UNIQUE INDEX `username_31`(`username` ASC) USING BTREE,
  INDEX `admin_username`(`username` ASC) USING BTREE,
  INDEX `admin_status`(`status` ASC) USING BTREE,
  INDEX `group_id`(`group_id` ASC) USING BTREE,
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `admin_group` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '$2a$10$qrVswglS1lIN5u9vHGpmUeH8msZiNQvSqPEyNaOikVF7F7m4xbrbG', NULL, 1, '2026-02-02 01:16:08', '2025-11-20 23:26:09', '2026-02-02 01:16:08', NULL, 1, 1);
INSERT INTO `admin` VALUES (2, 'aaaa', '$2a$10$/wx.xAdLP3eJk/qlEI5Lp.lnxWu8amP1Lhghtk2e2zTZVszZcYPA6', NULL, 1, NULL, '2026-01-20 00:04:27', '2026-01-20 00:04:27', 'CF6ktD', 0, NULL);

-- ----------------------------
-- Table structure for admin_group
-- ----------------------------
DROP TABLE IF EXISTS `admin_group`;
CREATE TABLE `admin_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int NOT NULL DEFAULT 0,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `rules` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL DEFAULT '',
  `status` tinyint NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_2`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_3`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_4`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_5`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_6`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_7`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_8`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_9`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_10`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_11`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_12`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_13`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_14`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_15`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_16`(`name` ASC) USING BTREE,
  UNIQUE INDEX `name_17`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_2`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_18`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_3`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_19`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_4`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_20`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_5`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_21`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_6`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_22`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_7`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_23`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_8`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_24`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_9`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_25`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_10`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_26`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_11`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_27`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_12`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_28`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_13`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_29`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_14`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_30`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_15`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_31`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_16`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_32`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_17`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_33`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_18`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_34`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_19`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_35`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_20`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_36`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_21`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_37`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_22`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_38`(`name` ASC) USING BTREE,
  UNIQUE INDEX `code_23`(`code` ASC) USING BTREE,
  UNIQUE INDEX `name_39`(`name` ASC) USING BTREE,
  INDEX `admin_groups_status_idx`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_group
-- ----------------------------
INSERT INTO `admin_group` VALUES (1, 0, '超级管理员', '*', 1, '2025-11-23 01:23:01', '2025-11-23 01:23:01', 'surperAdmin');
INSERT INTO `admin_group` VALUES (2, 0, '采购员', '1,2,3,4,5,6', 1, '2025-11-24 00:27:02', '2026-01-19 22:34:57', 'buyer');
INSERT INTO `admin_group` VALUES (3, 0, '销售员', '1,2,3,4', 1, '2026-01-19 22:35:33', '2026-01-27 09:32:13', 'saler');

-- ----------------------------
-- Table structure for admin_group_access
-- ----------------------------
DROP TABLE IF EXISTS `admin_group_access`;
CREATE TABLE `admin_group_access`  (
  `uid` int NOT NULL,
  `group_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`uid`, `group_id`) USING BTREE,
  UNIQUE INDEX `admin_group_access_groupId_uid_unique`(`uid` ASC, `group_id` ASC) USING BTREE,
  INDEX `admin_group_access_uid_idx`(`uid` ASC) USING BTREE,
  INDEX `admin_group_access_group_id_idx`(`group_id` ASC) USING BTREE,
  INDEX `admin_group_access_uid_group_id_idx`(`uid` ASC, `group_id` ASC) USING BTREE,
  CONSTRAINT `admin_group_access_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `admin_group_access_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `admin_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_group_access
-- ----------------------------
INSERT INTO `admin_group_access` VALUES (1, 1, '2025-11-23 01:23:36', '2025-11-23 01:23:40');

-- ----------------------------
-- Table structure for admin_log
-- ----------------------------
DROP TABLE IF EXISTS `admin_log`;
CREATE TABLE `admin_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `action` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `user_agent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `admin_log_uid_created_at_idx`(`uid` ASC, `created_at` DESC) USING BTREE,
  INDEX `admin_log_action_created_at_idx`(`action` ASC, `created_at` DESC) USING BTREE,
  INDEX `admin_log_created_at_idx`(`created_at` DESC) USING BTREE,
  INDEX `admin_log_username_created_at_idx`(`username` ASC, `created_at` DESC) USING BTREE,
  INDEX `admin_log_ip_created_at_idx`(`ip` ASC, `created_at` DESC) USING BTREE,
  CONSTRAINT `admin_log_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for admin_rules
-- ----------------------------
DROP TABLE IF EXISTS `admin_rules`;
CREATE TABLE `admin_rules`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parent_id` int NULL DEFAULT NULL COMMENT '父ID',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '编码',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '标题',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL DEFAULT '' COMMENT '名称',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL DEFAULT '' COMMENT '路由路径',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '图标',
  `menu_type` enum('1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '菜单类型 类型:1目录,2菜单对应页面，3按钮',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '组件路径',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '备注',
  `sort` int NOT NULL DEFAULT 0 COMMENT '权重',
  `show` tinyint NOT NULL DEFAULT 1 COMMENT '是否显示 0=否,1=是',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态 0=禁用,1=启用',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '重定向路径',
  `en_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '英文名称',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `parent_id`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `admin_rules_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `admin_rules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_rules
-- ----------------------------
INSERT INTO `admin_rules` VALUES (1, NULL, 'goodsManagement', '', '商品管理', '/goods', 'icon-goods', '1', '', '', 99, 1, 1, '2025-11-21 22:53:12', '2026-02-07 01:21:05', NULL, 'Goods Management');
INSERT INTO `admin_rules` VALUES (2, 1, 'goodsCategroy', '', '商品分类', 'categroy', 'icon-category', '2', '/goods/category', '', 1, 1, 1, '2025-11-23 02:08:48', '2026-01-17 14:42:41', NULL, 'Goods Category');
INSERT INTO `admin_rules` VALUES (3, 1, 'goodsList', '', '商品列表', 'list', 'icon-list', '2', '/goods/list', '', 2, 1, 1, '2025-11-23 21:25:26', '2026-01-17 14:49:37', NULL, 'Goods List');
INSERT INTO `admin_rules` VALUES (4, 1, 'supplierList', '', '供应商列表', 'supplier-list', 'icon-user', '2', '/goods/supplier-list', '', 3, 1, 1, '2025-11-23 21:27:29', '2026-01-28 21:35:19', NULL, 'Supplier List');
INSERT INTO `admin_rules` VALUES (5, NULL, 'procurementManagement', '', '采购管理', '/purchase', 'icon-caigoudan', '1', '', '', 3, 1, 1, '2025-11-23 21:45:48', '2026-01-17 02:44:45', NULL, 'Procurement Management');
INSERT INTO `admin_rules` VALUES (6, 5, 'buyerList', '', '采购员列表', 'list', 'icon-list', '2', '/purchase/list', '', 1, 1, 1, '2025-11-24 00:04:38', '2026-01-17 14:49:17', NULL, 'Buyer List');
INSERT INTO `admin_rules` VALUES (7, NULL, 'systemConfig', '', '系统配置', '/system', 'icon-setting', '1', '', '', 0, 1, 1, '2025-11-26 22:38:00', '2026-01-17 20:45:55', NULL, 'System Settings');
INSERT INTO `admin_rules` VALUES (8, 7, 'userManagement', '', '用户管理', 'user', 'icon-user', '2', '/system/user', '', 0, 1, 1, '2025-11-26 22:39:18', '2026-01-17 14:45:16', NULL, 'User Management');
INSERT INTO `admin_rules` VALUES (9, 7, 'roleManagement', '', '角色管理', 'role', 'icon-guanliyuanguanli-copy', '2', '/system/role', '', 1, 1, 1, '2025-11-26 22:40:04', '2026-01-17 14:45:41', NULL, 'Role Management');
INSERT INTO `admin_rules` VALUES (10, 7, 'menuManagement', '', '菜单管理', 'menu', 'icon-category', '2', '/system/menu', '', 2, 1, 1, '2025-11-26 22:40:45', '2026-01-17 14:47:06', NULL, 'Menu Management');
INSERT INTO `admin_rules` VALUES (12, NULL, 'warehouseManagement', '', '仓库管理', '/warehouse', 'icon-cangku', '1', '', '', 2, 1, 1, '2026-01-17 03:37:38', '2026-01-17 20:46:46', NULL, 'Warehouse Management');
INSERT INTO `admin_rules` VALUES (15, 7, 'areaManagement', '', '地区管理', '/areas', 'icon-shoucang', '2', '/system/areas', '', 0, 1, 1, '2026-01-28 22:02:15', '2026-01-28 22:02:15', NULL, 'areaManagement');
INSERT INTO `admin_rules` VALUES (16, 7, 'packagingUnit', '', '包装单位', 'packagingUnit', 'icon-caigouyuan', '2', '/system/packaging-unit', '', 0, 1, 1, '2026-01-29 23:04:11', '2026-01-29 23:08:52', NULL, 'packagingUnit');
INSERT INTO `admin_rules` VALUES (17, 7, 'weightUnit', '', '重量单位', 'weight-unit', 'icon-a-Dragtuozhuai', '2', '/system/weight-unit', '', 0, 1, 1, '2026-01-30 01:22:55', '2026-01-30 01:25:14', NULL, 'Weight Unit');
INSERT INTO `admin_rules` VALUES (18, 1, 'createGoods', '', '创建商品', 'add', '', '2', '/goods/add', '', 0, 0, 1, '2026-02-02 00:38:11', '2026-02-02 00:38:11', NULL, 'Create Goods');
INSERT INTO `admin_rules` VALUES (19, 1, 'editGoods', '', '编辑商品', 'eidt/:id', '', '2', '/goods/edit', '', 0, 0, 1, '2026-02-02 00:39:36', '2026-02-02 00:39:36', NULL, 'Edit Goods');
INSERT INTO `admin_rules` VALUES (20, 12, 'warehouseList', '', '仓库列表', 'list', 'icon-listo', '2', '/warehouse/list', '', 0, 1, 1, '2026-02-02 00:40:57', '2026-02-02 00:40:57', NULL, 'Waehouse List');
INSERT INTO `admin_rules` VALUES (21, 12, 'warehouseArea', '', '库区管理', 'area', 'icon-cangku1', '2', '/warehouse/area', '', 0, 0, 0, '2026-02-02 00:44:03', '2026-02-07 01:05:43', NULL, 'Warehouse Area');
INSERT INTO `admin_rules` VALUES (22, 12, 'warehouseLocation', '', '库位管理', 'location', 'icon-kuwei', '2', '/warehouse/location', '', 0, 1, 1, '2026-02-02 00:45:16', '2026-02-07 01:05:54', NULL, 'Warehouse Location');
INSERT INTO `admin_rules` VALUES (23, 12, 'warehouseType', '', '仓库类型', 'warehouse-type', 'icon-category', '2', '/warehouse/type', '', 0, 1, 1, '2026-02-02 00:46:47', '2026-02-02 00:46:47', NULL, 'Warehouse Type');
INSERT INTO `admin_rules` VALUES (24, 12, 'warehouseAreaType', '', '库区类型', 'area-type', 'icon-website', '2', '/warehouse/area-type', '', 0, 0, 0, '2026-02-02 00:48:07', '2026-02-07 01:06:04', NULL, 'Warehouse Area Type');
INSERT INTO `admin_rules` VALUES (25, 12, 'warehouseLocationType', '', '库位类型', 'location-type', 'icon-a-Dragtuozhuai', '2', '/warehouse/location-type', '', 0, 1, 1, '2026-02-02 00:49:13', '2026-02-02 00:49:13', NULL, 'Warehouse Location Type');

-- ----------------------------
-- Table structure for area
-- ----------------------------
DROP TABLE IF EXISTS `area`;
CREATE TABLE `area`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '地区ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '名称',
  `parent_id` int NULL DEFAULT NULL COMMENT '父级ID；NULL为省，非NULL为城市',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `en_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '编码',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_area_parent`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `area_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `area` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of area
-- ----------------------------
INSERT INTO `area` VALUES (1, '德克萨斯', NULL, 0, 1, NULL, '2026-01-28 22:11:21', '2026-01-29 00:16:14', 'Texas', 'TX');
INSERT INTO `area` VALUES (2, '休斯顿', 1, 0, 1, NULL, '2026-01-28 22:22:23', '2026-01-29 23:01:47', 'Houston', 'Houston');
INSERT INTO `area` VALUES (6, '加利福尼亚州', NULL, 0, 1, NULL, '2026-01-29 22:16:57', '2026-01-29 22:16:57', 'California', 'CA');
INSERT INTO `area` VALUES (7, '洛杉矶', 6, 0, 1, NULL, '2026-01-29 22:18:01', '2026-01-29 22:18:01', 'Los Angeles', 'L.A.');
INSERT INTO `area` VALUES (8, '达拉斯', 1, 0, 1, NULL, '2026-01-29 23:01:15', '2026-01-29 23:01:15', 'Dallas', 'Dallas');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID',
  `category_id` int NULL DEFAULT NULL COMMENT '商品分类ID',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '商品编码',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '商品名称',
  `en_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '英文名称',
  `manufacturer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '制造厂商',
  `packaging_unit` int NULL DEFAULT NULL COMMENT '包装单位',
  `packaging_spec` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '包装规格',
  `spece_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '规格名称',
  `weight_unit` int NULL DEFAULT NULL,
  `min_stock` int NOT NULL DEFAULT 0 COMMENT '最小库存',
  `max_stock` int NOT NULL DEFAULT 0 COMMENT '最大库存',
  `safety_stock` int NOT NULL DEFAULT 0 COMMENT '安全库存',
  `pallet_spec` int NULL DEFAULT NULL COMMENT '栈板规格',
  `warranty_period` int NULL DEFAULT NULL COMMENT '保质期',
  `warehouse_date_warning` int NULL DEFAULT NULL COMMENT '库龄预警',
  `packaging_number` int NULL DEFAULT NULL COMMENT '包装数量',
  `net_weight` decimal(10, 2) NULL DEFAULT NULL COMMENT '净重',
  `gross_weight` decimal(10, 2) NULL DEFAULT NULL COMMENT '毛重',
  `net_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '来货净价',
  `extra_fee` decimal(10, 2) NULL DEFAULT NULL COMMENT '运费杂费',
  `surcharge` decimal(10, 2) NULL DEFAULT NULL COMMENT '附加费',
  `cost` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '到库成本价',
  `lowest_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '最低售价',
  `reference_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '参考进价',
  `first_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '一等售价',
  `second_price` decimal(10, 2) NULL DEFAULT NULL,
  `third_price` decimal(10, 2) NULL DEFAULT NULL,
  `fourth_price` decimal(10, 2) NULL DEFAULT NULL,
  `fifth_price` decimal(10, 2) NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `supplier_ids` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '供应商',
  `warehouse_id` int NULL DEFAULT NULL COMMENT '仓库ID',
  `warehouse_location_id` int NULL DEFAULT NULL COMMENT '库位ID',
  `warehouse_area_id` int NULL DEFAULT NULL COMMENT '库区ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uniq_category_code`(`category_id` ASC, `code` ASC) USING BTREE,
  INDEX `idx_categoryId`(`category_id` ASC) USING BTREE,
  INDEX `idx_goods_code`(`code` ASC) USING BTREE,
  INDEX `fk_goods_packaging_unit`(`packaging_unit` ASC) USING BTREE,
  INDEX `fk_goods_weight_unit`(`weight_unit` ASC) USING BTREE,
  CONSTRAINT `fk_goods_packaging_unit` FOREIGN KEY (`packaging_unit`) REFERENCES `packaging_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_goods_weight_unit` FOREIGN KEY (`weight_unit`) REFERENCES `weight_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_76` FOREIGN KEY (`category_id`) REFERENCES `goods_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_77` FOREIGN KEY (`packaging_unit`) REFERENCES `packaging_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `goods_ibfk_78` FOREIGN KEY (`weight_unit`) REFERENCES `weight_unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for goods_category
-- ----------------------------
DROP TABLE IF EXISTS `goods_category`;
CREATE TABLE `goods_category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `parent_id` int NULL DEFAULT NULL COMMENT '父分类ID，0表示顶级分类',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '分类编码',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '分类名称',
  `en_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT '' COMMENT '英文名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '分类图标',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `storage_fee_rate` decimal(10, 2) NULL DEFAULT NULL COMMENT '囤货费率',
  `purchase_order_horizon` int NULL DEFAULT NULL COMMENT 'PO展望期',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_parentId`(`parent_id` ASC) USING BTREE,
  INDEX `idx_code`(`code` ASC) USING BTREE,
  CONSTRAINT `goods_category_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `goods_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_category
-- ----------------------------
INSERT INTO `goods_category` VALUES (14, NULL, ' frozenSeafood', '冷冻海鲜', 'Frozen Seafood', 0, NULL, 1, 1.00, 30, NULL, '2026-02-01 15:24:02', '2026-02-01 15:24:02');
INSERT INTO `goods_category` VALUES (15, NULL, 'frozenDessert', '冷冻甜点', 'Frozen Dessert', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:27:21', '2026-02-01 15:27:21');
INSERT INTO `goods_category` VALUES (16, NULL, 'frozenMeat', '冷冻肉', 'Frozen Meat', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:28:39', '2026-02-01 15:28:39');
INSERT INTO `goods_category` VALUES (17, NULL, 'frozenVegetable', '冷冻熟菜', 'Frozen Vegetable', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:32:36', '2026-02-01 15:32:59');
INSERT INTO `goods_category` VALUES (18, NULL, 'canFood', '罐头', 'Can Food', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:33:38', '2026-02-01 15:33:38');
INSERT INTO `goods_category` VALUES (19, NULL, 'grain', '粮食', 'Grain', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:34:21', '2026-02-01 15:34:21');
INSERT INTO `goods_category` VALUES (20, NULL, 'dryFood', '干粮', 'Dry Food', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:34:53', '2026-02-01 15:34:53');
INSERT INTO `goods_category` VALUES (21, NULL, 'vegetarianFood', '素食品', 'Vegetarian Food', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:36:28', '2026-02-01 15:36:42');
INSERT INTO `goods_category` VALUES (22, NULL, 'softDrink', '汽水', 'Soft Drink', 0, NULL, 1, NULL, NULL, NULL, '2026-02-01 15:39:37', '2026-02-01 15:39:37');

-- ----------------------------
-- Table structure for goods_image
-- ----------------------------
DROP TABLE IF EXISTS `goods_image`;
CREATE TABLE `goods_image`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `goods_id` int NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `is_main` tinyint NOT NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_goods_image_goods`(`goods_id` ASC) USING BTREE,
  CONSTRAINT `goods_image_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_image
-- ----------------------------

-- ----------------------------
-- Table structure for packaging_unit
-- ----------------------------
DROP TABLE IF EXISTS `packaging_unit`;
CREATE TABLE `packaging_unit`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '包装单位ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '包装单位名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of packaging_unit
-- ----------------------------
INSERT INTO `packaging_unit` VALUES (1, 'Case/箱', 1, 1, NULL, '2026-01-30 01:08:20', '2026-01-30 01:08:20');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '供应商ID',
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '供应商编码',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '供应商名称',
  `en_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '供应商英文名称',
  `contact` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '联系人',
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '联系电话',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '地址',
  `province_id` int NULL DEFAULT NULL COMMENT '省ID（Area.id，parentId为NULL）',
  `city_id` int NULL DEFAULT NULL COMMENT '市ID（Area.id，parentId非NULL）',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_supplier_code`(`code` ASC) USING BTREE,
  INDEX `idx_supplier_province`(`province_id` ASC) USING BTREE,
  INDEX `idx_supplier_city`(`city_id` ASC) USING BTREE,
  CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `area` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `area` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES (1, 's0001', '供应商1', 'supplier-1', 'Liu', '021545577', NULL, 1, 8, 1, NULL, '2026-01-28 23:36:36', '2026-02-07 02:00:46', 'ee@.18com');
INSERT INTO `supplier` VALUES (2, 's0002', '供应商2', 'supplier2', 'lee', '02112345678', NULL, 1, 2, 1, NULL, '2026-02-01 15:21:12', '2026-02-07 01:51:45', NULL);

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `warehouse_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `warehouse_type` tinyint NULL DEFAULT NULL,
  `state` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `contact_person` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `area` decimal(10, 2) NULL DEFAULT NULL,
  `manager_id` bigint NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 1,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `created_by` bigint NULL DEFAULT NULL,
  `updated_by` bigint NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_warehouse_code`(`warehouse_code` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse
-- ----------------------------

-- ----------------------------
-- Table structure for warehouse_area
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_area`;
CREATE TABLE `warehouse_area`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `warehouse_id` bigint NOT NULL,
  `area_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `area_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `area_type` tinyint NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 1,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `created_by` bigint NULL DEFAULT NULL,
  `updated_by` bigint NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_warehouse_area`(`warehouse_id` ASC, `area_code` ASC) USING BTREE,
  INDEX `idx_warehouse_id`(`warehouse_id` ASC) USING BTREE,
  CONSTRAINT `warehouse_area_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_area
-- ----------------------------

-- ----------------------------
-- Table structure for warehouse_area_type
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_area_type`;
CREATE TABLE `warehouse_area_type`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '库区类型ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '库区类型名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_area_type
-- ----------------------------
INSERT INTO `warehouse_area_type` VALUES (1, '常温区', 0, 1, NULL, '2026-02-02 01:22:18', '2026-02-02 01:22:18');
INSERT INTO `warehouse_area_type` VALUES (2, '冷藏区', 0, 1, NULL, '2026-02-02 01:22:25', '2026-02-02 01:22:25');
INSERT INTO `warehouse_area_type` VALUES (3, '冷冻区', 0, 1, NULL, '2026-02-02 01:22:34', '2026-02-02 01:22:34');

-- ----------------------------
-- Table structure for warehouse_location
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_location`;
CREATE TABLE `warehouse_location`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `warehouse_id` bigint NOT NULL,
  `area_id` bigint NOT NULL,
  `location_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL,
  `shelf_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `layer_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `position_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL DEFAULT NULL,
  `location_type` tinyint NOT NULL DEFAULT 1,
  `max_weight` decimal(10, 2) NULL DEFAULT NULL,
  `max_volume` decimal(10, 3) NULL DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT 0,
  `status` tinyint NOT NULL DEFAULT 1,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `created_by` bigint NULL DEFAULT NULL,
  `updated_by` bigint NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_location_code`(`warehouse_id` ASC, `location_code` ASC) USING BTREE,
  INDEX `idx_warehouse_id`(`warehouse_id` ASC) USING BTREE,
  INDEX `idx_area_id`(`area_id` ASC) USING BTREE,
  CONSTRAINT `warehouse_location_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `warehouse_location_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `warehouse_area` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_location
-- ----------------------------

-- ----------------------------
-- Table structure for warehouse_location_type
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_location_type`;
CREATE TABLE `warehouse_location_type`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '库位类型ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '库位类型名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_location_type
-- ----------------------------
INSERT INTO `warehouse_location_type` VALUES (1, '存储位', 0, 1, NULL, '2026-02-02 01:23:43', '2026-02-02 01:23:43');
INSERT INTO `warehouse_location_type` VALUES (2, '拣货位', 0, 1, NULL, '2026-02-02 01:23:56', '2026-02-02 01:23:56');
INSERT INTO `warehouse_location_type` VALUES (3, '收货位', 0, 1, NULL, '2026-02-02 01:24:05', '2026-02-02 01:24:05');
INSERT INTO `warehouse_location_type` VALUES (4, '发货位', 0, 1, NULL, '2026-02-02 01:24:15', '2026-02-02 01:24:15');

-- ----------------------------
-- Table structure for warehouse_type
-- ----------------------------
DROP TABLE IF EXISTS `warehouse_type`;
CREATE TABLE `warehouse_type`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '仓库类型ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '仓库类型名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warehouse_type
-- ----------------------------
INSERT INTO `warehouse_type` VALUES (1, '冷冻仓库', 1, 1, NULL, '2026-02-02 01:06:50', '2026-02-02 01:07:51');
INSERT INTO `warehouse_type` VALUES (2, '常温仓库', 0, 1, NULL, '2026-02-02 01:08:08', '2026-02-02 01:08:08');

-- ----------------------------
-- Table structure for weight_unit
-- ----------------------------
DROP TABLE IF EXISTS `weight_unit`;
CREATE TABLE `weight_unit`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '重量单位ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NOT NULL COMMENT '重量单位名称',
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态：0-停用,1-启用',
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_croatian_ci NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_croatian_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weight_unit
-- ----------------------------
INSERT INTO `weight_unit` VALUES (1, '磅', 1, 1, NULL, '2026-01-30 01:27:06', '2026-01-30 01:27:06');
INSERT INTO `weight_unit` VALUES (4, '千克', 1, 1, '1', '2026-02-01 15:16:18', '2026-02-01 15:16:18');

SET FOREIGN_KEY_CHECKS = 1;
