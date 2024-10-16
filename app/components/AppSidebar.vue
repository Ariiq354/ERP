<script setup lang="ts">
  const route = useRoute();

  const sidebarItems = [
    {
      title: "User",
      items: [
        {
          title: "User",
          link: "/dashboard",
          icon: "i-heroicons-user",
        },
      ],
    },
  ];
</script>

<template>
  <div
    id="sidebar"
    class="sticky top-0 h-screen overflow-hidden shadow-lg transition-all duration-200"
    :class="true ? 'w-72' : 'w-0'"
  >
    <div
      class="text-primary flex h-24 items-center justify-center gap-2 text-3xl font-semibold tracking-widest"
    >
      <UIcon name="i-heroicons-globe-alt" class="h-9 w-9" />
      <span>Lorem</span>
    </div>
    <div v-for="(item, firstIndex) in sidebarItems" :key="firstIndex">
      <h1 class="text-primary px-7 py-4 text-xs font-bold uppercase">
        {{ item.title }}
      </h1>
      <div v-for="(childrenItem, secondIndex) in item.items" :key="secondIndex">
        <NuxtLink
          class="flex w-full items-center gap-2 px-7 py-3 text-base transition-all duration-200 hover:bg-slate-100 dark:hover:bg-gray-800/50"
          :to="childrenItem.link"
        >
          <UIcon :name="childrenItem.icon" class="h-4 w-4" />
          <p
            class="tracking-wide"
            :class="{ 'font-semibold': route.fullPath === childrenItem.link }"
          >
            {{ childrenItem.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
