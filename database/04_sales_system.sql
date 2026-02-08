-- =====================================================
-- 销售系统模块表
-- =====================================================
USE warehouse_erp;

-- 客户表
CREATE TABLE customer (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '客户ID',
    customer_code VARCHAR(50) NOT NULL UNIQUE COMMENT '客户编码',
    customer_name VARCHAR(200) NOT NULL COMMENT '客户名称',
    customer_short_name VARCHAR(100) COMMENT '客户简称',
    customer_type TINYINT DEFAULT 1 COMMENT '客户类型：1-企业客户,2-个人客户',
    customer_level VARCHAR(20) DEFAULT 'NORMAL' COMMENT '客户等级：VIP,GOLD,SILVER,NORMAL',
    contact_person VARCHAR(50) COMMENT '联系人',
    contact_phone VARCHAR(20) COMMENT '联系电话',
    contact_email VARCHAR(100) COMMENT '联系邮箱',
    province VARCHAR(50) COMMENT '省份',
    city VARCHAR(50) COMMENT '城市',
    district VARCHAR(50) COMMENT '区县',
    address VARCHAR(255) COMMENT '详细地址',
    credit_code VARCHAR(50) COMMENT '统一社会信用代码',
    tax_no VARCHAR(50) COMMENT '税号',
    bank_name VARCHAR(100) COMMENT '开户银行',
    bank_account VARCHAR(50) COMMENT '银行账号',
    credit_limit DECIMAL(12,2) DEFAULT 0 COMMENT '信用额度',
    used_credit DECIMAL(12,2) DEFAULT 0 COMMENT '已用额度',
    available_credit DECIMAL(12,2) DEFAULT 0 COMMENT '可用额度',
    payment_term INT DEFAULT 0 COMMENT '账期天数',
    discount_rate DECIMAL(5,2) DEFAULT 0 COMMENT '折扣率(%)',
    salesman_id BIGINT COMMENT '销售员ID',
    source_channel VARCHAR(50) COMMENT '来源渠道',
    industry VARCHAR(50) COMMENT '所属行业',
    scale VARCHAR(50) COMMENT '企业规模',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用,2-黑名单',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_customer_code (customer_code),
    INDEX idx_customer_name (customer_name),
    INDEX idx_salesman_id (salesman_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户表';

-- 客户联系记录表
CREATE TABLE customer_contact (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    contact_type TINYINT NOT NULL COMMENT '联系类型：1-电话,2-拜访,3-邮件,4-微信,5-其他',
    contact_date DATE NOT NULL COMMENT '联系日期',
    contact_person VARCHAR(50) COMMENT '联系人',
    contact_content TEXT COMMENT '联系内容',
    follow_result VARCHAR(255) COMMENT '跟进结果',
    next_follow_date DATE COMMENT '下次跟进日期',
    operator_id BIGINT COMMENT '跟进人ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_customer_id (customer_id),
    INDEX idx_contact_date (contact_date),
    INDEX idx_operator_id (operator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户联系记录表';

-- 销售报价单主表
CREATE TABLE sales_quotation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '报价单ID',
    quotation_no VARCHAR(50) NOT NULL UNIQUE COMMENT '报价单号',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    quotation_date DATE NOT NULL COMMENT '报价日期',
    valid_until DATE COMMENT '有效期至',
    total_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '总数量',
    total_amount DECIMAL(12,2) DEFAULT 0 COMMENT '总金额',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    final_amount DECIMAL(12,2) DEFAULT 0 COMMENT '最终金额',
    salesman_id BIGINT COMMENT '销售员ID',
    quotation_status TINYINT DEFAULT 1 COMMENT '报价状态：1-草稿,2-已报价,3-已成交,4-已失效',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_quotation_no (quotation_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_quotation_date (quotation_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='销售报价单主表';

-- 销售报价单明细表
CREATE TABLE sales_quotation_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    quotation_id BIGINT NOT NULL COMMENT '报价单ID',
    quotation_no VARCHAR(50) NOT NULL COMMENT '报价单号',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    quantity DECIMAL(10,2) NOT NULL COMMENT '数量',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '单价',
    discount_rate DECIMAL(5,2) DEFAULT 0 COMMENT '折扣率(%)',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    amount DECIMAL(12,2) NOT NULL COMMENT '金额',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_quotation_id (quotation_id),
    INDEX idx_quotation_no (quotation_no),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='销售报价单明细表';

-- 销售订单主表
CREATE TABLE sales_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    order_type TINYINT DEFAULT 1 COMMENT '订单类型：1-普通订单,2-预售订单,3-批发订单',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    order_date DATE NOT NULL COMMENT '订单日期',
    delivery_date DATE COMMENT '要求交货日期',
    warehouse_id BIGINT COMMENT '发货仓库ID',
    delivery_province VARCHAR(50) COMMENT '收货省份',
    delivery_city VARCHAR(50) COMMENT '收货城市',
    delivery_district VARCHAR(50) COMMENT '收货区县',
    delivery_address VARCHAR(255) COMMENT '收货详细地址',
    receiver_name VARCHAR(50) COMMENT '收货人',
    receiver_phone VARCHAR(20) COMMENT '收货电话',
    total_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '总数量',
    total_amount DECIMAL(12,2) DEFAULT 0 COMMENT '订单金额',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    freight_amount DECIMAL(12,2) DEFAULT 0 COMMENT '运费',
    final_amount DECIMAL(12,2) DEFAULT 0 COMMENT '最终金额',
    paid_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已付金额',
    unpaid_amount DECIMAL(12,2) DEFAULT 0 COMMENT '未付金额',
    salesman_id BIGINT COMMENT '销售员ID',
    payment_method TINYINT COMMENT '付款方式：1-现金,2-转账,3-支票,4-月结',
    order_status TINYINT DEFAULT 1 COMMENT '订单状态：1-待审核,2-待发货,3-部分发货,4-已发货,5-已完成,6-已取消',
    delivery_status TINYINT DEFAULT 0 COMMENT '发货状态：0-未发货,1-部分发货,2-已发货',
    payment_status TINYINT DEFAULT 0 COMMENT '付款状态：0-未付款,1-部分付款,2-已付款',
    audit_status TINYINT DEFAULT 0 COMMENT '审核状态：0-待审核,1-已审核,2-已驳回',
    auditor_id BIGINT COMMENT '审核人ID',
    audit_time DATETIME COMMENT '审核时间',
    audit_remark TEXT COMMENT '审核备注',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_order_no (order_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_order_date (order_date),
    INDEX idx_salesman_id (salesman_id),
    INDEX idx_order_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='销售订单主表';

-- 销售订单明细表
CREATE TABLE sales_order_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    order_no VARCHAR(50) NOT NULL COMMENT '订单号',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    quantity DECIMAL(10,2) NOT NULL COMMENT '数量',
    delivered_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '已发货数量',
    returned_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '已退货数量',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '单价',
    discount_rate DECIMAL(5,2) DEFAULT 0 COMMENT '折扣率(%)',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    amount DECIMAL(12,2) NOT NULL COMMENT '金额',
    tax_rate DECIMAL(5,2) DEFAULT 0 COMMENT '税率(%)',
    tax_amount DECIMAL(12,2) DEFAULT 0 COMMENT '税额',
    detail_status TINYINT DEFAULT 1 COMMENT '明细状态：1-待发货,2-部分发货,3-已发货,4-已完成',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_order_id (order_id),
    INDEX idx_order_no (order_no),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='销售订单明细表';

-- 退货单主表
CREATE TABLE sales_return (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '退货单ID',
    return_no VARCHAR(50) NOT NULL UNIQUE COMMENT '退货单号',
    order_id BIGINT COMMENT '原订单ID',
    order_no VARCHAR(50) COMMENT '原订单号',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    return_date DATE NOT NULL COMMENT '退货日期',
    return_type TINYINT NOT NULL COMMENT '退货类型：1-质量问题,2-发货错误,3-客户原因,4-其他',
    warehouse_id BIGINT NOT NULL COMMENT '退货仓库ID',
    total_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '总数量',
    total_amount DECIMAL(12,2) DEFAULT 0 COMMENT '总金额',
    refund_amount DECIMAL(12,2) DEFAULT 0 COMMENT '退款金额',
    actual_refund DECIMAL(12,2) DEFAULT 0 COMMENT '实际退款',
    return_status TINYINT DEFAULT 1 COMMENT '退货状态：1-待审核,2-待入库,3-已入库,4-已完成,5-已拒绝',
    refund_status TINYINT DEFAULT 0 COMMENT '退款状态：0-未退款,1-部分退款,2-已退款',
    audit_status TINYINT DEFAULT 0 COMMENT '审核状态：0-待审核,1-已审核,2-已驳回',
    auditor_id BIGINT COMMENT '审核人ID',
    audit_time DATETIME COMMENT '审核时间',
    audit_remark TEXT COMMENT '审核备注',
    handler_id BIGINT COMMENT '处理人ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_return_no (return_no),
    INDEX idx_order_no (order_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_return_date (return_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='退货单主表';

-- 退货单明细表
CREATE TABLE sales_return_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    return_id BIGINT NOT NULL COMMENT '退货单ID',
    return_no VARCHAR(50) NOT NULL COMMENT '退货单号',
    order_detail_id BIGINT COMMENT '原订单明细ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    batch_code VARCHAR(50) COMMENT '批次号',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    return_quantity DECIMAL(10,2) NOT NULL COMMENT '退货数量',
    received_quantity DECIMAL(10,2) DEFAULT 0 COMMENT '已收货数量',
    unit_price DECIMAL(10,2) NOT NULL COMMENT '单价',
    amount DECIMAL(12,2) NOT NULL COMMENT '金额',
    return_reason TEXT COMMENT '退货原因',
    handle_result VARCHAR(255) COMMENT '处理结果',
    detail_status TINYINT DEFAULT 1 COMMENT '明细状态：1-待入库,2-已入库',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_return_id (return_id),
    INDEX idx_return_no (return_no),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='退货单明细表';

-- 促销活动表
CREATE TABLE sales_promotion (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '促销ID',
    promotion_code VARCHAR(50) NOT NULL UNIQUE COMMENT '促销编码',
    promotion_name VARCHAR(200) NOT NULL COMMENT '促销名称',
    promotion_type TINYINT NOT NULL COMMENT '促销类型：1-满减,2-折扣,3-买赠,4-特价,5-优惠券',
    start_date DATETIME NOT NULL COMMENT '开始时间',
    end_date DATETIME NOT NULL COMMENT '结束时间',
    apply_scope TINYINT DEFAULT 1 COMMENT '适用范围：1-全部商品,2-指定商品,3-指定分类',
    customer_level VARCHAR(200) COMMENT '适用客户等级(逗号分隔)',
    min_amount DECIMAL(12,2) COMMENT '最低消费金额',
    discount_value DECIMAL(12,2) COMMENT '优惠值(金额或折扣率)',
    max_discount DECIMAL(12,2) COMMENT '最大优惠金额',
    usage_limit INT COMMENT '使用次数限制',
    used_count INT DEFAULT 0 COMMENT '已使用次数',
    promotion_desc TEXT COMMENT '促销说明',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_promotion_code (promotion_code),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='促销活动表';

-- 促销商品关联表
CREATE TABLE sales_promotion_product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    promotion_id BIGINT NOT NULL COMMENT '促销ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    discount_price DECIMAL(10,2) COMMENT '促销价格',
    gift_product_id BIGINT COMMENT '赠品商品ID',
    gift_quantity DECIMAL(10,2) COMMENT '赠品数量',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_promotion_id (promotion_id),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='促销商品关联表';

-- 优惠券表
CREATE TABLE sales_coupon (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '优惠券ID',
    coupon_code VARCHAR(50) NOT NULL UNIQUE COMMENT '优惠券编码',
    coupon_name VARCHAR(200) NOT NULL COMMENT '优惠券名称',
    coupon_type TINYINT NOT NULL COMMENT '优惠券类型：1-满减券,2-折扣券,3-兑换券',
    coupon_value DECIMAL(12,2) NOT NULL COMMENT '优惠值(金额或折扣率)',
    min_amount DECIMAL(12,2) DEFAULT 0 COMMENT '最低消费金额',
    max_discount DECIMAL(12,2) COMMENT '最大优惠金额',
    total_count INT NOT NULL COMMENT '发行总数',
    issued_count INT DEFAULT 0 COMMENT '已发放数量',
    used_count INT DEFAULT 0 COMMENT '已使用数量',
    valid_days INT COMMENT '有效天数',
    start_date DATETIME COMMENT '有效期开始',
    end_date DATETIME COMMENT '有效期结束',
    coupon_desc TEXT COMMENT '使用说明',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_coupon_code (coupon_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠券表';

-- 客户优惠券表
CREATE TABLE customer_coupon (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    coupon_id BIGINT NOT NULL COMMENT '优惠券ID',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    coupon_no VARCHAR(50) NOT NULL UNIQUE COMMENT '优惠券号',
    receive_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '领取时间',
    valid_start_date DATETIME NOT NULL COMMENT '有效期开始',
    valid_end_date DATETIME NOT NULL COMMENT '有效期结束',
    use_status TINYINT DEFAULT 0 COMMENT '使用状态：0-未使用,1-已使用,2-已过期',
    use_date DATETIME COMMENT '使用时间',
    order_id BIGINT COMMENT '使用订单ID',
    order_no VARCHAR(50) COMMENT '使用订单号',
    INDEX idx_coupon_id (coupon_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_coupon_no (coupon_no),
    INDEX idx_use_status (use_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户优惠券表';

