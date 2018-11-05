<template>
    <div class="register">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md8 offset-md2>
                <h2>
                    Реєстрація пацієнта
                </h2>
                <router-link to="/personalKey">Або введіть свій ключ</router-link>
                <v-dialog
                        v-if="!!registered"
                        v-model="registeredModal"
                        max-width="290">
                    <v-card>
                        <v-card-title class="headline"><h2>Зареєстровано</h2></v-card-title>

                        <v-card-text>
                            {{registered.message}}
                        </v-card-text>

                    </v-card>
                </v-dialog>
                <v-form v-model="isFormValid" name="registerForm">
                    <v-layout justify-space-between wrap>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    name="email"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3 lg3>
                            <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    label="Ім`я"
                                    name="name"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 lg4>
                            <v-text-field
                                    v-model="surname"
                                    :rules="surnameRules"
                                    label="Прізвище"
                                    name="surname"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 lg4>
                            <v-text-field
                                    v-model="patronymic"
                                    :rules="patronymicRules"
                                    label="По батькові"
                                    name="patronymic"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <!-- <v-text-field
                                     v-model="birthdate"
                                     :rules="birthdateRules"
                                     label="Дата народження"
                                     type="date"
                                     name="birthdate"
                                     outline
                                     required
                             ></v-text-field>-->
                            <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="birthdate"
                                        label="Birthday date"
                                        readonly
                                        outline
                                ></v-text-field>
                                <v-date-picker
                                        ref="picker"
                                        v-model="birthdate"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1900-01-01"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 md2>
                            <v-text-field
                                    v-model="city"
                                    :rules="cityRules"
                                    label="Місто"
                                    name="city"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                    v-model="street"
                                    :rules="streetRules"
                                    label="Вулиця"
                                    name="street"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md3>
                            <v-text-field
                                    v-model="house"
                                    :rules="houseRules"
                                    label="Номер будинку"
                                    name="house"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md2>
                            <v-text-field
                                    v-model="apartment"
                                    label="Номер квартири"
                                    type="number"
                                    name="apartment"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="passportSeries"
                                    :rules="passportSeriesRules"
                                    label="Серія паспорта"
                                    max="3"
                                    name="passportSeries"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="passportNumber"
                                    :rules="passportNumberRules"
                                    label="Номер паспорта"
                                    type="number"
                                    name="passportNumber"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success"
                                   :loading="loading"
                                   :disabled="!isFormValid"
                                   @click="Register">
                                Зараєструватись
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </div>

</template>

<script>
    import axios from 'axios';
	import moment from 'moment'
	export default {
		name: "Register",
		beforeCreate() {
			if (!this.$store.getters.event) {
				this.$router.push('/');
				this.$notificator('error', 'Будь-ласка, повторіть вибір даних, так як вони були втрачені');
			}
		},
		data() {
			return {
				registered: null,
				registeredModal: false,
				loading: false,
				menu: null,
				isFormValid: false,

				email: null,
				name: null,
				surname: null,
				patronymic: null,
				birthdate: moment().set('year', 2000).format("YYYY-MM-DD"),
				city: null,
				street: null,
				house: null,
				apartment: null,
				passportSeries: null,
				passportNumber: null,

				emailRules: [
					v => !!v || 'E-mail обов`язковий!',
					v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
				],
				nameRules: [v => !!v || 'Імя обов`язкове!'],
				surnameRules: [v => !!v || 'Прізвище обов`язкове!'],
				patronymicRules: [v => !!v || 'ПО батькові обов`язкове!'],
				birthdateRules: [v => !!v || 'Дата народження обов`язкова!' ],
				cityRules: [v => !!v || 'Місто обов`язкове!'],
				streetRules: [v => !!v || 'Вулиця обов`язкова!'],
				houseRules: [v => !!v || 'Будинок обов`язкови!'],
				passportSeriesRules: [v => !!v || 'Серія паспорта обов`язкова!'],
				passportNumberRules: [v => !!v || 'Номер паспорта обов`язковий!'],
			}
		},
        methods: {
			Register: function () {
				this.loading = true;

				axios.post('/api/event', {
					event: this.$store.getters.event,
					newPatient: {
						email: this.email,
						name: this.name,
						surname: this.surname,
						patronymic: this.patronymic,
						birthdate: this.birthdate,
						city: this.city,
						street: this.street,
						house: this.house,
						apartment: this.apartment,
						passportSeries: this.passportSeries,
						passportNumber: this.passportNumber,
                    },
                }).then((res) => {
					this.loading = false;
					this.registered = res.data;
					this.registeredModal = true;
                }).catch((err) => {
                    this.loading = false;
					console.log(err);
					let message = err.message || 'Щось сталось не так :(';
					if (err.response && err.response.data && err.response.data.message) {
						message = err.response.data.message;
					}
					return this.$notificator('error', message);
                });
			},
			Create() {
				console.log('Created');
				this.$notificator('info', 'Ви успішно записались')
            },
        },
	}
</script>

<style scoped>

</style>
