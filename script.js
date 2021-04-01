function Book(name, author, page, isRead) {
    this.name = name
    this.author = author
    this.page = Number(page)
    this.isRead = isRead
    this.id = library.getLib().length
}



const library = (function(){

    let _library = []

    const addBook = () => {
        if(displayBooks.getForm().name==''){
            document.querySelectorAll('.formbox-container > div > input')[0].placeholder='please enter a name'
            document.querySelectorAll('.formbox-container > div > input')[0].classList.add('error')
            document.querySelectorAll('.formbox-container > div > input')[0].addEventListener('focus',() =>document.querySelectorAll('.formbox-container > div > input')[0].classList.remove('error') )
            return
        }

        if(displayBooks.getForm().author==''){
            document.querySelectorAll('.formbox-container > div > input')[1].placeholder='please enter an author name'
            document.querySelectorAll('.formbox-container > div > input')[1].classList.add('error')
            document.querySelectorAll('.formbox-container > div > input')[1].addEventListener('focus',() =>document.querySelectorAll('.formbox-container > div > input')[1].classList.remove('error') )

            return
        }

        if(displayBooks.getForm().page==''){
            document.querySelectorAll('.formbox-container > div > input')[2].placeholder='please enter number of pages'
            document.querySelectorAll('.formbox-container > div > input')[2].classList.add('error')
            document.querySelectorAll('.formbox-container > div > input')[2].addEventListener('focus',() =>document.querySelectorAll('.formbox-container > div > input')[2].classList.remove('error') )

            return
        }


        if( isNaN(displayBooks.getForm().page)){
            document.querySelectorAll('.formbox-container > div > input')[2].value=''
            document.querySelectorAll('.formbox-container > div > input')[2].placeholder='page must be a number'
            document.querySelectorAll('.formbox-container > div > input')[2].classList.add('error')
            document.querySelectorAll('.formbox-container > div > input')[2].addEventListener('focus',() =>document.querySelectorAll('.formbox-container > div > input')[2].classList.remove('error') )

            return
        }

        _library.push(displayBooks.getForm())
        displayBooks.addBtnAgain()
        saveLocal();
        displayBooks.showBooks(_library)

    }

    const getLib = () => {
        return _library
    }
    
    const getBook = (idx) => {
        return _library[idx]
    }

    const deleteBook = (idx) => {
        
        _library.splice(idx,1)
        saveLocal()
        displayBooks.showBooks(_library)
        
    }

    const editBook = (name,author,page,index) => {
        
        if(displayBooks.getForm().name==''){
            document.querySelectorAll('.book-card ')[index].children[0].placeholder='please enter a name'
            document.querySelectorAll('.book-card ')[index].children[0].classList.add('error')
            document.querySelectorAll('.book-card ')[index].children[0].addEventListener('focus',() =>document.querySelectorAll('.book-card ')[index].children[0].classList.remove('error') )
            return
        }

        if(displayBooks.getForm().author==''){
            document.querySelectorAll('.book-card ')[index].children[1].placeholder='please enter an author name'
            document.querySelectorAll('.book-card ')[index].children[1].classList.add('error')
            document.querySelectorAll('.book-card ')[index].children[1].addEventListener('focus',() =>document.querySelectorAll('.book-card ')[index].children[1].classList.remove('error') )

            return
        }

        if(displayBooks.getForm().page==''){
            document.querySelectorAll('.book-card ')[index].children[2].placeholder='please enter number of pages'
            document.querySelectorAll('.book-card ')[index].children[2].classList.add('error')
            document.querySelectorAll('.book-card ')[index].children[2].addEventListener('focus',() =>document.querySelectorAll('.book-card ')[index].children[2].classList.remove('error') )

            return
        }


        if( isNaN(displayBooks.getForm().page)){
            document.querySelectorAll('.book-card ')[index].children[2].value=''
            document.querySelectorAll('.book-card ')[index].children[2].placeholder='page must be a number'
            document.querySelectorAll('.book-card ')[index].children[2].classList.add('error')
            document.querySelectorAll('.book-card ')[index].children[2].addEventListener('focus',() =>document.querySelectorAll('.book-card ')[index].children[2].classList.remove('error') )

            return
        }

        _library[index].name = name
        _library[index].author = author
        _library[index].page = page
        saveLocal()
        displayBooks.showBooks(_library)
    }

    const checkBook = (index) => {
    
        if(_library[index].isRead == true) _library[index].isRead = false
    else _library[index].isRead = true
         
         saveLocal()
         displayBooks.showBooks(_library)
        
    }

    const resetLocal = () => {
       _library = JSON.parse(localStorage.getItem("myLibrary"));
       if (_library === null) _library = [];
   }

   const saveLocal = () => {
    localStorage.setItem("myLibrary", JSON.stringify(library.getLib()));
}


    return{
        addBook,
        getBook,
        deleteBook,
        editBook,
        getLib,
        checkBook,
        resetLocal
    }


})()




