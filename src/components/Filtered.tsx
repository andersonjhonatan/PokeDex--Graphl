import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { FormData } from '../interface/IFormData'

const Filtered = () => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex rounded-lg mt-3 gap-4">
      <div className="flex w-full h-12 justify-between gap-4">
        <Controller
          name="height"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Height
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <Controller
          name="weight"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Weight
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <Controller
          name="type"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Type
              </option>
              <option value="2">Option 2</option>
              {/* Add other options as needed */}
            </select>
          )}
        />
        <Controller
          name="ability"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Ability
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <Controller
          name="weaknesses"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              className="w-full bg-white text-gray-400 rounded-xl text-center"
              {...field}
            >
              <option value="" disabled>
                Weaknesses
              </option>
              <option value="2">Option 2</option>
            </select>
          )}
        />
        <button
          type="submit"
          className="w-full h-12 bg-red-500 text-white rounded-tr-lg rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Filtered
