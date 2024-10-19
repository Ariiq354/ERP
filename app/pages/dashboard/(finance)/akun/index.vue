<script setup lang="ts">
  import type { FormSubmitEvent } from "#ui/types";
  import { json2Csv } from "~/utils";
  import {
    columns,
    getInitialFormData,
    kategoriAkun,
    type Schema,
    schema,
  } from "./constants";

  onMounted(() => {
    defineTopbarTitle("Daftar Akun");
  });

  const { data, status, refresh } = await useLazyFetch("/api/akun");

  // Table
  const table = useTemplateRef("tableRef");

  const state = ref(getInitialFormData());

  const modalOpen = ref(false);
  const modalLoading = ref(false);
  async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
      modalLoading.value = true;

      await $fetch("/api/akun", {
        method: "POST",
        body: event.data,
      });

      modalLoading.value = false;
      modalOpen.value = false;
      await refresh();
    } catch (error: unknown) {
      if (isNuxtError(error)) {
        useToastError(String(error.statusCode), error.statusMessage);
        modalLoading.value = false;
      }
    }
  }

  function clickAdd() {
    state.value = getInitialFormData();
    modalOpen.value = true;
  }

  async function clickDelete() {
    async function onDelete() {
      const idArray = table.value?.selected.map((item) => item.id);
      await $fetch("/api/akun", {
        method: "DELETE",
        body: {
          id: idArray,
        },
      });
      if (table.value) {
        table.value.selected = [];
      }
      await refresh();
    }

    openConfirmModal(onDelete);
  }

  async function clickUpdate(itemData: ExtractObjectType<typeof data.value>) {
    modalOpen.value = true;
    state.value = itemData;
  }
</script>

<template>
  <main>
    <Title>Daftar Akun</Title>
    <UModal v-model="modalOpen" prevent-close>
      <div class="px-4 py-5">
        <div class="mb-4 flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ state.id ? "Edit" : "Add" }} Akun
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1 rounded-full"
            :disabled="status === 'pending'"
            @click="modalOpen = false"
          />
        </div>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup label="Kode Akun" name="kode" class="w-full">
            <UInput v-model="state.kode" :disabled="modalLoading" />
          </UFormGroup>

          <UFormGroup label="Nama Akun" name="nama" class="w-full">
            <UInput v-model="state.nama" :disabled="modalLoading" />
          </UFormGroup>

          <UFormGroup label="Kategori" name="kategori" class="w-full">
            <USelectMenu
              v-model="state.kategori"
              size="lg"
              :options="kategoriAkun"
              class="capitalize"
            />
          </UFormGroup>

          <UFormGroup label="Deskripsi" name="deskripsi" class="w-full">
            <UTextarea
              v-model="state.deskripsi"
              :rows="6"
              :disabled="modalLoading"
            />
          </UFormGroup>

          <div class="flex w-full justify-end gap-2">
            <UButton
              icon="i-heroicons-x-mark-16-solid"
              variant="ghost"
              :disabled="modalLoading"
              @click="modalOpen = false"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              icon="i-heroicons-check-16-solid"
              :loading="modalLoading"
            >
              Submit
            </UButton>
          </div>
        </UForm>
      </div>
    </UModal>
    <UCard
      :ui="{
        body: {
          padding: 'sm:p-8',
        },
      }"
    >
      <div
        class="mb-6 flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
      >
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-plus"
            variant="soft"
            class="gap-2 text-base text-black dark:text-white"
            @click="clickAdd"
          >
            New
          </UButton>
          <UButton
            icon="i-heroicons-trash"
            variant="soft"
            class="gap-2 text-base text-black disabled:opacity-50 dark:text-white"
            :disabled="table ? table?.selected.length === 0 : true"
            @click="clickDelete"
          >
            Delete
          </UButton>
        </div>
        <UButton
          icon="i-heroicons-arrow-up-tray"
          variant="soft"
          size="lg"
          class="gap-2 text-base text-black dark:text-white"
          :disabled="!(data && data.length > 0)"
          @click="json2Csv(data!)"
        >
          Export
        </UButton>
      </div>
      <AppTable
        ref="tableRef"
        label="Manage User"
        :loading="status === 'pending'"
        :data="data"
        :columns="columns"
        :selectable="true"
        @edit-click="(e) => clickUpdate(e)"
      />
    </UCard>
  </main>
</template>
