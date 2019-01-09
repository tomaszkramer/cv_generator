    let Addbuttons = document.querySelectorAll('.add');
    let holder = document.querySelector('.drag-drop');
    let saveEditButtons = document.querySelectorAll('.save-edit');

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
            holder.style.color = 'transparent';
        };
        reader.readAsDataURL(file);
    };

    holder.ondragover = function(event){
        event.preventDefault();
    };

    Addbuttons.forEach(function (elem) {
        elem.addEventListener('click', addItem);
    });

    saveEditButtons.forEach(function (elem) {
        elem.addEventListener('click', saveEditItem)
    });

    function addItem(item) {

        let box = item.target.parentElement;
        let box2 = box.parentElement;
        console.log(box2);
        let addedItem = document.createElement('div');
        let div = document.createElement('div');
        let btnAdd = document.createElement('button');
        let btnSaveEdit = document.createElement('button');
        let btnRemove = document.createElement('button');
        let iconSave = document.createElement('i');
        let iconAdd = document.createElement('i');
        let iconRemove = document.createElement('i');
        iconAdd.classList.add('fa');
        iconAdd.classList.add('fa-plus-square');
        iconSave.classList.add('fa');
        iconSave.classList.add('fa-save');
        iconRemove.classList.add('fas');
        iconRemove.classList.add('fa-trash-alt');
        addedItem.classList.add('added-item');
        btnSaveEdit.classList.add('save-edit');
        btnSaveEdit.value = 'edit';
        btnSaveEdit.append(iconSave);
        btnAdd.classList.add('add');
        btnAdd.append(iconAdd);
        btnRemove.classList.add('remove');
        btnRemove.append(iconRemove);
        div.classList.add('text-field');
        div.contentEditable = 'true';

        box2.append(addedItem);
        addedItem.append(div);
        addedItem.append(btnSaveEdit);
        addedItem.append(btnAdd);
        addedItem.append(btnRemove);
        Addbuttons = document.querySelectorAll('button');
        btnAdd.addEventListener('click', addItem);
        btnSaveEdit.addEventListener('click', saveEditItem);
        btnRemove.addEventListener('click', removeItem);
    }

    function saveEditItem(item) {
        let divPar = item.target.parentElement;
        let div = divPar.children[0];
        let divClear = divPar.children[1];
        console.log(div);
        let icon = item.target.firstElementChild;

        if(item.target.value === 'edit'){
            div.contentEditable = 'false';
            div.classList.remove('text-field');
            div.classList.add('text-saved');
            divClear.style.clear= 'both';
            console.log(divClear);
            icon.classList.remove('fa-save');
            icon.classList.add('fa-edit');
            item.target.value = 'save';
        } else {
            div.contentEditable = 'true';
            div.classList.remove('text-saved');
            div.classList.add('text-field');
            icon.classList.remove('fa-edit');
            icon.classList.add('fa-save');
            item.target.value = 'edit';
        }
    }

    function removeItem(item) {
        let box = item.target.parentElement;
        console.log(box);
        box.parentElement.removeChild(box);
    }