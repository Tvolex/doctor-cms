<template>
    <div v-if="auth && user">
        <Navbar :user="user"></Navbar>
        <main>
            <Statistics v-show="route === ('/dashboard' || '/dashboard/')"></Statistics>
            <Calendar v-show="route === ('/dashboard/calendar' || '/dashboard/calendar')"></Calendar>
            <NewPatient v-show="route === ('/dashboard/newPatient' || '/dashboard/newPatient/')"></NewPatient>
            <NewDoctor v-show="route === ('/dashboard/newDoctor' || '/dashboard/newDoctor/')"></NewDoctor>
            <Management v-show="route === ('/dashboard/management' || '/dashboard/management/')"></Management>
            <Settings v-show="route === ('/dashboard/settings' || '/dashboard/settings/')"></Settings>
        </main>
    </div>

</template>

<script>
    import Navbar from "@/components/Dashboard/Navbar.vue";
    import Calendar from '@/components/Dashboard/Calendar.vue'
    import Statistics from '@/components/Dashboard/Statistics.vue'
    import NewPatient from '@/components/Dashboard/NewPatient.vue'
	import NewDoctor from '@/components/Dashboard/NewDoctor.vue'
	import Management from '@/components/Dashboard/Management.vue'
    import Settings from '@/components/Dashboard/Settings.vue'

    export default {
        components: {
            Navbar,
            Calendar,
            Statistics,
			NewPatient,
			NewDoctor,
			Management,
			Settings
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
                    return this.$router.push('/login');
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
