<template>
    <div class="searchBarContainer">
        <input ref="searchBar" class="searchBar" v-model="searchValue" autocomplete="off" @keyup.enter="search"
                type="search" list="characters" placeholder="Search Rick and Morty Character..." autofocus/>
        <datalist id="characters">
            <option v-for="suggestion in suggestions" :key="suggestion.id">{{suggestion.name }}</option>
        </datalist>
        <button type="submit" @click="search">GO</button>
    </div>
</template>

<script lang="ts">

    import { request, gql } from 'graphql-request';
    import { PropType } from 'vue';
    import { Options, Vue } from 'vue-class-component';
    
    @Options({
        emits: [
            'search'
        ],
        data() {
            return {
                searchValue: String,
                suggestions: {
                    type: Array as PropType<{id: number, name: string}[]>,
                }
            }
        },
        methods: {
            search() {
                (this.$refs.searchBar as HTMLElement).blur();
                this.$emit('search', this.searchValue);
            }
        },
        watch: {
            async searchValue(newVal: string) {
                if(newVal.length > 0) {
                    const query = gql`{
                        characters(filter: { name: "${newVal}" }) {
                            results {
                                id,
                                name
                            }
                        }
                    }`;
                    const res = await request('https://rickandmortyapi.com/graphql', query); 
                    this.suggestions =  res.characters.results;
                }
            }
        },
    })
    export default class SearchBar extends Vue {
        searchValue = '';
        suggestions: {id: number, name: string}[] = [];
        search!: () => void;
    
    }

</script>

<style lang="scss" scoped>

.searchBarContainer {
    width: 100%;
    padding: 2em;
    display: flex;

    .searchBar {
        padding: 1em;
        width: calc(100% - 80px);
        font-size: 1.5em;
        border-radius: 0;
        border: 1px solid grey;
        
        &:focus {
            outline: none;
        }
    }

    datalist option {
        font-size: 0.8em;
        padding: 0.3em 1em;
        background-color: #ccc;
        cursor: pointer;
        }

        datalist option:hover, datalist option:focus {
        color: #fff;
        background-color: #036;
        outline: 0 none;
        }

    button {
        width: 80px;
        border-radius: 0;
        border: 1px solid grey;
        border-left: 0;
        letter-spacing: .2em;
        font-size: 1.5em;
        cursor: pointer;

        &:hover {
            background-color: lightgray;
        }
    }
}

</style>