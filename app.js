const table=document.querySelector('#tbresult');
const form=document.querySelector('#addForm');
const db =firebase.firestore();

db.collection('user').get().then((snapshot)=>{
      snapshot.forEach(doc=>{
          showData(doc);
      });
});
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  var ts = new Date();
  console.log(ts.toString())
  db.collection('user').add({
    mac:form.mac.value,
    name:form.name.value,
    check:'come',
    date:ts,
  });
  form.mac.value='';
  form.name.value='';
});

function showData(doc) {
  var row=table.insertRow(-1);
  var cell1=row.insertCell(0);
  var cell2=row.insertCell(1);
  var cell3=row.insertCell(2);
  var cell4=row.insertCell(3);
  var cell5=row.insertCell(4);
  //var ts = new Date();
  //console.log(ts.toString())
  cell1.innerHTML=doc.data().mac;
  cell2.innerHTML=doc.data().name;
  cell3.innerHTML=doc.data().check;
  cell4.innerHTML=doc.data().date;
  let add= ('macid',doc.id);
  console.log(add);
  //db.collection('user').doc(add).

  let btn=document.createElement('button');
  btn.textContent='delete';
  btn.setAttribute('class','btn btn-danger');
  btn.setAttribute('data-id',doc.id);
  cell5.appendChild(btn);

  btn.addEventListener('click',(e)=>{
    let id=e.target.getAttribute('data-id');
    db.collection('user').doc(id).delete();
  });
}
