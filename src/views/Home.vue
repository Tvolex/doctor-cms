<template>
    <div class="home">
        <img alt="Vue logo" width="250px" height="250px" src="https://www.ams-europe.com/images/icons/icon_clinical_research.png">
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
