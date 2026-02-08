-- =====================================================
-- 配送车辆管理模块表
-- =====================================================
USE warehouse_erp;

-- 车辆表
CREATE TABLE vehicle (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '车辆ID',
    vehicle_no VARCHAR(20) NOT NULL UNIQUE COMMENT '车牌号',
    vehicle_type TINYINT NOT NULL COMMENT '车辆类型：1-厢式货车,2-平板车,3-冷藏车,4-面包车,5-其他',
    vehicle_brand VARCHAR(50) COMMENT '车辆品牌',
    vehicle_model VARCHAR(50) COMMENT '车辆型号',
    vehicle_color VARCHAR(20) COMMENT '车辆颜色',
    vin VARCHAR(50) COMMENT '车架号',
    engine_no VARCHAR(50) COMMENT '发动机号',
    load_capacity DECIMAL(10,2) COMMENT '载重量(吨)',
    volume_capacity DECIMAL(10,2) COMMENT '容积(m³)',
    purchase_date DATE COMMENT '购买日期',
    purchase_price DECIMAL(12,2) COMMENT '购买价格',
    registration_date DATE COMMENT '注册日期',
    insurance_company VARCHAR(100) COMMENT '保险公司',
    insurance_no VARCHAR(50) COMMENT '保险单号',
    insurance_start_date DATE COMMENT '保险开始日期',
    insurance_end_date DATE COMMENT '保险结束日期',
    annual_inspection_date DATE COMMENT '年检到期日期',
    gps_device_no VARCHAR(50) COMMENT 'GPS设备号',
    belong_org_id BIGINT COMMENT '所属组织ID',
    current_driver_id BIGINT COMMENT '当前驾驶员ID',
    vehicle_status TINYINT DEFAULT 1 COMMENT '车辆状态：1-可用,2-维修中,3-已报废,4-已出售',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_vehicle_no (vehicle_no),
    INDEX idx_current_driver_id (current_driver_id),
    INDEX idx_vehicle_status (vehicle_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='车辆表';

-- 司机表
CREATE TABLE driver (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '司机ID',
    driver_code VARCHAR(50) NOT NULL UNIQUE COMMENT '司机编码',
    driver_name VARCHAR(50) NOT NULL COMMENT '司机姓名',
    gender TINYINT COMMENT '性别：1-男,2-女',
    phone VARCHAR(20) NOT NULL COMMENT '手机号',
    id_card VARCHAR(18) COMMENT '身份证号',
    license_no VARCHAR(50) COMMENT '驾驶证号',
    license_type VARCHAR(10) COMMENT '驾驶证类型：A1,A2,A3,B1,B2,C1等',
    license_issue_date DATE COMMENT '驾驶证发证日期',
    license_valid_date DATE COMMENT '驾驶证有效期',
    entry_date DATE COMMENT '入职日期',
    departure_date DATE COMMENT '离职日期',
    emergency_contact VARCHAR(50) COMMENT '紧急联系人',
    emergency_phone VARCHAR(20) COMMENT '紧急联系电话',
    belong_org_id BIGINT COMMENT '所属组织ID',
    driver_type TINYINT DEFAULT 1 COMMENT '司机类型：1-专职,2-兼职',
    driver_status TINYINT DEFAULT 1 COMMENT '司机状态：1-在岗,2-休假,3-离职',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_driver_code (driver_code),
    INDEX idx_phone (phone),
    INDEX idx_driver_status (driver_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='司机表';

-- 车辆维修保养记录表
CREATE TABLE vehicle_maintenance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
    vehicle_id BIGINT NOT NULL COMMENT '车辆ID',
    maintenance_type TINYINT NOT NULL COMMENT '类型：1-保养,2-维修,3-年检,4-保险',
    maintenance_date DATE NOT NULL COMMENT '日期',
    maintenance_content TEXT COMMENT '内容描述',
    maintenance_org VARCHAR(100) COMMENT '保养/维修单位',
    mileage DECIMAL(10,2) COMMENT '里程数(km)',
    cost_amount DECIMAL(12,2) COMMENT '费用',
    next_maintenance_date DATE COMMENT '下次保养日期',
    next_maintenance_mileage DECIMAL(10,2) COMMENT '下次保养里程',
    operator_id BIGINT COMMENT '经办人ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_maintenance_date (maintenance_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='车辆维修保养记录表';

-- 车辆违章记录表
CREATE TABLE vehicle_violation (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
    vehicle_id BIGINT NOT NULL COMMENT '车辆ID',
    driver_id BIGINT COMMENT '司机ID',
    violation_date DATE NOT NULL COMMENT '违章日期',
    violation_location VARCHAR(255) COMMENT '违章地点',
    violation_type VARCHAR(100) COMMENT '违章类型',
    violation_content TEXT COMMENT '违章内容',
    fine_amount DECIMAL(12,2) COMMENT '罚款金额',
    deduction_points INT COMMENT '扣分',
    handle_status TINYINT DEFAULT 0 COMMENT '处理状态：0-未处理,1-已处理',
    handle_date DATE COMMENT '处理日期',
    handler_id BIGINT COMMENT '处理人ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_driver_id (driver_id),
    INDEX idx_violation_date (violation_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='车辆违章记录表';

-- 配送单主表
CREATE TABLE delivery_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '配送单ID',
    delivery_no VARCHAR(50) NOT NULL UNIQUE COMMENT '配送单号',
    delivery_type TINYINT DEFAULT 1 COMMENT '配送类型：1-销售配送,2-调拨配送,3-其他配送',
    source_type TINYINT COMMENT '来源类型：1-销售订单,2-出库单,3-调拨单',
    source_no VARCHAR(50) COMMENT '来源单号',
    warehouse_id BIGINT COMMENT '发货仓库ID',
    customer_id BIGINT COMMENT '客户ID',
    receiver_name VARCHAR(50) NOT NULL COMMENT '收货人',
    receiver_phone VARCHAR(20) NOT NULL COMMENT '收货电话',
    receiver_province VARCHAR(50) COMMENT '收货省份',
    receiver_city VARCHAR(50) COMMENT '收货城市',
    receiver_district VARCHAR(50) COMMENT '收货区县',
    receiver_address VARCHAR(255) NOT NULL COMMENT '收货详细地址',
    delivery_date DATE NOT NULL COMMENT '配送日期',
    planned_delivery_time DATETIME COMMENT '计划配送时间',
    actual_delivery_time DATETIME COMMENT '实际配送时间',
    vehicle_id BIGINT COMMENT '车辆ID',
    driver_id BIGINT COMMENT '司机ID',
    total_weight DECIMAL(10,2) COMMENT '总重量(kg)',
    total_volume DECIMAL(10,3) COMMENT '总体积(m³)',
    freight_amount DECIMAL(12,2) COMMENT '运费',
    freight_payer TINYINT COMMENT '运费承担方：1-寄方付,2-收方付',
    distance DECIMAL(10,2) COMMENT '配送距离(km)',
    delivery_status TINYINT DEFAULT 1 COMMENT '配送状态：1-待配送,2-配送中,3-已送达,4-已签收,5-配送失败,6-已取消',
    sign_time DATETIME COMMENT '签收时间',
    sign_person VARCHAR(50) COMMENT '签收人',
    sign_image VARCHAR(500) COMMENT '签收图片',
    delivery_remark TEXT COMMENT '配送备注',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_delivery_no (delivery_no),
    INDEX idx_source_no (source_no),
    INDEX idx_customer_id (customer_id),
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_driver_id (driver_id),
    INDEX idx_delivery_date (delivery_date),
    INDEX idx_delivery_status (delivery_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='配送单主表';

-- 配送单明细表
CREATE TABLE delivery_order_detail (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '明细ID',
    delivery_id BIGINT NOT NULL COMMENT '配送单ID',
    delivery_no VARCHAR(50) NOT NULL COMMENT '配送单号',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    batch_code VARCHAR(50) COMMENT '批次号',
    unit_id BIGINT NOT NULL COMMENT '单位ID',
    quantity DECIMAL(10,2) NOT NULL COMMENT '配送数量',
    actual_quantity DECIMAL(10,2) COMMENT '实收数量',
    weight DECIMAL(10,2) COMMENT '重量(kg)',
    volume DECIMAL(10,3) COMMENT '体积(m³)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_delivery_id (delivery_id),
    INDEX idx_delivery_no (delivery_no),
    INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='配送单明细表';

-- 配送路线表
CREATE TABLE delivery_route (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '路线ID',
    route_code VARCHAR(50) NOT NULL UNIQUE COMMENT '路线编码',
    route_name VARCHAR(100) NOT NULL COMMENT '路线名称',
    start_location VARCHAR(255) COMMENT '起点',
    end_location VARCHAR(255) COMMENT '终点',
    distance DECIMAL(10,2) COMMENT '距离(km)',
    estimated_time INT COMMENT '预计时长(分钟)',
    route_type TINYINT DEFAULT 1 COMMENT '路线类型：1-固定路线,2-临时路线',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_route_code (route_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='配送路线表';

-- GPS轨迹记录表
CREATE TABLE gps_track (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
    vehicle_id BIGINT NOT NULL COMMENT '车辆ID',
    delivery_id BIGINT COMMENT '配送单ID',
    latitude DECIMAL(10,7) NOT NULL COMMENT '纬度',
    longitude DECIMAL(10,7) NOT NULL COMMENT '经度',
    altitude DECIMAL(10,2) COMMENT '海拔(米)',
    speed DECIMAL(10,2) COMMENT '速度(km/h)',
    direction INT COMMENT '方向(度)',
    location_time DATETIME NOT NULL COMMENT '定位时间',
    address VARCHAR(255) COMMENT '地址',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_vehicle_id (vehicle_id),
    INDEX idx_delivery_id (delivery_id),
    INDEX idx_location_time (location_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GPS轨迹记录表';

-- 运费模板表
CREATE TABLE freight_template (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '模板ID',
    template_name VARCHAR(100) NOT NULL COMMENT '模板名称',
    calculate_type TINYINT NOT NULL COMMENT '计费方式：1-按重量,2-按体积,3-按距离,4-按件数,5-固定金额',
    base_value DECIMAL(10,2) COMMENT '基础值(首重/首体积/首距离/首件)',
    base_fee DECIMAL(12,2) COMMENT '基础费用',
    step_value DECIMAL(10,2) COMMENT '续费值(续重/续体积/续距离/续件)',
    step_fee DECIMAL(12,2) COMMENT '续费',
    min_fee DECIMAL(12,2) COMMENT '最低收费',
    free_threshold DECIMAL(12,2) COMMENT '免运费门槛',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_template_name (template_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='运费模板表';

-- 运费模板区域表
CREATE TABLE freight_template_region (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    template_id BIGINT NOT NULL COMMENT '模板ID',
    province VARCHAR(50) COMMENT '省份',
    city VARCHAR(50) COMMENT '城市',
    district VARCHAR(50) COMMENT '区县',
    base_value DECIMAL(10,2) COMMENT '基础值',
    base_fee DECIMAL(12,2) COMMENT '基础费用',
    step_value DECIMAL(10,2) COMMENT '续费值',
    step_fee DECIMAL(12,2) COMMENT '续费',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    INDEX idx_template_id (template_id),
    INDEX idx_region (province, city, district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='运费模板区域表';

