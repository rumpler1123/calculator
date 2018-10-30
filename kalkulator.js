// listen for submit 

document.getElementById('loan-form').addEventListener('submit', function(e){

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate results 

function calculateResults(e){
  
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payment 

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //show results 
    document.getElementById('results').style.display = 'block';

    //hide loader 
    document.getElementById('loading').style.display = 'none';

  }else{
    showErr('Please check your numbers! ');
  }




  
}
// show error

function showErr(error){
  //hide results 
  document.getElementById('results').style.display = 'none';

  //hide loader 
  document.getElementById('loading').style.display = 'none';

  // create div
  const errorDiv = document.createElement('div');

  // get elements 

  const card = document.querySelector('.card');
  const loanFrom = document.querySelector('#loan-form');

  // add class 
  errorDiv.className = 'alert alert-danger';

  // create text node append to div

  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading

  card.insertBefore(errorDiv, loanFrom);

  // clear error after 5 sec 

  setTimeout(clearError, 3000);

}

function clearError(){
  document.querySelector('.alert').remove();
}