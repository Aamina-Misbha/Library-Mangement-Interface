var books = [
  {id:1,title:"Wings of Fire",author:"A. P. J. Abdul Kalam",cat:"Biography",member:null,due:null},
  {id:2,title:"Clean Code",author:"Robert C. Martin",cat:"Programming",member:null,due:null},
  {id:3,title:"The Alchemist",author:"Paulo Coelho",cat:"Fiction",member:null,due:null},
  {id:4,title:"Introduction to Algorithms",author:"T. H. Cormen",cat:"Computer Science",member:null,due:null}
];
var nextId = 5;

function addBook(){
  var t = document.getElementById("title").value.trim();
  var a = document.getElementById("author").value.trim();
  var c = document.getElementById("cat").value.trim() || "General";
  if(!t || !a){ alert("Please enter title and author."); return; }
  books.push({id:nextId++,title:t,author:a,cat:c,member:null,due:null});
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("cat").value = "";
  render();
}

function issueBook(id){
  var name = prompt("Member name:");
  if(!name || !name.trim()) return;
  var b = books.find(function(x){return x.id === id;});
  var d = new Date();
  d.setDate(d.getDate() + 14);
  b.member = name.trim();
  b.due = d.toDateString();
  render();
}

function returnBook(id){
  var b = books.find(function(x){return x.id === id;});
  b.member = null;
  b.due = null;
  render();
}

function deleteBook(id){
  if(!confirm("Delete this book?")) return;
  books = books.filter(function(x){return x.id !== id;});
  render();
}

function render(){
  var q = document.getElementById("search").value.toLowerCase();
  var f = document.getElementById("filter").value;
  var shown = books.filter(function(b){
    var text = (b.title + b.author + b.cat).toLowerCase();
    var st = b.member ? "out" : "in";
    return text.indexOf(q) !== -1 && (f === "all" || f === st);
  });
  var html = shown.map(function(b){
    var out = !!b.member;
    return '<div class="book"><div class="info"><b>' + esc(b.title) + '</b>' +
      '<small>' + esc(b.author) + ' · ' + esc(b.cat) + '</small>' +
      (out ? '<small>Issued to ' + esc(b.member) + ' · Due ' + b.due + '</small>' : '') + '</div>' +
      '<div class="acts"><span class="tag ' + (out ? 'out">Issued' : 'in">Available') + '</span>' +
      (out ? '<button class="ok" onclick="returnBook(' + b.id + ')">Return</button>'
           : '<button onclick="issueBook(' + b.id + ')">Issue</button>') +
      '<button class="bad" onclick="deleteBook(' + b.id + ')">✕</button></div></div>';
  }).join("");
  document.getElementById("list").innerHTML = html || '<div class="empty">No books found.</div>';
  var issued = books.filter(function(b){return b.member;}).length;
  document.getElementById("sTotal").textContent = books.length;
  document.getElementById("sOut").textContent = issued;
  document.getElementById("sIn").textContent = books.length - issued;
}

function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
}
render();