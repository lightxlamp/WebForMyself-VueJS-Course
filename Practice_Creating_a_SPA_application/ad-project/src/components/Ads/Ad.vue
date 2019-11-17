<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1>Объявление</h1>
                <v-card>

                    <v-img
                        src="https://livewallpaperhd.com/wp-content/uploads/2017/05/Blue-Wallpaper-For-Computer.jpg"
                        height="300"
                    ></v-img>

                    <v-card-text>
                        <h1 class="text--primary">H1 Заголовок</h1>
                        <p>Тут текст объявы. И всякое описание</p>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary">Редактировать</v-btn>
                        <v-btn class="success">Купить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style scoped>

</style>