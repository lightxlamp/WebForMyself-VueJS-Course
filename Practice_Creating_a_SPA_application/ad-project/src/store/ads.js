export default {
    state: {
        ads: [
            {
                title: 'First Ad',
                description: 'Hello I am a desc for the first image',
                promo: true,
                imageSrc: 'https://149366088.v2.pressablecdn.com/' +
                    'wp-content/uploads/2019/03/fedora-30-wallpaper.jpg',
                id: '123'
            },
            {
                title: 'Second Ad',
                description: 'Description for the second image',
                promo: false,
                // imageSrc: 'https://i.ibb.co/VjrK66B/ava.png',
                imageSrc: 'https://data.whicdn.com/images/304947669/original.jpg',
                id: '1234'
            },
            {
                title: 'Third Ad',
                description: 'Babbles',
                promo: true,
                imageSrc: 'https://livewallpaperhd.com/wp-content/' +
                    'uploads/2017/05/Blue-Wallpaper-For-Computer.jpg',
                id: '12345'
            }
        ]
    },

    actions: {
        createAd ({commit}, adObjFromForm){
            // eslint-disable-next-line no-console
            console.log('CreateAd Action is called')

            // eslint-disable-next-line no-console
            console.log(adObjFromForm)

            adObjFromForm.id = 'Math.random()'

            commit('createAd', adObjFromForm)
        }
    },

    mutations: {
        createAd(state, adObjFromForm){
            // eslint-disable-next-line no-console
            console.log('CreateAd mutation is called')
            // eslint-disable-next-line no-console
            console.log(state)
            state.ads.push(adObjFromForm)
        }
    },

    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo === true
            })
        },
        myAds (state){
            return state.ads
        },
        adById (state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }

}