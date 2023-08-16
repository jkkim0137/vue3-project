<template>
  <li :class="props.menuData.isOpen ? 'active' : ''">
    <div
      @mouseenter="(e) => mouseEnterMenuItem(e, index, props.menuData)"
      @mouseleave="(e) => mouseLeaveMenuItem(e, index, props.menuData)"
    >
      <button type="button" @click="(e) => clickMenuItemHandler(e, index, props.menuData)">
        <span class="text-blue">{{ props.menuData.label }}</span>
        <span class="text-xs text-gray-500 ml-2">(ID:{{ props.menuData.id }})</span>
      </button>
      <div
        v-if="props.menuData.showHoverButton"
        style="display: inline-block"
        class="text-xs text-blue-500"
      >
        <button @click="(e) => modifyMenuItemHandler(e, index, props.menuData)" class="ml-2">
          수정
        </button>
        <button
          @click="(e) => addChildMenuItemHandler(e, index, props.menuData, props.menuData.id)"
          class="ml-2"
        >
          추가
        </button>
        <button @click="(e) => deleteMenuItemHandler(e, index, props.menuData)" class="ml-2">
          삭제
        </button>
      </div>
      <div v-if="props.menuData.modify" class="modify_box">
        <el-input v-model="props.menuData.label" class="w-20" size="small" />
        <button
          @click="(e) => updateMenuItemHandler(e, index, props.menuData)"
          class="text-xs text-blue-500"
        >
          확인
        </button>
      </div>
    </div>
    <ul>
      <TreeMenuItem
        v-for="(item, index) in props.menuData.children"
        :menuData="item"
        :id="item.id"
        :index="index"
        :depth="item.depth"
        :key="item.id"
      >
      </TreeMenuItem>
    </ul>
  </li>
</template>

<script setup>
import { ref, defineProps, defineEmits, inject } from 'vue'
import TreeMenuItem from './TreeMenuItem.vue'
import { useMenuStore } from '../stores/menu'

const menuStore = useMenuStore()

const props = defineProps({
  menuData: {
    default: () => {},
    type: Object
  },
  index: {
    default: () => 0,
    type: Number
  },
  depth: {
    default: () => 0,
    type: Number
  },
  isOpen: {
    default: () => false,
    type: Boolean
  },
  showDeleteButton: {
    default: () => false,
    type: Boolean
  }
})

const clickMenuItemHandler = inject('clickMenuItemHandler')
const mouseEnterMenuItem = inject('mouseEnterMenuItem')
const mouseLeaveMenuItem = inject('mouseLeaveMenuItem')
const modifyMenuItemHandler = inject('modifyMenuItemHandler')
const deleteMenuItemHandler = inject('deleteMenuItemHandler')
const updateMenuItemHandler = inject('updateMenuItemHandler')
const addChildMenuItemHandler = inject('addChildMenuItemHandler')
</script>

<style scoped>
ul {
  padding: 10px;
  margin: 0;
}
li > li {
}

li > ul {
  display: none;
}

li.active > ul {
  display: block;
}
.modify_box {
  /* display: block; */
}
input {
  /* width: 60%; */
}
</style>
