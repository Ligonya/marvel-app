<template>
    <div v-if="getDescription()">
        <h3 class="font-bold text-slate-700 dark:text-gray-300 text-lg">
            {{ comic.title }}
        </h3>
        <p class="mt-2 text-sm text-gray-400 font-medium">
            {{ getDescription() }}
        </p>
        <div
            class="mt-3 flex items-center"
            :class="[ comic.creators.available ? 'justify-between' : 'justify-end' ]"
        >
            <div
                v-if="comic.creators.available"
                class="flex flex-wrap items-center justify-start gap-1"
            >
                <span
                    v-for="(creator, creatorIndex) in comic.creators.items.slice(0, 3)"
                    :key="creatorIndex"
                    :title="creatorIndex < 2 || (comic.creators.items.length === 3 ) ? creator.role : 'others creators'"
                    class="badge"
                >
                    {{
                        creatorIndex < 2 || (comic.creators.items.length === 3 )
                            ? creator.name
                            : `${comic.creators.items.length - 2} others`
                    }}
                </span>
            </div>
            <comic-details :comic-id="comic.id" />
        </div>
    </div>
</template>

<script>
import ComicDetails from './comic-details.vue';

export default {
    components: {
        ComicDetails
    },
    props: {
        comic: {
            type: Object,
            required: true
        }
    },
    methods: {
        getDescription () {
            if (!this.comic.textObjects.length)
                return null;

            const description = this.comic.textObjects.find(({ language }) => language === 'en-us');
            if (!description) return null;

            const maxLengthOfDescription = 250; // arbitraire
            if (description.text.length < maxLengthOfDescription) return description.text;

            let text = description.text.substring(0, maxLengthOfDescription);

            // Fonction inversant une chaîne de caractères.
            const reverse = str => str.split('').reverse().join('');

            /**
             * On retourne une version de la description écourtée (max 250 caractères)
             * en finissant par un mot complet.
             */
            return reverse(reverse(text).slice(reverse(text).indexOf(' '))) + '[...]';
        }
    }
}
</script>
