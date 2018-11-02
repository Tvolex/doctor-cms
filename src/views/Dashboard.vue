<template>
    <div>
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
		async beforeMount() {
			await this.$store.dispatch({type: "auth"});
		},

        data() {
            return {}
        },
        computed: {
			user: function() {
				const user = this.$store.getters.user;
				if (!user) {
					return this.$router.push('/');
				}
				return user;
			},
			route: function () {
				return this.$route.fullPath;
			}
        },
    }
</script>
