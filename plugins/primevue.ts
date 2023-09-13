import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from 'primevue/card';
import Image from 'primevue/image';
import ProgressSpinner from 'primevue/progressspinner';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("Card", Card);
    nuxtApp.vueApp.component("Image", Image);
    nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner);
    //other components that you need
});