import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const InputField = ({
  control,
  name,
  label,
  placeholder,
  type,
  prefix,
  ...rest
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="relative w-full">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === 'file' ? (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files[0])}
              ref={field.ref}
              {...rest}
            />
          ) : (
            <Input placeholder={placeholder} {...field} type={type} {...rest} />
          )}
        </FormControl>
        <FormMessage />
        {prefix && <div className="absolute top-8 left-2">{prefix}</div>}
      </FormItem>
    )}
  />
);

export default InputField;
