const updateForm = document.querySelector('form');

const id = location.pathname.split('/')[2];

if (updateForm) {
  updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newExpense = {
      category: updateForm.category.value,
      price: updateForm.price.value,
    };

    const res = await fetch(`http://localhost:3001/expenses/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    });

    if (res.status === 200) {
      updateForm.category.value = '';
      updateForm.price.value = '';
      setTimeout(() => {
        location.href = '/expense-list';
      }, 1000);
    }
  });
}
