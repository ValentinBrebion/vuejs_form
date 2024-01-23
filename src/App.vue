<script setup>
import { ref, watch } from 'vue'
import useForm from './composables/useform'
const identifiant = ref('')
const password = ref('')
const Confirmpassword = ref('')
const errors = ref({
})
const { formErrors, form, validate } = useForm({
  form: {
    email: '',
    password: '',
    confirmPassword: ''
  },
  validator: {
    email: [
      {
        type: 'email',
        message: 'Saisissez une adresse valide'
      },
      {
        required: true,
        message: 'Email requis'
      }
    ],
    password: {
      type: 'string',
      required: true,
      message: 'Mot de passe requis'
    },
    confirmPassword: [
      {
        type: 'string',
        required: true,
        message: 'Confirmation de mot de passe requis'
      },
      {
        validator(rule, value) {
          return value === form.value.password
        },
        message: 'Les mots de passe ne sont pas identiques'
      }
    ]
  }
})



function submitInfo() {
  validate();
}


watch(identifiant, () => {
  delete formErrors.value.identifiant
})

watch(password, () => {
  delete formErrors.value.password
})
watch(Confirmpassword, () => {
  delete formErrors.value.confirmPassword
})
</script>

<template>
  <form @submit.prevent="submitInfo()">
    <div class="form-control">
      <label for="id" class="label">Email</label>
      <input type="text" v-model="form.email" :class="formErrors.email ? 'input input-bordered input-error' : 'input input-bordered'" name="id" id="email" />
      <div v-if="formErrors.email" class="label">
    <span class="label-text-alt">{{ formErrors.email }}</span>
</div>
    </div>

    <div class="form-control">
      <label for="pwd" class="label">Mot de passe</label>
      <input type="password" v-model="form.password" :class="formErrors.password ? 'input input-bordered input-error' : 'input input-bordered'" name="pwd" id="mdp" />
      <div v-if="formErrors.password" class="label">
    <span class="label-text-alt">{{ formErrors.password }}</span>
</div>
    </div>

    <div class="form-control">
      <label for="pwd" class="label">Confirmation de mot de passe</label>
      <input type="password" v-model="form.confirmPassword" :class="formErrors.confirmPassword ? 'input input-bordered input-error' : 'input input-bordered'" name="Confirmpwd" id="confmdp" />
      <div v-if="formErrors.confirmPassword" class="label">
    <span class="label-text-alt">{{ formErrors.confirmPassword }}</span>
</div>
    </div>

    <button type="submit" class="btn btn-primary mt-4">Se connecter</button>
  </form>
</template>
