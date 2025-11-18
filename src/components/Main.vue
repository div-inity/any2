<template>
  <v-text-field label="Вакансия с маленькой буквы в родительном падеже" v-model="editVacancy"></v-text-field>
  <v-text-field label="Сайт" v-model="editSite"></v-text-field>
  <v-btn @click="editText">Ввод</v-btn>
  <template v-if="true">
    <article class="text" ref="articleRef">
      <p>Здравствуйте!</p>
      <p>Меня зовут Анна Шатова, и я с большим интересом откликаюсь на вакансию {{ vacancy }}, размещенную Вами{{ (site)
        ? " на сайте " + site : null }}. Мой опыт в организации документооборота и административной
        поддержки
        позволяет мне быть полезной Вашей компании уже с первых дней работы.</p>
      <p>На предыдущих позициях я была ответственна за полный цикл документооборота: от первичной регистрации и
        распределения входящей документации до контроля исполнения, подготовки исходящих писем, отправки и
        своевременного
        архивирования. Также в мои обязанности входило выполнение поручений руководства и поддержание порядка в офисе.
        Я уделяю особое внимание деталям, что гарантирует
        минимизацию
        ошибок при работе с документами. Мой аналитический подход помогает мне выстраивать эффективные системы
        организации
        рабочего процесса, будь то структурирование электронных папок или планирование графика руководителя.</p>
      <p>Отдельным преимуществом считаю свою заинтересованность в IT. Изучение программирования и веб-разработки
        позволяет
        мне не только быть крайне внимательной к деталям, но и находить возможности для автоматизации рутинных задач
        (например, с помощью Excel, Google Sheets или скриптов), что напрямую способствует повышению эффективности
        работы офиса.</p>
      <p>Буду рада возможности обсудить, как мои навыки и подход к работе могут принести пользу Вашей компании. Готова
        предоставить рекомендации с предыдущих мест работы.</p>
      <div class="signature">
        <span>С уважением,</span><br>
        <span>Анна Шатова</span><br>
        <span>+7 (977) 465-37-99</span>
      </div>
    </article>
    <v-btn @click="copy">Копировать</v-btn>
  </template>
  <template ref="notify" v-if="notify != null">
    <v-alert :text="notify" title="Уведомление" :type="notifyType" variant="tonal"></v-alert>
  </template>

</template>

<script setup>
import { ref } from 'vue';
let editVacancy = ref(null);
let editSite = ref(null);
let notify = ref(null);
let notifyType = ref(null);
let vacancy = ref("cекретаря-делопроизводителя");
let site = ref("hh.ru");
const articleRef = ref(null);
const editText = async () => {
  console.log(editVacancy.value, editSite.value)
  vacancy.value = editVacancy.value;
  site.value = editSite.value;
}
const copy = async () => {
  if (articleRef.value) {
    const range = document.createRange();
    range.selectNodeContents(articleRef.value);

    const selection = window.getSelection();
    selection.removeAllRanges(); // Очистить существующие выделения
    selection.addRange(range); // Выделить содержимое элемента

    try {
      document.execCommand('copy');
      notify.value = "Текст скопирован"
      notifyType.value = "info";
      setTimeout(() => {
        notify.value = null;
        notifyType.value = null;
      }, 3000);
    } catch (err) {
      notify.value = "Ошибка копирования"
      notifyType.value = "error";
      setTimeout(() => {
        notify.value = null;
        notifyType.value = null;
      }, 3000);
    }

    // Удаляем выделение после копирования
    selection.removeAllRanges();
  }
};

</script>
