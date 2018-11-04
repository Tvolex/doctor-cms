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
                            <v-btn large round color="success" v-on:click.native="Create">Записатись</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </div>


</template>

<script>
	export default {
		name: "personalKey",
        beforeMount() {
			if (!this.$store.getters.event) {
				this.$router.push('/');
				this.$notificator('error', 'Будь-ласка, повторіть вибір даних, так як вони були втрачені');
            }
        },
		data() {
			return {
				loading: false,
				menu: null,
				isFormValid: false,
				personalKey: null,
				personalKeyRules: [
                    (v)=> !!v || 'Персональний ключ обов`язковий!'
                ]
			}
		},
        methods: {
			Create() {
				console.log('created')
            }
        }
	}
</script>

<style scoped>

</style>