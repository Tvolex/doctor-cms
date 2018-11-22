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
                    <pie-chart :donut="true" :colors="colors" :data="statistics.pieChartData"></pie-chart>
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
        mounted() {
			this.getStatistics();
        },
		data () {
			return {
			    colors: ['#FEC5E5', '#D0F0C0', '#D1C4E9', '#C5CAE9', '#F0F4C3'],
                buttonLoader: null,
				loading: false,
				dateFrom: moment().startOf('month').format("YYYY-MM-DD"),
				dateTo: moment().endOf('month').format("YYYY-MM-DD"),
                statistics: {
					pieChartData: {'Обстежено': 0, 'Записано на обстеження': 0},
					lineChartData: [
						{name: 'Кількість пацієнтів', data: {}},
					],
                }
			}
		},
		methods: {
            getStatistics: function () {
				this.buttonLoader = true;

				axios.get(`/api/user/getStatistics`, {
				    params: {
				        filter: {
                            type: ['patient'],
				            fromDate:this.dateFrom,
                            toDate: this.dateTo,
				        },
                    }
                }).then(({ data } = res) => {
					this.statistics = data.statistics;
                }).catch((err) => {
					console.log(err);
					let message = 'Щось сталось не так :(';
					if (err.response && err.response.data && err.response.data.message) {
						message = err.response.data.message;
					}
					return this.$notificator('error', message);
                }).finally(() => this.buttonLoader = false);

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
