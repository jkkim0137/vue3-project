<template>
  <div>
    <el-button type="info" plain @click="(e) => addMenuItemHandler(e)" class="mt-6"
      >메뉴추가</el-button
    >
    <!-- <a href="#" >메뉴추가</a> -->
    <div class="menu_wrap mt-6">
      <ul class="menu_list">
        <TreeMenuItem
          v-for="(menuData, index) in menuStore.menuDataList"
          :menuData="menuData"
          :id="menuData.id"
          :index="index"
          :depth="menuData.depth"
          :key="menuData.id"
        >
        </TreeMenuItem>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide, onMounted } from 'vue'
import TreeMenuItem from './TreeMenuItem.vue'
import { useMenuStore } from '../stores/menu'

const menuStore = useMenuStore()

onMounted(() => {
  setDepth(menuStore.menuDataList, 1)
  setUniqueID(menuStore.menuDataList)
})

provide('clickMenuItemHandler', (e, index, menuData) => {
  menuData.isOpen = !menuData.isOpen
})
provide('mouseEnterMenuItem', (e, index, menuData) => {
  menuData.showHoverButton = true
})
provide('mouseLeaveMenuItem', (e, index, menuData) => {
  menuData.showHoverButton = false
})

const addMenuItemHandler = (e) => {
  menuStore.menuDataList.push({ ...menuStore.addNewObject })
  setUniqueID(menuStore.menuDataList)
}

provide('modifyMenuItemHandler', (e, index, menuData) => {
  menuData.modify = true
})

provide('deleteMenuItemHandler', (e, index, menuData) => {
  const objectDeleter = (arrayData, searchId) => {
    arrayData.forEach((e, i) => {
      if (e.id === searchId) {
        arrayData.splice(i, 1)
      } else if (e.children) {
        objectDeleter(e.children, searchId)
      }
    })
  }
  objectDeleter(menuStore.menuDataList, menuData.id)
})

const setDepth = (menuData, depth) => {
  menuData.forEach((menu) => {
    menu.depth = depth
    if (menu.children) {
      setDepth(menu.children, depth + 1)
    }
  })
}

const setUniqueID = (arrayData, parentID = '') => {
  arrayData.map((e, index) => {
    const preIndex = parentID + String(index + 1)
    e.id = preIndex
    if (e.children) {
      setUniqueID(e.children, preIndex)
    }
  })
}

provide('addChildMenuItemHandler', (e, index, menuData, newId) => {
  menuData.isOpen = true
  setDepth(menuStore.menuDataList, 1)
  if (menuData.children) {
    menuData.children.push({ ...menuStore.addNewObject })
    setUniqueID(menuStore.menuDataList)
  } else {
    menuData.children = []
    menuData.children.push({ ...menuStore.addNewObject })
    setUniqueID(menuStore.menuDataList)
  }
  console.log(menuStore.menuDataList)
})

provide('updateMenuItemHandler', (e, index, menuData) => {
  menuData.modify = false
  menuData.label = menuData.label
})
</script>

<style scoped>
.menu_wrap {
  width: 330px;
  border-right: 1px solid #ddd;
  height: 100vh;
}
.menu_list {
  margin-left: 0;
  padding-left: 10px;
}
</style>
