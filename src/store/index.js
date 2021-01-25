import Vue from 'vue';
import Vuex from 'vuex';

import bike from './bikes.module';


Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    bike
  }
});
