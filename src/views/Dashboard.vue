<template>
    <div v-if="auth && user">
        <Navbar :user="user"></Navbar>
        <main>
            <Calendar v-show="route === '/dashboard'"></Calendar>
            <Statistics v-show="route === '/dashboard/statistics'"></Statistics>
            <NewPatient v-show="route === '/dashboard/newPatient'"></NewPatient>
            <Management v-show="route === '/dashboard/management'"></Management>
        </main>
    </div>

</template>

<script>
    import Navbar from "@/components/Dashboard/Navbar.vue";
    import Calendar from '@/components/Dashboard/Calendar.vue'
    import Statistics from '@/components/Dashboard/Statistics.vue'
    import NewPatient from '@/components/Dashboard/NewPatient.vue'
	import Management from '@/components/Dashboard/Management.vue'

    export default {
        components: {
            Navbar,
            Calendar,
            Statistics,
			NewPatient,
			Management,
        },
        created() {
            this.auth();
		},

        data() {
            return {}
        },

        methods: {
            auth: async function() {
                const isAuth = await this.$store.dispatch({type: "auth"});

                if (!isAuth) {
                    return this.$router.push('/');
                    // TODO: delete comment
                }
                return isAuth;
            },
        },
        computed: {

            user: function () {
			    return this.$store.getters.user;
            },

			route: function () {
				return this.$route.fullPath;
			}
        },
    }
</script>
