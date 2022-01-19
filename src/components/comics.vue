<template>
    <div class="mx-auto max-w-screen-lg">
        <!-- Header -->
        <div class="py-12 border-b-2 border-gray-200">
            <h1 class="font-extrabold text-4xl">
                Latest <span class="text-rose-600">Marvel's</span> comics
            </h1>
            <h2 class="mt-3 text-xl text-gray-400 font-medium">
                <a
                    href="http://marvel.com"
                    target="_blank"
                >
                    Data provided by Marvel. © 2022 MARVEL
                </a>
            </h2>
        </div>
        <!-- List -->
        <loader v-if="isLoading" />
        <div
            v-else
            class="my-9 grid gap-10 grid-cols-none lg:grid-cols-2"
        >
            <comic
                v-for="comic in comics"
                :key="comic.id"
                :comic="comic"
            />
        </div>
    </div>
</template>

<script>
import Comic from './comic.vue';

export default {
    components: {
        Comic
    },
    props: {
        comics: {
            type: Array,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        }
    }
}
</script>
