    import { CartItem, PaymentResult, ShippingAddress } from '@/types'
import {
boolean,
    decimal,
integer,
json,
numeric,
pgTable,
text,
timestamp,
uniqueIndex,
uuid,
varchar,
} from 'drizzle-orm/pg-core'
import { primaryKey } from 'drizzle-orm/pg-core/primary-keys'
import { AdapterAccountType } from 'next-auth/adapters'
import { relations } from 'drizzle-orm' 


export const users = pgTable(
    'user',
    {
        id: uuid('id').defaultRandom().primaryKey().notNull(),
        name: text('name').notNull().default('NO_NAME'),
        email: text('email').notNull(),
        role: text('role').notNull().default('user'),
        password: text('password'),
        emailVerified: timestamp('emailVerified', { mode: 'date' }),
        image: text('image'),
        address: json('address').$type<ShippingAddress>(),
        paymentMethod: text('paymentMethod'),
        resetToken: text('resetToken'),
        resetTokenExpiry: timestamp('resetTokenExpiry', { mode: 'date' }),
        isVerified: boolean('isVerified').default(false), // New field for verification status
        verificationToken: text('verificationToken'), // New field for verification token
        createdAt: timestamp('createdAt').defaultNow(),
    },
    (table) => {
        return {
            userEmailIdx: uniqueIndex('user_email_idx').on(table.email),
        }
    }
);

// ACCOUNTS
export const accounts = pgTable(
'account',
{
userId: uuid('userId')
.notNull()
.references(() => users.id, { onDelete: 'cascade' }),
type: text('type').$type<AdapterAccountType>().notNull(),
provider: text('provider').notNull(),
providerAccountId: text('providerAccountId').notNull(),
refresh_token: text('refresh_token'),
access_token: text('access_token'),
expires_at: integer('expires_at'),
token_type: text('token_type'),
scope: text('scope'),
id_token: text('id_token'),
session_state: text('session_state'),
},
(account) => ({
compoundKey: primaryKey({
columns: [account.provider, account.providerAccountId],
}),
})
)

// SESSIONS
export const sessions = pgTable("session", {
sessionToken: text("sessionToken").primaryKey(),
userId: uuid("userId")  // Change to uuid to match users.id
.notNull()
.references(() => users.id, { onDelete: "cascade" }),
expires: timestamp("expires", { mode: "date" }).notNull(),
});

// AUTHENTICATORS
export const authenticators = pgTable(
"authenticator",
{
credentialID: text("credentialID").notNull().unique(),
userId: uuid("userId")  // Change to uuid to match users.id
.notNull()
.references(() => users.id, { onDelete: "cascade" }),
providerAccountId: text("providerAccountId").notNull(),
credentialPublicKey: text("credentialPublicKey").notNull(),
counter: integer("counter").notNull(),
credentialDeviceType: text("credentialDeviceType").notNull(),
credentialBackedUp: boolean("credentialBackedUp").notNull(),
transports: text("transports"),
},
(authenticator) => ({
compositePK: primaryKey({
columns: [authenticator.userId, authenticator.credentialID],
}),
})
);

// PRODUCTS
export const products = pgTable(
'product',
{
id: uuid('id').defaultRandom().primaryKey().notNull(),
name: text('name').notNull(),
slug: text('slug').notNull(),
category: text('category').notNull(),
images: text('images').array().notNull(),
brand: text('brand').notNull(),
description: text('description').notNull(),
stock: integer('stock').notNull(),
price: numeric('price', { precision: 12, scale: 2 })
.notNull()
.default('0'),
rating: numeric('rating', { precision: 3, scale: 2 })
.notNull()
.default('0'),
numReviews: integer('numReviews').notNull().default(0),
isFeatured: boolean('isFeatured').default(false).notNull(),
banner: text('banner'),
createdAt: timestamp('createdAt').defaultNow().notNull(),
},
(table) => {
return {
productSlugIdx: uniqueIndex('product_slug_idx').on(table.slug),
}
}   
)

