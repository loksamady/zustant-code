# Zustand Store with DevTools & Persistence

## 🎯 Features Added

### ✅ **DevTools Integration**

- **Browser DevTools**: Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Store Name**: Shows as "Zustand Cart Store" in DevTools
- **Real-time Monitoring**: Track all state changes, actions, and time-travel debugging

### ✅ **LocalStorage Persistence**

- **Auto-Save**: Cart and user data automatically saved to localStorage
- **Page Refresh**: Data persists across browser refreshes and sessions
- **Storage Key**: `zustand-cart-storage` (visible in DevTools → Application → Local Storage)
- **Selective Persistence**: Only saves essential data (cart products, total, user info)

### ✅ **Debug Component**

- **Live Monitor**: Bottom-right debug panel shows current store state
- **Quick Actions**: Reset cart or clear localStorage with one click
- **Development Helper**: Remove `<StoreDebugger />` from production builds

## 🚀 How to Test Persistence

1. **Add Items to Cart**:

   - Add some products to your cart
   - Fill out user profile information

2. **Refresh Page**:

   - Press `F5` or `Ctrl+R`
   - Cart items and user data should persist

3. **Close/Reopen Browser**:

   - Close browser completely
   - Reopen and navigate back to the app
   - Data should still be there

4. **Use Debug Panel**:
   - See live store state in bottom-right corner
   - Use "Clear Cart" or "Clear Storage" buttons to test

## 🔧 DevTools Usage

### Install Extension

```bash
# Chrome/Edge
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

# Firefox
https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
```

### Access DevTools

1. Open browser DevTools (`F12`)
2. Look for "Redux" tab
3. Select "Zustand Cart Store"
4. Monitor actions like:
   - `addProduct`
   - `incrementQuantity`
   - `decrementQuantity`
   - `removeProduct`
   - `reset`

### Time Travel Debugging

- Click any action in the left panel
- Store state jumps to that point in time
- Great for debugging state changes

## 📁 LocalStorage Structure

```json
{
  "state": {
    "products": [
      {
        "id": "product-1",
        "name": "Product Name",
        "price": 29.99,
        "quantity": 2
        // ... other product fields
      }
    ],
    "total": 59.98,
    "userName": "user123",
    "fullName": "John Doe",
    "age": 25,
    "address": "123 Main St"
  },
  "version": 1
}
```

## ⚙️ Configuration Options

### Store Configuration (`store.ts`)

```typescript
persist(
  // Your store logic
  immer((...a) => ({ ...createUserSlice(...a), ...createCartSlice(...a) })),
  {
    name: "zustand-cart-storage", // localStorage key
    version: 1, // for migrations
    skipHydration: false, // SSR support
    partialize: (state) => ({
      // what to save
      products: state.products,
      total: state.total,
      userName: state.userName,
      fullName: state.fullName,
      age: state.age,
      address: state.address,
    }),
  }
);
```

### Alternative Storage Options

```typescript
import { createJSONStorage } from 'zustand/middleware'

// Use sessionStorage instead
storage: createJSONStorage(() => sessionStorage)

// Use custom storage
storage: createJSONStorage(() => ({
  getItem: (name) => // custom get
  setItem: (name, value) => // custom set
  removeItem: (name) => // custom remove
}))
```

## 🛠️ Development vs Production

### Remove Debug Component

```tsx
// Remove this line in production:
<StoreDebugger />
```

### Environment-based DevTools

```typescript
devtools(
  // store logic
  {
    name: "Zustand Cart Store",
    enabled: process.env.NODE_ENV === "development", // Only in dev
  }
);
```

## 🐛 Troubleshooting

### DevTools Not Showing

1. Install Redux DevTools browser extension
2. Refresh the page
3. Check console for errors

### Data Not Persisting

1. Check localStorage in DevTools → Application → Local Storage
2. Look for `zustand-cart-storage` key
3. Verify `partialize` includes the data you want to save

### Clear Corrupted Data

```javascript
// In browser console:
localStorage.removeItem("zustand-cart-storage");
// or use the debug panel
```

## 📈 Benefits

- **User Experience**: No data loss on refresh
- **Development**: Easy debugging with time-travel
- **Performance**: Only saves essential data
- **Flexibility**: Easy to configure what persists
- **Production Ready**: DevTools can be disabled in production
