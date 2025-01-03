async function deleteExpense(id: number) {
  const res = await fetch(`http://localhost:3001/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'confrim-delete': 'yes',
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 200) {
    location.reload();
  }
}
