<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3>
                <h2 class="pa-2">
                    Налаштування
                </h2>
                <v-form v-model="isFormValid" name="settingsForm">
                    <v-layout justify-center align-center wrap>
                        <v-flex xs12 sm7 >
                            <v-text-field
                                    :value="user.email"
                                    disabled
                                    label="E-mail"
                                    name="email"
                                    required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon>lock</v-icon>
                        </v-flex>
                        <v-flex xs11 sm7 >
                            <v-text-field
                                    v-model="name"
                                    :disabled="disableName"
                                    label="Ім`я"
                                    name="name"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon @click="disableName = !disableName">edit</v-icon>
                        </v-flex>
                        <v-flex xs11 sm7 >
                            <v-text-field
                                    v-model="surname"
                                    :disabled="disableSurname"
                                    label="Прізвище"
                                    name="surname"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon @click="disableSurname = !disableSurname">edit</v-icon>
                        </v-flex>
                        <v-flex xs11 sm7 >
                            <v-text-field
                                    v-model="patronymic"
                                    :disabled="disablePatronymic"
                                    label="По батькові"
                                    name="patronymic"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon @click="disablePatronymic = !disablePatronymic">edit</v-icon>
                        </v-flex>
                        <v-flex xs11 sm7>
                            <v-text-field
                                    v-model="password"
                                    value="random password"
                                    :disabled="disablePassword"
                                    label="Пароль"
                                    type="password"
                                    name="password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-icon @click="disablePassword = !disablePassword">edit</v-icon>
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
                                   :disabled="!wasChanges || loading"
                                   @click="Save">
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
    import moment from 'moment';
    import _ from 'lodash';
    import axios from 'axios';
	export default {
		name: "Settings",
		props: {
			user: Object
		},
		data() {
			return {
				loading: false,
				menu: null,
				isFormValid: false,
				wasChanges: false,

				disableName: true,
				disableSurname: true,
				disablePatronymic: true,
				disablePassword: true,

				email: this.user.email,
				name: this.user.name,
				surname: this.user.surname,
				patronymic: this.user.patronymic,
                password: '',

				selectedFile: null,
				avatar: null,

				emailRules: [
					v => !!v || 'E-mail обов`язковий!',
					v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
				],
				nameRules: [v => !!v || 'Імя обов`язкове!'],
				surnameRules: [v => !!v || 'Прізвище обов`язкове!'],
				patronymicRules: [v => !!v || 'По батькові обов`язкове!'],
			}
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

			Save() {
				if (this.wasChanges) {
					this.uploadImage();

					axios.put(`/api/user/${this.user._id}`, {
						name: this.name,
						surname: this.surname,
						patronymic: this.patronymic,
						password: this.password,
						avatar: this.avatar,
                    }).then(res => {
						console.log(res.data);
					}).catch(err => {
						console.log(err);
					})
				}
            }
		},
        computed: {

        },
        watch: {
			name(name, oldValue) {
				console.log(name);
				console.log(oldValue);
				console.log(this.user.name);
				if (!_.isEqual(name, this.user.name)) {
					this.wasChanges = true;
                }
            },
			surname(surname, oldValue) {
				if (!_.isEqual(surname, this.user.surname)) {
					this.wasChanges = true;
				}
			},
			patronymic(patronymic, oldValue) {
				if (!_.isEqual(patronymic, this.user.patronymic)) {
					this.wasChanges = true;
				}
			},
			password(password, oldValue) {
				this.wasChanges = true;
			},
			avatar(avatar, oldValue) {
                this.wasChanges = true;
			},
        }
	}
</script>

<style scoped>

</style>