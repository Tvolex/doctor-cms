<template>
    <v-container fluid>
        <v-layout row wrap main-items>
            <v-flex xs12 md8 offset-md2 lg6 offset-lg3>
                <full-calendar :events="events" listWeek
                               @event-selected="eventSelected"
                               @event-created="eventCreated"
                               @event-drop="eventDrop"
                               @event-resize="eventResize"
                               ref="calendar"></full-calendar>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    export default {
        name: "calendar",
        data() {
            return {
                events: [
                    {
                        title  : 'event1',
                        start  : '2018-10-31T12:30:00',
                        end  : '2018-10-31T13:30:00',
                        color: 'pink',
                        textColor: 'black',
                    },
                    {
                        title  : 'event2',
                        start  : '2018-11-1T14:00:00',
                        end  : '2018-11-1T15:00:00',
                    },
                    {
                        title  : 'event3',
                        start  : '2018-10-31T11:00:00',
                        allDay : true,
                    },
                ]
            }
        },

        methods: {
            eventSelected: function (event) {
                console.log(event);
                event.title = "eventSelected";
            },
            eventCreated: function (event) {
                console.log(event);
                event.title = "eventCreated";
            },
            eventDrop: function (event) {
                console.log(event);
                event.title = "eventDrop";
            },
            eventResize: function (event) {
                console.log(event);
                event.title = "eventResize";
            },

        }
    }
</script>

<style scoped>

</style>
