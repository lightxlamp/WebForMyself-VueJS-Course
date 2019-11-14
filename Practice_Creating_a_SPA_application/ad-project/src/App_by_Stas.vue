<template>
    <div id="app">
        <v-app id="inspire">

            <v-navigation-drawer app
                    v-model="drawer"
                    absolute
                    temporary
                    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                    width="300px"
                    height="100%"
                    dark
            >
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img
                                src="https://i.ibb.co/VjrK66B/ava.png">
                        </v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Stanislav Sheveliukhin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list>
                    <v-list-item
                            v-for="link in links"
                            :key="link.title"
                            :to="link.url"
                            link
                    >
                        <v-list-item-icon>
                            <v-icon>{{link.icon}}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
            </v-navigation-drawer>

            <v-app-bar app color="rgb(14,117,189)" dark>

                <v-app-bar-nav-icon
                    @click.stop="drawer = ! drawer"
                    class="hidden-md-and-up">
                </v-app-bar-nav-icon>

                <v-toolbar-title>
                    mashina.kg
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn
                        v-for="link in links"
                       :key="link.title"
                        :to="link.url"
                        text >
                        <v-icon left>
                            {{link.icon}}
                        </v-icon>
                        {{link.title}}
                    </v-btn>
                </v-toolbar-items>
            </v-app-bar>

            <v-content >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad excepturi illo sunt. Adipisci at beatae
                corporis debitis dolor et excepturi illo magnam repellat sint. Dignissimos dolores doloribus ea
                excepturi fugiat inventore nostrum odit porro quisquam tempora! Animi atque doloremque, ducimus ea
                earum eius eligendi est facere id illum iste laudantium maiores nesciunt qui quo quod similique
                veritatis voluptates. Autem delectus, est fugiat iste libero magnam, nulla possimus quae quis sapiente
                sed suscipit. Asperiores commodi cupiditate dolore earum est eum eveniet excepturi illum ipsum, labore
                maxime, minima necessitatibus pariatur provident quasi repellendus reprehenderit similique sunt unde
                veniam vitae voluptas voluptate voluptatibus. Accusantium consectetur dignissimos dolorem doloribus
                laborum neque nisi provident quisquam ullam. Aperiam blanditiis cupiditate deleniti doloremque dolores
                ducimus ea libero magni nam necessitatibus ratione repudiandae, suscipit voluptates! Adipisci architecto
                aut delectus dicta doloremque, earum eius enim error esse exercitationem expedita fugit illo impedit i
                psa iste, iusto magnam molestiae mollitia necessitatibus nisi quisquam quos repellat repellendus
                reprehenderit repudiandae sit, tenetur veritatis? Accusamus accusantium aperiam autem beatae consectetur
                deleniti doloribus dolorum eius enim esse et expedita, fuga in iste iure laudantium magni molestias nam
                nemo obcaecati officia omnis porro quaerat quas quidem rem reprehenderit repudiandae rerum sapiente sint
                suscipit tempora tenetur veniam vero voluptate voluptatem voluptatum! Adipisci ducimus laudantium
                officia rem tempore ut, voluptas. Adipisci aliquam debitis incidunt minus tempore voluptate. Aliquid
                amet assumenda autem, culpa cumque cupiditate deleniti dolorum earum eos est expedita facilis id iure
                minima molestias nemo odit omnis placeat quam quis quo quod recusandae rem reprehenderit repudiandae, s
                aepe sed tenetur ut voluptates voluptatibus? Asperiores beatae consequuntur cupiditate esse et excepturi
                fugiat iusto maiores minus nam natus nihil, porro possimus quod ratione recusandae vel vero? Adipisci
                aliquid autem consequuntur cum eaque esse fugiat inventore, ipsa laborum minima nam, nisi, nulla numquam
                omnis perferendis placeat quam quidem rem repudiandae voluptatem? Ad architecto at dolorem explicabo,
                fugiat ipsam labore magnam, nihil numquam possimus, quis repellat veritatis voluptatum! Culpa dolor d
                olore enim, eos maxime mollitia nisi rem sequi. Architecto, beatae consectetur consequuntur culpa cum d
                olor, dolorum est et facilis fugiat in ipsam laudantium minima modi molestiae neque, nisi pariatur quae
                quia ratione rerum sunt tempore vitae. Ab ad deserunt fugiat laboriosam quisquam velit? Asperiores
                recusandae, similique? Amet commodi consequatur corporis cupiditate deleniti deserunt, exercitationem,
                facilis fugit ipsa ipsum labore maxime nesciunt officiis quia rerum vero voluptatum. Adipisci at
                explicabo id ipsam nemo nulla obcaecati odit, provident? Asperiores eveniet nobis possimus praesentium
                veniam. Dignissimos, natus, quaerat! Adipisci cumque eos et facilis harum, in laboriosam nisi non quia
                quis quo, saepe, sapiente sed totam voluptatem? Ad adipisci atque consequatur cum dolores doloribus
                earum enim, expedita fugiat fugit incidunt ipsa labore magnam modi molestiae nesciunt omnis quas
                quibusdam quis quisquam quo recusandae reprehenderit similique soluta tenetur ut velit? Accusantium at
                dolorem dolores eligendi fuga ipsa iure libero modi non qui quia, quo sit tempore. Aspernatur culpa
                delectus dignissimos eos, explicabo, facilis iure maxime molestias nostrum pariatur quia recusandae
                similique temporibus! Accusamus amet asperiores aut eos id maiores nemo quae rem veniam? Ad adipisci
                alias animi assumenda consequatur, dicta hic, id illo inventore ipsum nesciunt officiis quibusdam quod
                quos rem sequi, soluta tempore veniam? Commodi hic nesciunt nobis odio pariatur quod vel? Cumque,
                soluta, ut. Ad animi assumenda atque beatae consectetur consequatur deleniti deserunt dolore dolorum
                ducimus eaque eligendi labore, neque nobis, nostrum nulla officia pariatur qui quis similique sint,
                tempora veritatis! Alias, eius saepe. Aliquam aperiam atque beatae blanditiis commodi dicta dignissimos
                dolorem exercitationem iure laudantium maxime minima minus modi nisi officiis placeat, possimus
                provident quaerat quasi quo quos ratione rem saepe soluta tempore velit voluptates? Accusantium atque,
                eligendi ex excepturi fuga fugit, harum iure laborum maxime natus nesciunt nihil nisi nulla perspiciatis
                quas quidem, repellendus reprehenderit repudiandae sed similique tenetur ullam ut. Alias eligendi,
                explicabo illo magnam quos velit. Assumenda commodi corporis dolor, dolorem, doloremque eaque hic ipsum
                maiores, modi natus nulla officiis perferendis temporibus. Aliquid animi corporis deleniti, deserunt,
                dolore doloremque dolores ducimus ea eaque harum magnam minima numquam odit officia quas ratione
                repudiandae rerum ullam vel veniam vero vitae voluptatem voluptatibus. Alias, aperiam asperiores aut
                autem commodi dignissimos doloribus eaque esse fugiat incidunt minima nesciunt nulla obcaecati placeat,
                qui quisquam reiciendis sint sunt ut voluptatum. Beatae enim harum in odio perspiciatis placeat
                repellat, similique. Aliquam at beatae consequuntur cupiditate ducimus eveniet ex exercitationem fuga
                laboriosam laudantium nesciunt, officia placeat, repellendus reprehenderit, tempora voluptas
                voluptatibus? Aspernatur delectus deserunt eos illo minus nemo neque nihil, nulla quod sunt vel velit,
                voluptate voluptatibus! Alias qui unde vitae. Consequuntur cupiditate illum iste laudantium vel velit v
                eritatis! A aperiam aspernatur atque aut cupiditate delectus distinctio dolorum eaque eos in inventore,
                ipsam iste iure iusto minima nostrum officia optio, provident quam qui quo similique temporibus velit
                veniam voluptas voluptate voluptatem! A adipisci consequatur deserunt dicta dignissimos fugit hic, iure
                nulla odit perspiciatis quaerat quibusdam quidem, rerum sed sequi similique sunt ut voluptas?
                Architecto, cumque cupiditate dolores itaque labore magni quam quidem suscipit. Cum, deserunt.
            </v-content>

            <v-footer color="rgb(14,117,189)" app>
                <span class="white--text">&copy; 2013–2019 ОcОО «ESPIRU»</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
export default {
    props: {
        source: String,
    },
    data: () => ({
        drawer: null,
        links: [
            {title: 'Вход', icon: 'mdi-lock', url: '/login'},
            {title: 'Регистрация', icon: 'mdi-face', url: '/registration'},
            {title: 'Заказы', icon: 'mdi-bookmark', url: '/orders'},
            {title: 'Новое объявление', icon: 'mdi-note', url: '/new'},
            {title: 'Моя объявления', icon: 'mdi-clipboard-list', url: '/list'},
        ],
    }),
}
</script>

<style>
    html {
        overflow: scroll;
        overflow-x: hidden;
    }
    ::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }
</style>