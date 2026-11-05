# Database Architecture & Access Rules

The application uses MongoDB (database name: `swadGrillDB`). Below is the schema structure and access control rules for each collection.

## Collections

### 1. `users`
- **Fields:** `_id`, `name`, `email`, `photoURL`, `role`, `createdAt`
- **Indexes:** `{ email: 1 }` (Unique)
- **Access Rules:**
  - **Read:** Any authenticated user can read their own role. Admins can read anyone's role.
  - **Write:** Users are created securely via backend decoded token validation. Default role is strictly set to `user` on creation.

### 2. `orders`
- **Fields:** `_id`, `email`, `items`, `totalPrice`, `status`, `createdAt`
- **Indexes:** `{ email: 1, createdAt: -1 }`
- **Access Rules:**
  - **Read:** Users can ONLY read their own orders. Ownership is strictly verified against the decoded auth token. Admins can view all orders.
  - **Write:** Users can create orders linked only to their verified email. Only Admins can update order `status`.

### 3. `products`
- **Fields:** `_id`, `name`, `category`, `price`, `description`, `image`
- **Indexes:** `{ category: 1 }`
- **Access Rules:**
  - **Read:** Publicly accessible.
  - **Write/Update/Delete:** Strictly restricted to Admins only (`verifyAdmin` middleware).

### 4. `settings`
- **Access Rules:**
  - **Read:** Public.
  - **Write:** Admin only.

## Initial Setup
To initialize the database indexes, run the following command in the `backend` directory:
```bash
npm run db:setup