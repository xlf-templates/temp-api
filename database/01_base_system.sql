-- =====================================================
-- 基础管理系统表
-- =====================================================
USE warehouse_erp;

-- 组织架构表
CREATE TABLE sys_organization (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '组织ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父组织ID，0表示根组织',
    org_code VARCHAR(50) NOT NULL COMMENT '组织编码',
    org_name VARCHAR(100) NOT NULL COMMENT '组织名称',
    org_type TINYINT NOT NULL COMMENT '组织类型：1-公司,2-部门,3-小组',
    org_level INT DEFAULT 1 COMMENT '组织层级',
    sort_order INT DEFAULT 0 COMMENT '排序',
    leader_id BIGINT COMMENT '负责人ID',
    phone VARCHAR(20) COMMENT '联系电话',
    email VARCHAR(100) COMMENT '邮箱',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_parent_id (parent_id),
    INDEX idx_org_code (org_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='组织架构表';

-- 用户表
CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(128) NOT NULL COMMENT '密码（加密）',
    real_name VARCHAR(50) NOT NULL COMMENT '真实姓名',
    nick_name VARCHAR(50) COMMENT '昵称',
    user_type TINYINT DEFAULT 1 COMMENT '用户类型：1-内部员工,2-外部用户',
    email VARCHAR(100) COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '手机号',
    gender TINYINT COMMENT '性别：0-未知,1-男,2-女',
    avatar VARCHAR(255) COMMENT '头像地址',
    org_id BIGINT COMMENT '所属组织ID',
    position VARCHAR(50) COMMENT '岗位',
    employee_no VARCHAR(50) COMMENT '工号',
    id_card VARCHAR(18) COMMENT '身份证号',
    entry_date DATE COMMENT '入职日期',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    last_login_time DATETIME COMMENT '最后登录时间',
    last_login_ip VARCHAR(50) COMMENT '最后登录IP',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_username (username),
    INDEX idx_phone (phone),
    INDEX idx_org_id (org_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 角色表
CREATE TABLE sys_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',
    role_code VARCHAR(50) NOT NULL UNIQUE COMMENT '角色编码',
    role_name VARCHAR(100) NOT NULL COMMENT '角色名称',
    role_type TINYINT DEFAULT 1 COMMENT '角色类型：1-系统角色,2-业务角色',
    data_scope TINYINT DEFAULT 1 COMMENT '数据权限：1-全部,2-本组织及以下,3-本组织,4-仅本人',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_role_code (role_code),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 用户角色关联表
CREATE TABLE sys_user_role (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    UNIQUE KEY uk_user_role (user_id, role_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role_id (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户角色关联表';

-- 菜单表
CREATE TABLE sys_menu (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '菜单ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父菜单ID，0表示顶级菜单',
    menu_name VARCHAR(50) NOT NULL COMMENT '菜单名称',
    menu_type TINYINT NOT NULL COMMENT '菜单类型：1-目录,2-菜单,3-按钮',
    permission_code VARCHAR(100) COMMENT '权限标识',
    route_path VARCHAR(200) COMMENT '路由地址',
    component_path VARCHAR(200) COMMENT '组件路径',
    icon VARCHAR(100) COMMENT '菜单图标',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_visible TINYINT DEFAULT 1 COMMENT '是否可见：0-否,1-是',
    is_cache TINYINT DEFAULT 0 COMMENT '是否缓存：0-否,1-是',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_parent_id (parent_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表';

-- 角色菜单关联表
CREATE TABLE sys_role_menu (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    menu_id BIGINT NOT NULL COMMENT '菜单ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    created_by BIGINT COMMENT '创建人',
    UNIQUE KEY uk_role_menu (role_id, menu_id),
    INDEX idx_role_id (role_id),
    INDEX idx_menu_id (menu_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单关联表';

-- 数据字典类型表
CREATE TABLE sys_dict_type (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '字典类型ID',
    dict_code VARCHAR(50) NOT NULL UNIQUE COMMENT '字典编码',
    dict_name VARCHAR(100) NOT NULL COMMENT '字典名称',
    sort_order INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_dict_code (dict_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典类型表';

-- 数据字典数据表
CREATE TABLE sys_dict_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '字典数据ID',
    dict_type_id BIGINT NOT NULL COMMENT '字典类型ID',
    dict_label VARCHAR(100) NOT NULL COMMENT '字典标签',
    dict_value VARCHAR(100) NOT NULL COMMENT '字典值',
    sort_order INT DEFAULT 0 COMMENT '排序',
    tag_style VARCHAR(50) COMMENT '标签样式',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认：0-否,1-是',
    status TINYINT DEFAULT 1 COMMENT '状态：0-停用,1-启用',
    is_deleted TINYINT DEFAULT 0 COMMENT '是否删除：0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_dict_type_id (dict_type_id),
    INDEX idx_dict_value (dict_value)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据字典数据表';

-- 系统配置表
CREATE TABLE sys_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '配置ID',
    config_key VARCHAR(100) NOT NULL UNIQUE COMMENT '配置键',
    config_value TEXT NOT NULL COMMENT '配置值',
    config_type VARCHAR(50) DEFAULT 'string' COMMENT '配置类型：string,number,boolean,json',
    config_group VARCHAR(50) COMMENT '配置分组',
    is_system TINYINT DEFAULT 0 COMMENT '是否系统配置：0-否,1-是',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    created_by BIGINT COMMENT '创建人',
    updated_by BIGINT COMMENT '更新人',
    remark TEXT COMMENT '备注',
    INDEX idx_config_key (config_key),
    INDEX idx_config_group (config_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- 操作日志表
CREATE TABLE sys_operation_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    module_name VARCHAR(50) COMMENT '模块名称',
    business_type VARCHAR(50) COMMENT '业务类型',
    operation_type VARCHAR(50) COMMENT '操作类型：CREATE,UPDATE,DELETE,QUERY,EXPORT,IMPORT',
    request_method VARCHAR(10) COMMENT '请求方法：GET,POST,PUT,DELETE',
    request_url VARCHAR(255) COMMENT '请求URL',
    request_params TEXT COMMENT '请求参数',
    response_data TEXT COMMENT '响应数据',
    operation_status TINYINT DEFAULT 1 COMMENT '操作状态：0-失败,1-成功',
    error_msg TEXT COMMENT '错误消息',
    operation_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    cost_time INT COMMENT '消耗时间(毫秒)',
    operator_id BIGINT COMMENT '操作人ID',
    operator_name VARCHAR(50) COMMENT '操作人姓名',
    operator_ip VARCHAR(50) COMMENT '操作IP',
    user_agent VARCHAR(500) COMMENT '用户代理',
    INDEX idx_operator_id (operator_id),
    INDEX idx_operation_time (operation_time),
    INDEX idx_module_name (module_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- 登录日志表
CREATE TABLE sys_login_log (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    user_id BIGINT COMMENT '用户ID',
    username VARCHAR(50) COMMENT '用户名',
    login_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
    login_ip VARCHAR(50) COMMENT '登录IP',
    login_location VARCHAR(100) COMMENT '登录地点',
    browser VARCHAR(50) COMMENT '浏览器',
    os VARCHAR(50) COMMENT '操作系统',
    login_status TINYINT DEFAULT 1 COMMENT '登录状态：0-失败,1-成功',
    error_msg VARCHAR(500) COMMENT '错误消息',
    INDEX idx_user_id (user_id),
    INDEX idx_login_time (login_time),
    INDEX idx_login_status (login_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='登录日志表';
