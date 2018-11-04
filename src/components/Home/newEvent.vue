<template>
    <v-container fluid>
        <v-layout v-if="!registerPage" row wrap main-items>
            <v-flex xs8 offset-xs2 md6 offset-md3>
                <h2>
                    Оберіть лікара
                </h2>

                <v-form v-model="isFormValid" name="newEventForm">
                    <v-layout justify-space-between wrap>
                        <v-flex xs12>
                            <v-select
                                    :items="specializations"
                                    v-model="specialization"
                                    label="Спеціалізація"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 v-if="specialization">
                            <v-select
                                    :items="doctors"
                                    item-text="name"
                                    item-value="_id"
                                    v-model="doctor"
                                    label="Лікар"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 v-if="doctor">
                            <v-select
                                    :items="availableDates()"
                                    v-model="date"
                                    label="Оберіть дату"
                                    single-line
                                    outline
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 v-if="doctor">
                            <v-select
                                    :items="availableHours()"
                                    v-model="time"
                                    label="Оберіть час"
                                    single-line
                                    outline
                            ></v-select>
                        </v-flex>

                    </v-layout>

                </v-form>
            </v-flex>
        </v-layout>
        <v-layout v-if="!registerPage">
            <v-flex xs12>
                <v-btn large round color="success" v-on:click.native="registerPage = !registerPage">Далі</v-btn>
            </v-flex>
        </v-layout>
        <Register v-if="registerPage"></Register>
    </v-container>
</template>

<script>
	import axios from 'axios';
    import Moment from 'moment';
    import business from 'moment-business';
	import { extendMoment } from 'moment-range';

	import Register from '@/components/Home/Register';

	const moment = extendMoment(Moment);

	export default {
		name: "newEvent",
        components: {
			Register
        },
		data() {
			return {
				menu: null,
				isFormValid: false,
                date: moment().format("YYYY-MM-DD"),
				newUser: false,
				specialization: null,
				specializations: ['Терапевт', 'Педіатр', 'Стоматолог', 'Ендокринолог', 'Офтальмолог'],
				doctor: null,
				doctors: null,
				time: null,
				registerPage: false,
			}
		},
		methods: {
			availableHours: function () {
				const range = moment
					.range(
						moment()
							.set('hour', 10)
							.startOf('hour')
							.startOf('minute'),
						moment()
							.set('hour', 18)
							.startOf('minute')
					);
				const hours = Array.from(range.by('hour', { excludeEnd: true }));
				return hours.map(m => m.format('HH:mm'));
            },
			availableDates: function () {

				const range = moment
					.range(
						moment(),
						moment()
							.week(moment().week() + 1)
							.startOf('week'),
					);
				const dates = Array.from(range.by('days'));
				const isWorkDays = dates.map(day => business.isWeekDay(day));

				const workDays = dates.map((day, index)=> {
					if (isWorkDays[index])
						return day.format('YYYY-MM-DD')
				});

				return workDays.filter(day => !!day);
			},
			allowedStep: m => m % 10 === 0,
			getDoctors () {
				axios.get(`/api/user`, {
					params: {
						filter: {
							type: ['doctor'],
							specialization: [this.specialization],
						},
					},
				}).then((res) => {
					this.doctors = res.data;
				}).catch((err) => {
					console.log(err);
					this.doctors = null;
				});
			},
			isDoctorBusy() {
				axios.get(`/api/user/${this.doctor}`, {
					params: {
						date: this.date,
					},
				}).then((res) => {

				}).catch((err) => {
					console.log(err);

				});
            },
		},
		watch: {
			specialization(value, oldValue) {
				this.getDoctors();
			},
			doctor(value, oldValue) {
				this.isDoctorBusy();
			}
		}
	}
</script>

<style scoped>

</style>