    import db from "@/db/drizzle";
    import { users } from "@/db/schema"; // Update with the correct schema path if needed
    import bcrypt from "bcrypt";
    import { eq } from "drizzle-orm"; // Drizzle ORM comparison function for WHERE clauses

    // Fetch a user by email
    export async function getUserByEmail(email: string) {
    const userRecord = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return userRecord[0] || null; // Return user if found, else null
    }

    export const resetPassword = async (token: string, hashedPassword: string): Promise<boolean> => {
        // Logic to reset the password
        const result = await db.$client.query(
        `UPDATE users SET password = $1 WHERE reset_token = $2 RETURNING id`,
        [hashedPassword, token]
    );
    return result.rowCount !== null && result.rowCount > 0;
    };
// Set reset token and expiry for a user by email
    export async function setResetToken(email: string, resetToken: string, resetTokenExpiry: Date) {
    return await db
        .update(users)
        .set({ resetToken, resetTokenExpiry })
        .where(eq(users.email, email));
    }

    // Verify reset token and expiry
    export async function verifyResetToken(resetToken: string) {
        const userRecord = await db.select().from(users).where(eq(users.resetToken, resetToken)).limit(1);
    
        // Check if the userRecord is not empty and the resetTokenExpiry is still valid
        if (userRecord.length > 0) {
        const user = userRecord[0]; // Now TypeScript knows userRecord[0] is not null
        if (user.resetTokenExpiry && user.resetTokenExpiry > new Date()) {
            return user;
        }
        }
        
        return null;
    }
    
    // Update the reset token in the database
    export async function updateResetToken(email: string, token: string, expiry: Date) {
    try {
    // Update reset token and expiry in the database
    const result = await db.$client.query(
    `UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3`,
    [token, expiry, email]
    );
    // Check if the update was successful
    return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
        console.error('Failed to update reset token:', error);
        return false;
    } }
    // Update user password and clear reset token and expiry
    export async function updateUserPassword(userId: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash password

    return await db
        .update(users)
        .set({ password: hashedPassword, resetToken: null, resetTokenExpiry: null })
        .where(eq(users.id, userId));
    }

    // OPTIONAL: Clear reset token and expiry if needed in other cases
    export async function clearResetToken(userId: string) {
    return await db
        .update(users)
        .set({ resetToken: null, resetTokenExpiry: null })
        .where(eq(users.id, userId));
    }

    
export default db;