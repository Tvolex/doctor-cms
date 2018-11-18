<template>
    <div>
        <div v-if="detectIsMobile() && patients">
            <v-layout row align-center justify-center class="text-xs-center mx-3">
                <v-flex xs12 sm6 md4>
                    <v-text-field
                            v-model="search"
                            label="Пошук"
                            name="search"
                            @change="Search"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 v-if="!selectedPatient">
                    <v-scroll-x-transition mode="out-in">
                        <div key="transition1">
                            <v-card class="mx-3" v-if="patients.withEvents.length">
                                <v-list subheader>
                                    <v-subheader>Записані пацієнти</v-subheader>
                                    <v-list-tile
                                            v-for="patient in patients.withEvents"
                                            :key="patient._id"
                                            @click="getEventsByPatient(patient._id)"
                                    >
                                        <v-list-tile-avatar>
                                            <img v-if="patient.avatar" :src="patient.avatar">
                                            <img v-else src="@/assets/person.png" alt="">
                                        </v-list-tile-avatar>

                                        <v-layout align-center justify-center row wrap>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                                <v-divider></v-divider>
                            </v-card>
                            <v-card class="ma-3" v-if="patients.withoutEvents.length">
                                <v-list subheader>
                                    <v-subheader>Не записані пацієнти</v-subheader>
                                    <v-list-tile
                                            v-for="patient in patients.withoutEvents"
                                            :key="patient._id"
                                            @click="getEventsByPatient(patient._id)"
                                    >
                                        <v-list-tile-avatar>
                                            <img v-if="patient.avatar" :src="patient.avatar">
                                            <img v-else src="@/assets/person.png" alt="">
                                        </v-list-tile-avatar>

                                        <v-layout align-center justify-center row wrap>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                                <v-divider></v-divider>
                            </v-card>
                        </div>
                    </v-scroll-x-transition>
                </v-flex>
                <v-flex xs12 v-if="selectedPatient">
                    <v-scroll-x-reverse-transition mode="out-in">
                        <div :key="`transition2_${selectedPatient._id}`">
                            <v-card class="mx-3 mt-3"
                                    :key="selectedPatient._id"
                                    color="#fffacd"
                            >
                                <v-btn class="green--text darken-1" flat @click="selectedPatient = null">Закрити</v-btn>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-avatar
                                            size="88"
                                    >
                                        <img v-if="selectedPatient.avatar" :src="selectedPatient.avatar">
                                        <img v-else src="@/assets/person.png">
                                    </v-avatar>
                                    <h3 class="headline mb-2">
                                        {{ selectedPatient.name }}
                                    </h3>
                                    <div class="blue--text mb-2">{{ selectedPatient.email }}</div>
                                    <div class="blue--text subheading font-weight-bold">{{ selectedPatient.fullName }}</div>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-layout
                                        tag="v-card-text"
                                        text-md-center
                                        wrap
                                >
                                    <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{
                                    selectedPatient.birthdate }}</v-flex>
                                    <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                    selectedPatient.passportSeries }}</v-flex>
                                    <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                    selectedPatient.passportNumber }}</v-flex>
                                </v-layout>
                                <v-divider></v-divider>
                                <v-list subheader >
                                    <v-subheader>Записи</v-subheader>
                                    <v-list-tile
                                            v-for="event in selectedPatient.events"
                                            :key="event._id"
                                            @click="selectedEvent = event"
                                    >
                                        <v-layout align-center justify-space-around row wrap>
                                            <v-flex xs6 >
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                            <v-card class="mx-3 mt-3">
                                <v-list>
                                    <v-list-tile @click="">
                                        <v-list-tile-action>
                                            <v-icon color="green">add</v-icon>
                                        </v-list-tile-action>

                                        <v-list-tile-content>
                                            <router-link to="/" tag="v-list-tile-title">Додати новий запис</router-link>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </div>
                    </v-scroll-x-reverse-transition>
                </v-flex>
            </v-layout>
            <v-dialog
                    v-if="selectedPatient && selectedEvent"
                    v-model="eventDetailsDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Деталі</v-card-title>

                    <v-card-text>
                        До: {{selectedEvent.specialization}}
                    </v-card-text>
                    <v-card-text>
                        Пацієнт: {{selectedPatient.fullName}}
                    </v-card-text>
                    <v-card-text>
                        Дата: {{selectedEvent.fullDate.replace(':', " година: ")}}
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                                v-for="(item, i) in eventActions"
                                :key="i"
                                flat="flat"
                                :color="item.color"
                                @click="item.method(selectedEvent._id)"
                        >
                            {{item.title}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div v-if="!detectIsMobile() && patients" >
            <v-layout row align-center justify-center class="text-xs-center mx-3">
                <v-flex xs12 sm6 md4>
                    <v-text-field
                            v-model="search"
                            label="Пошук"
                            name="search"
                            @change="Search"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 md6 lg5>
                    <v-card class="mx-3" v-if="patients.withEvents.length">
                        <v-list subheader>
                            <v-subheader>Записані пацієнти</v-subheader>
                            <v-list-tile
                                    v-for="patient in patients.withEvents"
                                    :key="patient._id"
                                    avatar
                                    @click="getEventsByPatient(patient._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="patient.avatar" :src="patient.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                    <v-card key="transition6" class="mx-3 mt-3" v-if="patients.withoutEvents.length">
                        <v-list subheader>
                            <v-subheader>Не записані пацієнти</v-subheader>
                            <v-list-tile
                                    v-for="patient in patients.withoutEvents"
                                    :key="patient._id"
                                    avatar
                                    @click="getEventsByPatient(patient._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="patient.avatar" :src="patient.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6 lg7 v-if="selectedPatient">
                    <v-scroll-y-reverse-transition mode="out-in">
                        <v-card
                                :key="`transition3_${selectedPatient._id}`"
                                class="mx-3"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="selectedPatient = null">Закрити</v-btn>
                            <v-card-text>
                                <v-avatar size="88">
                                    <img v-if="selectedPatient.avatar" :src="selectedPatient.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedPatient.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedPatient.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedPatient.fullName }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{
                                selectedPatient.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                selectedPatient.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                selectedPatient.passportNumber }}</v-flex>

                            </v-layout>
                            <v-list subheader >
                                <v-subheader>Записи</v-subheader>
                                <v-list-tile
                                        v-for="event in selectedPatient.events"
                                        :key="event._id"
                                        avatar
                                        @click=""
                                >
                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs6 sm3 md3 lg3 >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.specialization"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs6 sm4 md4 lg3 >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs4 sm3 md3 lg3 >
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs2 sm2 md2>
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
                                                                v-for="(item, i) in eventActions"
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
                                <v-divider></v-divider>
                                <v-list-tile @click="">
                                    <v-list-tile-action>
                                        <v-icon color="green">add</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <router-link to="/" tag="v-list-tile-title">Додати новий запис</router-link>
                                    </v-list-tile-content>
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
		name: "Patients",
		props: {
			user: Object
		},
        beforeCreate() {
			this.$store.dispatch({type: "patients"}).then((patients) => {
				if (_.isEmpty(patients)) {
					this.$notificator('warning', 'Ви немаєте жодного пацієнта!')
                }
            })
        },
		data () {
			return {
				search: null,
				loading: false,
                selectedEvent: null,
                selectedPatient: null,
                eventDetailsDialog: false,
				eventActions: [
					{ title: 'Завершити', color: "green darken-1", method: (_id, option) => this.changeEventStatus(_id, EVENT_STATUS.PASSED)},
					{ title: 'Відмінити', color: "red darken-1", method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.REJECTED) },
				]
			}
		},
        methods: {
			getEventsByPatient(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
						this.selectedPatient = res.data;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    this.selectedPatient = null;
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
                        this.$notificator(res.data.type, res.data.message);
                    })
                    .catch((err) => {
                        this.loading = false;
                        console.log(err);
                        let message = err.message || 'Щось сталось не так :(';
                        if (err.response && err.response.data && err.response.data.message) {
                            message = err.response.data.message;
                        }
                        this.$notificator('error', message);
                }).finally(() => {
                    this.$store.dispatch({type: "patients"}).then(patients => {
                        const patient = patients.find(patient => _.isEqual(this.selectedPatient._id, patient._id));
                        this.selectedPatient = patient ? this.getEventsByPatient(patient._id): null;
                        this.eventDetailsDialog = false;
                        this.selectedEvent = null;
                    });
                })
            },
			Search() {
				this.$store.dispatch({type: "patients", search: this.search } ).then((patients) => {
					if (_.isEmpty(patients)) {
						this.$notificator('warning', 'Ви немаєте жодного пацієнта!')
					}
				})
			}
        },
        computed: {
			auth() {
                return this.$store.getters.user;
			},
		    patients() {
				return this.$store.getters.patients;
            }

        },
        watch: {
		    selectedEvent (val, oldVal) {
		        if (!!val)
		            this.eventDetailsDialog = true
            }
        }
	}
</script>

<style >
    .eventsList {
        background-color: #59fb6075;
    }
</style>
