<template>
    <div>
        <h1>Welcome to SATS exporter</h1>
        <p>This tool can be used to upload SATS activities to your Strava account.</p>
        <ol>
            <li>Login to your SATS account</li>
            <li>Select activity to upload</li>
            <li>Login to your Strava account</li>
            <li>Done</li>
        </ol>
        <NuxtLink to="/login">
            <Button>Start</Button>
        </NuxtLink>
    </div>

</template>
<script setup>
useSeoMeta({ title: 'Sats -> Strava: Welcome' })

const { data } = useAsyncData(() => $fetch('/api/login'), { server: false })

const router = useRouter()
watch(data, v => {
    if (!!v?.userId) router.push({ path: '/list' })
})

</script>