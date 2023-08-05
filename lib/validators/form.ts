import * as z from 'zod';

export const FormValidator = z.object({
    name: z.string().min(1, {
        message: 'Name is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    instructions: z.string().min(200, {
        message: 'Instructions requires atleast 200 chracters'
    }),
    seed: z.string().min(200, {
        message: 'Seed required at least 200 chracters'
    }),
    src: z.string().min(1, {
        message: 'Image is required'
    }),
    categoryId: z.string().min(1, {
        message: 'Category is required'
    })
});

export type FormRequest = z.infer<typeof FormValidator>;