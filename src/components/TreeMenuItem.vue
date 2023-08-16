<template>
  <li :class="menuData.isOpen ? 'active' : ''">
    <div
      @mouseenter="(e) => mouseEnterMenuItem(e, index, menuData)"
      @mouseleave="(e) => mouseLeaveMenuItem(e, index, menuData)"
    >
      <button type="button" @click="(e) => clickMenuItemHandler(e, index, menuData)">
        {{ menuData.label }}
        - ID {{ menuData.id }}
      </button>
      <div v-if="menuData.showHoverButton" style="display: inline-block">
        <button @click="(e) => modifyMenuItemHandler(e, index, menuData)">수정</button>
        <button @click="(e) => deleteMenuItemHandler(e, index, menuData)">삭제</button>
        <button @click="(e) => addChildMenuItemHandler(e, index, menuData, menuData.id)">
          추가
        </button>
      </div>
      <div v-if="menuData.modify" class="modify_box">
        <input type="text" v-model="menuData.label" />
        <button @click="(e) => updateMenuItemHandler(e, index, menuData)">확인</button>
      </div>
    </div>
    <ul>
      <TreeMenuItem
        v-for="(item, index) in menuData.children"
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
button {
  border: 0;
  background-color: #fff;
  cursor: pointer;
}
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
  display: block;
}
input {
  width: 60%;
}
</style>
