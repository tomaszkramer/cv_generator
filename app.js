    let buttons = document.querySelectorAll('.add');
    let holder = document.querySelector('.drag-drop');
    let saveEditButtons = document.querySelectorAll('.save-edit');
    console.log(saveEditButtons)
    holder.ondrop = function(event){
        event.preventDefault();
        let file = event.dataTransfer.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            let img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('picture');
            holder.appendChild(img);
            holder.classList.remove('drag-drop');
            holder.classList.add('dropped');
        };
        reader.readAsDataURL(file);
    };

    holder.ondragover = function(event){
        event.preventDefault();
    };

    buttons.forEach(function (elem) {
        elem.addEventListener('click', addItem);
    });

    saveEditButtons.forEach(function (elem) {
        elem.addEventListener('click', saveEditItem)
    });

    function addItem(item) {

        let box = item.target.parentElement;
        let addedItem = document.createElement('div');
        let div = document.createElement('div');
        let btn = document.createElement('button');
        let btnSaveEdit = document.createElement('button');
        let btnRemove = document.createElement('button');
        addedItem.classList.add('added-item');
        btnSaveEdit.innerText = 'SAVE';
        btnRemove.classList.add('remove');
        btnRemove.innerText = 'REMOVE';
        div.classList.add('text-field');
        div.contentEditable = true;
        btn.innerText = 'ADD';
        box.append(addedItem);
        addedItem.append(div);
        addedItem.append(btn);
        addedItem.append(btnSaveEdit);
        addedItem.append(btnRemove);
        buttons = document.querySelectorAll('button');
        btn.addEventListener('click', addItem);
        btnSaveEdit.addEventListener('click', saveEditItem);
        btnRemove.addEventListener('click', removeItem);
    }

    function saveEditItem(item) {
        let div = item.target.parentElement.firstElementChild;

        if(item.target.innerText === "EDIT"){

            div.contentEditable = true;
            div.classList.remove('text-saved');
            div.classList.add('text-field');
            item.target.innerText = 'SAVE';
        } else{
            div.contentEditable = false;
            div.classList.remove('text-field');
            div.classList.add('text-saved');
            item.target.innerText = 'EDIT';
        }
    }

    function removeItem(item) {
        console.log(item.target);
        let box = item.target.parentElement;
        console.log(box);
        box.parentElement.removeChild(box);
    }