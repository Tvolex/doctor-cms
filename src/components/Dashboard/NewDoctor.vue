<template>
    <v-container fluid v-if="user.admin">
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3>
                <div class="pa-2" >
                    <router-link to="/dashboard/newPatient">Додати нового <b>пацієнта</b></router-link> |
                    <router-link to="/dashboard/newDoctor">Додати нового <b>лікаря</b></router-link>
                </div>
                <h2 class="pa-2">
                    Введіть дані про нового лікаря
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
                            <v-select
                                    :items="specializations"
                                    v-model="specialization"
                                    item-text="name"
                                    item-value="_id"
                                    label="Спеціалізація"
                                    multiple
                                    persistent-hint
                                    :rules="specializationRules"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 >
                            <v-text-field
                                    v-model="cabinet"
                                    :rules="cabinetRules"
                                    label="кабінета"
                                    name="cabinet"
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
		name: "newDoctor",
        beforeMount() {
            this.getSpecialization();
        },
		data() {
			return {
				loading: false,
				menu: null,
				isFormValid: false,

				email: null,
				name: null,
				surname: null,
				patronymic: null,
				specialization: null,
				cabinet: null,
				selectedFile: null,
                avatar: null,

				specializations: ['Терапевт', 'Педіатр', 'Стоматолог', 'Ендокринолог', 'Офтальмолог'],

				specializationRules: [(v)=> !!v || 'Вибір спеціалізації обов`язковий!'],
				cabinetRules: [
					(v)=> !!v || 'Вибір кабінета обов`язковий!',
                    v => !Number.isNaN(parseInt(v)) || 'Must number',
					v => _.inRange(parseInt(v), 0, 999) || 'Must in range [0, 999]',
				],
				emailRules: [
					v => !!v || 'E-mail обов`язковий!',
					v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
				],
				nameRules: [v => !!v || 'Імя обов`язкове!'],
				surnameRules: [v => !!v || 'Прізвище обов`язкове!'],
				patronymicRules: [v => !!v || 'ПО батькові обов`язкове!'],
			}
		},
		computed: {
			user: function () {
				return this.$store.getters.user;
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
					newDoctor: {
						email: this.email,
						name: this.name,
						surname: this.surname,
						patronymic: this.patronymic,
						specialization: this.specialization,
                        cabinet: this.cabinet,
                        avatar: this.avatar,
					},
				}).then((res) => {
					this.loading = false;
					this.$notificator('info', 'Нового лікаря створено успішно!')
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
