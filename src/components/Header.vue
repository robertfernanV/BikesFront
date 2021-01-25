<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-navbar-brand>
                <router-link to="/" class="link" >Bikes</router-link>
            </b-navbar-brand>
            <b-navbar-brand>
                <router-link to="/new" class="link" >New</router-link>
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>

export default {
    name:'Header',
    methods:{
        toNew(){
            this.$router.push({ name: "New" });
        }
    }
}
</script>

<style scoped>
    .link{
        color: white;
    }
</style>