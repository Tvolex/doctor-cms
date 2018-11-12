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
                <v-flex xs12 md6 lg5>
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
                <v-flex xs12 md6 lg7 v-if="selected">
                    <v-scroll-y-reverse-transition mode="out-in">
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
                            <v-list subheader >
                                <v-subheader>Записи</v-subheader>
                                <v-list-tile
                                        v-for="event in selected.events"
                                        :key="event._id"
                                        avatar
                                >
                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs12 sm6 lm5 md3>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs12 sm6 lm5 md3>
                                            <v-list-tile-content>
                                                <v-menu>
                                                    <v-btn
                                                            slot="activator"
                                                            light
                                                            icon
                                                    >
                                                        <v-icon>more_vert</v-icon>
                                                    </v-btn>

                                                    <v-list>
                                                        <v-list-tile
                                                                v-for="(item, i) in items"
                                                                :key="i"
                                                                @click="item.method(event._id)"
                                                        >
                                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                                        </v-list-tile>
                                                    </v-list>
                                                </v-menu>
                                            </v-list-tile-content>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-scroll-y-reverse-transition>
                </v-flex>
            </v-layout>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import axios from 'axios';
    import { EVENT_STATUS } from '../../const';

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
				items: [
					{ title: 'Edit', method: (_id, option) => console.log(`Edit event: ${_id}, options: ${option}`)},
					{ title: 'Delete', method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.REJECTED) },
				]
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
            changeEventStatus(_id, status) {
				axios.put(`/api/event/status/${_id}`, {
					status
                })
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
            }
        },
        computed: {
			patients() {
				return this.$store.getters.patients;
            }
        }
	}
</script>

<style scoped>
    .eventsList {
        background-color: #59fb6075;
    }
</style>
