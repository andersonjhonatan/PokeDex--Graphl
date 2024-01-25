import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface FormData {
  type: string;
  height: string;
  weight: string;
  ability: string;
  weaknesses: string;

}

const fieldTypes = [
  { label: 'type', name: 'Type' },
  { label: 'height', name: 'Height' },
  { label: 'weight', name: 'Weight' },
  { label: 'ability', name: 'Ability' },
  { label: 'weaknesses', name: 'Weaknesses' },
];

const Filtered = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex   rounded-lg mt-3 gap-4 ">
      {fieldTypes.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div key={field.name} className="flex w-full h-12 justify-between">
              <select className="w-full bg-white text-gray-400 rounded-xl text-center" {...field}>
                <option value="" disabled>{field.name}</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>
          )}
        />
      ))}
      
      <button type="submit" className="w-full h-12 bg-red-500 text-white rounded-tr-lg rounded-br-lg">Submit</button>
    </form>
  );
};

export default Filtered;
