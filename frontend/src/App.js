import React, { useEffect, useState } from "react";
if (!newUser) return;
const res = await fetch("/api/users", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name: newUser })
});
const created = await res.json();
setUsers((s) => [...s, created]);
setNewUser("");
};


const addOrder = async () => {
if (!newOrder) return;
const res = await fetch("/api/orders", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ product: newOrder })
});
const created = await res.json();
setOrders((s) => [...s, created]);
setNewOrder("");
};


return (
<div style={{ padding: 20, fontFamily: 'Arial' }}>
<h1>Microservices 3-Tier App 🚀</h1>


<section>
<h2>Users</h2>
<ul>
{users.map((u, i) => (
<li key={i}>{u.name}</li>
))}
</ul>
<input value={newUser} onChange={(e) => setNewUser(e.target.value)} placeholder="New user name" />
<button onClick={addUser}>Add User</button>
</section>


<section style={{ marginTop: 20 }}>
<h2>Orders</h2>
<ul>
{orders.map((o) => (
<li key={o.id}>Order #{o.id} - {o.product}</li>
))}
</ul>
<input value={newOrder} onChange={(e) => setNewOrder(e.target.value)} placeholder="New product" />
<button onClick={addOrder}>Add Order</button>
</section>
</div>
);
}


export default App;
