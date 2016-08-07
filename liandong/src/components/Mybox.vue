<template>
  <script src="cities.js"></script>
  <div>
    <input type="radio" id="sheng" value="sheng" v-model="picked">
    <label for="one">省:</label>
    <input type="radio" id="shi" value="shi" v-model="picked">
    <label for="one">市:</label>
    <input type="radio" id="shi" value="xian" v-model="picked">
    <label for="one">县:</label>
    <br>
  </div>
  <div v-if="'sheng'==picked">
    <select v-model="sheng" multiple>
      <option v-for="option in options1" v-bind:value="$index">{{ option.name }}</option>
    </select>
  </div>
  <div v-if="'shi'==picked">
    <select v-model="shi" multiple>
      <option v-for="option in options2" v-bind:value="$index">{{ option.name }}</option>
    </select>
  </div>
  <div v-if="'xian'==picked">
    <select v-model="xian" multiple>
      <option v-for="option in options3">{{ option.name }}</option>
    </select>
  </div>
  <div v-if="sheng!=''">
    <span>省:</span>
    <button v-for="select in sheng" v-on:click="rmsheng($index)">{{ options1[select].name }}</button>
  </div>
  <div v-if="shi!=''">
    <span>市:</span>
    <button v-for="select in shi" v-on:click="rmshi($index)">{{ options2[select].name }}</button>
  </div>
  <div v-if="xian!=''">
    <span>县:</span>
    <button v-for="select in xian" v-on:click="rmxian($index)">{{ select }}</button>
  </div>
</template>

  
<script>
import Cities from './cities'
var _province = Cities.province;

export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      picked: "sheng",
      sheng: [],
      shi: [],
      xian: [],
      options1: _province,
      options2: "",
      options3: "",
    }
  },
  methods: {
    rmsheng: function (i) {
      this.sheng.splice(i, 1);
    },
    rmshi: function (i) {
      this.shi.splice(i, 1);
    },
    rmxian: function (i) {
      this.xian.splice(i, 1);
    }
  },
  watch: {
    'sheng': function( val ){
      this.shi = [];
      this.xian = [];
      var _length = val.length;
      if(_length == 1){
        this.options2 = _province[val].city;
      } else {
        this.options2 = "";
      }
    },
    'shi': function( val ){
      this.xian = [];
      var _length = val.length;
      if(_length == 1){
        this.options3 = _province[this.sheng].city[this.shi].county;
      } else {
        this.options3 = "";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
