<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <newEvent></newEvent>

    </div>
</template>

<script>

    // @ is an alias to /src
	import newEvent from '@/components/Home/newEvent'

    export default {
        name: "Home",
        components: {
			newEvent,
        },
        data() {
        	return {
        		newUser: false,
            }
        },

    };
</script>
