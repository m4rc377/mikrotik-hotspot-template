
const username = document.getElementById("kodeVoucher")
const password = document.getElementById("password")
function setpass() {
  var user = username.value
  password.value = user;
}
if(username !== null)
{
  username.onchange = setpass;
}

 
const back2Top = document.querySelector('#back2Top');
back2Top.addEventListener('click', (e) => {
    e.preventDefault();
    window.scroll({ top:0, left:0, behavior: 'smooth'});
});

// Daftar Reseller
$.getJSON("../data/identitas.json", function(data){
  $(".tahun").text(data.tahun)
  $(".footer").text(data.footer)
})
function kirimPesan() {
  $.getJSON("../data/identitas.json", function(data){
    var keperluan = document.getElementById('keperluan');
    var nama = document.getElementById('name');
    var whatsapp = document.getElementById('whatsapp');
    var pesan = document.getElementById('pesan');
    
    var gabungan = 'Keperluan%3A ' + keperluan.value + '%0ANama%3A ' + nama.value + '%0AWhatsapp%3A ' + 'https://wa.me/62' + whatsapp.value + '%0APesan%3A ' + pesan.value;
    
    var chat_id = data.chat_id;
    var token_bot = data.token_bot_telegram;
    // var tokenbot = '6016017922:AAEleu09o5REarKkfyenci-612msbwR0qMk'; // Ganti dengan token bot yang agan buat
    // var chat_id = '570727627'; // Ganti dengan chat id -485259792 telegram agan. Jika chat_id pribadi pastikan tanpa tanda strip -, chat dari telegram agan ke @user_chat_info_bot

    $.ajax({url: `https://api.telegram.org/bot${token_bot}/sendMessage?chat_id=${chat_id}&text=${gabungan}&parse_mode=html`, method: `POST`,});
	  document.getElementById("formBantuan").reset();
  })
}