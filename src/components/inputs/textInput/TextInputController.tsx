import { Controller, Control, FieldValues, Path, FieldErrors } from "react-hook-form";
import TextInputComponent from "./TextInput";

interface FormInputProps<T extends FieldValues> extends 
 Omit<React.ComponentProps<typeof TextInputComponent>, "value" | "onChangeText" | "error"> {
    control: Control<T>;
    name: Path<T>;
    errors?: FieldErrors<T>
} 

export function TextInputController<T extends FieldValues>({
    control,
    name,
    ...props
}: FormInputProps<T>) {


    return (
        <Controller
            control={control}
            name={name}
            render={({ 
                field: { value, onChange, onBlur, }, 
                fieldState: { error,  },
                formState:{}
            }) => (
                <TextInputComponent
                    {...props}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                />
            )}
        />
    );
}
