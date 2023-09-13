<template>
    <h1>Activities</h1>
    <h2>Upcoming Activities</h2>
    <div v-if="upcomingError">
      {{ upcomingError }}
    </div>
    <div v-else-if="upcoming">
      <div v-for="item in upcoming">
        <div class="code mb-2">
          {{  item }}
        </div>
      </div>
    </div>

    <h2>Completed Activities</h2>
    <div v-if="completedError">
      {{ completedError }}
    </div>
    <div v-else-if="completed" class="grid">
      <div v-for="item in completed" class="col">
        <div class="flex flex-row surface-ground border-round m-2 p-2">
          <div class="flex">
            <Image :src="item.contents.mainImageUrl"  width="120" />
          </div>
          <div class="flex flex-column ml-2 flex-grow-1">
            <div class="text-2xl mb-1">{{ item.contents.title }}</div>
            <div class="text-lg mb-1">{{ item.contents.startDateTime.replace(/T.*/g, '') }}</div>
            <div class="text-base mb-1">{{ item.contents.location }}</div>
          </div>
          <div class="flex justify-content-end align-items-center">
            <Button class="pt-3 pb-3" @click="select(item.contents.id)">&gt;</Button>
          </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts" setup>

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

async function select(id: string) {
  document.location = '/api/strava_auth_request?state=' + id
}
</script>