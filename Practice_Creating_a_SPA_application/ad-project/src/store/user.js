import * as firebase from "firebase";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
    firebaseUserObject: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFireBaseUserObject(state, firebaseUserObject) {
      state.firebaseUserObject = firebaseUserObject;
    },
    updateUserInStore(state) {
      const currentUser = state.firebaseUserObject.user;
      // eslint-disable-next-line no-console
      console.log(
        "Before: this.firebaseUserObject.user.displayName",
        currentUser.displayName
      );
      // eslint-disable-next-line no-console
      console.log(
        "Before: this.firebaseUserObject.user.photoURL",
        currentUser.photoURL
      );
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        commit("setUser", new User(user.uid));
        commit("setFireBaseUserObject", user);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        // eslint-disable-next-line no-console
        console.log("userFromFireBase", user);
        // eslint-disable-next-line no-console
        console.log("userFromFireBase.UID", user.user.uid);
        // eslint-disable-next-line no-console
        console.log("userFromFireBase.Name", user.user.displayName);
        commit("setUser", new User(user.user.uid));
        commit("setFireBaseUserObject", user);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },

    async updateUser({ commit }, { newUserName, newAvatar }) {
      commit("clearError");
      commit("setLoading", true);

      // eslint-disable-next-line no-console
      console.log("New User Name", newUserName);
      // eslint-disable-next-line no-console
      console.log("New avatarSrc", newAvatar);

      const justACurrentUser = await firebase.auth().currentUser;
      //eslint-disable-next-line no-console
      console.log("justACurrentUser", justACurrentUser);

      // Uploading new avatar to storage
      const imageExtension = newAvatar.name.slice(
        newAvatar.name.lastIndexOf(".")
      );
      // eslint-disable-next-line no-console
      console.log("ImageExtension: ", imageExtension);

      // WOw! No need to remove old avatar from storage. Because old avatar rewrites with a new one.
      // Because the same file name using (user's uid)
      const fileData = await firebase
        .storage()
        .ref(`avatars/${justACurrentUser.uid}.${imageExtension}`)
        .put(newAvatar);
      // eslint-disable-next-line no-console
      console.log("= fileData: ", fileData);

      await fileData.ref.getDownloadURL()
      .then(function(fullImageSrcInDb) {
          firebase.auth().currentUser.updateProfile({
            displayName: newUserName,
            photoURL: fullImageSrcInDb
          })
          .then(function(updatedFireBaseUser)
          {
            commit("setFireBaseUserObject", updatedFireBaseUser);
          })
          // eslint-disable-next-line no-console
          console.log('fullImageSrcInDb', fullImageSrcInDb)
      })
      commit("setLoading", false);
    },

    // autoLoginUser({commit}, fireBaseUser){
    //     commit('setUser', new User(fireBaseUser.uid))
    //     //commit('setFireBaseUserObject', new User(fireBaseUser))
    // }, //@todo change "payload" to smth

    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
      commit("setFireBaseUserObject", null);
    }
  },
  getters: {
    user(state) {
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
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    },

    firebaseUserObject(state) {
      return state.firebaseUserObject;
    },

    currentUserAvatar(state) {
      if (state.firebaseUserObject !== null) {
        return state.firebaseUserObject.user.photoURL;
      } else return "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg";
    },

    currentUserName(state) {
      if (state.firebaseUserObject !== null) {
        return state.firebaseUserObject.user.displayName;
      } else return "Unauthorized user";
    }
  }
};
