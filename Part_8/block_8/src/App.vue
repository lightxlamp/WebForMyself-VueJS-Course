<template>
  <div id="app" class="container">
    <form class="pt-3" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          class="form-control"
          :class="{'is-invalid': $v.email.$error}"
          @blur="$v.email.$touch()"
          v-model="email"
        >
        <div class="invalid-feedback" v-if="!$v.email.required">Email field is required.</div>
        <div class="invalid-feedback" v-if="!$v.email.email">This field should be an email</div>
        <div class="invalid-feedback" v-if="!$v.email.isUniqueInMyDB">User with "{{email}}"
                                                                      email is already registered</div>
        <div class="invalid-feedback" v-if="!$v.email.isUniqueInMyDBv2">User with "{{email}}"
                                                                        email is already registered in a real DB</div>
        <!--<pre>{{ $v }}</pre>-->
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          :class="{'is-invalid': $v.password.$error}"
          @blur="$v.password.$touch()"
          v-model="password"
        >
        <div class="invalid-feedback" v-if="!$v.password.minLength">
          Password should have at least {{ $v.password.$params.minLength.min}} symbols.
          It is only {{password.length}} now.
        </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          :class="{'is-invalid': $v.confirmPassword.$error}"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        >
        <div class="invalid-feedback" v-if="!$v.confirmPassword.sameAs">
          Passwords don't match
        </div>
      </div>

      <button
        class="btn btn-success"
        type="submit"
        :disabled="$v.$invalid"
      >Submit</button>

      <div class="info">
        <h6>Please try to type "test2@gmail.com" and "test@gmail.com" as email address, to see messages</h6>
        <h6>"Submit" button becomes active when all fields are filled correctly</h6>
      </div>
    </form>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit(){
      console.log('Email', this.email)
      console.log('Password', this.password)
      console.log('Form was successfully sent')
    }
  },
  validations: {
    email: {
      required: required,
      email: email,
      isUniqueInMyDB: function(newEmail){
        return newEmail !== 'test@gmail.com' ? true : false
      },
      isUniqueInMyDBv2: function(newEmail){
        if (newEmail === '') return true

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const value = newEmail !== 'test2@gmail.com' ? true : false
            resolve(value)
          }, 5000)
        })
      }
    },
    password: {
      minLength: minLength(6)
    },
    confirmPassword: {
      // sameAs: sameAs('password') // It can be also be done this way
      sameAs: sameAs((vue) => {
        return vue.password
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

h6{
  color: lightseagreen;
  font-size: 14px;
}

.info{
  margin-top: 50px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  padding-top: 20px;
  background-color: beige;
}

  #app{
    border: 1px solid black;
    padding: 50px;
    border-radius: 20px;
  }
</style>
