<template>
  <b-row class="mt-5 d-flex justify-content-center pr-2 pl-2">
    <b-col col sm="12" md="6" lg="3">
      <div v-if="isLoading">
              <div aling-h='center' aling-v='center'>
                  <b-spinner variant="success" label="Spinning"></b-spinner>
              </div>
      </div>
      <b-form v-else>
        <div class="mb-3">
          <label v-if="!valid" for="timepickerBike">Por favor seleccione una hora</label>
          <b-form-timepicker 
            v-model="startAt"
            locale="es"
            placeholder="No ha seleccionado una hora"
            :state="valid"
            id='timepickerBike'
          />
        </div>

        <b-button type="submit" variant="success mr-2" @click="save">Guardar</b-button>
        <b-button type="reset" variant="secondary" @click="exit">Salir</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
  import { mapActions,mapState } from 'vuex';
  export default {  
      name:'BikeRegister',
      data(){
        return { 
          startAt:'',
          valid:true,          
        }
      },
      created(){
        this.unsubscribe = this.$store.subscribe((mutation, state)=>{
          if (mutation.type === 'bike/setMessage') {
            if(typeof state.bike.message=== 'object'){
              if(Object.prototype.hasOwnProperty.call(state.bike.message, "id")){
                this.$swal({
                  icon: 'success',
                  title: 'Bike guardada exitosamente!',
                  showConfirmButton: true,
                })
                .then(()=>{
                  this.clear();
                });
              }else{
                this.valid=false;
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: JSON.stringify(state.bike.message),
                });
              }
            }else{
              this.valid=false;
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: JSON.stringify(state.bike.message),
              });
            }
          }
        });

      },
      computed:{
        ...mapState('bike',['isLoading','message','bikeForUpdate']),
      },
      methods:{
        ...mapActions('bike',['saveBike','getBike']),
        exit(){
          this.$router.push({ name: "Bikes" });
        },
        save(e){
          e.preventDefault();
          this.validate();
          if(this.valid){
            let startAt = this.startAt;
            startAt = startAt.split(':');
            startAt = `${startAt[0]}:${startAt[1]}`
            this.saveBike({startAt});
          }
        },
        validate(){
          if(this.startAt===''){
            this.valid=false;
          }else{
            this.valid=true;
          }
        },
        clear(){
          this.startAt='';
          this.valid=true;
        }
      },
      beforeDestroy() {
        this.unsubscribe();
      }
  }
</script>