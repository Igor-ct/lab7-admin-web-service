function AdminInventoryCreate() {
  return (
    <div>
      <h2>Create New Position</h2>
      <form>
        <input type="text" placeholder="Item name" />
        <button type="submit">Add to Stock</button>
      </form>
    </div>
  );
}

export default AdminInventoryCreate;