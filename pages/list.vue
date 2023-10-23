<template>
    <h1>Upload SATS Activity</h1>
    <h2>Completed Activities</h2>
    <div v-if="completedError">
      {{ completedError }}
    </div>
    <div v-else-if="Array.isArray(completed) && completed.length === 0" class="grid">
      <div class="col-12 md:col-6 lg:col-5 xl:col-4">
        You have no completed activites.
      </div>
    </div>
    <div v-else-if="Array.isArray(completed)" class="grid">
      <div v-for="item in completed" class="col-12 md:col-6 lg:col-5 xl:col-4 flex">
        <div class="flex flex-row surface-ground border-round p-1 w-full">
          <div class="flex align-items-center">
            <Image :src="item.contents.mainImageUrl"  width="120" />
          </div>
          <div class="flex flex-column ml-2 flex-grow-1">
            <div class="text-2xl mb-1">{{ item.contents.title }}</div>
            <div class="text-lg mb-1">{{ item.contents.startDateTime.replace(/T.*/g, '') }}</div>
            <div class="text-base mb-1">{{ item.contents.location }}</div>
          </div>
          <div class="flex justify-content-end align-items-center">
            <Button class="pt-3 pb-3 h-full" @click="select(item.contents.id)">&gt;</Button>
          </div>
        </div>
      </div>
    </div>

    <h2>Upcoming Activities</h2>
    <div v-if="upcomingError">
      {{ upcomingError }}
    </div>
    <div v-else-if="Array.isArray(upcoming) && upcoming.length === 0" class="grid">
      <div class="col-12 md:col-6 lg:col-5 xl:col-4">
        You have no planned activites.
      </div>
    </div>
    <div v-else-if="Array.isArray(upcoming)" class="grid">
      <div v-for="item in upcoming" class="col-12 md:col-6 lg:col-5 xl:col-4">
        <div class="flex flex-column surface-ground border-round m-2 p-2">
          <div class="text-2xl mb-1">{{ item.activityName }}</div>
          <div class="text-lg mb-1">{{ item.date }} {{ item.startTime }}</div>
          <div class="text-base mb-1">{{ item.centerName }}</div>
        </div>
      </div>
    </div>

</template>


<script lang="ts" setup>
useSeoMeta({ title: 'SATS: Upload Activity' })
const router = useRouter()

const { data: upcoming, error: upcomingError } = await useAsyncData(
  'upcoming',
  () => $fetch('/api/upcoming'),
  { immediate: true, server: false }
)

const { data: completed, error: completedError } = await useAsyncData(
  'completed',
  () => $fetch('/api/completed'),
  { immediate: true, server: false }
)

watch(completedError, (err) => {
  if (err?.name === "FetchError"  && 'statusCode' in err && err.statusCode === 403) {
    router.push({ name: 'login' })
  }
})
watch(upcomingError, (err) => {
  if (err?.name === "FetchError"  && 'statusCode' in err && err.statusCode === 403) {
    router.push({ name: 'login' })
  }
})

async function select(id: string) {
  document.location = '/api/strava_auth_request?state=' + id
}
</script>