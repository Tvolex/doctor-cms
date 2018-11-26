<template>
    <div>
        <div v-if="detectIsMobile() && patients">
            <v-layout row align-center justify-center class="text-xs-center mx-3">
                <v-flex xs12 sm6 md4>
                    <v-text-field
                            v-model="search"
                            label="Пошук"
                            name="search"
                            @change="Search"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 v-if="!selectedPatient">
                    <v-scroll-x-transition mode="out-in">
                        <div key="transition1">
                            <v-card class="mx-3" v-if="patients.withEvents.length">
                                <v-list subheader>
                                    <v-subheader>Записані пацієнти</v-subheader>
                                    <v-list-tile
                                            v-for="patient in patients.withEvents"
                                            :key="patient._id"
                                            @click="getEventsByPatient(patient._id)"
                                    >
                                        <v-list-tile-avatar>
                                            <img v-if="patient.avatar" :src="patient.avatar">
                                            <img v-else src="@/assets/person.png" alt="">
                                        </v-list-tile-avatar>

                                        <v-layout align-center justify-center row wrap>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                                <v-divider></v-divider>
                            </v-card>
                            <v-card class="ma-3" v-if="patients.withoutEvents.length">
                                <v-list subheader>
                                    <v-subheader>Не записані пацієнти</v-subheader>
                                    <v-list-tile
                                            v-for="patient in patients.withoutEvents"
                                            :key="patient._id"
                                            @click="getEventsByPatient(patient._id)"
                                    >
                                        <v-list-tile-avatar>
                                            <img v-if="patient.avatar" :src="patient.avatar">
                                            <img v-else src="@/assets/person.png" alt="">
                                        </v-list-tile-avatar>

                                        <v-layout align-center justify-center row wrap>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                            <v-flex xs12 sm6 lm5 md6>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-flex>
                                        </v-layout>
                                    </v-list-tile>
                                </v-list>
                                <v-divider></v-divider>
                            </v-card>
                        </div>
                    </v-scroll-x-transition>
                </v-flex>
                <v-flex xs12 v-if="selectedPatient">
                    <v-scroll-x-reverse-transition mode="out-in">
                        <div :key="`transition2_${selectedPatient._id}`">
                            <v-card class="mx-3 mt-3"
                                    :key="selectedPatient._id"
                                    color="#fffacd"
                            >
                                <v-btn class="green--text darken-1" flat @click="editMode = !editMode">{{ editMode ? 'Закрити' : 'Редагувати' }}</v-btn>
                                <v-btn class="red--text darken-1" flat v-if="!editMode" @click="selectedPatient = null">Закрити</v-btn>
                                <v-divider></v-divider>
                                <v-card-text v-if="!editMode">
                                    <v-avatar
                                            size="88"
                                    >
                                        <img v-if="selectedPatient.avatar" :src="selectedPatient.avatar">
                                        <img v-else src="@/assets/person.png">
                                    </v-avatar>
                                    <h3 class="headline mb-2">
                                        {{ selectedPatient.name }}
                                    </h3>
                                    <div class="blue--text mb-2">{{ selectedPatient.email }}</div>
                                    <div class="blue--text subheading font-weight-bold">{{ selectedPatient.fullName }}</div>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-layout
                                        tag="v-card-text"
                                        v-if="!editMode"
                                        text-md-center
                                        wrap
                                >
                                    <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{
                                    selectedPatient.birthdate }}</v-flex>
                                    <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                    selectedPatient.passportSeries }}</v-flex>
                                    <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                    selectedPatient.passportNumber }}</v-flex>
                                </v-layout>
                                <v-card-text v-if="editMode" class=" font-weight-thin font-italic">
                                    <v-form v-model="isFormValid" ref="patientEditForm" name="patientEditForm" :lazy-validation="false">
                                        <v-layout row wrap justify-center align-start>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        :value="selectedPatient.email"
                                                        disabled
                                                        height="20px"
                                                        append-outer-icon="lock"
                                                        label="E-mail"
                                                        name="email"
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="name"
                                                        :rules="nameRules"
                                                        height="20px"
                                                        label="Ім`я"
                                                        name="name"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="surname"
                                                        :rules="surnameRules"
                                                        label="Прізвище"
                                                        height="20px"
                                                        name="surname"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="patronymic"
                                                        :rules="patronymicRules"
                                                        height="20px"
                                                        label="По батькові"
                                                        name="patronymic"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-menu
                                                        ref="menu"
                                                        :close-on-content-click="false"
                                                        v-model="menu"
                                                        :nudge-right="40"
                                                        lazy
                                                        transition="scale-transition"
                                                        offset-y
                                                        full-width
                                                        min-width="290px"
                                                >
                                                    <v-text-field
                                                            slot="activator"
                                                            v-model="birthdate"
                                                            height="20px"
                                                            label="Birthday date"
                                                            readonly
                                                    ></v-text-field>
                                                    <v-date-picker
                                                            ref="picker"
                                                            v-model="birthdate"
                                                            :max="new Date().toISOString().substr(0, 10)"
                                                            min="1900-01-01"
                                                    ></v-date-picker>
                                                </v-menu>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="city"
                                                        :rules="cityRules"
                                                        height="20px"
                                                        label="Місто"
                                                        name="city"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="street"
                                                        :rules="streetRules"
                                                        height="20px"
                                                        label="Вулиця"
                                                        name="street"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="house"
                                                        :rules="houseRules"
                                                        height="20px"
                                                        label="Номер будинку"
                                                        name="house"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="apartment"
                                                        height="20px"
                                                        label="Номер квартири"
                                                        name="apartment"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="passportSeries"
                                                        :rules="passportSeriesRules"
                                                        height="20px"
                                                        label="Серія паспорта"
                                                        max="3"
                                                        name="passportSeries"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 md8>
                                                <v-text-field
                                                        v-model="passportNumber"
                                                        :rules="passportNumberRules"
                                                        height="20px"
                                                        label="Номер паспорта"
                                                        name="passportNumber"
                                                        min="5"
                                                        required
                                                ></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 align-center>
                                                <v-btn flat>
                                                    <input type="file" @change="onFileChanged">
                                                </v-btn>
                                            </v-flex>
                                            <v-flex class="xs12">
                                                <v-divider></v-divider>
                                            </v-flex>
                                            <v-flex class="xs12">
                                                <v-btn large round color="success"
                                                       :loading="loading"
                                                       :disabled="!wasChanges || !isFormValid || loading"
                                                       @click="Save">
                                                    Зберегти
                                                    <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-form>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-toolbar v-if="!editMode" height="10px" tabs>
                                    <v-tabs
                                            slot="extension"
                                            v-model="TAB"
                                            fixed-tabs
                                            color="transparent"
                                    >
                                        <v-tabs-slider></v-tabs-slider>
                                        <v-tab v-for="tab of tabs"
                                               :href="`#${tab.value}`" class="primary--text"
                                               :value="1"
                                               :key="tab.id">
                                            <v-icon>{{tab.icon}}</v-icon>
                                        </v-tab>
                                    </v-tabs>
                                </v-toolbar>
                                <v-tabs-items v-if="!editMode" class="white elevation-1">
                                    <v-tab-item value="patient-tabs">
                                        <v-card v-if="TAB === 'events'">
                                            <v-list subheader>
                                                <v-subheader>Записи</v-subheader>
                                                <v-list-tile
                                                        v-for="event in selectedPatient.events"
                                                        :key="event._id"
                                                        @click="selectedEvent = event"
                                                >
                                                    <v-layout align-center justify-space-around row wrap>
                                                        <v-flex xs6 >
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                        <v-flex xs6>
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                        <v-card v-if="TAB === 'history'">
                                            <v-list subheader >
                                                <v-subheader>Історія</v-subheader>
                                                <v-divider></v-divider>
                                                <v-list-tile
                                                        v-for="event in selectedPatient.events"
                                                        :key="event._id"
                                                        avatar
                                                        @click=""
                                                >
                                                    <v-layout align-center justify-center row wrap>
                                                        <v-flex xs6 sm3 md3 lg3 >
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="event.specialization"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                        <v-flex xs6 sm4 md4 lg3 >
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                        <v-flex xs4 sm3 md3 lg3 >
                                                            <v-list-tile-content>
                                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                        <v-card v-if="TAB === 'comment'">
                                            <v-list subheader >
                                                <v-subheader>Коментарі</v-subheader>
                                                <v-divider></v-divider>
                                                <v-list-tile @click="">
                                                    <v-layout align-center justify-center row wrap>
                                                        <v-flex xs6 sm3 md3 lg3 >
                                                            <v-list-tile-content>
                                                                <v-list-tile-title>comments</v-list-tile-title>
                                                            </v-list-tile-content>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-list-tile>
                                            </v-list>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs-items>

                            </v-card>
                            <v-card class="mx-3 mt-3" v-if="!editMode" >
                                <v-list>
                                    <v-list-tile @click="AddNewEvent">
                                        <v-list-tile-action>
                                            <v-icon color="green">add</v-icon>
                                        </v-list-tile-action>
                                        <v-list-tile-title>Додати новий запис</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </div>
                    </v-scroll-x-reverse-transition>
                </v-flex>
            </v-layout>
            <v-dialog
                    v-if="selectedPatient && selectedEvent"
                    v-model="eventDetailsDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Деталі</v-card-title>

                    <v-card-text>
                        До: {{selectedEvent.specialization}}
                    </v-card-text>
                    <v-card-text>
                        Пацієнт: {{selectedPatient.fullName}}
                    </v-card-text>
                    <v-card-text>
                        Дата: {{selectedEvent.fullDate.replace(':', " година: ")}}
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                                v-for="(item, i) in eventActions"
                                :key="i"
                                flat="flat"
                                :color="item.color"
                                @click="item.method(selectedEvent._id)"
                        >
                            {{item.title}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div v-if="!detectIsMobile() && patients" >
            <v-layout row align-center justify-center class="text-xs-center mx-3">
                <v-flex xs12 sm6 md4>
                    <v-text-field
                            v-model="search"
                            label="Пошук"
                            name="search"
                            @change="Search"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 md6 lg5>
                    <v-card class="mx-3" v-if="patients.withEvents.length">
                        <v-list subheader>
                            <v-subheader>Записані пацієнти</v-subheader>
                            <v-list-tile
                                    v-for="patient in patients.withEvents"
                                    :key="patient._id"
                                    avatar
                                    @click="getEventsByPatient(patient._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="patient.avatar" :src="patient.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                    <v-card key="transition6" class="mx-3 mt-3" v-if="patients.withoutEvents.length">
                        <v-list subheader>
                            <v-subheader>Не записані пацієнти</v-subheader>
                            <v-list-tile
                                    v-for="patient in patients.withoutEvents"
                                    :key="patient._id"
                                    avatar
                                    @click="getEventsByPatient(patient._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="patient.avatar" :src="patient.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-center row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="patient.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6 lg7 v-if="selectedPatient">
                    <v-scroll-y-reverse-transition mode="out-in">
                        <v-card
                                :key="`transition3_${selectedPatient._id}`"
                                class="mx-3"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="editMode = !editMode">{{ editMode ? 'Закрити' : 'Редагувати' }}</v-btn>
                            <v-btn class="red--text darken-1" flat v-if="!editMode" @click="selectedPatient = null">Закрити</v-btn>
                            <v-divider></v-divider>
                            <v-card-text v-if="!editMode">
                                <v-avatar size="125">
                                    <img v-if="selectedPatient.avatar" :src="selectedPatient.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedPatient.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedPatient.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedPatient.fullName }}</div>
                            </v-card-text>
                            <v-card-text v-if="editMode" class=" font-weight-thin font-italic">
                                <v-form v-model="isFormValid" ref="patientEditForm" name="patientEditForm" :lazy-validation="false">
                                    <v-layout row wrap justify-center align-start>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    :value="selectedPatient.email"
                                                    disabled
                                                    height="20px"
                                                    append-outer-icon="lock"
                                                    label="E-mail"
                                                    name="email"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="name"
                                                    :rules="nameRules"
                                                    height="20px"
                                                    label="Ім`я"
                                                    name="name"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="surname"
                                                    :rules="surnameRules"
                                                    label="Прізвище"
                                                    height="20px"
                                                    name="surname"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="patronymic"
                                                    :rules="patronymicRules"
                                                    height="20px"
                                                    label="По батькові"
                                                    name="patronymic"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-menu
                                                    ref="menu"
                                                    :close-on-content-click="false"
                                                    v-model="menu"
                                                    :nudge-right="40"
                                                    lazy
                                                    transition="scale-transition"
                                                    offset-y
                                                    full-width
                                                    min-width="290px"
                                            >
                                                <v-text-field
                                                        slot="activator"
                                                        v-model="birthdate"
                                                        height="20px"
                                                        label="Birthday date"
                                                        readonly
                                                ></v-text-field>
                                                <v-date-picker
                                                        ref="picker"
                                                        v-model="birthdate"
                                                        :max="new Date().toISOString().substr(0, 10)"
                                                        min="1900-01-01"
                                                ></v-date-picker>
                                            </v-menu>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="city"
                                                    :rules="cityRules"
                                                    height="20px"
                                                    label="Місто"
                                                    name="city"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="street"
                                                    :rules="streetRules"
                                                    height="20px"
                                                    label="Вулиця"
                                                    name="street"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="house"
                                                    :rules="houseRules"
                                                    height="20px"
                                                    label="Номер будинку"
                                                    name="house"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="apartment"
                                                    height="20px"
                                                    label="Номер квартири"
                                                    name="apartment"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="passportSeries"
                                                    :rules="passportSeriesRules"
                                                    height="20px"
                                                    label="Серія паспорта"
                                                    max="3"
                                                    name="passportSeries"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="passportNumber"
                                                    :rules="passportNumberRules"
                                                    height="20px"
                                                    label="Номер паспорта"
                                                    name="passportNumber"
                                                    min="5"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 align-center>
                                            <v-btn flat>
                                                <input type="file" @change="onFileChanged">
                                            </v-btn>
                                        </v-flex>
                                        <v-flex class="xs12">
                                            <v-divider></v-divider>
                                        </v-flex>
                                        <v-flex class="xs12">
                                            <v-btn large round color="success"
                                                   :loading="loading"
                                                   :disabled="!wasChanges || !isFormValid || loading"
                                                   @click="Save">
                                                Зберегти
                                                <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-form>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-layout
                                    tag="v-card-text"
                                    v-if="!editMode"
                                    text-md-center
                                    wrap
                            >
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex><v-flex xs6>{{
                                selectedPatient.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                selectedPatient.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                selectedPatient.passportNumber }}</v-flex>

                            </v-layout>
                            <v-toolbar v-if="!editMode" height="10px" tabs>
                                <v-tabs
                                        slot="extension"
                                        v-model="TAB"
                                        fixed-tabs
                                        color="transparent"
                                >
                                    <v-tabs-slider></v-tabs-slider>
                                    <v-tab v-for="tab of tabs"
                                           :href="`#${tab.value}`" class="primary--text"
                                           :value="1"
                                           :key="tab.id">
                                        <v-icon>{{tab.icon}}</v-icon>
                                    </v-tab>
                                </v-tabs>
                            </v-toolbar>

                            <v-tabs-items v-if="!editMode" class="white elevation-1">
                                <v-tab-item value="patient-tabs">
                                    <v-card v-if="TAB === 'events'">
                                        <v-list subheader >
                                            <v-subheader>Записи до лікаря</v-subheader>
                                            <v-divider></v-divider>
                                            <v-list-tile
                                                    v-for="event in selectedPatient.events"
                                                    :key="event._id"
                                                    avatar
                                                    @click=""
                                            >
                                                <v-layout align-center justify-center row wrap>
                                                    <v-flex xs6 sm3 md3 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.specialization"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                    <v-flex xs6 sm4 md4 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                    <v-flex xs4 sm3 md3 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                    <v-flex xs2 sm2 md2>
                                                        <v-list-tile-content>
                                                            <v-menu>
                                                                <v-btn
                                                                        slot="activator"
                                                                        light
                                                                        icon
                                                                >
                                                                    <v-icon>more_vert</v-icon>
                                                                </v-btn>

                                                                <v-list>
                                                                    <v-list-tile
                                                                            v-for="(item, i) in eventActions"
                                                                            :key="i"
                                                                            @click="item.method(event._id)"
                                                                    >
                                                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                                                    </v-list-tile>
                                                                </v-list>
                                                            </v-menu>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile>
                                            <v-divider></v-divider>
                                            <v-list-tile @click="AddNewEvent" v-if="!editMode" >
                                                <v-list-tile-action>
                                                    <v-icon color="green">add</v-icon>
                                                </v-list-tile-action>
                                                <v-list-tile-title>Додати новий запис</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                    <v-card v-if="TAB === 'history'">
                                        <v-list subheader >
                                            <v-subheader>Історія</v-subheader>
                                            <v-divider></v-divider>
                                            <v-list-tile
                                                    v-for="event in selectedPatient.events"
                                                    :key="event._id"
                                                    avatar
                                                    @click=""
                                            >
                                                <v-layout align-center justify-center row wrap>
                                                    <v-flex xs6 sm3 md3 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.specialization"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                    <v-flex xs6 sm4 md4 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                    <v-flex xs4 sm3 md3 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                    <v-card v-if="TAB === 'comment'">
                                        <v-list subheader >
                                            <v-subheader>Коментарі</v-subheader>
                                            <v-divider></v-divider>
                                            <v-list-tile @click="">
                                                <v-layout align-center justify-center row wrap>
                                                    <v-flex xs6 sm3 md3 lg3 >
                                                        <v-list-tile-content>
                                                            <v-list-tile-title>comments</v-list-tile-title>
                                                        </v-list-tile-content>
                                                    </v-flex>
                                                </v-layout>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-card>
                    </v-scroll-y-reverse-transition>
                </v-flex>
            </v-layout>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import axios from 'axios';
    import { EVENT_STATUS } from '../../const';

	export default {
		name: "Patients",
		props: {
			user: Object
		},
        beforeCreate() {
			this.$store.dispatch({type: "patients"}).then((patients) => {
				if (_.isEmpty(patients)) {
					this.$notificator('warning', 'Ви немаєте жодного пацієнта!')
                }
            })
        },
        mounted() {
			if (this.$store.getters.selectedPatient) {
				this.selectedPatient = this.getEventsByPatient(this.$store.getters.selectedPatient._id);
			}
        },
		data () {
			return {
                TAB: null,
                menu: null,
                search: null,
				loading: false,
				wasChanges: false,
				isFormValid: false,
				selectedEvent: null,
				selectedPatient: null,
                eventDetailsDialog: false,

				email: null,
				name: null,
				avatar: null,
				surname: null,
				patronymic: null,
				birthdate: null,
				city: null,
				street:  null,
				house:  null,
				apartment: null,
				passportSeries: null,
				passportNumber: null,

				emailRules: [
					v => !!v || 'E-mail обов`язковий!',
					v => /.+@.+/.test(v) || 'E-mail повинен бути валідним!'
				],
				nameRules: [v => !!v || 'Імя обов`язкове!'],
				surnameRules: [v => !!v || 'Прізвище обов`язкове!'],
				patronymicRules: [v => !!v || 'По батькові обов`язкове!'],
				birthdateRules: [v => !!v || 'Дата народження обов`язкова!' ],
				cityRules: [v => !!v || 'Місто обов`язкове!'],
				streetRules: [v => !!v || 'Вулиця обов`язкова!'],
				houseRules: [
					v => !!v || 'Будинок обов`язкови!',
					v => _.isInteger(parseInt(v)) || 'Номер будинка позначається числом!'
				],
				passportSeriesRules: [v => !!v || 'Серія паспорта обов`язкова!'],
				passportNumberRules: [
					v => !!v || 'Номер паспорта обов`язковий!',
					v =>  _.isInteger(parseInt(v)) || 'Номер паспорта складається з цифр!'
				],

				editMode: false,
                tabs: [
                    { title: 'Записи до лікаря', icon: 'event_note', value: 'events', id: 1},
                    { title: 'Історія', icon: 'history', value: 'history', id: 2},
                    { title: 'Коментарі', icon: 'comments', value: 'comment', id: 3},
                ],
				eventActions: [
					{ title: 'Завершити', color: "green darken-1", method: (_id, option) => this.changeEventStatus(_id, EVENT_STATUS.PASSED)},
					{ title: 'Відмінити', color: "red darken-1", method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.REJECTED) },
				]
			}
		},
        methods: {
            AddNewEvent() {
                if (this.selectedPatient) {
                    this.$store.commit('selectedPatient', {type: 'selectedPatient', value: this.selectedPatient});
                    this.$router.push('/');
                }
            },
			getEventsByPatient(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
						this.selectedPatient = res.data;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    this.selectedPatient = null;
                    console.log(err);
                    let message = err.message || 'Щось сталось не так :(';
                    if (err.response && err.response.data && err.response.data.message) {
                        message = err.response.data.message;
                    }
                    this.$notificator('error', message);
                });
            },
            changeEventStatus(_id, status) {
                axios.put(`/api/event/status/${_id}`, {
                    status
                })
                    .then((res) => {
                        this.loading = false;
                        this.$notificator(res.data.type, res.data.message);
                    })
                    .catch((err) => {
                        this.loading = false;
                        console.log(err);
                        let message = err.message || 'Щось сталось не так :(';
                        if (err.response && err.response.data && err.response.data.message) {
                            message = err.response.data.message;
                        }
                        this.$notificator('error', message);
                }).finally(() => {
                    this.$store.dispatch({type: "patients"}).then(patients => {
                        const patient = patients.withEvents.find(patient => _.isEqual(this.selectedPatient._id, patient._id));
                        this.selectedPatient = patient ? this.getEventsByPatient(patient._id): null;
                        this.eventDetailsDialog = false;
                        this.selectedEvent = null;
                    });
                })
            },
			Search() {
				this.$store.dispatch({type: "patients", search: this.search } ).then((patients) => {
					if (_.isEmpty(patients)) {
						this.$notificator('warning', 'Ви немаєте жодного пацієнта!')
					}
				})
			},

			Save() {
				if (this.wasChanges && this.selectedPatient && this.selectedPatient._id) {
					this.uploadImage();

					axios.put(`/api/user/${this.selectedPatient._id}`, {
						name: this.name,
						avatar: this.avatar,
						surname: this.surname,
						patronymic: this.patronymic,
						birthdate: this.birthdate,
						city: this.city,
						street: this.street,
						house: this.house,
						apartment: this.apartment,
						passportSeries: this.passportSeries,
						passportNumber: this.passportNumber,
					}).then(res => {
						console.log(res.data);
						this.$notificator(res.data.type, res.data.message);
						this.selectedPatient = res.data.value;
						this.editMode = false;
					}).catch(err => {
						console.log(err);
						this.$notificator('error', err.message)
					}).finally(() => {
						this.Search();
						this.getEventsByPatient(this.selectedPatient._id)
                    })
				}
			},

			onFileChanged (event) {
				this.selectedFile = event.target.files[0];
				this.uploadImage()
			},

			uploadImage() {
				if (this.selectedFile) {
					const formData = new FormData();
					formData.append('image', this.selectedFile, this.selectedFile.name);
					console.log(formData);
					axios.post('/api/upload', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}).then(res => {
						console.log(res.data._id);
						this.avatar = res.data._id;
					}).catch(err => {
						console.log(err);
					})
				}
			},
        },
        computed: {
			auth() {
                return this.$store.getters.user;
			},
		    patients() {
				return this.$store.getters.patients;
            },

        },
        watch: {
		    selectedEvent (val, oldVal) {
		        if (!!val)
		            this.eventDetailsDialog = true
            },
			selectedPatient(patient) {
				if (patient) {
					this.email = patient.email;
					this.name = patient.name;
					this.surname = patient.surname;
					this.patronymic = patient.patronymic;
					this.birthdate = patient.birthdate;
					this.city = patient.city;
					this.street = patient.street;
					this.house = patient.house;
					this.apartment = patient.apartment;
					this.passportSeries = patient.passportSeries;
					this.passportNumber = patient.passportNumber;
                }
            },
			name(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			surname(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			patronymic(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			birthdate(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			city(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			street(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			house(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			apartment(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			passportSeries(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			passportNumber(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
        }
	}
</script>

<style >
    .eventsList {
        background-color: #59fb6075;
    }
</style>
