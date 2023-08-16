import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', () => {
  // const menuDataList = ref([
  //   {
  //       "id": null,
  //       "label": "메뉴1",
  //       "depth":null,
  //       "isOpen":false,
  //       "modify":false,
  //       "children": [
  //           {
  //               "id": null,
  //               "label":"메뉴1-1",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴1-1-1", "depth":null},
  //                   {"id": null, "label":"메뉴1-1-2", "depth":null},
  //                   {"id": null, "label":"메뉴1-1-3", "depth":null}
  //               ]
  //           },
  //           {
  //               "id": null,
  //               "label":"메뉴1-2",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴1-2-1", "depth":null},
  //                   {"id": null, "label":"메뉴1-2-2", "depth":null},
  //                   {"id": null, "label":"메뉴1-2-3", "depth":null}
  //               ]
  //           },
  //           {
  //               "id": null,
  //               "label":"메뉴1-3",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴1-3-1", "depth":null},
  //                   {"id": null, "label":"메뉴1-3-2", "depth":null},
  //                   {"id": null, "label":"메뉴1-3-3", "depth":null}
  //               ]
  //           }
  //       ]
  //   },
  //   {
  //       "id": null,
  //       "label": "메뉴2",
  //       "depth":null,
  //       "isOpen":false,
  //       "children": [
  //           {
  //               "id": null,
  //               "label":"메뉴2-1",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴2-1-1", "depth":null},
  //                   {"id": null, "label":"메뉴2-1-2", "depth":null},
  //                   {"id": null, "label":"메뉴2-1-3", "depth":null}
  //               ]
  //           },
  //           {
  //               "id": null,
  //               "label":"메뉴2-2",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴2-2-1", "depth":null},
  //                   {"id": null, "label":"메뉴2-2-2", "depth":null},
  //                   {"id": null, "label":"메뉴2-2-3", "depth":null}
  //               ]
  //           },
  //           {
  //               "id": null,
  //               "label":"메뉴2-3",
  //               "depth":null,
  //               "isOpen":false,
  //               "modify":false,
  //               "children": [
  //                   {"id": null, "label":"메뉴2-3-1", "depth":null},
  //                   {"id": null, "label":"메뉴2-3-2", "depth":null},
  //                   {"id": null, "label":"메뉴2-3-3", "depth":null}
  //               ]
  //           }
  //       ]
  //   }
  // ])

  const menuDataList = ref([])

  axios
    .get('https://run.mocky.io/v3/f605da9e-e5dd-418c-b267-b1f8955b1358', {
      params: {}
    })
    .then((res) => {
      menuDataList.value = res.data
      console.log(menuDataList.value)
    })
  const addNewObject = {
    id: null,
    label: menuDataList.value.modify === true ? menuDataList.value.label : '새로 추가한 메뉴',
    depth: null,
    isOpen: false,
    modify: false
  }

  const updateMenuDataList = (updateMenuData) => {
    menuDataList.value = { ...menuDataList.value, updateMenuData }
  }

  return {
    menuDataList,
    addNewObject,
    updateMenuDataList
  }
})
