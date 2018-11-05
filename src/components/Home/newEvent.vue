<template>
    <div class="newEvent">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-container fluid>
            <v-layout row wrap main-items>
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
                                        :rules="specializationRules"
                                        required
                                        outline
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 v-if="specialization">
                                <v-select
                                        :items="doctors"
                                        item-text="fullName"
                                        item-value="_id"
                                        v-model="doctor"
                                        :rules="doctorRules"
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
                                        :rules="dateRules"
                                        single-line
                                        required
                                        outline
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 v-if="doctor">
                                <v-select
                                        :items="availableHours()"
                                        v-model="time"
                                        label="Оберіть час"
                                        single-line
                                        :rules="timeRules"
                                        required
                                        outline
                                ></v-select>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <v-btn
                            large
                            round
                            color="success"
                            v-on:click.native="create"
                            :disabled="!isFormValid">

                        Далі
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>

</template>

<script>
	import axios from 'axios';
    import Moment from 'moment';
    import business from 'moment-business';
	import { extendMoment } from 'moment-range';

	const moment = extendMoment(Moment);

	export default {
		name: "newEvent",
        components: {},
		data() {
			return {
				isFormValid: false,
				specializations: ['Терапевт', 'Педіатр', 'Стоматолог', 'Ендокринолог', 'Офтальмолог'],
				doctors: null,
				specialization: null,
				doctor: null,
				date: moment().format("YYYY-MM-DD"),
				time: null,
				specializationRules: [(v)=> !!v || 'Вибір спеціалізації обов`язковий!'],
				doctorRules: [(v)=> !!v || 'Вибір лікара обов`язковий!'],
				dateRules: [(v)=> !!v || 'Дата обов`язкова!'],
				timeRules: [(v)=> !!v || 'Час обов`язковий!'],
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
            create: function () {

				if (this.isFormValid) {

					this.$store.commit('event', {type: 'event', value: {
							specialization: this.specialization,
							doctor: this.doctor,
							date: this.date,
							time: this.time,
						}
					});

					this.$router.push('/register');

                }
			}
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
