<template>
    <v-layout row wrap main-items>
        <v-flex v-if="newUser" xs10 offset-xs1 md8 offset-md2>
            <h2>
                Реєстрація пацієнта
            </h2>
            <v-btn @click="newUser = !newUser">
                Або введіть свій ключ
            </v-btn>
            <v-dialog
                    v-model="loading"
                    hide-overlay
                    persistent
                    width="300">
                <v-card
                        color="primary"
                        dark>
                    <v-card-text>
                        Зачекайте
                        <v-progress-linear
                                indeterminate
                                color="white"
                                class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
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
                        <v-btn large round color="success" v-on:click.native="Register">Зараєструватись</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
        <v-flex v-else xs10 offset-xs1 md8 offset-md2>
            <v-form v-model="isFormKeyValid" name="keyForm">
                <h2>
                    Введіть свій персональний ключ
                </h2>
                <v-layout justify-space-between wrap>
                    <v-flex xs12>
                        <v-text-field
                                v-model="personalKey"
                                label="Персональний ключ"
                                name="ley"
                                outline
                                required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>

                    <v-flex xs12>
                        <v-btn large round color="success" v-on:click.native="Create">Записатись</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>

        </v-flex>
    </v-layout>
</template>

<script>
	import moment from 'moment'
	export default {
		name: "Register",
		data() {
			return {
				loading: false,
				menu: null,
				isFormValid: false,
				isFormKeyValid: false,
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
				registered: null,
				registeredModal: false,
				newUser: true,
				personalKey: null,
			}
		},
        methods: {
			Register: function () {
				this.loading = true;

				setTimeout(()=> {
					this.loading = false;
					this.registered = { type: 'info', message: 'Ви були зареєстровані,' +
							' при наступному запису використовуйте цей ключ: ' + Math.random().toString(36).substr(2)
					};
					this.registeredModal = true;
                },2000)
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