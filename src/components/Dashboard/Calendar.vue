<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs12 md8 offset-md2 lg6 offset-lg3>
                <full-calendar :events="events"
                               listWeek
                               v-model="calendar"
                               ref="calendar"></full-calendar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
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
				calendar: null,
                events: [
                    {
                        title  : 'event1',
                        start  : '2018-10-31T12:30:00',
                        end  : '2018-10-31T13:30:00',
                        color: 'pink',
                        textColor: 'black',
                    },
                    {
                        title  : 'event2',
                        start  : '2018-11-1T14:00:00',
                        end  : '2018-11-1T15:00:00',
                    },
                    {
                        title  : 'event3',
                        start  : '2018-10-31T11:00:00',
                        allDay : true,
                    },
                ]
            }
        },

        methods: {
        	getEvents() {
				axios.get('/api/event', {
					params: {
						fromDate: null,
						toDate: null,
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

        }
    }
</script>

<style >
    .fc-time-grid-container, .fc-time-grid-container {
        max-height: 600px !important;
        min-height: 500px !important;
    }
</style>
