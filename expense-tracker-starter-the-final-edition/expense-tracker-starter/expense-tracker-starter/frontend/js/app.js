const API_URL = "http://localhost:3000/api/expenses";

const tableBody = document.getElementById("expensesTableBody");
const totalAmount = document.getElementById("totalAmount");
const expensesCount = document.getElementById("expensesCount");
const highestExpense = document.getElementById("highestExpense");
const expenseForm = document.getElementById("expenseForm");
let allExpenses = [];

const categoryFilter = document.getElementById("categoryFilter");

//ditting modal linking 
const editForm = document.getElementById("editForm");

const editId = document.getElementById("editId");
const editTitle = document.getElementById("editTitle");
const editAmount = document.getElementById("editAmount");
const editCategory = document.getElementById("editCategory");
const editDate = document.getElementById("editDate");

const editModal = new bootstrap.Modal(
    document.getElementById("editModal")
);

//spinner and alret linking 
const alertBox = document.getElementById("alertBox");
const loadingSpinner = document.getElementById("loadingSpinner");


async function getExpenses() {

    showLoading();
    hideAlert();

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load expenses");
        }

        const data = await response.json();

        allExpenses = data;

        renderExpenses(data);
        updateSummary(data);

    } catch (error) {

        console.error(error);

        showAlert(
            "Unable to load expenses. Please make sure the server is running.",
            "danger"
        );

    } finally {

        hideLoading();

    }
}


function renderExpenses(expenses) {

    tableBody.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        const expense = expenses[i];

        const tr = document.createElement("tr");

        const tdTitle = document.createElement("td");
        tdTitle.textContent = expense.title;

        const tdAmount = document.createElement("td");
        tdAmount.textContent = expense.amount + " JD";

        const tdCategory = document.createElement("td");
        tdCategory.textContent = expense.category;

        const tdDate = document.createElement("td");
        tdDate.textContent = expense.date;

        const tdActions = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "btn btn-warning btn-sm me-2";

         editBtn.addEventListener("click", function () {

         editId.value = expense.id;
         editTitle.value = expense.title;
         editAmount.value = expense.amount;
         editCategory.value = expense.category;
         editDate.value = expense.date;

         editModal.show();
         });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", function () {
        deleteExpense(expense.id);
          });

        tdActions.appendChild(editBtn);
        tdActions.appendChild(deleteBtn);

        tr.appendChild(tdTitle);
        tr.appendChild(tdAmount);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDate);
        tr.appendChild(tdActions);

        tableBody.appendChild(tr);
    }
}

function updateSummary(expenses) {

    let total = 0;
    let highest = 0;

    for (let i = 0; i < expenses.length; i++) {

        total = total + expenses[i].amount;

        if (expenses[i].amount > highest) {
            highest = expenses[i].amount;
        }
    }

    totalAmount.textContent = total.toFixed(2) + " JD";

    expensesCount.textContent = expenses.length;

    highestExpense.textContent = highest.toFixed(2) + " JD";
}


//تحقيق ال post ///////////////////////////////////



expenseForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (title === "" || amount <= 0 || !Number.isFinite(amount)
        || category === "" || date === "") {
        showAlert("Please enter valid expense details.", "danger");
        return;
    }

    const newExpense = {
        title: title,
        amount: amount,
        category: category,
        date: date
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newExpense)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add expense");
        }

        expenseForm.reset();
        await getExpenses();
        showAlert("Expense added successfully.", "success");

    } catch (error) {
        showAlert(error.message, "danger");
    }
});



//تحقيق مبدأ ال delete //////////////////////////



async function deleteExpense(id) {

    try {

        const response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to delete expense");
        }

        await getExpenses();
        showAlert("Expense deleted successfully.", "success");

    } catch (error) {

        showAlert(error.message, "danger");

    }
}

//filtering

categoryFilter.addEventListener("change", function () {

    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "All") {

        renderExpenses(allExpenses);

    } else {

        const filteredExpenses = allExpenses.filter(function (expense) {
            return expense.category === selectedCategory;
        });

        renderExpenses(filteredExpenses);
    }
});

//تحقيق مبدأ Put

editForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const id = editId.value;

    const updatedExpense = {
        title: editTitle.value.trim(),
        amount: Number(editAmount.value),
        category: editCategory.value,
        date: editDate.value
    };

    if (
        updatedExpense.title === "" ||
        updatedExpense.amount <= 0 ||
        !Number.isFinite(updatedExpense.amount) ||
        updatedExpense.category === "" ||
        updatedExpense.date === ""
    ) {
        showAlert("Please enter valid expense details.", "danger");
        return;
    }

    try {

        const response = await fetch(API_URL + "/" + id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(updatedExpense)

        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update expense");
        }

        editModal.hide();

        await getExpenses();
        showAlert("Expense updated successfully.", "success");

    } catch (error) {

        showAlert(error.message, "danger");

    }

});

//spinning finc 
function showLoading() {
    loadingSpinner.classList.remove("d-none");
}

function hideLoading() {
    loadingSpinner.classList.add("d-none");
}

//Alret func 

function showAlert(message, type) {

    alertBox.textContent = message;

    alertBox.className = "alert alert-" + type;

}
function hideAlert() {
    alertBox.className = "alert d-none";
}


getExpenses();