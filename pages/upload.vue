<template>

    <ProgressSpinner v-if="pending" />

</template>

<script setup lang="ts">
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