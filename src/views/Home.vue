<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-app>
            <newEvent></newEvent>
            <Register v-if="newUser"></Register>
        </v-app>
    </div>
</template>

<script>

    // @ is an alias to /src
    import Register from '@/components/Home/Register';
	import newEvent from '@/components/Home/newEvent'

    export default {
        name: "Home",
        components: {
			Register,
			newEvent,
        },
        data() {
        	return {
        		newUser: false,
            }
        },

    };
</script>
