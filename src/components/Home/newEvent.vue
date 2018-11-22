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
                        Оберіть лікаря
                    </h2>

                    <v-form v-model="isFormValid" name="newEventForm">
                        <v-layout justify-space-between wrap>
                            <v-flex xs12>
                                <v-select
                                        :items="specializations"
                                        item-text="name"
                                        item-value="_id"
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
                                        item-avatar="avatar"
                                        v-model="doctor"
                                        :rules="doctorRules"
                                        label="Лікар"
                                        required
                                        outline
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 v-if="doctor">
                                <v-menu
                                        v-model="isDatePickerActive"
                                        :close-on-content-click="false"
                                        full-width
                                        max-width="290"
                                >
                                    <v-text-field
                                            slot="activator"
                                            :value="formatDate"
                                            clearable
                                            label="Дата"
                                            readonly
                                            required
                                            outline
                                    ></v-text-field>
                                    <v-date-picker
                                            v-model="date"
                                            label="Дата"
                                            class="mt-3"
                                            :allowed-dates="isWorkDay"
                                            :rules="dateRules"
                                            :min="new Date().toISOString()"
                                            required
                                            outline
                                    ></v-date-picker>
                                </v-menu>

                                <!--<v-select-->
                                        <!--:items="availableDates()"-->
                                        <!--v-model="date"-->
                                        <!--label="Оберіть дату"-->
                                        <!--:rules="dateRules"-->
                                        <!--single-line-->
                                        <!--required-->
                                        <!--outline-->
                                <!--&gt;</v-select>-->
                            </v-flex>
                            <v-flex xs12 v-if="doctor && date">
                                <v-select
                                        :items="times"
                                        v-model="time"
                                        label="Час"
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
                            :loading="loading"
                            :disabled="!isFormValid || loading"
                            @click="create">
                        Далі
                        <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                        </span>
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
        beforeMount() {
            this.getSpecialization();
        },
		data() {
			return {
                isDatePickerActive: false,
                loading: false,
				isFormValid: false,
				specializations: [],
				doctors: [],
				specialization: null,
				doctor: null,
				date: null,
                times: [],
				time: null,
				specializationRules: [(v)=> !!v || 'Вибір спеціалізації обов`язковий!'],
				doctorRules: [(v)=> !!v || 'Вибір лікара обов`язковий!'],
				dateRules: [(v)=> !!v || 'Дата обов`язкова!'],
				timeRules: [(v)=> !!v || 'Час обов`язковий!'],
			}
		},
        computed: {
            formatDate() {
                return this.date ? moment(this.date).lang('uk').format('dddd, MMMM Do YYYY')
                    : null
            },
        },
		methods: {
		    getSpecialization: function () {
                axios.get(`/api/specialization`).then((res) => {
                    this.specializations = res.data;
                }).catch((err) => {
                    console.log(err);
                    this.specializations = [];
                });
            },
			availableDates: function () {
				const range = moment
					.range(
						moment(),
						moment()
							.week(moment().week() + 2)
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
            isWorkDay: function(date) {
			    return ![0, 6].includes(moment(date).day());
            },
			getAvailableTimes: function () {
				// const range = moment
				// 	.range(
				// 		moment()
				// 			.set('hour', 10)
				// 			.startOf('hour')
				// 			.startOf('minute'),
				// 		moment()
				// 			.set('hour', 18)
				// 			.startOf('minute')
				// 	);
				// const hours = Array.from(range.by('hour', { excludeEnd: true }));
				// return hours.map(m => m.format('HH:mm'));

				const fullDate = moment(this.date).format("YYYY-MM-DD:HH-mm");

				axios.get(`/api/event/times`, {
					params: {
						doctor: this.doctor,
						fullDate,
					},
				}).then((res) => {
					this.times = res.data;
				}).catch((err) => {
					console.log(err);
					this.times = null;
				});
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
                this.loading = true;
                this.isFormValid = false;

                const [ hour, minute ] = this.time.split(':');
                const fullDate = moment(this.date)
                    .set('hour', hour)
                    .set('minute', minute)
                    .startOf('second')
                    .format();

				axios.get(`/api/event/busy`, {
				    params: {
                        doctor: this.doctor,
                        fullDate
                    }
				}).then((res) => {
                    if (!res.data) {
                        this.loading = false;
                        this.isFormValid = true;

                        return this.$router.push('/register');
                    }

                    this.$notificator('warning', 'Нажаль лікар зайнятий на цей час, будь-ласка виберіть інший!')
                    this.loading = false;
                    this.isFormValid = false;
				}).catch((err) => {
					console.log(err);
                    return true;
				});
            },
            create: function () {

				if (this.isFormValid) {
				    this.loading = true;
					this.$store.commit('event', {type: 'event', value: {
							specialization: this.specialization,
							doctor: this.doctor,
							date: this.date,
							time: this.time,
						}
					});
					this.isDoctorBusy();
					this.loading = false;
                }
			}
		},
		watch: {
			specialization(value, oldValue) {
				this.getDoctors();
			},
			date(value, oldValue) {
				this.getAvailableTimes();
			},
		}
	}
</script>

