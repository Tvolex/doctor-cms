<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex class="calendar pa-3" xs12 md8 offset-md2 lg6 offset-lg3>
                <full-calendar :events="events"
                               listWeek
                               :config="config"
                               @event-selected="eventSelected"
                               @view-render="getEvents"
                               ref="calendar"></full-calendar>
            </v-flex>
        </v-layout>
        <v-dialog
                v-if="selectedEvent"
                v-model="eventDetailsDialog"
                max-width="600px"
        >
            <v-card>
                <v-card-title class="headline">Деталі запису</v-card-title>
                <v-layout row wrap justify-center>
                    <v-flex xs10>
                        <v-avatar
                                size="100"
                                class="ma-2"
                        >
                            <img v-if="selectedEvent.patient.avatar" :src="selectedEvent.patient.avatar">
                            <img v-else src="@/assets/person.png">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>Пацієнт:</b> {{selectedEvent.patient.fullName}}
                        </v-card-text>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>Email пацієнта:</b> {{selectedEvent.patient.email}}
                        </v-card-text>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>Телефон пацієнта:</b> {{selectedEvent.patient.contact}}
                        </v-card-text>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>До:</b> {{selectedEvent.specialization}}
                        </v-card-text>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>Статус:</b> {{selectedEvent.status}}
                        </v-card-text>
                    </v-flex>
                    <v-flex xs10>
                        <v-card-text class="pa-1">
                            <b>Дата:</b> {{selectedEvent.fullDate.replace(':', " година: ")}}
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            flat="flat"
                            color="green"
                            @click="eventDetailsDialog = false"
                    >
                        Закрити
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
	import 'fullcalendar/dist/locale/uk'
    export default {
        name: "calendar",
        props: {
        	user: Object,
        },
        beforeMount() {
        	axios.get('/api/event', {
        		params: {
        			fromDate: null,
                    toDate: null,
                    doctor: this.user._id,
                }
            }).then((res) => {
            	this.events = res.data.map(event => {
					event.title = event.patient.fullName;
					event.color = event.status === "завершено" ? "green" : "pink";
					event.start = moment(event.fullDate, "YYYY-MM-DD:HH-mm").format();
					event.end = moment(event.fullDate, "YYYY-MM-DD:HH-mm")
						.set("hour", moment(event.fullDate, "YYYY-MM-DD:HH-mm").get("hour") + 1)
						.format();
				});
			}).catch(err => {
				console.log(err);
				this.$notificator('error', err.message);
			})
        },
        data() {
            return {
				eventDetailsDialog: false,
				selectedEvent: null,
				config: {
					weekends: false,
					editable: false,
					selectable: false,
					selectHelper: false,
					locale: 'uk',
				},
                events: []
            }
        },

        methods: {
			eventSelected(event, jsEvent, view) {
				this.selectedEvent = event;
				this.eventDetailsDialog = true;
            },
        	getEvents(calendarView, element) {
        		console.log(calendarView);
				console.log(element);
        		let fromDate = null;
				let toDate = null;
        		switch (calendarView.name) {
					case "agendaDay":
						fromDate = moment(new Date(calendarView.intervalStart._i)).startOf('day').format("YYYY-MM-DD:HH-mm");
						toDate =  moment(new Date(calendarView.intervalEnd._i)).endOf('day').format("YYYY-MM-DD:HH-mm");
						break;
                    case "agendaWeek":
                        fromDate = moment(new Date(calendarView.intervalStart._i)).startOf('week').format("YYYY-MM-DD:HH-mm");
						toDate = moment(new Date(calendarView.intervalEnd._i)).endOf('week').format("YYYY-MM-DD:HH-mm");
						break;
					case "month":
						fromDate = moment(new Date(calendarView.intervalStart._i)).startOf('month').format("YYYY-MM-DD:HH-mm");
						toDate = moment(new Date(calendarView.intervalEnd._i)).endOf('month').format("YYYY-MM-DD:HH-mm");
						break;
					default:
						fromDate = moment().startOf('month').format("YYYY-MM-DD:HH-mm");
						toDate = moment().endOf('month').format("YYYY-MM-DD:HH-mm");
						break;
				}
				axios.get('/api/event', {
					params: {
						fromDate,
						toDate,
						doctor: this.user._id,
					}
				}).then((res) => {
					this.events = res.data.map(event => {
						event.title = event.patient.fullName;
						event.color = event.status === "завершено" ? "green" : "pink";
						event.start = moment(event.fullDate, "YYYY-MM-DD:HH-mm").format();
						event.end = moment(event.fullDate, "YYYY-MM-DD:HH-mm")
                            .set("hour", moment(event.fullDate, "YYYY-MM-DD:HH-mm").get("hour") + 1)
                            .format();
						return event;
                    });
				}).catch(err => {
					console.log(err);
					this.$notificator('error', err.message);
				})
            },

        }
    }
</script>

<style >
    .calendar {
        background-color: oldlace;
    }
    .fc-time-grid-container, .fc-time-grid-container {
        max-height: 600px !important;
        min-height: 500px !important;
    }
</style>
