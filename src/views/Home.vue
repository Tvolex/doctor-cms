<template>
    <div class="home">

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

            }
        },

    };
</script>
