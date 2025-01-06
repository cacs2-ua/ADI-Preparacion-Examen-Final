<script setup>
import { ref, onMounted } from 'vue'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'vue-router'

let hayLogin = ref(false)
let router = useRouter()

onMounted(() => {
  auth.onAuthStateChanged(user => {
    hayLogin.value = !!user
    if (hayLogin.value) {
      router.push('/anuncios')
    } else {
      router.push('/login')
    }
  })
})
</script>

<template>
  <router-view />
</template>