const displayBooks = (function() {

    const addBookButton = () => {
        let buttonContainer = document.querySelector('.button-container')
        
        let addButton = document.getElementById('addBook')
        buttonContainer.removeChild(addButton)
        
        let formboxContainer = document.createElement('div')
        formboxContainer.classList.add('formbox-container')

        let formbox1 = document.createElement('div')
        let formbox2 = document.createElement('div')
        let formbox3 = document.createElement('div')
        
    


        let label1 = document.createElement('label')
        label1.textContent='Name:'
        let form1 = document.createElement('input')
        form1.setAttribute('type','text')

        let label2 = document.createElement('label')
        label2.textContent='Author:'
        let form2 = document.createElement('input')
        form2.setAttribute('type','text')
        let label3 = document.createElement('label')
        label3.textContent='Page:'
        let form3 = document.createElement('input')
        form3.setAttribute('type','text')

        let btn = document.createElement('button')
        btn.textContent='Add'
        btn.classList = 'openedBtn'

        let backBtn = document.createElement('button')
        backBtn.textContent='Cancel'
        backBtn.classList = 'openedBtn cancel'

        formbox1.appendChild(label1)
        formbox1.appendChild(form1)
        formbox2.appendChild(label2)
        formbox2.appendChild(form2)
        formbox3.appendChild(label3)
        formbox3.appendChild(form3)
        

        formboxContainer.appendChild(formbox1)
        formboxContainer.appendChild(formbox2)
        formboxContainer.appendChild(formbox3)
        


        buttonContainer.appendChild(formboxContainer)
        buttonContainer.appendChild(btn)
        buttonContainer.appendChild(backBtn)

        let openedBtn = document.querySelector('.openedBtn')
        openedBtn.addEventListener('click' , library.addBook)
        let cancel = document.querySelector('.cancel')
        cancel.addEventListener('click' , addBtnAgain)
       
    }

    const getForm = () => {
        let forms = document.getElementsByTagName('input')
      
        
        let book = new Book(forms[0].value, forms[1].value, forms[2].value, false)

        return book

        
    }

    const addBtnAgain = () => {
        let addButton = document.createElement('button')
        addButton.textContent='Add Book'
        addButton.id ='addBook'
        
        let buttonContainer = document.querySelector('.button-container')
        let all = document.querySelector('.formbox-container')
        let btn = document.querySelector('.openedBtn')
        let backBtn = document.querySelector('.cancel')

        buttonContainer.removeChild(all)
        buttonContainer.removeChild(btn)
        buttonContainer.removeChild(backBtn)
        buttonContainer.appendChild(addButton)

        let addBookBtn = document.getElementById('addBook')
addBookBtn.addEventListener('click',displayBooks.addBookButton)
    }

    const showBooks = (lib) => {
    
        let content = document.querySelector('.content')
        content.innerHTML=''

       

            let index = 0;
        for(book of lib) {
            
            let bookCard = document.createElement('div')
            bookCard.classList.add('book-card')
    
            let bookName = document.createElement('h3')
            bookName.classList.add('book-name')
            
            let bookAuthor = document.createElement('h3')
            bookAuthor.classList.add('book-author')
    
            let bookPage = document.createElement('h3')
            bookPage.classList.add('book-page')
    
            let btnEdit = document.createElement('button')
            btnEdit.setAttribute('onclick', 'displayBooks.editScreen('+index+')')
            btnEdit.classList.add('btn-edit')
            btnEdit.textContent='edit'
    
            let btnRemove = document.createElement('button')
            btnRemove.classList.add('btn-remove')
            btnRemove.setAttribute('onclick', 'library.deleteBook('+index+')')
            btnRemove.textContent='Remove'
    
            let btnCheck = document.createElement('button')
            btnCheck.classList.add('btn-check')
            btnCheck.setAttribute('onclick', 'library.checkBook('+index+')')
            btnCheck.innerHTML='<i class="fas fa-check"></i>'
    
            let btnCardBox = document.createElement('div')
            btnCardBox.classList.add('btn-card-box')
            btnCardBox.appendChild(btnEdit)
            btnCardBox.appendChild(btnRemove)
            btnCardBox.appendChild(btnCheck)

            bookName.textContent='"'+book.name+'"'
            bookAuthor.textContent='"'+book.author+'"'
            bookPage.textContent='"'+book.page+'"'

            if(book.isRead){
                    bookCard.classList.add('read')
                    btnCheck.innerHTML='<i class="far fa-times-circle"></i>'

            } 

            bookCard.appendChild(bookName)
            bookCard.appendChild(bookAuthor)
            bookCard.appendChild(bookPage)
            bookCard.appendChild(btnCardBox)

            console.log(book)
            content.appendChild(bookCard)
            index++
            
        }



      

                    console.log(library.getLib())
    }
    
    const editScreen = (index) => {
       
        console.log(index)
        let bookCard = document.querySelectorAll('.book-card')
        bookCard[index].innerHTML=''

        let input1 = document.createElement('input')
        input1.setAttribute('type','text')
        input1.value = library.getBook(index).name
        input1.classList.add('box-input')
        input1.id=index

        let input2 = document.createElement('input')
        input2.setAttribute('type','text')
        input2.value = library.getBook(index).author
        input2.classList.add('box-input')
        input2.id=index


        let input3 = document.createElement('input')
        input3.setAttribute('type','text')
        input3.value = library.getBook(index).page
        input3.classList.add('box-input')
        input3.id=index

        let btnBox = document.createElement('div')
        btnBox.classList.add('btn-card-box')

        let saveBtn = document.createElement('button')
        saveBtn.textContent='Save'
        saveBtn.classList.add('save-btn')
        saveBtn.setAttribute('onclick','displayBooks.getEditForm('+index+')')

        let cancelBtn = document.createElement('button')
        cancelBtn.textContent='Cancel'
        cancelBtn.classList.add('cancel-btn')
        cancelBtn.setAttribute('onclick','displayBooks.showBooks(library.getLib())')

        btnBox.appendChild(saveBtn)
        btnBox.appendChild(cancelBtn)


        bookCard[index].appendChild(input1)
        bookCard[index].appendChild(input2)
        bookCard[index].appendChild(input3)
        bookCard[index].appendChild(btnBox)
        
    }

    const getEditForm = (index) =>{
        let cards = document.querySelectorAll('.book-card')
        let cardChildren = cards[index].children
        library.editBook(cardChildren[0].value, cardChildren[1].value, cardChildren[2].value, index)



    }


    return{
        addBookButton,
        getForm,
        addBtnAgain,
        showBooks,
        editScreen,
        getEditForm
        
    }

})()




library.resetLocal()
let addBookBtn = document.getElementById('addBook')
addBookBtn.addEventListener('click',displayBooks.addBookButton)
displayBooks.showBooks(library.getLib())

