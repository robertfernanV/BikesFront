<template>
    <div class="mt-5 container">
        <div v-if="isLoading">
            <div aling-h='center' aling-v='center'>
                <b-spinner variant="success" label="Spinning"></b-spinner>
            </div>
        </div>
        <div v-else >
            <h2>Bikes Free: {{bikesFreeCount}}</h2>
            <b-row class="justify-content-center">
                <div v-for="bike in bikes" :key="bike.id">
                    <bike
                        :bike="bike"
                    />
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from "vuex";
import bike from '@/components/Bike.vue';
export default {
    name:'BikesList',
    components:{
        bike
    },
    computed:{
        ...mapState("bike",['bikes','isLoading']),
        ...mapGetters("bike",['bikesFreeCount'])
    },
    methods:{
        ...mapActions("bike",['fetchBikes']),
    },
    mounted(){
        this.fetchBikes();
    }
}
</script>
