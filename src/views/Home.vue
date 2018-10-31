<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <img alt="Vue logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <Login msg="Welcome to the best medical center"/>
    </div>
</template>

<script>
    /* eslint-disable */
    // @ is an alias to /src
    import Login from "@/components/Login.vue";

    export default {
        name: "home",
        components: {
            Login,
        }
    };
</script>
