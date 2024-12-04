import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const CheckBoxField = ({ control, name, label, labelClass }) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex items-center space-x-2">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormLabel className={cn('text-xs pb-2', labelClass)}>
          {label}
        </FormLabel>
      </FormItem>
    )}
  />
);

export default CheckBoxField;
