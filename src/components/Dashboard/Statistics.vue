<template>
    <main >
        <v-container fluid>
            <v-layout align-start justify-space-around row wrap main-items>
                <v-flex xs12 md5 offset-md1>
                    <line-chart :data="lineChartData" :dataset="{borderWidth: 5}"></line-chart>
                </v-flex>
                <v-flex xs12 md6>
                    <pie-chart :donut="true" :colors="['#FEC5E5', '#D0F0C0']" :data="pieChartData"></pie-chart>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>



<script>
    export default {
        name: "Statistics",
		props: {
			user: Object
		},
		data () {
			return {
				pieChartData: {'Обстежено': 22, 'Записано на обстеження': 44},
                lineChartData: [
					{name: 'Кількість пацієнтів', data: {'2018-11-01': 5, '2018-11-02': 4, '2018-11-03': 5, '2018-11-04': 7, '2018-11-05': 3, '2018-11-06': 6,}},
				]
			}
		},
    }
</script>

<style scoped>

</style>
