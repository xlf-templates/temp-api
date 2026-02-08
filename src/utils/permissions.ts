import { Admin, AdminGroup, AdminRules } from '@/models'

// 解析 group.rules 中的逗号分隔字符串为规则 ID 数组
export const parseRuleIdsFromString = (rules?: string | null): number[] => {
  if (!rules) return []
  return rules
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => Number(s))
    .filter((n) => Number.isFinite(n) && n > 0)
}

// 获取用户所属的规则 ID 列表（去重）
export const getUserRuleIds = async (uid: number): Promise<number[]> => {
  const user = await Admin.findByPk(uid)
  if (!user || user.groupId == null) return []
  const group = await AdminGroup.findByPk(user.groupId, {
    attributes: ['id', 'rules', 'status'],
  })
  if (!group || (group as any).status === 0) return []
  return parseRuleIdsFromString((group as any).rules)
}

// 根据 uid 返回可用的 AdminRules（可选类型过滤）
export const getUserRules = async (
  uid: number,
  types?: Array<'1' | '2' | '3'>
) => {
  const ids = await getUserRuleIds(uid)
  if (!ids.length) return []

  const where: any = { id: ids, status: 1 }
  if (types && types.length) where.menuType = types

  const rules = await AdminRules.findAll({
    where,
    order: [['sort', 'DESC'], ['id', 'ASC']],
  })
  return rules
}

// 构建树结构（以 parentId 为父子关系）
export const buildRuleTree = (rules: Array<any>) => {
  const map = new Map<number, any>()
  const roots: any[] = []
  rules.forEach((r) => {
    const node = r.toJSON()
    if (!node.component || String(node.component).trim() === '') {
      node.component = 'LAYOUT'
    }
    node.children = []
    map.set(node.id, node)
  })
  rules.forEach((r) => {
    const node = map.get(r.id)
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId).children.push(node)
    } else {
      roots.push(node)
    }
  })
  return roots
}
