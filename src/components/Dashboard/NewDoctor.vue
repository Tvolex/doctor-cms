<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
                <div class="pa-2" v-if="user.admin">
                    <router-link to="/dashboard/newPatient">Додати нового пацієнта</router-link> |
                    <router-link to="/dashboard/newDoctor">Додати нового лікаря</router-link>
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
                                    label="Спеціалізація"
                                    multiple
                                    persistent-hint
                                    :rules="specializationRules"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success"
                                   :loading="loading"
                                   :disabled="!isFormValid"
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

				specializations: ['Терапевт', 'Педіатр', 'Стоматолог', 'Ендокринолог', 'Офтальмолог'],

                specializationRules: [(v)=> !!v || 'Вибір спеціалізації обов`язковий!'],
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
			Create: function () {
                axios.post('/api/user/', {
                    newDoctor: {
                        email: this.email,
                        name: this.name,
                        surname: this.surname,
                        patronymic: this.patronymic,
                        specialization: this.specialization,
                    },
                }).then((res) => {
                    this.loading = false;
                    this.$notificator('info', 'Новий запис лікаря створено успішно!')
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
