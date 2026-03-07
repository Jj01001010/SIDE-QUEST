const quoteTag = document.querySelector(".quote")
const author = document.querySelector(".author")
const button = document.querySelector(".quoteGenerator")

let data = [];

async function getData(){
    try{
        const fetchData = await fetch("quotes.json")

        if(!fetchData.ok){
            throw new Error("Http request failed!")
        }

        data = await fetchData.json()
    }
    catch(error){

        quoteTag.textContent = "..."
        author.textContent = "Error occured"
        console.log('Error occured!');
    }  
}

function randomIndex(){
    const index = Math.floor(Math.random() * data.length);
    return data[index];
}

async function showRandomQuotes(){

    button.disabled = true;
    quoteTag.textContent = "Something is happening... Please wait"
    author.textContent = "..."
    
    if(data.length === 0){
        await getData();
    }

    await new Promise(res => setTimeout(res,1500))
    const quote = randomIndex()
    if(!quote) return;

    quoteTag.textContent = quote.quote;
    
    const getAuthor = quote.author ? quote.author : " Unknown "
    author.textContent = `- ${getAuthor}`
    button.disabled = false;

}

button.addEventListener('click', showRandomQuotes)
