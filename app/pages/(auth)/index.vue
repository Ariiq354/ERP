<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { type Schema, initialState, loginSchema } from "./constants";

  definePageMeta({
    layout: "auth",
  });

  const state = ref({ ...initialState });

  const isLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      isLoading.value = true;
      await $fetch("/api/auth/login", {
        method: "POST",
        body: event.data,
      });
      await navigateTo("/dashboard");
      isLoading.value = false;
    } catch (error: unknown) {
      if (isNuxtError(error)) {
        useToastError(String(error.statusCode), error.statusMessage);
        isLoading.value = false;
      }
    }
  }
</script>

<template>
  <UCard class="w-full max-w-sm">
    <div class="space-y-6">
      <div class="text-center">
        <div class="pointer-events-none mb-2">
          <UIcon
            name="i-heroicons-lock-closed"
            class="h-8 w-8 flex-shrink-0 text-gray-900 dark:text-white"
          />
        </div>
        <div class="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back!
        </div>
        <div class="mt-1 text-gray-500 dark:text-gray-400">
          Don't have an account?
          <span class="text-primary font-medium">Sign Up.</span>
        </div>
      </div>
      <UForm
        :schema="loginSchema"
        :state="state"
        class="w-full space-y-6"
        :validate-on="['submit']"
        @submit="onSubmit"
      >
        <UFormGroup label="Username" name="username">
          <UInput
            v-model="state.username"
            :leading="true"
            placeholder="Enter your username"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="state.password"
            :leading="true"
            type="password"
            placeholder="Enter your password"
          />
        </UFormGroup>

        <UCheckbox v-model="state.rememberMe" label="Remember me" />

        <UButton
          class="flex w-full justify-center"
          type="submit"
          :loading="isLoading"
        >
          Continue
        </UButton>
      </UForm>
    </div>
  </UCard>
</template>

<style scoped></style>
