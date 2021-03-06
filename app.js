    let addbuttons = document.querySelectorAll('.add');
    let holder = document.querySelector('.drag-drop');
    let par = document.querySelector('.drag-drop p');
    let saveEditButtons = document.querySelectorAll('.save-edit');
    let iconArr =[];
    let confirm = document.querySelector('#confirm');
    let showDiv = document.querySelector('#addIcon');
    let showDivButton = document.querySelector('#showDiv');
    let create = document.querySelector('.create');
    let print = document.querySelector('.print');
    let fieldset = document.querySelector('fieldset');

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
            holder.removeChild(par);
        };
        reader.readAsDataURL(file);
    };

    holder.ondragover = function(event){
        event.preventDefault();
    };

    addbuttons.forEach(function (elem) {
        elem.addEventListener('click', addItem);
    });

    saveEditButtons.forEach(function (elem) {
        elem.addEventListener('click', saveEditItem)
    });

    confirm.addEventListener('click', addIcon);

    showDivButton.addEventListener('click', display);

    create.addEventListener('click', createCv);

    print.addEventListener('click', printCv);

    function printCv() {
        window.print()
    }

    function display() {
        if(showDiv.style.display !== 'block'){
            showDiv.style.display = 'block';
            showDivButton.innerHTML = 'hide input fields';
        } else {
            showDiv.style.display = 'none';
            showDivButton.innerHTML = 'show input fields'
        }
    }
    
    function addIcon() {
            let icon = document.querySelector('#icon');
            let url = document.querySelector('#url');
            if(icon.value === '' || url.value === ''){
                alert('none field may be empty')
            } else {
                iconArr.push({icon: icon.value, url: url.value});
                icon.value = '';
                url.value = '';
                addLastChild(iconArr)
            }
    }

    function addLastChild(elem) {
        let i = elem.length - 1;
        let pIcon = document.createElement('p');
        let pUrl = document.createElement('a');
        let iconChoose = document.createElement('div');
        let divInline = document.createElement('div');
        let awesomeIcons = document.querySelector('.awesome-icons');
        divInline.classList.add('inline');
        iconChoose.classList.add('icon-choose');
        pIcon.innerHTML = elem[i].icon;
        pUrl.classList.add('link');
        pUrl.href = elem[i].url;
        pUrl.innerText = elem[i].url;
        awesomeIcons.appendChild(divInline);
        divInline.appendChild(iconChoose);
        iconChoose.appendChild(pIcon);
        iconChoose.appendChild(pUrl);
    }

    function addItem(item) {
        let box = item.target.parentElement;
        let box2 = box.parentElement;
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
        addbuttons = document.querySelectorAll('button');
        btnAdd.addEventListener('click', addItem);
        btnSaveEdit.addEventListener('click', saveEditItem);
        btnRemove.addEventListener('click', removeItem);
    }

    function saveEditItem(item) {
        let divPar = item.target.parentElement;
        let div = divPar.children[0];
        let divClear = divPar.children[1];
        let icon = item.target.firstElementChild;

        if(item.target.value === 'edit'){
            div.contentEditable = 'false';
            div.classList.remove('text-field');
            div.classList.add('text-saved');
            divClear.style.clear= 'both';
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
        box.parentElement.removeChild(box);
    }
    
    function createCv() {

        addbuttons.forEach(elem=>{
            elem.style.display = 'none';
        });

        saveEditButtons.forEach(elem=>{
            elem.style.display = 'none';
        });

        fieldset.style.display = 'none';

        let divs = document.querySelectorAll('.text-field');
        divs.forEach(elem=>{
            elem.classList.remove('text-field');
            elem.classList.add('text-saved');
        })

    }
