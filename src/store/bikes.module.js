import { BikeService } from '@/common/api.service';

const state ={
    bikes:[],
    isLoading: false,
    message:{},
}

const getters ={
    bikesFreeCount(state){
        return state.bikes.filter(bike => bike.busy==false).length;
    },
}

const actions ={
    fetchBikes({ commit }){
        commit('bike/startLoading',true,{root:true});
        return BikeService.get()
            .then(({ data })=>{
                data.Items.forEach(element => {
                    element.isLoading=false;
                });
                commit('bike/setBikes',data,{root:true});
            })
            .catch(error =>{
                throw new Error(error);
            });
    },
    setBusy({commit},bike){
        bike.busy=!bike.busy;
        return BikeService.busy(bike)
        .then(({data})=>{
            data.bike.isLoading=false;
            commit('bike/setBike',data.bike,{root:true});
        })
        .catch(error=>{            
            throw new Error(error);
        });
    },
    saveBike({commit},bike){
        commit('bike/startLoading',true,{root:true});
        return BikeService.save(bike)
        .then(({data}) =>{
            if(data.bike){
                return commit('bike/setMessage',data.bike,{root:true});
            }else if(data.startAt){
                return commit('bike/setMessage',data,{root:true});
            }else{
                return commit('bike/setMessage',"Error al guardar, intente mas tarde",{root:true});
            }
        })
        .catch((error)=>{
            //mensaje de la api tiempo ya resgistrado
            if(Object.prototype.hasOwnProperty.call(error.response,'status')){
                if(error.response.status===401)
                    return commit('bike/setMessage',error.response.data.startAt,{root:true});
            }
            return commit('bike/setMessage',"Error al guardar, intente mas tarde",{root:true});
        })
        .finally(()=>{
            commit('bike/startLoading',false,{root:true});
        })
    },
    deleteBike({commit},id){
        commit('bike/startLoading',true,{root:true});
        return BikeService.delete(id)
        .then(()=>{
            return commit('bike/removeBike',id,{root:true});
        })
        .catch(()=>{
            throw new Error('Error');
        })
        .finally(()=>{
            commit('bike/startLoading',false,{root:true});
        });
    }
  
}

const mutations  ={
    startLoading(state,loading=true){
        state.isLoading =loading;
    },
    setBikes(state,{ Items }){
        state.bikes = Items;
        state.isLoading= false;
    },
    setBike(state,bike){
        const index = state.bikes.findIndex((element)=>{
            if((element.id===bike.id)){
                return true;
            }
        });
        if(index>=0){
            Object.assign(state.bikes[index],bike);
        }
    },
    setBikeLoading(state,bike){
        const index = state.bikes.findIndex((element)=>{
            if((element.id===bike.id)){
                return true;
            }
        });
        if(index>=0){
            state.bikes[index].isLoading=!state.bikes[index].isLoading;
        }
    },
    setMessage(state,message){
        state.message = message;
    },
    removeBike(state,id){
        state.bikes= state.bikes.filter( bike=> bike.id!=id);        
    }
}


export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations 
}