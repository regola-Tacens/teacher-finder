
const app = {

  init: function() {

    app.createTeacherForm();
    app.createCounterElm();
    app.createListElm();
  },
  domElm :{
    appContainer : document.querySelector('#app')
  },
  createTeacherForm :function(){

    //création du formulaire contenant l'input
    app.domElm.teacherForm = document.createElement('form');
    app.domElm.teacherForm.id="form__teacher"
    //on y ajoute un event listener
    app.domElm.teacherForm.addEventListener('change',(e)=>{
      const form = e.target.closest('form');
      const teachersData = new FormData(form);
      app.findTeachers(teachersData);
    })

    //on crée chacun des input de type select avec la fonction createSelectInput
    app.createSelectInput("base");
    app.createSelectInput("speciality");

    // puis on ajoute le formulaire au dom
    app.domElm.appContainer.appendChild(app.domElm.teacherForm);
  },
  createSelectInput(filterName){
    
    const selectInput = document.createElement('select');
    selectInput.classList.add("selectFilter");
    selectInput.name= filterName;

    // on crée tous les champs options et on les ajoutent
    const placeholderOption = document.createElement('option');
    placeholderOption.value="";
    placeholderOption.disabled=true;
    placeholderOption.selected=true;
    placeholderOption.textContent=`choisissez un ${filterName}`;
    selectInput.appendChild(placeholderOption);

    // on va trouver le tableau contenant toutes les valeurs par filtername.
    const filterList= [];
    for(const teacher of app.teachers){
      if(!filterList.includes(teacher[filterName])){
        filterList.push(teacher[filterName])
      }
    }
  // on crée les options correspondantes
    filterList.forEach(filter=>{
      const option = document.createElement('option');
      option.value=filter;
      option.textContent=filter;
      selectInput.appendChild(option);
    })

    app.domElm.teacherForm.appendChild(selectInput);

  },
  createCounterElm: function(){
    //creation de la balise paragraphe qui va recevoir le nombre de prof.
    app.domElm.teacherCounterElm = document.createElement('p');
    app.domElm.teacherCounterElm.id="title__teacher-counter";
    // app.domElm.teacherCounterElm.textContent ="choisissez un language et une spécialité";

    //on attache cet élément au container du DOM
    app.domElm.appContainer.appendChild(app.domElm.teacherCounterElm);
  },
  createListElm: function(){
    //creation de la balise ul qui va recevoir les liste des profs
    app.domElm.teacherListElm = document.createElement('ul');
    app.domElm.teacherListElm.id="list__teachers";

    //on attache cet élément au container du DOM
    app.domElm.appContainer.appendChild(app.domElm.teacherListElm);
  },
  findTeachers: function(teachersData){

    // on récupère les bonnes inforamtoin dans le formdata du formulaire
    const teacherBase = teachersData.get('base');
    const teacherSpecialty = teachersData.get('speciality');
    if(!teacherBase || !teacherSpecialty)return;

    const teachers = app.teachers.filter(teacher => teacher.base === teacherBase && teacher.speciality === teacherSpecialty);
    //une fois trouvé le nombre de profs, on va mettre à jour cette info sur le DOM
    app.updateTeacherCounter(teachers.length);

    //on va également créer les elements de liste correspondants au professeurs trouvés.
    app.udpateTeachersList(teachers)

  },
  updateTeacherCounter: function(numberOfTeachers){
    app.domElm.teacherCounterElm.textContent =`${numberOfTeachers} profs trouvés`
  },
  udpateTeachersList: function(teachers){
    //on efface préalablement le contenu de la liste avant d'afficher de nouveaux éléments
    app.domElm.teacherListElm.textContent = ''
    //on crée un li pour chacun des teacher
    teachers.forEach(teacher =>{
      //on crée la liste principale
      const liTeacher = document.createElement('li');
      liTeacher.classList.add('teacherLi');
      liTeacher.textContent = teacher.name
      //puis on crée le tag avec un span
      const tagBaseElm = document.createElement('span');
      tagBaseElm.classList.add('teacherLiTag');
      tagBaseElm.textContent = teacher.base;
      liTeacher.appendChild(tagBaseElm);
      //on crée un autre span pour la spécialitée
      const tagSpecialityElm = document.createElement('span');
      tagSpecialityElm.classList.add('teacherLiTag');
      tagSpecialityElm.textContent = teacher.speciality;
      liTeacher.appendChild(tagSpecialityElm);

      app.domElm.teacherListElm.appendChild(liTeacher);
    })
  },
  teachers : [
    {
      "name": "Loris",
      "base": "PHP",
      "speciality": "WordPress"
    },
    {
      "name": "Jean",
      "base": "JavaScript",
      "speciality": "Data"
    },
    {
      "name": "Jean-Christophe",
      "base": "PHP",
      "speciality": "Symfony"
    },
    {
      "name": "Jean-Philippe",
      "base": "PHP",
      "speciality": "Symfony"
    },
    {
      "name": "Julien",
      "base": "PHP",
      "speciality": "React"
    },
    {
      "name": "Vincent",
      "base": "JavaScript",
      "speciality": "React"
    },
    {
      "name": "nono",
      "base": "JavaScript",
      "speciality": "React"
    },
    {
      "name": "Tony",
      "base": "JavaScript",
      "speciality": "React"
    }
  ]
};

// on initialise l'app dès que le document est prêt
document.addEventListener('DOMContentLoaded', app.init);
