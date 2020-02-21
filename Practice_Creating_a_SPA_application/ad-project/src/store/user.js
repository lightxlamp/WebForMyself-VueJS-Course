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
      // eslint-disable-next-line no-console
      console.log("firebaseUserObject", firebaseUserObject);
      state.firebaseUserObject = firebaseUserObject;
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

    async updateUserInFireBaseStore({ commit }, { newUserName, newAvatar }) {
      commit("clearError");
      commit("setLoading", true);

      // eslint-disable-next-line no-console
      console.log("New User Name", newUserName);
      // eslint-disable-next-line no-console
      console.log("New avatarSrc", newAvatar);

      const justACurrentUser = await firebase.auth().currentUser;
      //eslint-disable-next-line no-console
      console.log("justACurrentUser.displayName", justACurrentUser.displayName);

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
      const fullImageSrcInDb = await fileData.ref.getDownloadURL();
      await justACurrentUser
        .updateProfile({
          displayName: newUserName,
          photoURL: fullImageSrcInDb
        })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log(
            "justACurrentUser.displayName",
            justACurrentUser.displayName
          );
          // eslint-disable-next-line no-console
          console.log("justACurrentUser.Avatar", justACurrentUser.photoURL);
          // eslint-disable-next-line no-console
          console.log("justACurrentUser", justACurrentUser);
        });
      await commit("setFireBaseUserObject", justACurrentUser);
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

    // very bad approach based on idea, that different kind of objects can be in "firebaseUserObject"
    currentUserAvatar(state) {
      if (state.firebaseUserObject !== null && typeof state.firebaseUserObject !== "undefined") 
      {
        if (state.firebaseUserObject.user !== "undefined")
        {
          return state.firebaseUserObject.user.photoURL;
        }
        else if (state.firebaseUserObject.photoURL !== "undefined") 
        {
          return state.firebaseUserObject.photoURL 
        }
      } else 
        return "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg";
    },
    
    // very bad approach based on idea, that different kind of objects can be in "firebaseUserObject"
    currentUserName(state) {
      if (state.firebaseUserObject !== null && typeof state.firebaseUserObject !== "undefined") 
      {
        if (state.firebaseUserObject.user !== "undefined")
        {
          return state.firebaseUserObject.user.displayName;
        }
        else if (state.firebaseUserObject.displayName !== "undefined") 
        {
          return state.firebaseUserObject.displayName 
        }
      }
      else return "Unauthorized user";
    }
  }
};
