<template>
    <div class="personalKey">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md8 offset-md2>
                <v-form v-model="isFormValid" name="keyForm">
                    <h2>
                        Введіть свій персональний ключ
                    </h2>
                    <router-link to="/register"> Або поверність до реєстрації</router-link>
                    <v-layout justify-space-between wrap>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="personalKey"
                                    label="Персональний ключ"
                                    name="key"
                                    :rules="personalKeyRules"
                                    outline
                                    required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success"
                                   :loading="loading"
                                   :disabled="!isFormValid || loading"
                                   @click="Create">
                                Записатись
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
    import axios from  'axios';

	export default {
		name: "personalKey",
        beforeMount() {
			if (!this.$store.getters.event) {
				this.$router.push('/');
				this.$notificator('error', 'Будь-ласка, повторіть вибір даних, так як вони були втрачені');
            }
        },
        mounted() {
            if (this.$store.getters.selectedPatient) {
				this.personalKey = this.$store.getters.selectedPatient.personalKey;
                this.label = `Персональний ключ для ${this.$store.getters.selectedPatient.fullName}`;
            }
        },
		data() {
			return {
                menu: null,
                label: 'Персональний ключ',
                loading: false,
				isFormValid: false,
				personalKey: null,
				personalKeyRules: [
                    (v)=> !!v || 'Персональний ключ обов`язковий!',
                    (v)=> !!v && v.length === 32 || 'Ключ повинен складатись з 32-ох символів'
                ],

			}
		},
        methods: {
			Create() {
                this.loading = true;

                axios.post('/api/event', {
                    event: this.$store.getters.event,
                    personalKey: this.personalKey,
                }).then((res) => {

                    if (res.data && res.data.type && res.data.message) {
                        this.$notificator(res.data.type, res.data.message);
                    }

                }).catch((err) => {
                    console.log(err);
                    let message = 'Щось сталось не так :(';
                    if (err.response && err.response.data && err.response.data.message) {
                        message = err.response.data.message;
                    }
                    return this.$notificator('error', message);
                }).finally(() => {
                    this.loading = false;
                });
            }
        }
	}
</script>

<style scoped>
    .personalKey {
        background: transparent url("../assets/background.jpeg") !important;
        background-size: cover;
        height: 100%;
    }
</style>
