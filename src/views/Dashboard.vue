<template>
    <div>
        <Navbar :user="user"></Navbar>
        <Calendar></Calendar>
    </div>

</template>

<script>
    import Navbar from "@/components/Navbar.vue";
    import Calendar from '@/components/Calendar.vue'
    import Statistics from '@/components/Statistics.vue'

    export default {
        components: {
            Navbar,
            Calendar,
            Statistics
        },
        async beforeMount() {
            await this.$store.dispatch({type: "auth"});

        },


        data() {
            return {
                currentUser: this.$store.getters.user,
            }
        },
        computed: {
            user:  function() {
                const user = this.$store.getters.user;
                if (!user) {
                    return this.$router.push('/');
                }
                return user;
            },
        }
    }
</script>
