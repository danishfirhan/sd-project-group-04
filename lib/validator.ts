import * as z from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';
import { orderItems, orders, products, reviews } from '@/db/schema';

// USER SCHEMAS
export const signInFormSchema = z.object({
    email: z.string().min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email format').min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z.string().min(3, 'Confirm password must be at least 3 characters'),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email format').min(3, 'Email must be at least 3 characters'),
});

// User insertion and updating schemas
export const insertUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(3, 'Name must be at least 3 characters'),
    role: z.string().min(1, 'Role is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateUserSchema = updateProfileSchema.extend({
    id: z.string().min(1, 'ID is required'),
    role: z.string().min(1, 'Role is required'),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password is required"),
    confirmNewPassword: z.string().min(6, "Please confirm your new password"),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "New passwords must match",
    path: ["confirmNewPassword"],
});

// PRODUCT SCHEMAS
export const insertProductSchema = createSelectSchema(products, {
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    stock: z.coerce.number().min(0, 'Stock must be at least 0'),
}).omit({
    id: true,
    rating: true,
    numReviews: true,
    createdAt: true,
});

export const updateProductSchema = createSelectSchema(products, {
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    stock: z.coerce.number().min(0, 'Stock must be at least 0'),
}).omit({
    rating: true,
    numReviews: true,
    createdAt: true,
});

// REVIEW SCHEMAS
export const insertReviewSchema = createInsertSchema(reviews, {
    rating: z.coerce.number()
        .int()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5'),
});

// CART SCHEMAS
export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a non-negative number'),
    image: z.string().min(1, 'Image is required'),
    price: z.number().refine(
        (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(value)),
        'Price must have exactly two decimal places (e.g., 49.99)'
    ),
});

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, 'Name must be at least 3 characters'),
    streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
    city: z.string().min(3, 'City must be at least 3 characters'),
    postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
    country: z.string().min(3, 'Country must be at least 3 characters'),
    lat: z.number().optional(),
    lng: z.number().optional(),
});

// PAYMENT SCHEMAS
export const paymentMethodSchema = z.object({
    type: z.string().min(1, 'Payment method is required'),
}).refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
});

export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string(),
});

// ORDER SCHEMAS
export const insertOrderSchema = createInsertSchema(orders, {
    shippingAddress: shippingAddressSchema,
    paymentResult: z.object({
        id: z.string(),
        status: z.string(),
        email_address: z.string(),
        pricePaid: z.string(),
    }).optional(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems, {
    price: z.number(),
});

//EVENTS SCHEMAS
export const insertEventSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'), // Add slug
    images: z.array(z.string()).optional(), // Optional array of image URLs
    description: z.string().optional(),
    date: z.string().transform((date) => new Date(date)), // Transform to Date
    time: z.string(),
    venue: z.string().min(1, 'Venue is required'),
    organizer: z.string().min(1, 'Organizer is required'),
    ticketPrice: z.number().min(0, 'Ticket price must be a positive number'), // Add ticketPrice
    availableTickets: z.number().min(0, 'Available tickets must be a non-negative number'), // Add availableTickets
    isFeatured: z.boolean().optional(),

});

export const updateEventSchema = insertEventSchema.extend({
    id: z.string().min(1, 'ID is required'),
});

// BOOKING
export const insertBookingSchema = z.object({
    userId: z.string().uuid('User  ID must be a valid UUID'),
    eventId: z.string().uuid('Event ID must be a valid UUID'),
    qty: z
        .number()
        .int()
        .nonnegative('Quantity must be a non-negative integer'),
    totalPrice: z
        .number()
        .refine(
        value => /^\d+(\.\d{2})?$/.test(value.toFixed(2)),
        'Total Price must have exactly two decimal places (e.g., 49.99)'
    ),
});

// EVENT REGISTRATION 
export const eventRegistrationSchema = z.object({
    eventId: z.string().min(1, 'Event ID is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    paymentMethod: z.string().min(1, 'Payment method is required'),
});
