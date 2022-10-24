<template>
    <div>
        <a @click="$emit('back')">&lt;&lt; Back</a>
    </div>
    <img class="spinner" :src="getImageUrl('Loading_icon.gif')" v-if="!character.id"/>
    <div class="profile" v-show="character.id">
        <div class="info">
            <img :src="character.image" width="250" height="250"/>
            <h4>{{character.name}}</h4>
            <p>ID: {{character.id}}</p>
            <p>Species: {{character.species}}</p>
            <p>Status: {{character.status}}</p>
            <p>Gender: {{character.gender}}</p>
            <p>Type: {{character.type}}</p>
            <p>Origin: {{character.origin?.name}}</p>
            <p>Location: {{character.location?.name}}</p>
            <p>Created: {{character.created}}</p>
        </div>
        <div class="episodes">
            <h3>Episodes: </h3>
            <ul>
                <li v-for="(e, index) in character.episode" :key="index">{{e?.name}} ({{e?.id}})</li>
            </ul>
        </div>
    </div>


</template>

<script lang="ts">

    import {  Options, Vue } from 'vue-class-component';
    import { request, gql } from 'graphql-request';
    import { getImageUrl } from '../util/util';
    
    @Options({
        emits: [
            'back'
        ],
        props: {
            id: String,
        },
        data() {
            return {
                character: {} as CharacFull
            }
        },
        async mounted() {
            const query = gql`{
                        character(id: ${this.id}) {
                        id,
                        name,
                        species,
                        image,
                        status,
                        gender,
                        type,
                        origin {
                            name
                        },
                        location {
                            name
                        },
                        episode {
                            id,
                            name
                        },
                        created,
                }
            }`;
            const res = await request('https://rickandmortyapi.com/graphql', query); 
            this.character = res.character;
        },

    })
    export default class Character extends Vue {
        id!: string;
        character!: CharacFull;
        getImageUrl = getImageUrl;
    }

    export interface Charac {
        id: number;
        name: string;
        species: string;
        image: string;
        status: string;
        gender: string;
    }

    interface CharacFull extends Charac{
        type: string;
        origin: {
            name: string
        };
        location: {
            name: string
        };
        episode: {
            name: string,
            id: number,
        }[];
        created: Date;
    }
</script>

<style lang="scss" scoped>

a {
    &:hover {
        cursor: pointer;
    }
}

img.spinner {
    width: 50px;
    height: auto;
    margin: 0 auto;
    display: block;
}
.profile {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    letter-spacing: .05em;
    gap: 50px;

    p {
        margin: .3em;
    }

    h3 {
        margin: 0;
    }

    ol {
        li {
            margin: .3em;
        }
    }
}

</style>