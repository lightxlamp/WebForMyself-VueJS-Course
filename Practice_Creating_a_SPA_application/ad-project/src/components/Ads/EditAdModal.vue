<template>
    <div>
        <v-btn class="primary mr-2" @click="dialog = true">Редактировать</v-btn>

        <v-dialog v-model="dialog" persistent max-width="400">
            <v-card>
                <v-container>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-title>
                                <h3 class="text--primary">Редактировать объявление</h3>
                            </v-card-title>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider>

                    <v-layout row>
                        <v-flex xs12>
                            <v-card-text>
                                <v-text-field
                                    label="Заголовок"
                                    name="title"
                                    type="text"
                                    v-model="editedTitle"
                                />
                                <v-textarea
                                    label="Описание"
                                    name="description"
                                    type="text"
                                    v-model="editedDescription"
                                />
                            </v-card-text>
                        </v-flex>
                    </v-layout>

                    <v-divider></v-divider>

                    <v-layout row>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="success" @click="onMySave">Сохранить</v-btn>
                                <v-btn text @click="onMyCancel">Отмена</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: ['ad'],

        data () {
            return {
                dialog: false,
                editedDescription: this.ad.description,
                editedTitle: this.ad.title
            }
        },
        methods: {
            onMyCancel(){
                this.editedDescription = this.ad.description
                this.editedTitle = this.ad.title
                this.dialog = false
            },
            onMySave(){
                if(this.editedDescription !== '' && this.editedTitle !== ''){
                    this.$store.dispatch('updateAd', {
                        title: this.editedTitle,
                        description: this.editedDescription,
                        id: this.ad.id
                    })
                }

                this.dialog = false
            }
        }
    }
</script>
