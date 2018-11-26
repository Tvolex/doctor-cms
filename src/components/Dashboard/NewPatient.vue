<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3 >
                <div class="pa-2" v-if="user.admin">
                    <router-link to="/dashboard/newPatient">Додати нового <b>пацієнта</b></router-link> |
                    <router-link to="/dashboard/newDoctor">Додати нового <b>лікаря</b></router-link>
                </div>
                <h2 class="pa-2">
                    Введіть дані про нового пацієнта
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
                                        label="Дата народження"
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
                                    name="passportNumber"
                                    min="5"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 align-center>
                            <v-btn flat>
                                <input type="file" @change="onFileChanged">
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success"
                                   :loading="loading"
                                   :disabled="!isFormValid || loading"
                                   @click="Create">
                                Зберегти
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import moment from 'moment'
    import axios from 'axios';
	export default {
		name: "newPatient",
		data() {
			return {
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

				selectedFile: null,
				avatar: null,

                emailRules: [
                    v => !!v || 'E-mail обов`язковий!',
                    v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
                ],
                nameRules: [v => !!v || 'Імя обов`язкове!'],
                surnameRules: [v => !!v || 'Прізвище обов`язкове!'],
                patronymicRules: [v => !!v || 'По батькові обов`язкове!'],
                birthdateRules: [v => !!v || 'Дата народження обов`язкова!' ],
                cityRules: [v => !!v || 'Місто обов`язкове!'],
                streetRules: [v => !!v || 'Вулиця обов`язкова!'],
                houseRules: [
                	v => !!v || 'Будинок обов`язкови!',
					v => _.isInteger(parseInt(v)) || 'Номер будинка позначається числом!'
                ],
                passportSeriesRules: [v => !!v || 'Серія паспорта обов`язкова!'],
                passportNumberRules: [
                	v => !!v || 'Номер паспорта обов`язковий!',
                    v =>  _.isInteger(parseInt(v)) || 'Номер паспорта складається з цифр!'
                ],
			}
		},
		computed: {
			user: function () {
				return this.$store.getters.user;
			},
		},
        methods: {
			onFileChanged (event) {
				this.selectedFile = event.target.files[0];
				this.uploadImage()
			},

			uploadImage() {
				if (this.selectedFile) {
					const formData = new FormData();
					formData.append('image', this.selectedFile, this.selectedFile.name);
					console.log(formData);
					axios.post('/api/upload', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}).then(res => {
						console.log(res.data._id);
						this.avatar = res.data._id;
					}).catch(err => {
						console.log(err);
					})
				}
			},
			Create: async function () {
				this.loading = false;

				await this.uploadImage();

                axios.post('/api/user/', {
                    newPatient: {
                        email: this.email,
                        name: this.name,
                        surname: this.surname,
                        patronymic: this.patronymic,
                        birthdate: moment(this.birthdate).format("YYYY-MM-DD"),
                        city: this.city,
                        street: this.street,
                        house: this.house,
                        apartment: this.apartment,
                        passportSeries: this.passportSeries,
                        passportNumber: this.passportNumber,
						avatar: this.avatar,
                    },
                }).then((res) => {
                    this.loading = false;
                    this.$notificator('info', 'Нового пацієнта створено успішно!')
                }).catch((err) => {
                    this.loading = false;
                    console.log(err);
                    let message = err.message || 'Щось сталось не так :(';
                    if (err.response && err.response.data && err.response.data.message) {
                        message = err.response.data.message;
                    }
                    return this.$notificator('error', message);
                });
			}
        },
	}
</script>

<style scoped>

</style>
