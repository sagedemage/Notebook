<script>
import { ref } from "vue";
import Redirect from "@/Redirect";
import axios from "axios";

export default {
    data: () => ({
        emailRules: [
            value => {
                if (value === "") {
                    return "Field can't be empty."
                }
                return true
            },
        ],
        usernameRules: [
            value => {
                if (value === "") {
                    return "Field can't be empty."
                }
                return true
            },
        ],
        passwordRules: [
            value => {
                if (value === "") {
                    return "Field can't be empty."
                }
                else if (value?.length < 8) {
                    return "Password must be at least 8 characters."
                }
                else if (!/[0-9]/.test(value)) {
                    return "Password must contain a number"
                }
                return true
            },
        ],
        confirmRules: [
            value => {
                if (value === "") {
                    return "Field can't be empty."
                }
                return true
            },
        ],
    }),

    setup() {
        let registered = ref(undefined);
        let err_msg = ref(undefined);
        let email = ref("");
        let username = ref("");
        let password = ref("");
        let confirm = ref("");

        function register() {
            if (email.value !== "" && username.value !== "" && password.value !== "" && confirm.value !== "") {
                if (password.value === confirm.value) {
                    axios.post("http://localhost:8000/api/register", {
                        email: email.value,
                        username: username.value,
                        password: password.value
                    })
                        .then(function (response) {
                            console.log(response.data.registered);
                            if (response.data.registered === true) {
                                Redirect("/login");
                            }
                            else {
                                registered.value = false;
                                err_msg.value = response.data.err_msg;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                else {
                    registered.value = false;
                    err_msg.value = "Passwords do not match!";
                }

            }
        }

        return { register, registered, err_msg, email, username, password, confirm }
    },
}
</script>

<template>
    <v-sheet width="300" class="mx-auto">
        <div class="alert alert-error" v-if="registered === false" role="alert">{{ err_msg }}</div>
        <h1>Register</h1>
        <br>
        <v-form fast-fail @submit.prevent>
            <v-text-field v-model="email" label="email" type="email" :rules="emailRules"></v-text-field>
            <v-text-field v-model="username" label="username" :rules="usernameRules"></v-text-field>
            <v-text-field v-model="password" label="password" type="password" :rules="passwordRules"></v-text-field>
            <v-text-field v-model="confirm" label="confirm" type="password" :rules="confirmRules"></v-text-field>
            <v-btn type="submit" block class="mt-2" @click="register()">Submit</v-btn>
        </v-form>
    </v-sheet>
</template>