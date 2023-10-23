<template>
    <div class="flex align-items-center absolute top-50 bottom-50 w-full" v-if="loading || isSubmitting">
        <ProgressSpinner />
    </div>
    <div v-else>
        <h1>Enter SATS login</h1>
        <form @submit="submit">
            <div class="formgroup-inline mb-0">
                <div class="">
                    <span class="p-input-icon-left mr-2">
                        <i class="pi pi-user" />
                        <InputText v-bind="username" v-bind:class="{ 'p-invalid': errors.username }" aria-describedby="text-error" placeholder="Username" autocomplete="username" />
                    </span>
                </div>
                <div class="">
                    <span class="p-input-icon-left mr-2">
                        <i class="pi pi-key" />
                        <InputText v-bind="password" type="password" v-bind:class="{ 'p-invalid': errors.password }" aria-describedby="text-error" placeholder="Password" autocomplete="current-password" />
                    </span>
                </div>
            </div>
            <div class="p-error" v-if="errors.username">{{ errors.username || '&nbsp;' }}</div>
            <div class="p-error" v-if="errors.password">{{ errors.password || '&nbsp;' }}</div>

            <Button class="mt-2" @click="submit" :disabled="!meta.touched || !meta.valid">
                Continue <i class="pi ml-2" :class="[meta.pending ? 'pi-spinnner' : 'pi-arrow-right']"  />
            </Button>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const router = useRouter()
useSeoMeta({ title: 'SATS: Log In' })

const { values: form, errors,
    meta, setFieldError,
    handleSubmit, defineInputBinds,
    isSubmitting
} = useForm({
    validationSchema: toTypedSchema(z.object({
        username: z.string().min(3).max(255),
        password: z.string().min(3).max(255),
    }))
});

const loading = ref(true)
const { data } = useAsyncData(() => $fetch('/api/login'), { server: false })

watch(data, v => {
    if (!!v?.userId) router.push({ path: '/list' })
    else loading.value = false
})

const username = defineInputBinds('username', {})
const password = defineInputBinds('password', {})

const submit = handleSubmit(async (body) => {
    const result = await $fetch('/api/login', { method: 'POST', body, ignoreResponseError: true })
    if ('userId' in result) {
        await router.push({ path: '/list' })
    } else if (result.error === 'Unauthorized') {
        setFieldError('username', 'Invalid login')
    } else {
        setFieldError('username', 'Unknown error: ' + JSON.stringify(result))
    }
})
</script>