<script setup lang="ts">
import { FileSpreadsheet } from 'lucide-vue-next';
import { Component, h, ref } from 'vue';
import { NIcon, NMenu } from 'naive-ui';
import { MenuOption } from 'naive-ui/lib';
import { RouterLink, useRouter } from 'vue-router';

const renderIcon = (icon: Component) => (() => h(NIcon, null, { default: () => h(icon) }))

const { getRoutes, currentRoute } = useRouter()
const routes = getRoutes()

const menuOptions: MenuOption[] = routes.map(route => ({
    label: () => h(
      RouterLink,
      { to: route.path, },
      { default: () => route.name }),
    key: route.name,
    icon: renderIcon(FileSpreadsheet)
  } as MenuOption)
)

const activeKey = ref<string | null>(null)
</script>

<template>
  <header class="shadow-md py-1.5">
    <nav class="container mx-auto">
      <NMenu v-model="activeKey"
             :options="menuOptions"
             :defaultValue="currentRoute.name as string"
             mode="horizontal"
      />
    </nav>
  </header>
</template>
