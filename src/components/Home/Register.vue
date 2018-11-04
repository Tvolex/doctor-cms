<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md8 offset-md2>
                <h2>
                    Реєстрація пацієнта
                </h2>

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
                            <v-text-field
                                    v-model="birthdate"
                                    :rules="birthdateRules"
                                    label="Дата народження"
                                    type="date"
                                    name="birthdate"
                                    outline
                                    required
                            ></v-text-field>
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
                                    type="number"
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
                            <v-btn large round color="success" v-on:click.native="Login">Вхід</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	import moment from 'moment'
	export default {
		name: "Register",
		data() {
			return {
				isFormValid: false,
				email: null,
				name: null,
				surname: null,
				patronymic: null,
				birthdate: moment().set('year', 2017).format("YYYY-MM-DD"),
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
		watch: {
			birthdate(value, oldValue) {
				const isDate = moment(value).isValid();

				const momentOfBirthdate = moment(value);
				const currentDate = moment();

				if (isDate && momentOfBirthdate.get('year') > currentDate.get('year')) {
					this.birthdate = moment().set('year', 2017).format("YYYY-MM-DD")
				}
				// else if (isDate &&
				// 	moment(value).get('year') > moment().get('year') &&
				// 	moment(value).get('month') > moment().get('month')
				// ) {
				// 	this.birthdate = moment(this.birthdate)
				// 		.set('month', moment.get('month'));
				// } else if (isDate &&
				// 	moment(value).get('year') > moment().get('year') &&
				// 	moment(value).get('month') > moment().get('month') &&
				// 	moment(value).get('date') > moment().get('date')
				// ) {
				// 	this.birthdate = moment(this.birthdate)
				// 		.set('date', moment.get('date'));
				// }
			}
		}
	}
</script>

<style scoped>

</style>