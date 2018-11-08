<template>
    <v-layout row>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
            <v-card class="ma-3">
                <v-list subheader>
                    <v-subheader>Пацієнти</v-subheader>
                    <v-list-tile
                            v-for="user in patients"
                            :key="user.name"
                            avatar
                            @click="getEventByPatient(user._id)"
                    >
                        <v-list-tile-avatar>
                            <img v-if="user.avatar" :src="user.avatar">
                            <img v-else src="@/assets/person.png" alt="">
                        </v-list-tile-avatar>

                        <v-layout align-center justify-center row wrap>
                            <v-flex xs12 sm6 lm5 md6>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="user.name"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-flex>
                            <v-flex xs12 sm6 lm5 md6>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="user.email"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-flex>
                        </v-layout>
                    </v-list-tile>
                </v-list>

                <v-divider></v-divider>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import _ from 'lodash';
    import axios from 'axios';
	export default {
		name: "Management",
		 beforeCreate() {
			this.$store.dispatch({type: "patients"}).then((patients) => {
				if (_.isEmpty(patients)) {
					this.$notificator('warning', 'Ви немаєте жодного пацієнта!')
                }
            })
        },
		data () {
			return {
                loading: false,
				users: [
					{ active: true, name: 'Jason Oner', email: "user1@gmail.com", avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
					{ active: true, name: 'Ranee Carlson', email: "user2@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
					{ name: 'Cindy Baker', email: "user3@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
					{ name: 'Ali Connors', email: "user4@gmail.com",avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
				],
			}
		},
        methods: {
            getEventByPatient(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    console.log(err);
                    let message = err.message || 'Щось сталось не так :(';
                    if (err.response && err.response.data && err.response.data.message) {
                        message = err.response.data.message;
                    }
                    this.$notificator('error', message);
                });
            },
        },
        computed: {
			patients() {
				return this.$store.getters.patients;
            }
        }
	}
</script>

<style scoped>

</style>
