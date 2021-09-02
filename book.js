
const searchbook = () => {

    const searchfield = document.getElementById('search-field')
    const searchText = searchfield.value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent='';
   if(searchText === '') {
      errorMessage.innerText='please write somthing to display';
   }
   else{

      
   //  clear data
    searchfield.value = '';


    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url)
    fetch(url)
    .then(Response => Response.json())
    .then(data =>displySearchResult(data.docs))
   
   }
    
}
// search result

 const displySearchResult =(books) =>{
   const result =Object.keys(books).length;
   document.getElementById('result').innerText=result;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent='';
    if(books.length === 0){
       errorMessage.innerText='No result found';
       }
    books.forEach(book => { 
       const authorName = typeof book.author_name !=='undefined' ? book.author_name.shift(): 'Not Found';
       const publisher = typeof book.publisher !=='undefined' ? book.publisher.shift():'Not Found';
    
      const div = document.createElement('div');
      div.classList.add('col')
      div.innerHTML = `
         <div class="card h-100 rounded-3">
         <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
         <div class="card-body">
              <h5 class="card-title"> Book Name : ${book.title}</h5>
              <p class="author-name"> Author : ${authorName}</p>
              <p class="publisher"> Publisher : ${publisher}</p>
              <p class="publisher"> First Publish Year : ${book.first_publish_year}</p>
      
         </div>
         </div>
      `;
      searchResult.appendChild(div)
    });
     
 }