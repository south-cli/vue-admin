<template>
  <div class="home">
    <Table
      :data="datas.items"
      :isLoading="isLoading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import Table from '@/components/Table.vue' // @ is an alias to /src

export default defineComponent({
  components: {
    Table
  },
  setup () {
    const isLoading = ref(false)
    const datas = reactive<{ items: unknown, total: number }>({
      items: [],
      total: 0
    })

    onMounted(() => {
      getData()
    })

    const getData = () => {
      console.log('getData')
      const token = 'be334e1c4be8d32769e0d5f09ee9878b'
      const url = 'https://api-admsys.43wan.com/stat/sub-channel-overview?register_date[]=2021-09-29&register_date[]=2021-09-29&pay_date[]=2021-09-29&pay_date[]=2021-09-29'
      isLoading.value = true
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response: { data: {data: {items: unknown[], total: number}, code: number} }) => {
        console.log('response:', response)
        const res = response.data
        if (res.code === 200) {
          const { items, total } = res.data
          datas.items = items
          datas.total = total
          console.log('res.data:', res.data)
        }
      }).finally(() => {
        isLoading.value = false
      })
    }

    return {
      datas,
      isLoading
    }
  }
})
</script>
