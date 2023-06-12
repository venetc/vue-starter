<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutSider, NTag, NSpace, NH1 } from 'naive-ui'
import { generateColorsBetween, getContrastTextColor } from '@/shared/lib/color';
import { faker } from '@faker-js/faker';
import { Product, useRecentProducts } from '../model';

const CACHE_SIZE = 20;

const colors = generateColorsBetween({
  startColor: '#008000',
  endColor: '#f0fff0',
  count: CACHE_SIZE
})

const tagsTypes = ['default', 'info', 'success', 'warning', 'error'] as const;
const products: Product[] = faker.helpers.uniqueArray(faker.word.verb, 100)
  .map((product, index) => ({
    id: index,
    data: product
  }));

const getLoopedIndex = (index: number, array: unknown[]) => {
  return index <= array.length - 1
    ? index
    : getLoopedIndex(index - array.length, array)
}
const { recentProducts, addProductToRecent } = useRecentProducts(CACHE_SIZE)

const getBgColor = (itemIndex: number) => (colors[getLoopedIndex(itemIndex, colors)])
const getTextColor = (itemIndex: number) => (getContrastTextColor(colors[getLoopedIndex(itemIndex, colors)]))
</script>

<template>
  <div>
    <section>
      <NLayout hasSider>
        <NLayoutSider>
          <NSpace vertical
                  class="px-8"
                  size="small"
          >
            <div v-for="(product, index) in recentProducts"
                 :key="product.id"
                 :style="{
                   backgroundColor: getBgColor(index),
                   color: getTextColor(index)
                 }"
                 class="rounded-md py-1 text-xs relative"
            >
              <div class="absolute top-1/2 -translate-y-1/2 left-2">
                {{ index + 1 }}
              </div>
              <div class="flex justify-center items-center">
                <div>{{ product.data }}</div>
              </div>
            </div>
          </NSpace>
        </NLayoutSider>
        <NLayoutContent>
          <NH1>Мемоизация последних кринкутых тегов</NH1>
          <NSpace justify="center"
                  align="center"
                  size="large"
          >
            <NTag v-for="(product, index) in products"
                  :key="product.id"
                  :type="tagsTypes[getLoopedIndex(index, tagsTypes)]"
                  :bordered="false"
                  :size="'large'"
                  round
                  class="!cursor-pointer"
                  @click="addProductToRecent(product)"
            >
              {{ product.data }}
            </NTag>
          </NSpace>
        </NLayoutContent>
      </NLayout>
    </section>
  </div>
</template>
