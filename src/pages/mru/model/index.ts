import { ref } from 'vue';

export type Product = {
  id: number;
  data: string;
}

export const useRecentProducts = (maxProducts = 10) => {
  const recentProducts = ref<Product[]>([]);

  const addProductToRecent = (product: Product) => {
    const index = recentProducts.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      // Если товар уже есть в списке, перемещаем его в начало
      recentProducts.value.splice(index, 1);
      recentProducts.value.unshift(product);
    } else {
      // Иначе добавляем товар в начало списка
      recentProducts.value.unshift(product);

      // Если количество товаров превышает максимальное значение, удаляем последний товар
      if (recentProducts.value.length > maxProducts) {
        recentProducts.value.pop();
      }
    }
  }

  return {
    addProductToRecent,
    recentProducts,
  };
}
