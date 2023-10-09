<template>
  <div class="calc">
    <div class="container">
      <div class="calc__wrapper">
        <va-select
            label="Выбирите тип просчёта"
            v-model="typeCalcTara"
            :options="options"
            text-by="name"
            :value-by="(option) => option.id"
        />
        <va-input
            v-model="dryWeight"
            placeholder="Вес"
            label="Укажите сухой(сырой) вес"
            @focus="errorDryWeight = false"
            :error="errorDryWeight"
            error-messages="Вес обязателен к заполнению"
        />
        <va-input
            v-if="typeCalcTara === 1"
            v-model="taraWeight"
            placeholder="Вес тары"
            label="Укажите вес тары"
            @focus="errorTaraWeight = false"
            :error="errorTaraWeight"
            error-messages="Вес обязателен к заполнению"
        />
        <va-input
            v-if="typeCalcTara === 1"
            v-model="finishedWeightWithTara"
            placeholder="Вес"
            label="Укажите готовый вес вместе с тарой"
            @focus="errorFinishedWeightWithTara = false"
            :error="errorFinishedWeightWithTara"
            error-messages="Вес обязателен к заполнению"
        />
        <va-input
            v-if="typeCalcTara === 0"
            v-model="finishedWeight"
            placeholder="Вес"
            label="Укажите готовый вес"
            @focus="errorFinishedWeight = false"
            :error="errorFinishedWeight"
            error-messages="Вес обязателен к заполнению"
        />
        <va-select
            v-if="checkVisibleTypeFood"
            label="Выбирите продукт"
            v-model="typeFood"
            :options="typeFoodOptions"
            text-by="name"
            :value-by="(option) => option.id"
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
import { RouterLink, RouterView } from 'vue-router'

import {computed, ref} from "vue";

const typeCalcTara = ref(0);
const typeFood = ref(0);

const dryWeight = ref('');
const finishedWeightWithTara = ref('');
const finishedWeight = ref('');
const taraWeight = ref('');

const errorDryWeight = ref(false);
const errorFinishedWeight = ref(false);
const errorTaraWeight = ref(false);
const errorFinishedWeightWithTara = ref(false);

const options = [
  {name: "Вес без тары", id: 0},
  {name: "Вес вместе с тарой", id: 1}
]
const typeFoodOptions = [
  {name: 'Крупа', id: 0},
  {name: 'Курица', id: 1}
]
const chickensWeight = [150, 110, 100, 50];
const cerealWeight = [90, 80, 70, 60, 50];

const results = ref([]);


const checkVisibleTypeFood = computed(() => finishedWeightWithTara.value !== '' || finishedWeight.value !== '');
const clearFood = () => {
  typeCalcTara.value = 0;
  typeFood.value = 0;
  dryWeight.value = '';
  finishedWeightWithTara.value = '';
  finishedWeight.value = '';
  taraWeight.value = '';
  errorDryWeight.value = false;
  errorFinishedWeight.value = false;
  errorTaraWeight.value = false;
  errorFinishedWeightWithTara.value = false;
  results.value = [];
}
const calcFood = () => {
  switch (typeCalcTara.value) {
    case 0:
      if (finishedWeight.value === '') {
        errorFinishedWeight.value = true;
      }
      if (dryWeight.value === '') {
        errorDryWeight.value = true;
      }
      if (finishedWeight.value !== '' && dryWeight.value !== '') {
        const dry = parseInt(dryWeight.value);
        const finish = parseInt(finishedWeight.value);
        switch (typeFood.value) {
          case 0:
            results.value = [];
            cerealWeight.forEach(num => {
              const result = {
                img: './src/assets/img/croop.jpg',
                name: `На ${num} грамм сухой крупы`,
                text: `Приходится <b>${((finish * num) / dry).toFixed(1)}</b> грамм разваренной крупы`
              }
              results.value.push(result);
            })
            break;
          case 1:
            results.value = [];
            chickensWeight.forEach(num => {
              const result = {
                img: './src/assets/img/chicken.jpg',
                name: `На ${num} грамм сырой курицы`,
                text: `Приходится <b>${((finish * num) / dry).toFixed(1)}</b> грамм готовой курицы`
              }
              results.value.push(result);
            })
            break;
        }
      }
      break;
    case 1:
      if (finishedWeightWithTara.value === '') {
        errorFinishedWeightWithTara.value = true;
      }
      if (dryWeight.value === '') {
        errorDryWeight.value = true;
      }
      if (taraWeight.value === '') {
        errorTaraWeight.value = true;
      }
      if (finishedWeightWithTara.value !== '' && dryWeight.value !== '' && taraWeight.value !== '') {
        const dry = parseInt(dryWeight.value);
        const finish = parseInt(finishedWeightWithTara.value) - parseInt(taraWeight.value);
        switch (typeFood.value) {
          case 0:
            results.value = [];
            cerealWeight.forEach(num => {
              const result = {
                img: './src/assets/img/croop.jpg',
                name: `На ${num} грамм сухой крупы`,
                text: `Приходится <b>${((finish * num) / dry).toFixed(1)}</b> грамм разваренной крупы`
              }
              results.value.push(result);
            })
            break;
          case 1:
            results.value = [];
            chickensWeight.forEach(num => {
              const result = {
                img: './src/assets/img/chicken.jpg',
                name: `На ${num} грамм сырой курицы`,
                text: `Приходится <b>${((finish * num) / dry).toFixed(1)}</b> грамм готовой курицы`
              }
              results.value.push(result);
            })
            break;
        }
      }
  }
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

