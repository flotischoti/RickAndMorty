<template>
    <div class="resultPane">
        <SearchResult v-for="(result, index) in results" :key="index" :result="result" @click="$emit('select', result.id)"/>
    </div>
</template>

<script lang="ts">

    import { PropType } from "vue";
    import {  Options, Vue } from 'vue-class-component';
    import SearchResult from './SearchResult.vue';
    import { Charac } from './Character.vue'
    
    @Options({
    components: {
        SearchResult,
    },
    props: {
        results: Array as PropType<Charac[]> 
    },
    emits: [
            'select'
        ]
    })
    export default class SearchPage extends Vue {
        results!: Charac[];
    }
</script>

<style lang="scss" scoped>

.resultPane {
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;

}


</style>