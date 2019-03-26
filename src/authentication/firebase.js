const firebase = require("firebase")

class FirebaseAuthentication {
    constructor() {
        this.config = {
            apiKey: "AIzaSyCaIxMarog1k6pHiID5LkSjFCYj3U3NNsQ",
            authDomain: "mcommerce-dashboard.firebaseapp.com",
            databaseURL: "https://mcommerce-dashboard.firebaseio.com",
            projectId: "mcommerce-dashboard",
            storageBucket: "mcommerce-dashboard.appspot.com",
            messagingSenderId: "501335675666"
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(this.config)
        }
        this.isAuthenticated = undefined
        this.googleProvider = new firebase.auth.GoogleAuthProvider()
        this.facebookProvider = new firebase.auth.FacebookAuthProvider()
        this.currentUser = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged(user => {
            console.log("user: ", user)
            if (user) {
                this.currentUser = user
                this.isAuthenticated = true
                console.log("user: ", user)
                console.log("authe: ", this.isAuthenticated)
            } else {
                console.log("false: ")
                this.isAuthenticated = false
            }
        })

    }
   
    
    get authenticated() {
        return new Promise((resolve, reject) => {
            if (this.isAuthenticated == undefined) {
                setTimeout(() => {
                    this.authenticated.then(resolve)
                }, 200)
            } else {
                console.log("is auth: ", this.isAuthenticated)
                resolve(this.isAuthenticated);
            }
        })
    }
    async getIdToken() {
        try {
            const idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
            console.log("Firebase id token:", idToken)
            return idToken
        } catch (error) {
            console.log("Get token error: ", error)
            return undefined
        }
    }
    async signInWithGoogle() {
        try {
            const result = await firebase.auth().signInWithPopup(this.googleProvider)
            this.googleToken = result.credential.accessToken
            this.user = result.user
            console.log(this.user)
            await this.getIdToken()
            return true
        } catch (error) {
            return false
        }

    }
    async signInWithFacebook() {
        const result = await firebase.auth().signInWithPopup(this.facebookProvider)
        this.googleToken = result.credential.accessToken
        this.user = result.user
        console.log(this.user)

    }
    async createUserByEmailAndPassword(email, password) {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }
    async signInWithEmailAndPassword(email, password) {
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            this.isAuthenticated = true
            this.user = result.user
            //await this.getIdToken()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async signOut() {
        try {
            await firebase.auth().signOut()
            this.isAuthenticated = false
            console.log("Đăng xuất thành công")
            return true
        } catch (error) {
            console.log("Đăng xuất không thành công")
            return false
        }
    }
}

module.exports = new FirebaseAuthentication()