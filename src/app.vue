
<template>
    <div class="font-sans text-slate-800 dark:text-slate-300 text-base p-6">
        <comics
            :comics="comics"
            :is-loading="isLoading"
            class="mt-4"
        />
    </div>
</template>

<script>
import ServiceApiMarvel from './api.js';
import Comics from './components/comics.vue';

export default {
    components: {
        Comics
    },
    data: () => ({
        api: new ServiceApiMarvel(),
        comics: [],
        isLoading: false,
    }),
    created () {
        this.loadComics();
    },
    methods: {
        loadComics () {
            this.isLoading = true;

            return this.api.getComics()
                .then(response => this.comics = response.data.data.results)
                .finally(() => this.isLoading = false);
        }
    }
}
</script>
