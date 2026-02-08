-- =====================================================
-- 会计核算模块表
-- =====================================================
USE warehouse_erp;

-- 会计科目表
CREATE TABLE acc_subject (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '科目ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父科目ID，0表示一级科目',
    subject_code VARCHAR(50) NOT NULL UNIQUE COMMENT '科目编码',
    subject_name VARCHAR(100) NOT NULL COMMENT '科目名称',
    subject_level INT DEFAULT 1 COMMENT '科目层级',
    subject_type TINYINT NOT NULL COMMENT '科目类型：1-资产,2-负债,3-权益,4-成本,5-损益',
    balance_direction TINYINT NOT NULL COMMENT '余额方向：1-借方,2-贷方',
    is_detail TINYINT DEFAULT 0 COMMENT '是否明细科目：0-否,1-是',
    is_cash TINYINT DEFAULT 0 COMMENT '是否现金科目：0-否,1-是',
    is_bank TINYINT DEFAULT 0 COMMENT '是否银行科目：0-否,1-是',
    auxiliary_type VARCHAR(100) COMMENT '辅助核算类型(逗号分隔)：customer-客户,supplier-供应商,product-商品,employee-员工,department-部门,project-项目',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_subject_code (subject_code),
    INDEX idx_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会计科目表';

-- 会计期间表
CREATE TABLE acc_period (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '期间ID',
    fiscal_year INT NOT NULL COMMENT '会计年度',
    period_no INT NOT NULL COMMENT '期间号(1-12)',
    period_name VARCHAR(50) NOT NULL COMMENT '期间名称',
    start_date DATE NOT NULL COMMENT '开始日期',
    end_date DATE NOT NULL COMMENT '结束日期',
    period_status TINYINT DEFAULT 1 COMMENT '期间状态：1-未结账,2-已结账',
    close_date DATETIME COMMENT '结账时间',
    close_user_id BIGINT COMMENT '结账人ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    UNIQUE KEY uk_fiscal_period (fiscal_year, period_no),
    INDEX idx_fiscal_year (fiscal_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会计期间表';

-- 凭证主表
CREATE TABLE acc_voucher (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '凭证ID',
    voucher_no VARCHAR(50) NOT NULL COMMENT '凭证号',
    fiscal_year INT NOT NULL COMMENT '会计年度',
    period_no INT NOT NULL COMMENT '会计期间',
    voucher_type VARCHAR(20) DEFAULT 'GENERAL' COMMENT '凭证类型：GENERAL-记账凭证,RECEIPT-收款凭证,PAYMENT-付款凭证,TRANSFER-转账凭证',
    voucher_date DATE NOT NULL COMMENT '凭证日期',
    business_date DATE COMMENT '业务日期',
    business_type VARCHAR(50) COMMENT '业务类型',
    business_no VARCHAR(50) COMMENT '业务单号',
    attachment_count INT DEFAULT 0 COMMENT '附件张数',
    total_debit DECIMAL(15,2) DEFAULT 0 COMMENT '借方总金额',
    total_credit DECIMAL(15,2) DEFAULT 0 COMMENT '贷方总金额',
    voucher_status TINYINT DEFAULT 1 COMMENT '凭证状态：1-草稿,2-已审核,3-已记账',
    is_auto TINYINT DEFAULT 0 COMMENT '是否自动生成：0-否,1-是',
    maker_id BIGINT COMMENT '制单人ID',
    checker_id BIGINT COMMENT '审核人ID',
    check_time DATETIME COMMENT '审核时间',
    booker_id BIGINT COMMENT '记账人ID',
    book_time DATETIME COMMENT '记账时间',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    UNIQUE KEY uk_voucher (fiscal_year, period_no, voucher_no),
    INDEX idx_voucher_no (voucher_no),
    INDEX idx_voucher_date (voucher_date),
    INDEX idx_business_no (business_no),
    INDEX idx_voucher_status (voucher_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='凭证主表';

-- 凭证明细表
CREATE TABLE acc_voucher_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    voucher_id BIGINT NOT NULL COMMENT '凭证ID',
    entry_no INT NOT NULL COMMENT '分录号',
    subject_id BIGINT NOT NULL COMMENT '科目ID',
    subject_code VARCHAR(50) NOT NULL COMMENT '科目编码',
    subject_name VARCHAR(100) NOT NULL COMMENT '科目名称',
    direction TINYINT NOT NULL COMMENT '方向：1-借方,2-贷方',
    amount DECIMAL(15,2) NOT NULL COMMENT '金额',
    quantity DECIMAL(10,2) COMMENT '数量',
    price DECIMAL(10,2) COMMENT '单价',
    auxiliary_customer_id BIGINT COMMENT '辅助核算-客户ID',
    auxiliary_supplier_id BIGINT COMMENT '辅助核算-供应商ID',
    auxiliary_product_id BIGINT COMMENT '辅助核算-商品ID',
    auxiliary_employee_id BIGINT COMMENT '辅助核算-员工ID',
    auxiliary_department_id BIGINT COMMENT '辅助核算-部门ID',
    summary VARCHAR(255) COMMENT '摘要',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_voucher_id (voucher_id),
    INDEX idx_subject_id (subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='凭证明细表';

-- 应收账款主表
CREATE TABLE acc_receivable (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '应收ID',
    receivable_no VARCHAR(50) NOT NULL UNIQUE COMMENT '应收单号',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    business_type TINYINT NOT NULL COMMENT '业务类型：1-销售应收,2-其他应收',
    business_no VARCHAR(50) COMMENT '业务单号',
    business_date DATE NOT NULL COMMENT '业务日期',
    receivable_amount DECIMAL(12,2) NOT NULL COMMENT '应收金额',
    received_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已收金额',
    unreceived_amount DECIMAL(12,2) NOT NULL COMMENT '未收金额',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    payment_term INT COMMENT '账期天数',
    due_date DATE COMMENT '到期日期',
    overdue_days INT DEFAULT 0 COMMENT '逾期天数',
    receivable_status TINYINT DEFAULT 1 COMMENT '收款状态：1-未收款,2-部分收款,3-已收款,4-已核销',
    salesman_id BIGINT COMMENT '销售员ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_receivable_no (receivable_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_business_no (business_no),
    INDEX idx_due_date (due_date),
    INDEX idx_receivable_status (receivable_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应收账款主表';

-- 收款单主表
CREATE TABLE acc_receipt (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收款单ID',
    receipt_no VARCHAR(50) NOT NULL UNIQUE COMMENT '收款单号',
    customer_id BIGINT NOT NULL COMMENT '客户ID',
    receipt_date DATE NOT NULL COMMENT '收款日期',
    receipt_type TINYINT NOT NULL COMMENT '收款类型：1-销售收款,2-预收款,3-其他收款',
    payment_method TINYINT NOT NULL COMMENT '付款方式：1-现金,2-银行转账,3-支票,4-电子支付,5-其他',
    bank_account VARCHAR(50) COMMENT '银行账号',
    receipt_amount DECIMAL(12,2) NOT NULL COMMENT '收款金额',
    allocated_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已核销金额',
    unallocated_amount DECIMAL(12,2) NOT NULL COMMENT '未核销金额',
    receipt_status TINYINT DEFAULT 1 COMMENT '收款状态：1-待审核,2-已审核,3-已核销',
    audit_status TINYINT DEFAULT 0 COMMENT '审核状态：0-待审核,1-已审核,2-已驳回',
    auditor_id BIGINT COMMENT '审核人ID',
    audit_time DATETIME COMMENT '审核时间',
    audit_remark TEXT COMMENT '审核备注',
    cashier_id BIGINT COMMENT '收款人ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_receipt_no (receipt_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_receipt_date (receipt_date),
    INDEX idx_receipt_status (receipt_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收款单主表';

-- 收款核销表
CREATE TABLE acc_receipt_allocation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    receipt_id BIGINT NOT NULL COMMENT '收款单ID',
    receipt_no VARCHAR(50) NOT NULL COMMENT '收款单号',
    receivable_id BIGINT NOT NULL COMMENT '应收单ID',
    receivable_no VARCHAR(50) NOT NULL COMMENT '应收单号',
    allocation_amount DECIMAL(12,2) NOT NULL COMMENT '核销金额',
    allocation_date DATE NOT NULL COMMENT '核销日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_receipt_id (receipt_id),
    INDEX idx_receivable_id (receivable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收款核销表';

-- 应付账款主表
CREATE TABLE acc_payable (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '应付ID',
    payable_no VARCHAR(50) NOT NULL UNIQUE COMMENT '应付单号',
    supplier_id BIGINT NOT NULL COMMENT '供应商ID',
    business_type TINYINT NOT NULL COMMENT '业务类型：1-采购应付,2-其他应付',
    business_no VARCHAR(50) COMMENT '业务单号',
    business_date DATE NOT NULL COMMENT '业务日期',
    payable_amount DECIMAL(12,2) NOT NULL COMMENT '应付金额',
    paid_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已付金额',
    unpaid_amount DECIMAL(12,2) NOT NULL COMMENT '未付金额',
    discount_amount DECIMAL(12,2) DEFAULT 0 COMMENT '折扣金额',
    payment_term INT COMMENT '账期天数',
    due_date DATE COMMENT '到期日期',
    overdue_days INT DEFAULT 0 COMMENT '逾期天数',
    payable_status TINYINT DEFAULT 1 COMMENT '付款状态：1-未付款,2-部分付款,3-已付款,4-已核销',
    buyer_id BIGINT COMMENT '采购员ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_payable_no (payable_no),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_business_no (business_no),
    INDEX idx_due_date (due_date),
    INDEX idx_payable_status (payable_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='应付账款主表';

-- 付款单主表
CREATE TABLE acc_payment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '付款单ID',
    payment_no VARCHAR(50) NOT NULL UNIQUE COMMENT '付款单号',
    supplier_id BIGINT NOT NULL COMMENT '供应商ID',
    payment_date DATE NOT NULL COMMENT '付款日期',
    payment_type TINYINT NOT NULL COMMENT '付款类型：1-采购付款,2-预付款,3-其他付款',
    payment_method TINYINT NOT NULL COMMENT '付款方式：1-现金,2-银行转账,3-支票,4-电子支付,5-其他',
    bank_account VARCHAR(50) COMMENT '银行账号',
    payment_amount DECIMAL(12,2) NOT NULL COMMENT '付款金额',
    allocated_amount DECIMAL(12,2) DEFAULT 0 COMMENT '已核销金额',
    unallocated_amount DECIMAL(12,2) NOT NULL COMMENT '未核销金额',
    payment_status TINYINT DEFAULT 1 COMMENT '付款状态：1-待审核,2-已审核,3-已核销',
    audit_status TINYINT DEFAULT 0 COMMENT '审核状态：0-待审核,1-已审核,2-已驳回',
    auditor_id BIGINT COMMENT '审核人ID',
    audit_time DATETIME COMMENT '审核时间',
    audit_remark TEXT COMMENT '审核备注',
    cashier_id BIGINT COMMENT '付款人ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_payment_no (payment_no),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_payment_date (payment_date),
    INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='付款单主表';

-- 付款核销表
CREATE TABLE acc_payment_allocation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    payment_id BIGINT NOT NULL COMMENT '付款单ID',
    payment_no VARCHAR(50) NOT NULL COMMENT '付款单号',
    payable_id BIGINT NOT NULL COMMENT '应付单ID',
    payable_no VARCHAR(50) NOT NULL COMMENT '应付单号',
    allocation_amount DECIMAL(12,2) NOT NULL COMMENT '核销金额',
    allocation_date DATE NOT NULL COMMENT '核销日期',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    INDEX idx_payment_id (payment_id),
    INDEX idx_payable_id (payable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='付款核销表';

-- 发票表
CREATE TABLE acc_invoice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '发票ID',
    invoice_no VARCHAR(50) NOT NULL UNIQUE COMMENT '发票号码',
    invoice_code VARCHAR(50) COMMENT '发票代码',
    invoice_type TINYINT NOT NULL COMMENT '发票类型：1-增值税专用发票,2-增值税普通发票,3-电子发票',
    invoice_direction TINYINT NOT NULL COMMENT '发票方向：1-销项发票,2-进项发票',
    business_type VARCHAR(50) COMMENT '业务类型',
    business_no VARCHAR(50) COMMENT '业务单号',
    customer_id BIGINT COMMENT '客户ID',
    supplier_id BIGINT COMMENT '供应商ID',
    invoice_date DATE NOT NULL COMMENT '开票日期',
    invoice_amount DECIMAL(12,2) NOT NULL COMMENT '发票金额',
    tax_amount DECIMAL(12,2) NOT NULL COMMENT '税额',
    total_amount DECIMAL(12,2) NOT NULL COMMENT '价税合计',
    tax_rate DECIMAL(5,2) COMMENT '税率(%)',
    invoice_status TINYINT DEFAULT 1 COMMENT '发票状态：1-未认证,2-已认证,3-已作废',
    is_red TINYINT DEFAULT 0 COMMENT '是否红字发票：0-否,1-是',
    red_invoice_id BIGINT COMMENT '对应红字发票ID',
    maker_id BIGINT COMMENT '开票人ID',
    checker_id BIGINT COMMENT '复核人ID',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_invoice_no (invoice_no),
    INDEX idx_business_no (business_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_supplier_id (supplier_id),
    INDEX idx_invoice_date (invoice_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='发票表';

-- 成本计算单表
CREATE TABLE acc_cost_calculation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    calculation_no VARCHAR(50) NOT NULL UNIQUE COMMENT '计算单号',
    calculation_type TINYINT NOT NULL COMMENT '计算类型：1-采购成本,2-生产成本,3-销售成本',
    fiscal_year INT NOT NULL COMMENT '会计年度',
    period_no INT NOT NULL COMMENT '会计期间',
    warehouse_id BIGINT COMMENT '仓库ID',
    product_id BIGINT COMMENT '商品ID',
    cost_method TINYINT NOT NULL COMMENT '成本方法：1-加权平均,2-移动平均,3-先进先出,4-个别计价',
    calculation_date DATE NOT NULL COMMENT '计算日期',
    total_cost DECIMAL(15,2) DEFAULT 0 COMMENT '总成本',
    calculation_status TINYINT DEFAULT 1 COMMENT '计算状态：1-草稿,2-已计算,3-已审核',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_calculation_no (calculation_no),
    INDEX idx_fiscal_period (fiscal_year, period_no),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='成本计算单表';

