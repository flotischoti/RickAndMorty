<template>
    <div class="searchPage">
        <SearchBar @search="search"></SearchBar>
        <hr v-if="results.length > 0 && !loading"/>
        <img :src="getImageUrl('Loading_icon.gif')" v-if="loading"/>
        <p v-show="hasSearched">Showing {{ results.length }} result{{results.length > 1 ? 's' : ''}}: </p>
        <ResultPane :results="results" @select="$emit('select', $event)"></ResultPane>
    </div>
</template>

<script lang="ts">

    import { request, gql } from 'graphql-request';
    import {  Options, Vue } from 'vue-class-component';
    import { PropType } from "vue";
    import SearchBar from "./SearchBar.vue"
    import ResultPane from "./ResultPane.vue"  
    import { Charac } from './Character.vue';
    import { getImageUrl } from '../util/util';
    
    @Options({
    components: {
        SearchBar,
        ResultPane
    },
    data() {
        return {
            results: Array as PropType<Charac[]>,
            loading: Boolean,
            character: {} as Charac,
            hasSearched: Boolean,
        }
    },
    methods: {
        async search(val: string) {
            let page = 1;
            let res;
            this.results = [];
            this.loading = true;
            this.hasSearched = true;
            do {
                const query = gql`{
                            characters(page: ${page}, filter: { name: "${val}" }) {
                        info {
                            pages
                        },
                        results {
                            id,
                            name,
                            species,
                            image,
                            status,
                            gender,
                        }
                    }
                }`;
                page++;
                res = await request('https://rickandmortyapi.com/graphql', query); 
                this.results = [...this.results, ...res.characters.results];
            } while (page <= res.characters.info.pages);
            this.loading = false;
        },
        
    }
    })
    export default class SearchPage extends Vue {
        results: Charac[] = []; 
        loading = false;
        character = null;
        hasSearched = false;
        search!: () => void;
        getCharacter! : () => void;
        getImageUrl = getImageUrl;
    }
</script>

<style lang="scss" scoped>
.searchPage{
    display: flex;
    flex-direction: column;
    align-items: center;

    img { 
        width: 50px;
        height: auto;
    }
    
    hr {
        width: 20%;
        color: grey;
        border-bottom: 0;
    }
}

</style>