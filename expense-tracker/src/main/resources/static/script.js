let categoryChart;
let monthlyChart;

async function getExpenses() {
  const response = await fetch('/expenses');
  const expenses = await response.json();
  updateExpenseList(expenses);
  updateCharts(expenses);
}

function updateExpenseList(expenses) {
  const list = document.getElementById('expenseList');
  list.innerHTML = '';

  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.category}: $${exp.amount} on ${exp.date}`;
    list.appendChild(li);
  });
}

function updateCharts(expenses) {
  const categoryTotals = {};
  expenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const monthlyTotals = {};
  expenses.forEach(exp => {
    const month = exp.date.substring(0, 7); // YYYY-MM
    monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
  });

  //category chart data
  const categoryLabels = Object.keys(categoryTotals);
  const categoryData = Object.values(categoryTotals);

  //monthly chart data
  const monthLabels = Object.keys(monthlyTotals);
  const monthData = Object.values(monthlyTotals);

  //remove old chart
  if (categoryChart) categoryChart.destroy();
  if (monthlyChart) monthlyChart.destroy();

  //pie chart
  const ctx1 = document.getElementById('categoryChart').getContext('2d');
  categoryChart = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: categoryData,
        backgroundColor: [
          '#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#FF9F40'
        ],
      }],
    },
  });

  // Line chart (by month)
  const ctx2 = document.getElementById('monthlyChart').getContext('2d');
  monthlyChart = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: monthLabels,
      datasets: [{
        label: 'Monthly Spending ($)',
        data: monthData,
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1
      }],
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

document.getElementById('expenseForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const expense = {
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value
  };

  await fetch('/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense)
  });

  e.target.reset();
  getExpenses();
});

getExpenses();

async function fetchExpenses() {
  const res = await fetch('/expenses');
  const data = await res.json();
  const list = document.getElementById('expenseList');
  list.innerHTML = '';

  data.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.category}: $${e.amount} on ${e.date} `;

    //delete btn
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await fetch(`/expenses/${e.id}`, { method: 'DELETE' });
//      if (window.confirm("Are you sure you want to delete that item?") == true){
//        fetchExpenses();
//      }
      fetchExpenses()
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

fetchExpenses();