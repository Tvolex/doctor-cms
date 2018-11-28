<template>
    <div class="Login">
        <div id="nav">
            <router-link to="/">Головна</router-link> |
            <router-link to="/about">Про медични центр</router-link> |
            <router-link to="/login">Вхід</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-app>
            <v-container fluid>
                <v-layout row wrap main-items>
                    <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
                        <h1>Найкращий медчиний центр</h1>
                        <p>
                            Доброго дня, міцного вам здоров`я :)
                        </p>

                        <v-form v-model="isFormValid" name="authForm">
                            <v-layout>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="email"
                                            :rules="emailRules"
                                            label="E-mail"
                                            prepend-icon="person"
                                            name="email"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12>
                                    <v-text-field
                                            v-model="password"
                                            :rules="passwordRules"
                                            type="password"
                                            label="Пароль"
                                            prepend-icon="lock"
                                            name="password"
                                            required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex xs12>
                                    <v-btn
                                            large
                                            round
                                            :loading="loading"
                                            :disabled="!isFormValid || loading"
                                            color="success"
                                            @click.native="Login">
                                        Вхід
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
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Login",
        props: {
            msg: String
        },
        data() {
            return {
                isFormValid: false,
                loading: false,
                email: null,
                password: null,
                passwordRules: [
                    v => !!v || 'Пароль обов`язковий!'
                ],
                emailRules: [
                    v => !!v || 'E-mail обов`язковий!',
                    v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
                ],
                host: this.$store.getters.host,
            }
        },
        beforeCreate() {
            this.$store.dispatch({type: "auth"}).then((isAuth) => {
				if (isAuth)
					this.$router.push('/dashboard');
				else
					this.$notificator('error', 'Не авторизовано!');
            })
        },
        methods: {
            Login: async function() {
                if (this.isFormValid) {
                    this.loading = true;
                    try {
                        const res = await axios.post(`/api/auth/login`, {
                            email: this.email,
                            password: this.password,
                        });
                        this.$store.commit("user", {type: "user", value: res.data});
                        this.$router.push('/dashboard');
                        this.loading = false;
                    }   catch (err) {
                    	console.log(err);
                    	let message = 'Щось сталось не так :(';
                    	if (err.response && err.response.data && err.response.data.message) {
							message = err.response.data.message;
                        }
                        this.loading = false;
						return this.$notificator('error', message);
                    }

                }
            },
        },
        watch: {
            email(newValue, oldValue) {

            },
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Login {
        background: transparent url("../assets/background.jpeg") !important;
        height: 100%;
    }
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
