<template>
    <div>
        <div v-if="detectIsMobile()">
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
                <v-flex xs12  v-if="!selectedDoctor">
                    <v-scroll-x-transition mode="out-in">
                        <v-card class="ma-3">
                            <v-list subheader>
                                <v-subheader>Лікарі</v-subheader>
                                <v-list-tile
                                        v-for="doctor in doctors"
                                        :key="doctor._id"
                                        @click="getEventsByDoctor(doctor._id)"
                                >
                                    <v-list-tile-avatar>
                                        <img v-if="doctor.avatar" :src="doctor.avatar">
                                        <img v-else src="@/assets/person.png" alt="">
                                    </v-list-tile-avatar>

                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="doctor.fullName"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs12 sm6 lm5 md6>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="doctor.email"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile>
                            </v-list>
                            <v-divider></v-divider>
                        </v-card>
                    </v-scroll-x-transition>

                </v-flex>
                <v-flex xs12 v-if="selectedDoctor">
                    <v-scroll-x-reverse-transition mode="out-in">
                        <v-card class="ma-3"
                                :key="selectedDoctor._id"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="editMode = !editMode">{{ editMode ? 'Закрити' : 'Редагувати' }}</v-btn>
                            <v-btn class="red--text darken-1" flat v-if="!editMode" @click="selectedDoctor = null">Закрити</v-btn>
                            <v-divider></v-divider>
                            <v-card-text v-if="!editMode">
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selectedDoctor.avatar" :src="selectedDoctor.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedDoctor.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedDoctor.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedDoctor.fullName }}</div>
                            </v-card-text>
                            <v-card-text v-if="editMode" class=" font-weight-thin font-italic">
                                <v-form v-model="isFormValid" ref="doctorEditForm" name="doctorEditForm" :lazy-validation="false">
                                    <v-layout row wrap justify-center align-start>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    :value="selectedDoctor.email"
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
                                                    :value="selectedDoctor.name"
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
                                                        label="Дата народження"
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
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="cabinet"
                                                    :rules="cabinetRules"
                                                    height="20px"
                                                    label="Номер кабінета"
                                                    name="cabinetNumber"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-select
                                                    :items="specializations"
                                                    v-model="specialization"
                                                    item-text="name"
                                                    item-value="_id"
                                                    label="Спеціалізація"
                                                    multiple
                                                    height="20px"
                                                    persistent-hint
                                                    :rules="specializationRules"
                                                    required
                                                    outline
                                            ></v-select>
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
                                selectedDoctor.birthdate }}</v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex><v-flex xs6>{{
                                selectedDoctor.passportSeries }}</v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex><v-flex xs6>{{
                                selectedDoctor.passportNumber }}</v-flex>
                            </v-layout>
                            <v-list subheader v-if="!editMode">
                                <v-subheader>Записи</v-subheader>
                                <v-list-tile
                                        v-for="event in selectedDoctor.events"
                                        :key="event._id"
                                        @click="selectedEvent = event"
                                >
                                    <v-layout align-center justify-space-around row wrap>
                                        <v-flex xs4 md4 offset-md1>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs3 class="hidden-xs-only">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.patientFullName"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs3>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                    </v-layout>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </v-scroll-x-reverse-transition>
                </v-flex>
            </v-layout>
            <v-dialog
                    v-if="selectedDoctor && selectedEvent"
                    v-model="eventDetailsDialog"
                    max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">Деталі</v-card-title>

                    <v-card-text>
                        Пацієнт: {{selectedEvent.patientFullName}}
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
        <div v-if="!detectIsMobile()" >
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
                    <v-card class="ma-3">
                        <v-list subheader>
                            <v-subheader>Лікарі</v-subheader>
                            <v-list-tile
                                    v-for="doctor in doctors"
                                    :key="doctor.fullName"
                                    avatar
                                    @click="getEventsByDoctor(doctor._id)"
                            >
                                <v-list-tile-avatar>
                                    <img v-if="doctor.avatar" :src="doctor.avatar">
                                    <img v-else src="@/assets/person.png" alt="">
                                </v-list-tile-avatar>

                                <v-layout align-center justify-space-between row wrap>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="doctor.fullName"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                    <v-flex xs12 sm6 lm5 md6>
                                        <v-list-tile-content>
                                            <v-list-tile-title  class="forEmail" v-html="doctor.email"></v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-flex>
                                </v-layout>
                            </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6 lg7 v-if="selectedDoctor">
                    <v-scroll-y-reverse-transition mode="out-in">
                        <v-card
                                :key="selectedDoctor._id"
                                class="ma-3"
                                color="#fffacd"
                        >
                            <v-btn class="green--text darken-1" flat @click="editMode = !editMode">{{ editMode ? 'Закрити' : 'Редагувати' }}</v-btn>
                            <v-btn class="red--text darken-1" flat v-if="!editMode" @click="selectedDoctor = null">Закрити</v-btn>
                            <v-divider></v-divider>
                            <v-card-text v-if="!editMode">
                                <v-avatar
                                        size="88"
                                >
                                    <img v-if="selectedDoctor.avatar" :src="selectedDoctor.avatar">
                                    <img v-else src="@/assets/person.png">
                                </v-avatar>
                                <h3 class="headline mb-2">
                                    {{ selectedDoctor.name }}
                                </h3>
                                <div class="blue--text mb-2">{{ selectedDoctor.email }}</div>
                                <div class="blue--text subheading font-weight-bold">{{ selectedDoctor.fullName }}</div>
                            </v-card-text>
                            <v-card-text v-if="editMode" class=" font-weight-thin font-italic">
                                <v-form v-model="isFormValid" ref="doctorEditForm" name="doctorEditForm" :lazy-validation="false">
                                    <v-layout row wrap justify-center align-start>
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    :value="selectedDoctor.email"
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
                                                    :value="selectedDoctor.name"
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
                                                        label="Дата народження"
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
                                        <v-flex xs12 md8>
                                            <v-text-field
                                                    v-model="cabinet"
                                                    :rules="cabinetRules"
                                                    height="20px"
                                                    label="Номер кабінета"
                                                    name="cabinetNumber"
                                                    required
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 md8>
                                            <v-select
                                                    :items="specializations"
                                                    v-model="specialization"
                                                    item-text="name"
                                                    item-value="_id"
                                                    label="Спеціалізація"
                                                    multiple
                                                    height="20px"
                                                    persistent-hint
                                                    :rules="specializationRules"
                                                    required
                                                    outline
                                            ></v-select>
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
                                <v-flex tag="strong" xs6 >Дата народження:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.birthdate }}
                                </v-flex>
                                <v-flex tag="strong" xs6 >Серія паспорта:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.passportSeries }}
                                </v-flex>
                                <v-flex tag="strong" xs6 >Номер паспорта:</v-flex>
                                <v-flex xs6>
                                    {{selectedDoctor.passportNumber }}
                                </v-flex>

                            </v-layout>
                            <v-list subheader v-if="!editMode">
                                <v-subheader>Записи до лікаря:</v-subheader>
                                <v-list-tile
                                        v-for="event in selectedDoctor.events"
                                        :key="event._id"
                                        avatar
                                        @click=""
                                >
                                    <v-layout align-center justify-center row wrap>
                                        <v-flex xs4 md4 lg3 class="test-md-center">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.fullDate.replace(':', ' ')"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs3 lg3 class="test-md-center">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.patientFullName"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs4 md4 lg3 class="test-md-center">
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="event.status"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-flex>
                                        <v-flex xs1 lg3 class="test-md-center">
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
                            </v-list>
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
		name: "Doctors",
        beforeCreate() {
			this.$store.dispatch({type: "doctors"}).then((doctors) => {
				if (_.isEmpty(doctors)) {
					this.$notificator('warning', 'Немає жодного лікаря!')
                }
            });
        },
        beforeMount() {
			this.getSpecialization();
        },
		data () {
			return {
				menu: null,
				search: null,
				loading: false,
				wasChanges: false,
				isFormValid: false,
				selectedEvent: null,
				selectedDoctor: null,
				specializations: null,
				eventDetailsDialog: false,
				eventActions: [
					{ title: 'Завершити', color: "green", method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.PASSED) },
					{ title: 'Відмінити', color: "red", method: (_id) => this.changeEventStatus(_id, EVENT_STATUS.REJECTED) },
				],

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

                cabinet: null,
                specialization: null,

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
					v => !!v || 'Будинок обов`язковий!',
					v => _.isInteger(parseInt(v)) || 'Номер будинка позначається числом!'
				],
				passportSeriesRules: [v => !!v || 'Серія паспорта обов`язкова!'],
				passportNumberRules: [
					v => !!v || 'Номер паспорта обов`язковий!',
					v =>  _.isInteger(parseInt(v)) || 'Номер паспорта складається з цифр!'
				],
				specializationRules: [(v)=> !!v || 'Вибір спеціалізації обов`язковий!'],
				cabinetRules: [
					(v)=> !!v || 'Вибір кабінета обов`язковий!',
					v => !Number.isNaN(parseInt(v)) || 'Must number',
					v => _.inRange(parseInt(v), 0, 999) || 'Must in range [0, 999]',
				],

				editMode: false,
			}
		},
        methods: {
			getSpecialization: function () {
				axios.get(`/api/specialization`).then((res) => {
					this.specializations = res.data;
				}).catch((err) => {
					console.log(err);
					this.specializations = [];
				});
			},
			getEventsByDoctor(_id) {
                axios.get(`/api/user/${_id}`)
                    .then((res) => {
                        this.loading = false;
						this.selectedDoctor = res.data;
                        console.log(res.data);
                    }).catch((err) => {
                    this.loading = false;
                    this.selectedDoctor = null;
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
					this.$store.dispatch({type: "doctors"}).then(doctors => {
						const doctor = doctors.find(doctor => _.isEqual(this.selectedDoctor._id, doctor._id));
						this.selectedDoctor = doctor ? this.getEventsByDoctor(doctor._id): null;
						this.eventDetailsDialog = false;
						this.selectedEvent = null;
					});
				})
			},
			Search() {
				this.$store.dispatch({type: "doctors", search: this.search}).then((doctors) => {
					if (_.isEmpty(doctors)) {
						this.$notificator('warning', 'Немає жодного лікаря!')
					}
				});
			},
			Save() {
				if (this.wasChanges && this.selectedDoctor && this.selectedDoctor._id) {
					this.uploadImage();

					axios.put(`/api/user/${this.selectedDoctor._id}`, {
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
						specialization: this.specialization,
                        cabinet: this.cabinet,
					}).then(res => {
						console.log(res.data);
						this.$notificator(res.data.type, res.data.message);
						this.selectedDoctor = res.data.value;
						this.editMode = false;
					}).catch(err => {
						console.log(err);
						this.$notificator('error', err.message)
					}).finally(() => {
						this.Search();
						this.getEventsByDoctor(this.selectedDoctor._id)
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
            doctors() {
				return this.$store.getters.doctors;
            }

        },
        watch: {
		    selectedEvent (val, oldVal) {
		        if (!!val)
		            this.eventDetailsDialog = true
            },
			selectedDoctor(doctor) {
		    	if (doctor) {
					this.email = doctor.email;
					this.name = doctor.name;
					this.surname = doctor.surname;
					this.patronymic = doctor.patronymic;
					this.birthdate = doctor.birthdate;
					this.city = doctor.city;
					this.street = doctor.street;
					this.house = doctor.house;
					this.apartment = doctor.apartment;
					this.passportSeries = doctor.passportSeries;
					this.passportNumber = doctor.passportNumber;
					this.specialization = doctor.specialization;
					this.cabinet = doctor.cabinet;
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
			cabinet(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
			specialization(value, oldValue) {
				if (value) {
					this.wasChanges = true;
				}
			},
        }
	}
</script>

<style >
    .forEmail {
        text-align: center
    }
    .eventsList {
        background-color: #59fb6075;
    }
</style>
