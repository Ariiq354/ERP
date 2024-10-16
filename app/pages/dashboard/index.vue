<script setup lang="ts">
  const user = useUser();

  async function logout() {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      user.value = null;
      await navigateTo("/");
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal server error",
      });
    }
  }
</script>

<template>
  <div>
    ini dashboard
    <button @click="logout">logout</button>
  </div>
</template>
