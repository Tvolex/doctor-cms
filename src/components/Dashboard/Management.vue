<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3 md8 offset-md2>
            <v-card>
                <v-list subheader>
                    <v-subheader>Пацієнти</v-subheader>
                    <v-list-tile
                            v-for="user in users"
                            :key="user.name"
                            avatar
                            @click=""
                    >
                        <v-list-tile-avatar>
                            <img :src="user.avatar">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title v-html="user.name"></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="user.email"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
	export default {
		name: "Management",
		data () {
			return {
				users: [
					{ active: true, name: 'Jason Oner', email: "user1@gmail.com", avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
					{ active: true, name: 'Ranee Carlson', email: "user2@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
					{ name: 'Cindy Baker', email: "user3@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
					{ name: 'Ali Connors', email: "user4@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
				],
			}
		}
	}
</script>

<style scoped>

</style>