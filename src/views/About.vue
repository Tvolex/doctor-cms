<template>
    <div class="About">
        <div id="nav">
            <router-link to="/">Головна</router-link> |
            <router-link to="/about">Про медични центр</router-link> |
            <router-link to="/login">Вхід</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <v-layout row wrap justify-center>
            <v-flex xs12 md6>
                <h1>Про медичний центр</h1>
                <h4>Найкращий медичний центр.</h4>
                <h4>Дає змогу <b>пацієнтам</b> записуватись до лікарів онлайн за допомогою персонального ключа.</h4>
                <h4>Також дає змогу <b>лікарям</b> вести облік пацієнтів, дивитись статистику успішності, та історію пацієнта.</h4>
                <h4><b>Адміністраторам</b> - глобальну статистику по успішності кожного з лікаря.</h4>
            </v-flex>
        </v-layout>
    </div>
</template>

<style scoped>
    .About {
        background: transparent url("../assets/background.jpeg") !important;
        height: 100%;
    }
</style>