export const reviews = pgTable('reviews', {
id: uuid('id').defaultRandom().primaryKey().notNull(),
userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
productId: uuid('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
rating: integer('rating').notNull(),
title: text('title').notNull(),
description: text('slug').notNull(),
isVerifiedPurchase: boolean('isVerifiedPurchase').notNull().default(true),
createdAt: timestamp('createdAt').notNull().defaultNow(),
})
export const productRelations = relations(products, ({ many }) => ({
reviews: many(reviews),
}))
export const reviewsRelations = relations(reviews, ({ one }) => ({
user: one(users, { fields: [reviews.userId], references: [users.id] }),
product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
}),
}))

// CARTS
export const carts = pgTable('cart', {
id: uuid('id').notNull().defaultRandom().primaryKey(),
userId: uuid('userId').references(() => users.id, {
onDelete: 'cascade',
}),
sessionCartId: text('sessionCartId').notNull(),
items: json('items').$type<CartItem[]>().notNull().default([]),
itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
shippingPrice: numeric('shippingPrice', {
precision: 12,
scale: 2,
}).notNull(),
taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// ORDERS
export const orders = pgTable('order', {
id: uuid('id').defaultRandom().primaryKey(),
userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
shippingAddress: json('shippingAddress').$type<ShippingAddress>().notNull(),
paymentMethod: text('paymentMethod').notNull(),
paymentResult: json('paymentResult').$type<PaymentResult>(),
itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
}).notNull(),
taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
isPaid: boolean('isPaid').notNull().default(false),
paidAt: timestamp('paidAt'),
isDelivered: boolean('isDelivered').notNull().default(false),
deliveredAt: timestamp('deliveredAt'),
createdAt: timestamp('createdAt').notNull().defaultNow(),
})
export const ordersRelations = relations(orders, ({ one, many }) => ({
orderItems: many(orderItems),
user: one(users, { fields: [orders.userId], references: [users.id] }),
}))

export const orderItems = pgTable(
'orderItems',
{
    orderId: uuid('orderId')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid('productId')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
    qty: integer('qty').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
},
(orderItem) => ({
    compoundKey: primaryKey({
    columns: [orderItem.orderId, orderItem.productId],
    }),
})
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
}),
}))


//FEEDBACKS
export const feedbacks = pgTable("feedbacks", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
});



// EVENTS
export const events = pgTable("events", {
    id: uuid('id').defaultRandom().primaryKey().notNull(), // Use UUID for consistency
    name: varchar('name', { length: 255 }).notNull(),
    images: text('images').array().notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description').notNull(),
    date: timestamp('date').notNull(),
    venue: varchar('venue', { length: 255 }).notNull(),
    ticketPrice: numeric('ticket_price', { precision: 12, scale: 2 }).notNull(), // Numeric for price
    availableTickets: integer('available_tickets').notNull(),
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
// EVENT BOOKINGS
export const eventBookings = pgTable('event_bookings', {
    id: uuid('id').notNull().defaultRandom().primaryKey(), // Unique identifier for each booking
    eventId: uuid('eventId').notNull().references(() => events.id, {
        onDelete: 'cascade', // Cascade delete if the event is deleted
    }),
    eventName: text('eventName').notNull().references(() => events.name, {
        onDelete: 'cascade', // Cascade delete if the event is deleted
    }),
    userId: uuid('userId').notNull().references(() => users.id, {
        onDelete: 'cascade', // Cascade delete if the user is deleted
    }),
    name: text('name').notNull(), // Name of the person making the booking
    email: text('email').notNull(), // Email of the person making the booking
    paymentMethod: text('paymentMethod').notNull(), // Payment method used (e.g., PayPal, Stripe)
    totalPrice: decimal('totalPrice', { precision: 10, scale: 2 }).notNull(), // Total price of the booking
    bookingDate: timestamp('bookingDate').notNull().defaultNow(), // Date and time of the booking
    status: text('status').notNull().default('pending'), // Status of the booking (e.g., pending, confirmed, canceled)
    createdAt: timestamp('createdAt').notNull().defaultNow(), // Timestamp for when the booking was created
    updatedAt: timestamp('updatedAt').notNull().defaultNow().$onUpdateFn(() => new Date()), // Timestamp for when the booking was last updated
});
