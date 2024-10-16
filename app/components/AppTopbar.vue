<script setup lang="ts">
  const props = defineProps<{
    logout: () => Promise<void>;
    toggleSidebar: () => void;
  }>();

  const user = useUser();

  const items = [
    [
      {
        label: "Keluar",
        icon: "i-heroicons-arrow-left-on-rectangle",
        click: () => {
          props.logout();
        },
      },
    ],
  ];

  const colorMode = useColorMode();

  function toggleColorMode() {
    if (colorMode.value === "dark") {
      colorMode.preference = "light";
    } else {
      colorMode.preference = "dark";
    }
  }
</script>

<template>
  <div id="topbar" class="flex justify-between">
    <div class="flex items-center gap-4">
      <UButton
        class="hover:bg-primary rounded-full p-2 transition-all duration-300 hover:text-white"
        variant="ghost"
        @click="toggleSidebar"
      >
        <UIcon name="i-heroicons-bars-3" class="h-5 w-5" />
      </UButton>
      <h1 class="font-semibold text-gray-500 dark:text-gray-400">Dashboard</h1>
    </div>
    <div class="flex items-center gap-4">
      <UButton
        class="rounded-full p-2 text-black dark:text-white"
        variant="ghost"
        @click="toggleColorMode"
      >
        <UIcon
          v-if="colorMode.value === 'dark'"
          name="i-heroicons-moon-solid"
        />
        <UIcon v-else name="i-heroicons-sun-solid" />
      </UButton>
      <UDropdown :items="items">
        <UAvatar :alt="user ? user.username : 'Avatar'" />
      </UDropdown>
    </div>
  </div>
</template>
