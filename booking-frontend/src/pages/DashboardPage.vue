<script setup>
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <div class="grid">
      <div class="grid grid-cols-8 gap-8 mb-4">
        <!-- Card -->
        <div class="col-span-8 md:col-span-4 xl:col-span-2">
          <Skeleton
            borderRadius="16px"
            height="100%"
            :pt="{
              root: {
                class: '!bg-primary-600 min-h-[136px] h-full',
              },
            }"
          ></Skeleton>
        </div>
        <div class="col-span-8 md:col-span-4 xl:col-span-2">
          <Skeleton
            borderRadius="16px"
            height="100%"
            :pt="{
              root: {
                class: '!bg-primary-600 min-h-[136px] h-full',
              },
            }"
          ></Skeleton>
        </div>
        <div class="col-span-8 md:col-span-4 xl:col-span-2">
          <Skeleton
            borderRadius="16px"
            height="100%"
            :pt="{
              root: {
                class: '!bg-primary-600 min-h-[136px] h-full',
              },
            }"
          ></Skeleton>
        </div>
        <div class="col-span-8 md:col-span-4 xl:col-span-2">
          <Skeleton
            borderRadius="16px"
            height="100%"
            :pt="{
              root: {
                class: '!bg-primary-600 min-h-[136px] h-full',
              },
            }"
          ></Skeleton>
        </div>
        <div class="col-span-8 xl:col-span-5">
          <div class="bg-primary-600 rounded-2xl p-5 h-full flex flex-col">
            <div class="h-full">
              <Skeleton
                borderRadius="16px"
                height="100%"
                :pt="{
                  root: {
                    class: '!bg-primary-600 min-h-[300px]',
                  },
                }"
              ></Skeleton>
            </div>
          </div>
        </div>
        <div class="col-span-8 xl:col-span-3">
          <div class="bg-primary-600 rounded-2xl p-5 h-full">
            <ul class="list-none p-0 m-0 mt-6 text-white">
              <li>
                <Skeleton
                  v-for="item in 6"
                  :key="item"
                  borderRadius="16px"
                  height="48px"
                  :pt="{
                    root: {
                      class: '!bg-primary-600 w-full mb-6',
                    },
                  }"
                >
                </Skeleton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
