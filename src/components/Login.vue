<template>
    <v-app>
        <v-container fluid>
            <v-layout row wrap main-items>
                <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
                    <h1>{{ msg }}</h1>
                    <p>
                        The best medical center
                    </p>

                    <v-form v-model="isFormValid" name="authForm">
                        <v-layout>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
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
                                        label="Password"
                                        name="password"
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

    </v-app>
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
                isFormValid: null,
                email: null,
                password: null,
                passwordRules: [
                    v => !!v || 'password is required'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                host: this.$store.getters.host,
            }
        },
        beforeMount() {
            this.$store.dispatch({type: "auth"});
        },
        methods: {
            Login: async function() {
                if (this.isFormValid) {
                    try {
                        const res = await axios.post(`/api/login`, {
                            email: this.email,
                            password: this.password,
                        });
                        this.$store.commit("user", {type: "user", value: res.data});
                        this.$router.push('/dashboard');
                    }   catch (err) {
                    	console.log(err);
                    	let message = 'Щось сталось не так :(';
                    	if (err.response && err.response.data && err.response.data.message) {
							message = err.response.data.message;
                        }
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
