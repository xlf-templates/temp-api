"use strict";

/**
 * 为 admin_rules.pid 添加自引用外键约束，并设置 CASCADE 规则。
 * 注意：如果已有不合法的 pid 值（指向不存在的 id），将会被置为 NULL 以避免添加约束失败。
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) 确保列类型与允许空符合模型定义
    await queryInterface.changeColumn("admin_rules", "pid", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 2) 清理不合法的引用，避免添加外键失败
    await queryInterface.sequelize.query(
      `UPDATE admin_rules r
       LEFT JOIN (SELECT id FROM admin_rules) t ON r.pid = t.id
       SET r.pid = NULL
       WHERE r.pid IS NOT NULL AND t.id IS NULL;`
    );

    // 3) 添加自引用外键约束（pid -> admin_rules.id）
    await queryInterface.addConstraint("admin_rules", {
      fields: ["pid"],
      type: "foreign key",
      name: "fk_admin_rules_pid_self",
      references: {
        table: "admin_rules",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface) {
    // 删除外键约束
    await queryInterface.removeConstraint(
      "admin_rules",
      "fk_admin_rules_pid_self"
    );
  },
};