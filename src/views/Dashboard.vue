<template >
    <div v-if="auth && user" class="Dashboard">
        <Navbar :user="user"></Navbar>
        <main>
            <Statistics v-show="route === ('/dashboard' || '/dashboard/')" :user="user"></Statistics>
            <Calendar v-show="route === ('/dashboard/calendar' || '/dashboard/calendar')"></Calendar>
            <NewPatient v-show="route === ('/dashboard/newPatient' || '/dashboard/newPatient/')" ></NewPatient>
            <NewDoctor v-if="user.admin"  v-show="route === ('/dashboard/newDoctor' || '/dashboard/newDoctor/')" ></NewDoctor>
            <Doctors v-if="user.admin" v-show="route === ('/dashboard/doctors' || '/dashboard/doctors/')" :user="user"></Doctors>
            <NewSpecialization v-if="user.admin" v-show="route === ('/dashboard/specialization' || '/dashboard/specialization/')"></NewSpecialization>
            <Patients v-else v-show="route === ('/dashboard/patients' || '/dashboard/patients/')" :user="user"></Patients>
            <Settings v-show="route === ('/dashboard/settings' || '/dashboard/settings/')" :user="user"></Settings>
        </main>
    </div>
</template>

<script>
    import Navbar from "@/components/Dashboard/Navbar.vue";
    import Calendar from '@/components/Dashboard/Calendar.vue'
    import Statistics from '@/components/Dashboard/Statistics.vue'
    import NewPatient from '@/components/Dashboard/NewPatient.vue'
	import NewDoctor from '@/components/Dashboard/NewDoctor.vue'
    import NewSpecialization from '@/components/Dashboard/NewSpecialization.vue'
	import Patients from '@/components/Dashboard/Patients.vue'
    import Doctors from '@/components/Dashboard/Doctors.vue'
    import Settings from '@/components/Dashboard/Settings.vue'

    export default {
        components: {
            Navbar,
            Calendar,
            Statistics,
			NewPatient,
			NewDoctor,
            NewSpecialization,
            Patients,
            Doctors,
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

<style scoped>

    .Dashboard {
        background: transparent url("../assets/background.jpeg") !important;
        background-size: cover;
        height: 100%;
    }
</style>
