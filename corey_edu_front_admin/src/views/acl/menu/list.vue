<template>
  <div class="app-container">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;"/> -->
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="菜单名称" sortable width="180" />
      <el-table-column prop="path" label="访问路径" sortable width="180" />
      <el-table-column prop="component" label="组件路径" sortable width="180" />
      <el-table-column prop="permissionValue" label="权限值" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="(scope.row.level == 1 || scope.row.level == 2) && hasPerm('permission.add')"
            type="primary"
            plain
            size="mini"
            @click="() => {dialogFormVisible = true, menu.pid = scope.row.id}">添加菜单
          </el-button>
          <el-button
            v-if="scope.row.level == 3 && hasPerm('permission.add')"
            type="primary"
            plain
            size="mini"
            @click="() => {dialogPermissionVisible = true, permission.pid = scope.row.id}">添加功能
          </el-button>
          <el-button
            v-if="scope.row.level == 4 &&  hasPerm('permission.update')"
            type="info"
            plain
            size="mini"
            @click="() => updateFunction(scope.row)">修改功能
          </el-button>
          <el-button
            v-if="scope.row.level != 4 && hasPerm('permission.update')"
            type="info"
            plain
            size="mini"
            @click="() => getById(scope.row)">修改
          </el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            @click="() => remove(scope.row)" v-if="hasPerm('permission.remove')">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加菜单的窗口 -->
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormValue" :show-close=false :before-close="handleClose">
      <el-form ref="menu" :model="menu" :rules="menuValidateRules" label-width="120px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="menu.path"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menu.component"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button type="primary" @click="append">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加功能的窗口 -->
    <el-dialog :visible.sync="dialogPermissionVisible" :title="dialogPermissionValue" :show-close=false :before-close="handleClose">
      <el-form ref="permission" :model="permission" :rules="permissionValidateRules" label-width="120px">
        <el-form-item label="功能名称" prop="name">
          <el-input v-model="permission.name"/>
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="permission.path"/>
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="permission.component"/>
        </el-form-item>
        <el-form-item label="功能权限值" prop="permissionValue">
          <el-input v-model="permission.permissionValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">取 消</el-button>
        <el-button type="primary" @click="appendPermission">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import menu from '@/api/acl/menu'

const menuForm = {
  id: '',
  name: '',
  path: '',
  component: '',
  type: '1',
  pid: 0
}

const perForm = {
  id: '',
  name: '',
  path: '',
  component: '',
  permissionValue: '',
  type: '2',
  pid: 0
}

export default {

  data() {
    return {
      filterText: '', // 搜索框过滤文本
      menuList: [], // 所有菜单列表array
      dialogFormValue: '添加菜单',  // 添加菜单窗口名称
      dialogPermissionValue: '添加功能',  // 添加功能窗口名称
      dialogFormVisible: false, // 添加菜单窗口是否可见
      dialogPermissionVisible: false, // 添加功能窗口是否可见
      menu: menuForm,
      permission: perForm,
      menuValidateRules: {  // 添加菜单窗口表单校验规则
        name: [{required: true, trigger: 'blur', message: '菜单名必须输入'}],
        path: [{required: true, trigger: 'blur', message: '菜单路径必须输入'}],
        component: [{required: true, trigger: 'blur', message: '组件名称必须输入'}]
      },
      permissionValidateRules: {  // 添加功能窗口表单校验规则
        name: [{required: true, trigger: 'blur', message: '功能名称必须输入'}],
        permissionValue: [{required: true, trigger: 'blur', message: '功能权限值必须输入'}]
      }
    }
  },

  // // 监听上面文本框搜索
  // watch: {
  //   filterText(val) {
  //     this.$refs.menuTree.filter(val)
  //   }
  // },

  created() {
    this.fetchNodeList()
  },

  methods: {
    // 获取全部菜单列表（树状）
    fetchNodeList() {
      menu.getNestedTreeList().then(response => {
        if (response.success === true) {
          this.menuList = response.data.permissionsList
          console.log(this.menuList)
        }
      })
    },

    // 点击遮罩层时提示
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.resetData()
      }).catch(_ => {})
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },

    // 删除菜单
    remove(data) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return menu.removeById(data.id)
      }).then(() => {
        this.fetchNodeList()// 刷新列表
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },

    // 添加功能（增删改查菜单权限）
    appendPermission() {
      this.$refs.permission.validate(valid => {
        if (valid) {
          if (this.permission.id) {
            this.update(this.permission)
          } else {
            menu.saveLevelOne(this.permission).then(response => {
              this.dialogPermissionVisible = false
              this.$message({
                type: 'success',
                message: '添加成功'
              })
              // 刷新页面
              this.fetchNodeList()
              this.menu = {...menuForm}
              this.permission = {...perForm}
            })
          }
        }
      })
    },

    // 添加菜单
    append() {
      this.$refs.menu.validate(valid => {
        if (valid) {
          if (!this.menu.id) { // 添加
            if (this.menu.pid == 0) {
              this.appendLevelOne() // 一级分类的添加
            } else {
              this.appendLevelTwo() // 二级分类的添加
            }
            this.menu = {...menuForm}
            this.permission = {...perForm}
          } else { // 修改
            this.update(this.menu)
          }
        }
      })
    },

    // 添加一级菜单
    appendLevelOne() {
      menu.saveLevelOne(this.menu).then(response => {
        // 关闭弹出窗口
        this.dialogFormVisible = false
        // 成功信息提示
          this.$message({
            type: 'success',
            message: '添加一级菜单成功'
          })
        // 刷新页面
        this.fetchNodeList()
        // 清空menu和permission
        this.menu = {...menuForm}
        this.permission = {...perForm}
      }).catch(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'error',
          message: '添加一级菜单失败'
        })
      })
    },

    // 添加二级菜单
    appendLevelTwo() {
      menu.saveLevelOne(this.menu).then(response => {
        // 关闭弹出窗口
        this.dialogFormVisible = false
        // 成功信息提示
        this.$message({
          type: 'success',
          message: "添加二级菜单成功"
        })
        // 刷新页面
        this.fetchNodeList()
        // 清空menu和permission
        this.menu = {...menuForm}
        this.permission = {...perForm}
      }).catch(() => {
        this.dialogFormVisible = false
        this.$message({
          type: 'error',
          message: "添加二级菜单失败"
        })
      })
    },

    // 修改
    update(obj) {
      menu.update(obj).then(response => {
        this.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // 刷新页面
        this.fetchNodeList()
        this.resetData()
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '修改失败'
        })
      })
    },

    // 点击修改回显数据
    getById(data) {
      this.dialogFormVisible = true
      this.menu = data
    },
    // 修改功能
    updateFunction(data) {
      this.dialogPermissionVisible = true
      this.permission = data
    },
    // 重置数据
    resetData() {
      this.menu = {...menuForm}
      this.permission = {...perForm}
      this.dialogPermissionVisible = false
      this.dialogFormVisible = false

    }
  }
}
</script>
