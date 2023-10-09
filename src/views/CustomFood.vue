<template>
  <div class="calc">
    <div class="container">
      <div class="calc__wrapper">
        <div class="calc__card" v-for="(product, index) in products" :key="product.id">
          <a href="#" class="calc__card-delete" @click.prevent="deleteProduct(product.id)">
            <img src="../../src/assets/img/close.png" alt="close">
          </a>
          <div class="calc__card-title name">Продукт {{ index + 1 }}</div>
          <va-input
              v-model="product.weight"
              placeholder="Вес"
              label="Укажите вес продукта"
              @focus="product.error = false"
              :error="product.error"
              error-messages="Вес обязателен к заполнению"
          />
          <va-input
              v-model="product.calories"
              placeholder="Калории"
              label="Укажите калории продукта на данный вес"
              @focus="product.error = false"
              :error="product.error"
              error-messages="Калории обязателены к заполнению"
          />
          <va-input
              v-model="product.protein"
              placeholder="Белки"
              label="Укажите белки продукта на данный вес"
              @focus="product.error = false"
              :error="product.error"
              error-messages="Белки обязателены к заполнению"
          />
          <va-input
              v-model="product.fats"
              placeholder="Жиры"
              label="Укажите жиры продукта на данный вес"
              @focus="product.error = false"
              :error="product.error"
              error-messages="Жиры обязателены к заполнению"
          />
          <va-input
              v-model="product.carbohydrates"
              placeholder="Углеводы"
              label="Укажите углеводы продукта на данный вес"
              @focus="product.error = false"
              :error="product.error"
              error-messages="Улеводы обязателены к заполнению"
          />
        </div>
        <va-input
            v-model="finishedWeight"
            placeholder="Вес"
            label="Укажите вес приготовленного продукта"
        />
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <va-button style="width: max-content;" @click="addProduct">Добавить продукт</va-button>
          <va-button style="width: max-content;" @click="calcFood">Рассчитать</va-button>
          <va-button style="width: max-content;" @click="clearFood">Сбросить</va-button>
        </div>
        <va-data-table :items="results" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
const products = ref([
  {
    id: 1,
    weight: '',
    calories: '',
    protein: '',
    fats: '',
    carbohydrates: '',
    error: false
  }
])
const finishedWeight = ref('');
const index = ref(1);
const results = ref([]);
const deleteProduct = (id: number) => {
  products.value = products.value.filter(product => product.id !== id);
}
const calcFood = () => {
  if (products.value.length !== 0 && finishedWeight.value !== '') {
    results.value = [];
    const finish = parseInt(finishedWeight.value);
    const resultFood = {
      "Готовый продукт": "На 100 грамм приготовленного продукта",
      "Калории": (products.value.reduce((acc: number, elem) => {
        return acc + +elem.calories;
      }, 0) * 100 / finish).toFixed(1),
      "Белки": (products.value.reduce((acc: number, elem) => {
        return acc + +elem.protein;
      }, 0) * 100 / finish).toFixed(1),
      "Жиры": (products.value.reduce((acc: number, elem) => {
        return acc + +elem.fats;
      }, 0) * 100 / finish).toFixed(1),
      "Углеводы": (products.value.reduce((acc: number, elem) => {
        return acc + +elem.carbohydrates;
      }, 0) * 100 / finish).toFixed(1)
    }
    results.value.push(resultFood);
  }
}

const addProduct = () => {
  index.value++;
  const product = {
    id: index.value,
    weight: '',
    calories: '',
    protein: '',
    fats: '',
    carbohydrates: '',
    error: false
  }
  products.value.push(product);
}

const clearFood = () => {
  products.value = [
    {
      id: 1,
      weight: '',
      calories: '',
      protein: '',
      fats: '',
      carbohydrates: '',
      error: false
    }
  ]
  results.value = [];
}
</script>
<style>
.container {
  max-width: 1230px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin: 0 auto;
}
.calc {
  padding-bottom: 30px;
}
.calc__wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.list__item + .list__item {
  margin-top: 20px;
}
.calc__card {
  border-radius: 8px;
  padding: 30px 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 20px;
}
.calc__card-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
}

.calc__card-delete > img {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.name {
  font-size: 18px !important;
}
@media (max-width: 606px) {
  .name {
    font-size: 15px !important;
  }
}
</style>