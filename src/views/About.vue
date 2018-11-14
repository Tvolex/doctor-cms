<template>
    <div class="About">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/login">Login</router-link>
        </div>
        <img alt="Logo" width="250px" height="250px" src="@/assets/icon_clinical_research.png">
        <h1>About medical center</h1>
    </div>
</template>

<style scoped>
    .About {
        background: transparent url("../assets/background.jpeg") !important;
        height: 100%;
    }
</style>
