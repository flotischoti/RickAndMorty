<template>
  <SearchPage @select="selectedId = $event" v-show="selectedId < 0"/>
  <Character :id="selectedId" v-if="selectedId > 0" @back="selectedId = -1"/>
 
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchPage from './components/SearchPage.vue';
import Character from './components/Character.vue';

@Options({
  components: {
    SearchPage,
    Character,
  },
  data() {
    return {
      selectedId: Number,
    }
  }
})
export default class App extends Vue {
  selectedId = -1;
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
