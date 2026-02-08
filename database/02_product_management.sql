-- =====================================================
-- 商品管理模块表
-- =====================================================
USE warehouse_erp;

-- 商品分类表
CREATE TABLE product_category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '分类ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID，0表示顶级分类',
    category_code VARCHAR(50) NOT NULL COMMENT '分类编码',
    category_name VARCHAR(100) NOT NULL COMMENT '分类名称',
    category_level INT DEFAULT 1 COMMENT '分类层级',
    sort_order INT DEFAULT 0 COMMENT '排序',
    icon VARCHAR(255) COMMENT '分类图标',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_parent_id (parent_id),
    INDEX idx_category_code (category_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品分类表';

-- 计量单位表
CREATE TABLE product_unit (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '单位ID',
    unit_code VARCHAR(20) NOT NULL UNIQUE COMMENT '单位编码',
    unit_name VARCHAR(50) NOT NULL COMMENT '单位名称',
    unit_type TINYINT COMMENT '单位类型：1-基本单位,2-辅助单位',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_unit_code (unit_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='计量单位表';

-- 商品表
CREATE TABLE product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
    product_code VARCHAR(50) NOT NULL UNIQUE COMMENT '商品编码',
    product_name VARCHAR(200) NOT NULL COMMENT '商品名称',
    product_short_name VARCHAR(100) COMMENT '商品简称',
    category_id BIGINT NOT NULL COMMENT '分类ID',
    brand VARCHAR(100) COMMENT '品牌',
    specifications VARCHAR(200) COMMENT '规格型号',
    main_unit_id BIGINT NOT NULL COMMENT '主单位ID',
    barcode VARCHAR(100) COMMENT '条形码',
    qrcode VARCHAR(255) COMMENT '二维码',
    product_type TINYINT DEFAULT 1 COMMENT '商品类型：1-普通商品,2-组合商品,3-虚拟商品',
    product_nature TINYINT DEFAULT 1 COMMENT '商品性质：1-外购,2-自制,3-委外加工',
    is_batch_manage TINYINT DEFAULT 0 COMMENT '是否批次管理：0-否,1-是',
    is_serial_manage TINYINT DEFAULT 0 COMMENT '是否序列号管理：0-否,1-是',
    is_shelf_life TINYINT DEFAULT 0 COMMENT '是否有保质期：0-否,1-是',
    shelf_life_days INT COMMENT '保质期天数',
    warning_days INT COMMENT '预警天数',
    weight DECIMAL(10,3) COMMENT '重量(kg)',
    volume DECIMAL(10,3) COMMENT '体积(m³)',
    purchase_price DECIMAL(10,2) COMMENT '采购参考价',
    sale_price DECIMAL(10,2) COMMENT '销售参考价',
    wholesale_price DECIMAL(10,2) COMMENT '批发参考价',
    min_stock DECIMAL(10,2) DEFAULT 0 COMMENT '最低库存',
    max_stock DECIMAL(10,2) DEFAULT 0 COMMENT '最高库存',
    safety_stock DECIMAL(10,2) DEFAULT 0 COMMENT '安全库存',
    is_enable_purchase TINYINT DEFAULT 1 COMMENT '允许采购：0-否,1-是',
    is_enable_sale TINYINT DEFAULT 1 COMMENT '允许销售：0-否,1-是',
    product_images TEXT COMMENT '商品图片(JSON数组)',
    product_desc TEXT COMMENT '商品描述',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_product_code (product_code),
    INDEX idx_product_name (product_name),
    INDEX idx_category_id (category_id),
    INDEX idx_barcode (barcode),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- 商品单位换算表
CREATE TABLE product_unit_convert (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    from_unit_id BIGINT NOT NULL COMMENT '源单位ID',
    to_unit_id BIGINT NOT NULL COMMENT '目标单位ID',
    convert_rate DECIMAL(10,4) NOT NULL COMMENT '换算率：1源单位=N目标单位',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认换算：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    UNIQUE KEY uk_product_units (product_id, from_unit_id, to_unit_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品单位换算表';

-- 商品批次表
CREATE TABLE product_batch (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '批次ID',
    batch_code VARCHAR(50) NOT NULL UNIQUE COMMENT '批次编码',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    production_date DATE COMMENT '生产日期',
    expiry_date DATE COMMENT '过期日期',
    supplier_id BIGINT COMMENT '供应商ID',
    purchase_order_no VARCHAR(50) COMMENT '采购单号',
    warehouse_id BIGINT COMMENT '所在仓库ID',
    quantity DECIMAL(10,2) DEFAULT 0 COMMENT '批次数量',
    available_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '可用数量',
    locked_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '锁定数量',
    cost_price DECIMAL(10,2) COMMENT '成本单价',
    batch_status TINYINT DEFAULT 1 COMMENT '批次状态：1-正常,2-待检,3-冻结,4-已空',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_batch_code (batch_code),
    INDEX idx_product_id (product_id),
    INDEX idx_expiry_date (expiry_date),
    INDEX idx_warehouse_id (warehouse_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品批次表';

-- 商品序列号表
CREATE TABLE product_serial (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '序列号ID',
    serial_no VARCHAR(100) NOT NULL UNIQUE COMMENT '序列号',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    batch_id BIGINT COMMENT '批次ID',
    warehouse_id BIGINT COMMENT '所在仓库ID',
    location_id BIGINT COMMENT '所在库位ID',
    serial_status TINYINT DEFAULT 1 COMMENT '状态：1-在库,2-已出库,3-已售出,4-已退货,5-已报损',
    purchase_order_no VARCHAR(50) COMMENT '采购单号',
    sale_order_no VARCHAR(50) COMMENT '销售单号',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_serial_no (serial_no),
    INDEX idx_product_id (product_id),
    INDEX idx_batch_id (batch_id),
    INDEX idx_warehouse_id (warehouse_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品序列号表';

-- 商品价格表
CREATE TABLE product_price (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '价格ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    price_type TINYINT NOT NULL COMMENT '价格类型：1-零售价,2-批发价,3-会员价,4-促销价,5-自定义',
    price DECIMAL(10,2) NOT NULL COMMENT '价格',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    customer_level VARCHAR(20) COMMENT '客户等级(价格类型为会员价时使用)',
    effective_date DATE COMMENT '生效日期',
    expiry_date DATE COMMENT '失效日期',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_product_id (product_id),
    INDEX idx_price_type (price_type),
    INDEX idx_effective_date (effective_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品价格表';

-- 商品组合明细表（组合商品使用）
CREATE TABLE product_combo (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    combo_product_id BIGINT NOT NULL COMMENT '组合商品ID',
    sub_product_id BIGINT NOT NULL COMMENT '子商品ID',
    quantity DECIMAL(10,2) NOT NULL COMMENT '数量',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_combo_product_id (combo_product_id),
    INDEX idx_sub_product_id (sub_product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品组合明细表';

