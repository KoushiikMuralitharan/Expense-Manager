async function getExpenseDetails(){
   // fetch is an asynchronous function
    const result =await fetch('https://expense-manager-c3l0.onrender.com/get-expenses');
   // this result is an object which contains the information about the url that  we sent to fetch .
   //console.log(result);
  const data = await result.json();
  console.log(data);
}

getExpenseDetails();

async function addNewExpense(){
    const result = await fetch('http://127.0.0.1:5000/add-expense',{
        method : "POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
            "amount": 50000,
            "category": "salary",
            "date":"17/05/2024"     
        })
    })
    const data = await result.json();
    console.log(data);
}
document.getElementById('button').addEventListener('click',addNewExpense);