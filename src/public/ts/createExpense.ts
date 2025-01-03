const createForm = document.querySelector('form');

if (createForm) {
  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newExpense = {
      category: createForm.category.value,
      price: createForm.price.value,
    };

    const res = await fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    });

    if (res.status === 201) {
      createForm.category.value = '';
      createForm.price.value = '';
      setTimeout(() => {
        location.href = '/expense-list';
      }, 1000);
    }
  });
}
