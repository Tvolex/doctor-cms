<template>
    <main >
        <v-container fluid>
            <v-layout align-center justify-center row wrap main-items>
                <v-flex xs12>
                    Оберіть період дати
                </v-flex>
                <v-flex xs12 sm10 md6 lg4>
                    <v-layout align-center justify-center row wrap main-items >
                        <v-flex xs4 sm1 md1>
                            З
                        </v-flex>
                        <v-flex xs8 sm4 md4>
                            <datepicker v-model="dateFrom"></datepicker>
                        </v-flex>
                        <v-flex xs4 sm1 md1>
                            По
                        </v-flex>
                        <v-flex xs8 sm4 md4>
                            <datepicker v-model="dateTo"></datepicker>
                        </v-flex>
                        <v-flex  xs12 sm2 md2>
                            <v-btn
                                    small
                                    color="success"
                                    :loading="buttonLoader"
                                    :disabled="buttonLoader"
                                    @click.native="getStatistics">
                                Обновити
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-layout align-start justify-space-around row wrap main-items>
                <v-flex xs12 md5 offset-md1>
                    <line-chart :data="statistics.lineChartData" :dataset="{borderWidth: 5}"></line-chart>
                </v-flex>
                <v-flex xs12 md6>
                    <pie-chart :donut="true" :colors="['#FEC5E5', '#D0F0C0']" :data="statistics.pieChartData"></pie-chart>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>

<script>
	import axios from "axios";
	import datepicker from 'vue-date'
    import moment from 'moment'
    export default {
        name: "Statistics",
		props: {
			user: Object
		},
		components: { datepicker },
		data () {
			return {
				buttonLoader: null,
				loading: false,
				dateFrom: moment().format("YYYY-MM-DD"),
				dateTo: moment().format("YYYY-MM-DD"),
				statistics: {
					pieChartData: {'Обстежено': 22, 'Записано на обстеження': 44},
					lineChartData: [
						{name: 'Кількість пацієнтів', data: {'2018-11-01': 5, '2018-11-02': 4, '2018-11-03': 5, '2018-11-04': 7, '2018-11-05': 3, '2018-11-06': 6,}},
					],
                },


			}
		},
		methods: {
            getStatistics: async function () {
				this.buttonLoader = true;
				let res;

				try {
					res = await axios.get(`/api/getStatistics`);
				} catch (err) {
					console.log(err);
					let message = 'Щось сталось не так :(';
					if (err.response && err.response.data && err.response.data.message) {
						message = err.response.data.message;
					}
					return this.$notificator('error', message);
				}

				this.statistics = res.data;

				this.buttonLoader = false;
			},
		},

    }

</script>

<style scoped>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
