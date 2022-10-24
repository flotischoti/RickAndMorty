<template>
    <div class="resultCard">
        <img :src="result.image" width="100" height="100"/>
        <h4>{{ result.name + ' (' + result.id + ')' }}</h4>
        <p>Species: {{ result.species }}</p>
        <p>Status: {{ result.status }}</p>
        <p>Gender: {{ result.gender }}</p>
    </div>
</template>

<script lang="ts">

    import {  Options, Vue } from 'vue-class-component';
    import { Charac } from './Character.vue';
    
    @Options({
        props: {
            result: {} as Charac,
        }
    })
    export default class SearchResult extends Vue {
        result!: Charac;
    }
</script>

<style lang="scss" scoped>

.resultCard {
    border: 1px solid grey;
    width: 250px;
    height: 300px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
        box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;
        cursor: pointer;
    }

    img {
        border-radius: 50%;
    }

    h4 {
        text-align: center;
    }

    p {
        margin: .2em;
        letter-spacing: .05em;
    }
}

</style>