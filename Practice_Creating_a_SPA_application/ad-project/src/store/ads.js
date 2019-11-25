import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
    }
}

export default {
    state: {
        ads: []
    },

    actions: {
        async createAd ({commit, getters}, adObjFromForm){
            // eslint-disable-next-line no-console
            console.log('CreateAd Action is called')

            commit('clearError')
            commit('setLoading', true)
            //commit('createAd', adObjFromForm)

            // eslint-disable-next-line no-console
            console.log("= adObjFromForm: ", adObjFromForm)

            const image = adObjFromForm.image

            // eslint-disable-next-line no-console
            console.log("= Image: ", image)

            try{
                const newAd = new Ad(
                    adObjFromForm.title,
                    adObjFromForm.description,
                    getters.user.id,
                    adObjFromForm.imageSrc,
                    adObjFromForm.promo)

                // eslint-disable-next-line no-console
                console.log("= NewAd: ", newAd)

                const fireBaseAdValue = await firebase.database().ref('ads').push(newAd)
                // eslint-disable-next-line no-console
                console.log("fireBaseAdValue: ", fireBaseAdValue)
                const imageExtension = image.name.slice(image.name.lastIndexOf('.'))
                // eslint-disable-next-line no-console
                console.log("ImageExtension: ", imageExtension)

                const fileData =
                    await firebase.storage().ref(`ads/${fireBaseAdValue.key}.${imageExtension}`).put(image)
                // eslint-disable-next-line no-console
                console.log("= fileData: ", fileData)

                // // Points to the root reference
                // const storageRef = firebase.storage().ref();
                // // Points to 'images'
                // const adsImagesRef = storageRef.child('ads');
                // const uploadedPicName = "" + fireBaseAdValue.key + '.' + imageExtension;
                // let spaceRef = adsImagesRef.child(uploadedPicName);
                //
                // let imageSrc2 = spaceRef.fullPath
                // //let imageSrc2 = spaceRef
                //
                // // eslint-disable-next-line no-console
                // console.log('imageSrc2 - ', imageSrc2)


                //const imageSrc = fileData.metadata.downloadURLs[0]
                // let imageSrc =
                //     firebase.storage().ref(`ads/${fireBaseAdValue.key}.${imageExtension}`).getDownloadURL()

                fileData.ref.getDownloadURL()
                    .then(function(fullImageSrcInDb) {
                        firebase.database().ref('ads').child(fireBaseAdValue.key).update({
                            imageSrc: fullImageSrcInDb
                        })
                        commit('setLoading', false)
                        commit('createAd', {
                            ...newAd,
                            imageSrc: fullImageSrcInDb,
                            id: fireBaseAdValue.key
                        })
                        // eslint-disable-next-line no-console
                        console.log(fullImageSrcInDb)
                    })
                    .then(
                        // eslint-disable-next-line no-console
                    )

                // // eslint-disable-next-line no-console
                // console.log("= imageSrc3: ", imageSrc3)
                //
                // //const imageSrc = firebase.storage().ref(`ads/${fireBaseAdValue.key}.${imageExtension}`)
                //
                // //let imageSrc = fileData.ref.fullPath
                // //imageSrc = imageSrc.slice(imageSrc.lastIndexOf('-'))
                // // eslint-disable-next-line no-console
                // console.log("= imageSrc: ", imageSrc)
                // // eslint-disable-next-line no-console
                // console.log("= imageSrc: ", imageSrc.i)

                // await firebase.database().ref('ads').child(fireBaseAdValue.key).update({
                //     //imageSrc
                // })

                // commit('setLoading', false)
                // commit('createAd', {
                //     ...newAd,
                //     imageSrc,
                //     id: fireBaseAdValue.key
                // })
            }
            catch(error) {
                commit('setError'. error.message)
                // eslint-disable-next-line no-console
                console.log(error.message)
                commit('setLoading', false)
                alert('Create ad Error')
                throw error
            }
        }
        ,
        async fetchAds ({commit}){
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try{
                const fireBaseValue = await firebase.database().ref('ads').once('value')
                // eslint-disable-next-line no-console
                console.log(fireBaseValue.val())
                const ads = fireBaseValue.val();
                if(ads != null)
                {
                    Object.keys(ads).forEach(key => {
                        const ad = ads[key];
                        resultAds.push(
                            new Ad(ad.title,
                                ad.description,
                                ad.ownerId,
                                ad.imageSrc,
                                ad.promo,
                                key)
                        )
                    })
                }

                commit('loadAds', resultAds)
                commit('setLoading', false)
            }
            catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },

    mutations: {
        createAd(state, adObjFromFormAndFireBase){
            // eslint-disable-next-line no-console
            console.log('CreateAd mutation is called')
            // eslint-disable-next-line no-console
            console.log(state)
            // eslint-disable-next-line no-console
            console.log('adObjFromFormAndFireBase:', adObjFromFormAndFireBase)
            state.ads.push(adObjFromFormAndFireBase)
        },
        loadAds(state, adsFromFireBase){
            state.ads = adsFromFireBase;
        }
    },

    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                //console.log('Add ads', state.ads)
                return ad.promo === true
            })
        },
        myAds (state) {
            return state.ads
        },
        adById (state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }

}