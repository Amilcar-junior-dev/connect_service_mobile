import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type * as z4 from 'zod/v4/core';

type UseAppFormProps<TSchema extends z4.$ZodType<any, FieldValues>> = Omit<
 UseFormProps<z4.input<TSchema>, any, z4.output<TSchema>>,
    'resolver'
> & {
    schema: TSchema;
};

export function useAppForm<TSchema extends z4.$ZodType<any, FieldValues>>({
    schema,
    ...formConfig
}: UseAppFormProps<TSchema>) {
    return useForm<z4.input<TSchema>, any, z4.output<TSchema>>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        ...formConfig
    });
}