<script setup lang="ts">
  const sidebarOpenState = ref(true);

  const user = useUser();

  function toggleSidebar() {
    sidebarOpenState.value = !sidebarOpenState.value;
  }

  async function logout() {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      user.value = null;
      await navigateTo("/");
    } catch (error: unknown) {
      if (isNuxtError(error)) {
        useToastError(String(error.statusCode), error.statusMessage);
      }
    }
  }
</script>

<template>
  <section class="flex bg-gray-200 dark:bg-gray-800">
    <AppSidebar />
    <div class="flex w-full flex-1 flex-col p-4">
      <AppTopbar :logout="logout" :toggle-sidebar="toggleSidebar" />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </section>
</template>
