import * as firebase from 'firebase'

class Ad {
    constructor(title, description, ownerId, imageSrc = '', promo = false, price, id = null) {
        this.title = title
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.price = price
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
                    adObjFromForm.promo,
                    adObjFromForm.price)

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
                                ad.price,
                                key
                                )
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
        },

        async updateAd ({commit}, {title, description, price, id})
        {
            commit('clearError')
            commit('setLoading', true)

            // eslint-disable-next-line no-console
            console.log('UpdateAd action is called')

            try {
                await firebase.database().ref('ads').child(id).update({
                    title, description, price
                })

                commit('updateAd', {
                    title, description, price, id
                })
                commit('setLoading', false)
            }
            catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
            }
        },

        async deleteAd({commit}, {id, imageSrc})
        {
            commit('clearError');
            commit('setLoading', true);
            // eslint-disable-next-line no-console
            console.log('DeleteAd action is called')      
            // eslint-disable-next-line no-console
            console.log('ImageSrc', imageSrc)

            try {
                // Removing record of AD
                // https://firebase.google.com/docs/database/web/read-and-write
                //let adToDelete = await firebase.database().ref('ads').child(id);
                //await firebase.database().ref('ads').child(id).remove();
                
                // Removing Image of Ad from STorage
                // eslint-disable-next-line no-console
                // https://medium.com/@650egor/react-30-day-challenge-day-4-firebase-photo-upload-delete-f7c59d73ae36
                let imageLinkInDB = await firebase.storage().ref('ads').child(id);
                // eslint-disable-next-line no-console
                console.log('Image in DB', imageLinkInDB);
                await firebase.storage().ref('ads').child(id).delete();

                commit('deleteAd', {
                    id
                })
                commit('setLoading', false)
            }
            catch (e) {
                commit('setError', e.message)
                commit('setLoading', false)
                throw e
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
        },
        updateAd(state, {title, description, price, id}){
            // eslint-disable-next-line no-console
            console.log('UpdateAd mutation is called')
            // eslint-disable-next-line no-console
            console.log('Id', id)

            let adToEdit = null
            // TODO find() did not worked for me. Why? Find out later
            // const ad = state.ads.find(a => {
            //     a.id === id
            //     // eslint-disable-next-line no-console
            //     console.log('Ad', a)
            // })

            if(state.ads !== undefined) {
                for (let i = 0; i < state.ads.length; i++) {
                    if (state.ads[i].id === id) {
                        adToEdit = state.ads[i];
                        break
                    }
                }
            }

            // eslint-disable-next-line no-console
            console.log('Ad to edit found', adToEdit)

            adToEdit.title = title
            adToEdit.description = description
            adToEdit.price = price;
        },
        deleteAd(state, {id}){
            // eslint-disable-next-line no-console
            console.log('deleteAd mutation is called')
            // eslint-disable-next-line no-console
            console.log('Id', id)

            if(state.ads !== undefined) {
                for (let i = 0; i < state.ads.length; i++) {
                    if (state.ads[i].id === id) {
                         // eslint-disable-next-line no-console
                        //console.log('Before Slicing', state.ads);
                        
                        state.ads.splice(i, 1); 
                         // eslint-disable-next-line no-console
                        //console.log('After Slicing', state.ads);
                        break
                    }
                }
            }
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
        myAds (state, getters) {
            // eslint-disable-next-line no-console
            console.log('state ads', state.ads)
            // eslint-disable-next-line no-console
            console.log('getters user id', getters.user.id)
            return state.ads.filter(ad => {
                    return ad.ownerId === getters.user.id})
        },
        adById (state){
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }

}