<template>
    <v-container fluid v-if="user.admin">
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3>
                <v-card class="ma-3">
                    <v-card-title>
                        <h2 class="pa-2">
                            Введіть назву
                        </h2>
                    </v-card-title>
                    <v-form v-model="isFormValid" name="newSpecializationForm">
                        <v-layout justify-space-between wrap>
                            <v-flex xs12 md3 lg3>
                                <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        class="mx-3"
                                        label="Ім`я"
                                        name="name"
                                        required
                                ></v-text-field>
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
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "NewSpecialization",
		data() {
			return {
				loading: false,
				isFormValid: false,
				name: null,
				nameRules: [v => !!v || 'Імя обов`язкове!'],
			}
		},
		computed: {
			user: function () {
				return this.$store.getters.user;
			},
		},
		methods: {
			Create: function () {
				axios.post('/api/specialization/', {
                    name: this.name,
				}).then((res) => {
					this.loading = false;
					console.log(res.data);
					if (res.data.created && res.data.created.ok) {
                        this.$notificator('info', 'Нову спеціалізацію додано успішно!')
                    }
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
