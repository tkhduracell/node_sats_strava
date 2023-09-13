<template>
    <div>
        <h1>Enter SATS login</h1>
        <span class="p-input-icon-left mr-2">
            <i class="pi pi-user" />
            <InputText v-model="username" placeholder="Username" />
        </span>
        <span class="p-input-icon-left mr-2">
            <i class="pi pi-key" />
            <InputText v-model="password" type="password" placeholder="Password" />
        </span>
        <Button @click="submit">Go <i class="pi pi-arrow-right ml-2" /></Button>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()

async function submit() {
    await $fetch('/api/login', { method: 'POST', body: { username: username.value, password: password.value} })

    router.push({ path: '/list' })
}

</script>