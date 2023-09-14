<template>
    <div class="flex align-items-center absolute top-50 bottom-50 w-full" v-if="loading || status === 'pending'">
        <ProgressSpinner />
    </div>
    <div v-else>
        <h1>Enter SATS login</h1>
        <form @submit="submit">
            <div class="formgroup-inline">
                <div class="field">
                    <span class="p-input-icon-left mr-2">
                        <i class="pi pi-user" />
                        <InputText v-model="username" placeholder="Username" />
                    </span>
                </div>
                <div class="field">
                    <span class="p-input-icon-left mr-2">
                        <i class="pi pi-key" />
                        <InputText v-model="password" type="password" placeholder="Password" />
                    </span>
                </div>
            </div>
            <Button @click="submit" class="">Continue <i class="pi pi-arrow-right ml-2" /></Button>
        </form>
    </div>
</template>

<script lang="ts" setup>
useSeoMeta({ title: 'Sats: Log In' })

const username = ref<string>('')
const password = ref<string>('')

const router = useRouter()

const { data, pending: loading } = useAsyncData(() => $fetch('/api/login'), { server: false })

const { execute, status } = useAsyncData(() => $fetch('/api/login', { method: 'POST', body: { username: username.value, password: password.value } }), { server: false, immediate: false })

watch(data, v => !!v?.userId ? router.push({ path: '/list' }) : Promise.resolve())

async function submit() {
    await execute()
    await router.push({ path: '/list' })
}

</script>