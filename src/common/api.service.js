import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from '@/common/config';

const ApiService = {
    init(){
        Vue.use(VueAxios,axios);
        Vue.axios.defaults.baseURL= API_URL;
    },

    get(resource){
        return Vue.axios.get(`${resource}`).catch(error=>{
            throw new Error(`ApiService ${error}`);
        });
    },

    post(resource,params){
        return Vue.axios.post(`${resource}`,params);
    },

    put(resource,params,slug=""){
        return Vue.axios.put(`${resource}/${slug}`,params);
    },

    delete(resource){
        return Vue.axios.delete(resource).catch(error=>{
            throw new Error(`ApiService ${error}`);
        });
    }
}

export default ApiService;

export const BikeService = {
    
    get(){
        return ApiService.get('/bikes');
    },
    save(params){
        return ApiService.post('/bikes',params);
    },

    update(params){
        return ApiService.put('/bikes',params);
    },

    busy(params){
        return ApiService.put('/bikes',params,`${params.id}/busy`);
    },

    delete(params){
        return ApiService.delete(`/bikes/${params}`);
    }
}