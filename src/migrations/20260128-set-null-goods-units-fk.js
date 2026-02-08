"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) 修改列为可空
    await queryInterface.changeColumn("goods", "packaging_unit", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn("goods", "weight_unit", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // 2) 移除已有外键约束（若存在）
    if (queryInterface.getForeignKeyReferencesForTable) {
      const refs = await queryInterface.getForeignKeyReferencesForTable("goods");
      for (const ref of refs) {
        if (
          ref.columnName === "packaging_unit" ||
          ref.columnName === "weight_unit"
        ) {
          try {
            await queryInterface.removeConstraint(
              "goods",
              ref.constraintName || ref.constraintName
            );
          } catch (e) {
            // ignore
          }
        }
      }
    } else {
      // 回退方案：尝试按常见命名移除（若不存在将忽略）
      const tryRemove = async (name) => {
        try {
          await queryInterface.removeConstraint("goods", name);
        } catch (e) {}
      };
      await tryRemove("fk_goods_packaging_unit");
      await tryRemove("fk_goods_weight_unit");
    }

    // 3) 添加 SET NULL 外键
    await queryInterface.addConstraint("goods", {
      fields: ["packaging_unit"],
      type: "foreign key",
      name: "fk_goods_packaging_unit",
      references: {
        table: "packaging_unit",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addConstraint("goods", {
      fields: ["weight_unit"],
      type: "foreign key",
      name: "fk_goods_weight_unit",
      references: {
        table: "weight_unit",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // 回滚：移除 SET NULL 外键，并改回 NOT NULL + RESTRICT 外键
    await queryInterface.removeConstraint("goods", "fk_goods_packaging_unit");
    await queryInterface.removeConstraint("goods", "fk_goods_weight_unit");

    await queryInterface.changeColumn("goods", "packaging_unit", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn("goods", "weight_unit", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("goods", {
      fields: ["packaging_unit"],
      type: "foreign key",
      name: "fk_goods_packaging_unit_restrict",
      references: {
        table: "packaging_unit",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
    await queryInterface.addConstraint("goods", {
      fields: ["weight_unit"],
      type: "foreign key",
      name: "fk_goods_weight_unit_restrict",
      references: {
        table: "weight_unit",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },
};
