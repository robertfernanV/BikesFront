<template>
    <div :class="bike.busy? ' card red-border' :'card'">
        <div :class="bike.busy? 'card-header red-header':'card-header'" >{{ bike.startAt }}</div>
        <div class="card-main">
            <b-spinner variant="success" type="grow" label="Spinning" v-if="bike.isLoading"></b-spinner>
            <div v-else>
                <BikeFast :size="50" v-if="bike.busy" class="material-icons red-color"/>
                <Bicycle :size='50' v-else class="material-icons"/>
                <div :class="bike.busy? 'main-description red-color':'main-description'">{{ bike.busy? 'Ocupada' : 'Libre'}}</div>
            </div>
        </div>
        <div :class="bike.busy?'card-footer red-footer':'card-footer'">
            <CheckboxMarkedCircle :class="bike.busy? 'material-icons btn red-color':'material-icons btn'" @click="take"/>
            <TrashCan v-if="bike.busy===false" class="material-icons btn" @click="remove"/>
        </div>
    </div>
</template>
<script>
import { mapActions,mapMutations } from 'vuex';
import BikeFast from 'vue-material-design-icons/BikeFast';
import CheckboxMarkedCircle from 'vue-material-design-icons/CheckboxMarkedCircle';
import TrashCan  from 'vue-material-design-icons/TrashCan';
import Bicycle from 'vue-material-design-icons/Bicycle';

export default {
    name:'bike',
    props:{
        bike:{type:Object,required:true}
    },
    components:{        
        BikeFast,
        CheckboxMarkedCircle,
        TrashCan,
        Bicycle
    },
    methods:{
        ...mapActions('bike',['setBusy','deleteBike']),
        ...mapMutations('bike',['setBikeLoading']),
        take(){
            this.setBikeLoading(this.bike);
            this.setBusy(this.bike);
        },
        remove(){
            this.deleteBike(this.bike.id)
            .then(()=>{
                this.$swal({
                  icon: 'success',
                  title: 'Bike eliminada exitosamente!',
                  showConfirmButton: true,
                })
            })
            .catch(()=>{
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Error al eliminar intente mas tarde',
                });
            });
        }
    }
}
</script>
<style scoped>

    .card {
        width: 180px;                 
        display: flex;                
        flex-direction: column;       
        border: 1px solid #80DEEA;    
        border-radius: 4px;           
        overflow: hidden;             
        margin: 5px;                  
    }

    .card-header {
        color: #0097A7;
        text-align: center;
        font-size: 35px;
        font-weight: 600;
        border-bottom: 1px solid #80DEEA;
        background-color: #E0F7FA;
        padding: 5px 10px;
    }

    .card-footer {
        color: #0097A7;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        border-bottom: 1px solid #80DEEA;
        background-color: #E0F7FA;
        padding: 5px 10px;
    }

    .card-main {
        display: flex;              
        flex-direction: column;     
        justify-content: center;    
        align-items: center;
        height: 110px;    
        padding: 15px 0;            
    }

    .material-icons {
        font-size: 36px;
        color: #0097A7;
        margin-bottom: 5px;
    }

    .main-description {
        color: #0097A7;
        font-size: 12px;
        text-align: center;
    }
   

    .red-border {
        border-color: #EF9A9A;
    }

    .red-header {
        background-color: #FFEBEE;
        border-color: #EF9A9A;
        color: #D32F2F;
    }

    .red-footer {
        background-color: #FFEBEE;
        border-color: #EF9A9A;
        color: #D32F2F;
    }

    .red-color {
        color: #D32F2F;
    }

</style>