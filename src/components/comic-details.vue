<template>
    <div>
        <vue-final-modal
            v-model="showModal"
            esc-to-close
        >
            <div class="h-screen w-full flex items-center justify-center">
                <loader v-if="isLoading || !comic" />
                <div
                    v-else
                    class="m-6 w-full max-w-2xl bg-white dark:bg-slate-800 rounded"
                >
                    <!-- Header -->
                    <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                        <h3 class="text-lg leading-6 font-medium text-slate-700 dark:text-gray-300">
                            {{ comic.title }}
                        </h3>
                        <p class="mt-1 text-sm font-medium text-gray-400">
                            {{ comic.series.name }}
                        </p>
                    </div>
                    <!-- Informations -->
                    <div class="px-6 py-4 h-96 text-sm overflow-y-auto">
                        <div class="grid gap-4 grid-cols-2">
                            <div v-if="saleDate">
                                <h4 class="text-sm font-medium text-gray-400">
                                    Sale date
                                </h4>
                                <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                    {{ dateFormatter.format(saleDate) }}
                                </p>
                            </div>
                            <div v-if="printPrice">
                                <h4 class="text-sm font-medium text-gray-400">
                                    Print price
                                </h4>
                                <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                    {{ moneyFormatter.format(printPrice) }}
                                </p>
                            </div>
                            <div v-if="comic.format">
                                <h4 class="text-sm font-medium text-gray-400">
                                    Format
                                </h4>
                                <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                    {{ comic.format }}
                                </p>
                            </div>
                            <div v-if="comic.pageCount">
                                <h4 class="text-sm font-medium text-gray-400">
                                    Number of pages
                                </h4>
                                <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                    {{ comic.pageCount }}
                                </p>
                            </div>
                        </div>
                        <!-- Characters section -->
                        <div
                            v-if="comic.characters.items.length"
                            class="mt-6"
                        >
                            <h4 class="text-sm font-medium text-gray-400">
                                Characters ({{ comic.characters.items.length }})
                            </h4>
                            <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                {{ listFormatter.format(comic.characters.items.map(({ name }) => name)) }}
                            </p>
                        </div>
                        <!-- Description section -->
                        <div
                            v-if="description"
                            class="mt-6"
                        >
                            <h4 class="text-sm font-medium text-gray-400">
                                Description
                            </h4>
                            <p class="mt-1 text-justify font-medium text-slate-600 dark:text-gray-300">
                                {{ description }}
                            </p>
                        </div>
                    </div>
                    <!-- Footer -->
                    <div class="bg-gray-50 dark:bg-slate-700 p-6 flex items-center justify-end rounded-b">
                        <span
                            class="btn"
                            @click="showModal = false"
                        >
                            Exit
                        </span>
                    </div>
                </div>
            </div>
        </vue-final-modal>
        <span
            class="btn"
            @click="showModal = true"
        >
            Details
        </span>
    </div>
</template>

<script>
import ServiceApiMarvel from '../api.js';

export default {
    props: {
        comicId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        api: new ServiceApiMarvel(),
        comic: null,
        showModal: false,
        isLoading: false,
        dateFormatter: new Intl.DateTimeFormat('en-US'),
        listFormatter: new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' }),
        moneyFormatter: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    }),
    computed: {
        description () {
            if (!this.comic || !this.comic.textObjects.length) return null;

            const description = this.comic.textObjects.find(({ language }) => language === 'en-us');

            return description ? description.text : null;
        },
        saleDate () {
            if (!this.comic) return null;
            const saleDate = this.comic.dates.find(({ type }) => type === 'onsaleDate');

            if (!saleDate || !saleDate.date || saleDate.date.startsWith('-')) return null;

            return new Date(saleDate.date);
        },
        printPrice () {
            if (!this.comic) return null;
            const printPrice = this.comic.prices.find(({ type }) => type === 'printPrice');

            if (!printPrice || !printPrice.price) return null;

            return printPrice.price;
        }
    },
    watch: {
        showModal (value) {
            if (value && this.comic === null) {
                this.loadComic();
            }
        }
    },
    methods: {
        loadComic () {
            this.isLoading = true;

            return this.api.getComic(this.comicId)
                .then(response => this.comic = response.data.data.results[0])
                .finally(() => this.isLoading = false);
        }
    }
}
</script>
