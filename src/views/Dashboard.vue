<template>
    <div>
        <Navbar :user="currentUser"></Navbar>
    </div>

</template>

<script>
    import Navbar from "@/components/Navbar.vue";

    export default {
        components: {
            Navbar,
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
            auth:  function() {
                return this.$store.getters.user;
            },
        }
    }
</script>