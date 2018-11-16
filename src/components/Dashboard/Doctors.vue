<template>
    <div>
        <div v-if="detectIsMobile()">
            <v-layout row>
                <v-flex xs12  v-if="!selectedDoctor">
                    <v-scroll-x-transition mode="out-in">
                        <v-card class="ma-3">
                            <v-list subheader>
                                <v-subheader>Лікарі</v-subheader>
                                <v-list-tile
                                        v-for="doctor in doctors"
                                        :key="doctor._id"
                                        @click="getEventsByPatient(doctor._id)"
                                >
                                    <v-list-tile-avatar>
                                        <img v-if="doctor.avatar" :src="doctor.avatar">
                                        <img v-else src="@/assets/person.png" alt="">
                                    </v-list-tile-avatar>

                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="doctor.fullName"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="doctor.email"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile>
                            </v-list>
                            <v-divider></v-divider>
                        </v-card>
                    </v-scroll-x-transition>

                </v-flex>
                <v-flex xs12 v-if="selectedDoctor">
                    <v-scroll-x-reverse-transition mode="out-in">
                        <v-card class="ma-3"
                                :key="selectedDoctor._id"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="selectedDoctor = null">Закрити</v-btn>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selectedDoctor.avatar" :src="selectedDoctor.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedDoctor.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedDoctor.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedDoctor.fullName }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{
                                selectedDoctor.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                selectedDoctor.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                selectedDoctor.passportNumber }}</v-flex>
                            </v-layout>
                            <v-list subheader >
                                <v-subheader>Записи</v-subheader>
                                <v-list-tile
                                        v-for="event in selectedDoctor.events"
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
                    </v-scroll-x-reverse-transition>
                </v-flex>
            </v-layout>
            <v-dialog
                    v-if="selectedDoctor && selectedEvent"
                    v-model="eventDetailsDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Деталі</v-card-title>

                    <v-card-text>
                        Пацієнт: {{selectedDoctor.fullName}}
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
        <div v-if="!detectIsMobile()" >
            <v-layout row>
                <v-flex xs12 md6 lg5>
                    <v-card class="ma-3">
                        <v-list subheader>
                            <v-subheader>Лікарі</v-subheader>
                            <v-list-tile
                                    v-for="doctor in doctors"
                                    :key="doctor.fullName"
                                    avatar
                                    @click="getEventsByPatient(doctor._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="doctor.avatar" :src="doctor.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="doctor.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="doctor.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6 lg7 v-if="selectedDoctor">
                    <v-scroll-y-reverse-transition mode="out-in">
                        <v-card
                                :key="selectedDoctor._id"
                                class="ma-3"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="selectedDoctor = null">Закрити</v-btn>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selectedDoctor.avatar" :src="selectedDoctor.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedDoctor.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedDoctor.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedDoctor.fullName }}</div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.birthdate }}
                                </v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.passportSeries }}
                                </v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.passportNumber }}
                                </v-flex>

                            </v-layout>
                            <v-list subheader >
                                <v-subheader>Записи до лікаря:</v-subheader>
                                <v-list-tile
                                        v-for="event in selectedDoctor.events"
                                        :key="event._id"
                                        avatar
                                >
                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs6 sm4 offset-sm1 md3 offset-md1>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs4 sm4 md3 offset-md1>
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
		name: "Doctors",
        beforeCreate() {
			this.$store.dispatch({type: "doctors"}).then((doctors) => {
				if (_.isEmpty(doctors)) {
					this.$notificator('warning', 'Немає жодного лікаря!')
                }
            })
        },
		data () {
			return {
                loading: false,
                selectedEvent: null,
                selectedDoctor: null,
                eventDetailsDialog: false,
				eventActions: [
					{ title: 'Редагувати', color: "green darken-1", method: (_id, option) => console.log(`Edit event: ${_id}, options: ${option}`)},
					{ title: 'Відмінити', color: "red darken-1", method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.REJECTED) },
				]
			}
		},
        methods: {
			getEventsByPatient(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
						this.selectedDoctor = res.data;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    this.selectedDoctor = null;
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
			auth() {
                return this.$store.getters.user;
			},
            doctors() {
				return this.$store.getters.doctors;
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
