import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(4, 'Password must be at least 4 characters') // fixed typo
  .regex(/[0-9]/, 'Password must include at least one number')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must include at least one special character'
  );

export const FormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .refine(
        (val) => /^[A-Z]/u.test(val),
        'First letter of name must be uppercase'
      ),
    age: z.number().min(1, 'Age is required, have to be more then 1'),
    email: z.email('Enter a valid email'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    gender: z.enum(['male', 'female'], { message: 'Please choose gender' }),
    country: z.enum(['Kazakhstan', 'Georgia', 'England'], {
      message: 'Please choose country',
    }),
    terms: z.literal(true, { message: 'Accept terms to continue' }),
    image: z.instanceof(File, { message: 'Please upload an image' }).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
