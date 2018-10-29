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
                                <v-btn color="success" v-on:click.native="SignIn">Вхід</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>

    </v-app>
</template>

<script>
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
            }
        },
        methods: {
            SignIn() {
                if (this.isFormValid) {
                    console.log(`Valid: ${this.isFormValid}`);
                    console.log(`email: ${this.email}`);
                    console.log(`password: ${this.password}`);
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
