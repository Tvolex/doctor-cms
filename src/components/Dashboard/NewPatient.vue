<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs10 offset-xs1 md6 offset-md3 lg4 offset-lg4>
                <v-form v-model="isFormValid" name="newPatientForm">
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
                                    v-model="name"
                                    label="Name"
                                    name="name"
                                    required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-text-field
                                    v-model="surname"
                                    label="Surname"
                                    name="surname"
                                    required
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success" v-on:click.native="Save">Зберегти</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	export default {
		name: "newPatient",
		data() {
			return {
				isFormValid: null,
				email: null,
                name: null,
                surname: null,
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
				],
				host: this.$store.getters.host,
			}
		},
        methods: {
			Save: function () {
				console.log('saved')
			}
        },
	}
</script>

<style scoped>

</style>