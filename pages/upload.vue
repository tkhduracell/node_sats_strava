<template>
    <div class="flex align-items-center absolute top-50 bottom-50 w-full" v-if="pending">
        <ProgressSpinner />
    </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Strava: Uploading...' })
import { StravaActivity } from '~/server/lib/StravaActivity';

const { query } = useRoute()

const { data, error, pending } = await useAsyncData<StravaActivity>(
  'upload-' + query.state,
  () => $fetch('/api/upload', { query: { activity: query.state }}),
  { immediate: true, server: false }
)
watch(data, (d) => {
    document.location = 'https://www.strava.com/activities/' + d?.id
})
</script>