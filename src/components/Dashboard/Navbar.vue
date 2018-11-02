<template>
    <div>
        <v-toolbar dark color="teal lighten-3" >

            <v-toolbar-side-icon @click="statusNavBar = !statusNavBar"></v-toolbar-side-icon>

            <v-toolbar-title class="white--text">Dashboard</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
                <router-link to="/dashboard">
                    <v-icon>date_range</v-icon>
                </router-link>
            </v-btn>


            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer absolute temporary v-model="statusNavBar">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://lh3.googleusercontent.com/Uay9SaAfrGoP-tfXGilVbmfKx8q_Mqzn2zMM0CpPst2tgjgBuFzPTrSr5eYZpyFhxDREHKQpGFgeMXfTxO8=w1202-h1262">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title> {{user.name}} </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click=""
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                        <v-list-tile-content>
                            <router-link tag="v-list-tile-title" :to="item.route">
                                {{ item.title }}
                            </router-link>
                        </v-list-tile-content>

                </v-list-tile>
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
				items: [
					{title: 'Календар', icon: 'date_range', route: '/dashboard'},
					{title: 'Статистика', icon: 'show_chart', route: '/dashboard/statistics'},
					{title: 'Менеджмент', icon: 'people', route: '/dashboard/management'},
					{title: 'Налаштування', icon: 'settings', route: '/dashboard/'},
					{title: 'Новий пацієнт', icon: 'add', route: '/dashboard/newPatient'},
					{title: 'Знайти пацієнта', icon: 'insert_drive_file', route: '/dashboard/'},
				],
            }

        },
    }
</script>
