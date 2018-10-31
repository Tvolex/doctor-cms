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
                <v-icon>date_range</v-icon>
            </v-btn>


            <v-btn icon>
                <v-icon>more_vert</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer permanent>
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/85.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title> user name</v-list-tile-title>
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
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
        data: () => ({

            statusNavBar: false,
            items: [
                {title: 'Management', icon: 'people_outline'},
                {title: 'Settings', icon: 'settings'},
                {title: 'Новий пацієнт', icon: 'add'},
                {title: 'Знайти пацієнта', icon: 'insert_drive_file'},
            ],
        })
    }
</script>