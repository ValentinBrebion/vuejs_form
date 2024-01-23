import { ref } from 'vue'
import  Schema  from 'async-validator'

export default function useForm(options) {
    const formErrors = ref({})
    const form = ref(options.form)
    const validator = new Schema(options.validator)


    const validate = () => {
        validator.validate(form.value, (errors, fields) => {
            if (errors) {
          errors.forEach((error) => {
              formErrors.value[error.field] = error.message
            })
                return;
        }
            console.log('submitted !');
        })
      }

      
  
    return {
      formErrors,
      form, 
      validator,
      validate
    }
  }