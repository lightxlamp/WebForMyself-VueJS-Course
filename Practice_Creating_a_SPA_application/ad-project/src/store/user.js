import * as firebase from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null,
        firebaseUserObject: null
    },
    mutations: {
        setUser (state, user){
            state.user = user
        },
        setFireBaseUserObject (state, firebaseUserObject){
            state.firebaseUserObject = firebaseUserObject
        },
    },
    actions: {
        async registerUser({commit}, {email, password}){
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        async loginUser({commit}, {email, password})
        {
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase', user)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase.UID', user.user.uid)
                // eslint-disable-next-line no-console
                console.log('userFromFireBase.Name', user.user.displayName)
                commit('setFireBaseUserObject', user)
                commit('setUser', new User(user.user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },

        async updateUser({commit}, {userName, avatarSrc})
        {
            commit('clearError')
            commit('setLoading', true)

            // eslint-disable-next-line no-console
            console.log("userName", userName)
            // eslint-disable-next-line no-console
            console.log("avatarSrc", avatarSrc)

            try {
                //const currentUser = this.$store.getters.firebaseUserObject.user;
                const currentUser = this.firebaseUserObject.user;
                // eslint-disable-next-line no-console
                console.log("Before: this.firebaseUserObject.user.displayName", currentUser.displayName)
                // eslint-disable-next-line no-console
                console.log("Before: this.firebaseUserObject.user.photoURL", currentUser.photoURL)

                await currentUser.updateProfile({displayName: userName, photoURL: avatarSrc})

                // eslint-disable-next-line no-console
                console.log("After: this.firebaseUserObject.user.displayName", currentUser.displayName)
                // eslint-disable-next-line no-console
                console.log("After: this.firebaseUserObject.user.photoURL", currentUser.photoURL)

                commit('setLoading', false)
            }
            catch (e) {
                throw e
            }

        },

        autoLoginUser({commit}, fireBaseUser){
            commit('setUser', new User(fireBaseUser.uid))
            //commit('setFireBaseUserObject', new User(fireBaseUser))
        }, //@todo change "payload" to smth

        logoutUser({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
            commit('setFireBaseUserObject', null)
        }
    },
    getters: {
        user(state){
            // const user = firebase.auth().currentUser;
            // // eslint-disable-next-line no-console
            // console.log('userFromFireBase.UID', user.user.uid)
            // // eslint-disable-next-line no-console
            // console.log('userFromFireBase.Name', user.user.displayName)
            //
            // // firebase.User.updateProfile({ displayName: "Jane Q. User"}).then(function () {
            // //     // eslint-disable-next-line no-console
            // //     console.log("firebase.User.displayName, ", firebase.User.displayName)
            // // })
            return state.user
        },
        isUserLoggedIn(state){
            return state.user !== null
        },

        firebaseUserObject(state){
            return state.firebaseUserObject
        },

        currentUserAvatar(state){
            if(state.firebaseUserObject !== null){
                return state.firebaseUserObject.user.photoURL
            }
            else return 'http://bootdey.com/img/Content/avatar/avatar7.png'
        },

        currentUserName(state) {
            if(state.firebaseUserObject !== null){
                return state.firebaseUserObject.user.displayName
            }
            else return 'Unauthorized user'
        }
    }
}