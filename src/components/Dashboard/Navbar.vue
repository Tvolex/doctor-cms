<template>
    <div v-if="user">
        <v-toolbar dark color="teal lighten-3" >

            <v-toolbar-side-icon @click="statusNavBar = !statusNavBar"></v-toolbar-side-icon>
            <v-divider vertical inset></v-divider>
            <v-toolbar-title>Панель управління</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-divider vertical inset></v-divider>
            <v-btn icon>
                <router-link to="/dashboard/calendar">
                    <v-icon>date_range</v-icon>
                </router-link>
            </v-btn>
            <v-divider vertical inset></v-divider>
            <v-btn icon @click="statusNavBar = !statusNavBar">
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
            <v-navigation-drawer light absolute temporary v-model="statusNavBar">
                <v-list light dense>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img v-if="user.avatar" :src="user.avatar">
                            <img v-else src="@/assets/person.png">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title> {{user.name}} </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile
                            v-for="item in dashboardNavigation()"
                            :key="item.title"
                            v-bind:class="item.route === route ? selectedTab: 'notSelectedTab'"
                            class="pa-2"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon >
                        </v-list-tile-action>

                        <v-list-tile-content >
                            <router-link tag="v-list-tile-title" :to="item.route">
                                {{ item.title }}
                            </router-link>
                        </v-list-tile-content>

                    </v-list-tile>
                    <v-divider></v-divider>
                    <v-list-tile
                            v-for="item in userNavigation"
                            :key="item.title"
                            v-bind:class="item.route === route ? selectedTab: 'notSelectedTab'"
                            class="pa-2"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title v-if="item.title === 'Вихід'" @click="logout">
                                {{ item.title }}
                            </v-list-tile-title>
                            <router-link v-else tag="v-list-tile-title" :to="item.route">
                                {{ item.title }}
                            </router-link>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
            </v-navigation-drawer>
    </div>


</template>

<script>
    export default {
        name: 'Navbar',
        props: {
            user: Object
        },
        data () {
        	return {
				statusNavBar: false,
                userNavigation: [
                    {title: 'Налаштування', icon: 'settings', route: '/dashboard/settings'},
                    {title: 'Вихід', icon: 'exit_to_app', route: '/'},
                ],
                isSelected: false,
                selectedTab: 'selectedTab',
				notSelectedTab: 'notSelectedTab'
            }
        },
        computed: {
			route: function () {
				return this.$route.fullPath;
			}
        },
        methods: {
            logout: function () {
                 this.$store.dispatch({type: "logout"});

				this.$router.push('/');
            },
            dashboardNavigation: function () {
                const navigation = [
                    {title: 'Статистика', icon: 'show_chart',route: '/dashboard'},
                    {title: 'Календар', icon: 'date_range', route: '/dashboard/calendar'},
                    {title: 'Додати нового', icon: 'add', route: '/dashboard/newPatient'},
                ];

                this.user.admin ?
                    navigation.push(...[
                        {title: 'Лікарі', icon: 'people', route: '/dashboard/doctors'},
                        {title: 'Додати спеціалізації', icon: 'insert_drive_file', route: '/dashboard/specialization'},
                    ]) :
                    navigation.push({title: 'Пацієнти', icon: 'people', route: '/dashboard/patients'});

                return navigation;
            }
        },
    }
</script>

<style scoped>
    .selectedTab {
        background: rgba(0,255,0,0.4);
        cursor: pointer;
    }

    .notSelectedTab {
        cursor: pointer;
    }
    .notSelectedTab:hover {
        background: rgba(0,0,0,0.1);
    }
</style>
