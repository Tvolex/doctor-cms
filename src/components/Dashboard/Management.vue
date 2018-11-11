<template>
    <div>
        <div v-if="detectIsMobile()">
            <v-layout row>
                <v-flex xs12  v-if="!selected">
                    <v-scroll-x-transition mode="out-in">
                        <v-card class="ma-3">
                            <v-list subheader>
                                <v-subheader>Пацієнти</v-subheader>
                                <v-list-tile
                                        v-for="user in patients"
                                        :key="user.fullName"
                                        avatar
                                        @click="getEventsByPatient(user._id)"
                                >
                                    <v-list-tile-avatar>
                                        <img v-if="user.avatar" :src="user.avatar">
                                        <img v-else src="@/assets/person.png" alt="">
                                    </v-list-tile-avatar>

                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="user.fullName"></v-list-tile-title>
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
                    </v-scroll-x-transition>

                </v-flex>
                <v-flex xs12 v-if="selected">
                    <v-scroll-x-reverse-transition mode="out-in">
                        <v-card class="ma-3"
                                :key="selected._id"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="selected = null">Закрити</v-btn>
                            <v-card-text>
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selected.avatar" :src="selected.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selected.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selected.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selected.fullName }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{ selected.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{ selected.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{ selected.passportNumber }}</v-flex>
                            </v-layout>
                        </v-card>
                    </v-scroll-x-reverse-transition>
                </v-flex>
            </v-layout>
        </div>
        <div v-if="!detectIsMobile()" >
            <v-layout row>
                <v-flex xs12 md6 lg4 offset-lg1 >
                    <v-card class="ma-3">
                        <v-list subheader>
                            <v-subheader>Пацієнти</v-subheader>
                            <v-list-tile
                                    v-for="user in patients"
                                    :key="user.fullName"
                                    avatar
                                    @click="getEventsByPatient(user._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="user.avatar" :src="user.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="user.fullName"></v-list-tile-title>
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
                <v-flex xs12 md6 lg4 offset-lg1 v-if="selected">
                    <v-scroll-y-transition mode="out-in">
                        <v-card
                                :key="selected._id"
                                class="ma-3"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="selected = null">Закрити</v-btn>
                            <v-card-text>
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selected.avatar" :src="selected.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selected.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selected.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selected.fullName }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{ selected.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{ selected.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{ selected.passportNumber }}</v-flex>
                            </v-layout>
                        </v-card>
                    </v-scroll-y-transition>
                </v-flex>
            </v-layout>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
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
                selected: null,
			}
		},
        methods: {
			getEventsByPatient(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
						this.selected = res.data;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    this.selected = null;
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
