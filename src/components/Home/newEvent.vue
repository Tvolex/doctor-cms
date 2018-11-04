<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs8 offset-xs2 md6 offset-md3>
                <h2>
                    Оберіть лікара
                </h2>

                <v-form v-model="isFormValid" name="newEventForm">
                    <v-layout justify-space-between wrap>
                        <v-flex xs12>
                            <v-select
                                    :items="specializations"
                                    v-model="specialization"
                                    label="Спеціалізація"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 v-if="specialization">
                            <v-select
                                    :items="doctors"
                                    item-text="name"
                                    v-model="doctor"
                                    label="Лікар"
                                    required
                                    outline
                            ></v-select>
                        </v-flex>

                    </v-layout>
                    <v-layout>
                        <v-flex xs12>
                            <v-btn large round color="success" v-on:click.native="Next">Далі</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
	import axios from 'axios'
	export default {
		name: "newEvent",
		data() {
			return {
				isFormValid: false,
				newUser: false,
				specialization: null,
				specializations: ['Терапевт', 'Педіатр', 'Стоматолог', 'Ендокринолог', 'Офтальмолог'],
				doctor: null,
				doctors: null,
			}
		},
		methods: {
			getDoctors (specialization) {
				axios.get(`/api/user`, {
					params: {
						filter: {
							type: ['doctor'],
							//specialization: [this.specialization],
						},
					},
				}).then((res) => {
					this.doctors = res.data;
				}).catch((err) => {
					console.log(err);
					this.doctors = null;
				});
			},
            Next: function () {
                console.log('next');
			}
		},
		watch: {
			specialization(value, oldValue) {
				this.getDoctors(value);
			}
		}
	}
</script>

<style scoped>

</style>