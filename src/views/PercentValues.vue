<template>
  <div class="calc">
    <div class="container">
      <div class="calc__wrapper">
        <va-input
            v-model="dryWeight"
            placeholder="Вес"
            label="Укажите изначальный сухой(сырой) вес"
            @focus="errorDryWeight = false"
            :error="errorDryWeight"
            error-messages="Вес обязателен к заполнению"
        />
        <va-input
            v-model="finishedWeight"
            placeholder="Вес"
            label="Укажите изначальный готовый вес"
            @focus="errorFinishedWeight = false"
            :error="errorFinishedWeight"
            error-messages="Вес обязателен к заполнению"
        />
        <va-input
            v-model="singleProduct"
            placeholder="Вес"
            label="Укажите готовый вес остаточного продукта"
            @focus="errorSingleProduct = false"
            :error="errorSingleProduct"
            error-messages="Вес обязателен к заполнению"
        />
        <div style="display: flex; gap: 10px">
          <va-button style="width: max-content;" @click="calcFood">Рассчитать</va-button>
          <va-button style="width: max-content;" @click="clearFood">Сбросить</va-button>
        </div>
        <va-list v-show="results.length !== 0">
          <va-list-label> Результат </va-list-label>

          <va-list-item
              v-for="(result, index) in results"
              :key="index"
              class="list__item"
          >
            <va-list-item-section avatar>
              <va-avatar>
                <img :src="result.img">
              </va-avatar>
            </va-list-item-section>

            <va-list-item-section>
              <va-list-item-label>
                <span class="name">{{ result.name }}</span>
              </va-list-item-label>

              <va-list-item-label
                  caption
                  :lines="index + 1"
              >
                <span class="name" v-html="result.text"></span>
              </va-list-item-label>
            </va-list-item-section>
          </va-list-item>
        </va-list>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";

const dryWeight = ref('');
const finishedWeight = ref('');
const singleProduct = ref('');

const errorDryWeight = ref(false);
const errorFinishedWeight = ref(false);
const errorSingleProduct = ref(false);

const results = ref([]);

const calcFood = () => {
  if (finishedWeight.value === '') {
    errorFinishedWeight.value = true;
  }
  if (dryWeight.value === '') {
    errorDryWeight.value = true;
  }
  if (singleProduct.value === '') {
    errorSingleProduct.value = true;
  }
  if (finishedWeight.value !== '' && dryWeight.value !== '' && singleProduct.value !== '') {
    const dry = parseInt(dryWeight.value);
    const finish = parseInt(finishedWeight.value);
    const single = parseInt(singleProduct.value);
    results.value = [];
    const result = {
      img: './src/assets/img/food.jpg',
      name: `На ${single} грамм готовой еды`,
      text: `Приходится <b>${((dry * single) / finish).toFixed(1)}</b> грамм сырой еды`
    }
    results.value.push(result);
  }
}

const clearFood = () => {
  dryWeight.value = '';
  finishedWeight.value = '';
  singleProduct.value = '';
  errorDryWeight.value = false;
  errorFinishedWeight.value = false;
  errorSingleProduct.value = false;
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
.name {
  font-size: 18px !important;
}
@media (max-width: 606px) {
  .name {
    font-size: 15px !important;
  }
}
</style>